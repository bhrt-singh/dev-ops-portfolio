import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { CurrentFocus } from './components/CurrentFocus';
import { TodayILearned } from './components/TodayILearned';
import { JournalList } from './components/JournalList';
import { JournalArticleView } from './components/JournalArticle';
import { ProjectsSection } from './components/ProjectsSection';
import { DevOpsStack } from './components/DevOpsStack';
import { PhilosophySection } from './components/PhilosophySection';
import { JourneyTimeline } from './components/JourneyTimeline';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { TickerMarquee } from './components/TickerMarquee';
import { initLenis } from './lib/lenis';
import { scrollToSection, scrollToTop } from './lib/scroll';

import { NotFound } from './pages/NotFound';

// Section ids driving scroll-spy & cross-route navigation
const SECTION_IDS = ['home', 'focus', 'journal', 'projects', 'philosophy', 'lab', 'journey', 'about'];

import { Scroll404 } from './components/cinematic/Scroll404';
import { SpotlightHero } from './components/hero/SpotlightHero';
import { SystemStatus } from './components/system/SystemStatus';
import { InspectMode } from './components/system/InspectMode';

/** The full homepage combining the Cursor Spotlight Hero layer with detailed portfolio sections & scroll-driven system failure sequence */
function HomePage({
  activeTab,
  onNavigateTab,
  onSelectArticle,
}: {
  activeTab: string;
  onNavigateTab: (tab: string) => void;
  onSelectArticle: (articleId: string) => void;
}) {
  return (
    <main style={{ flex: 1, backgroundColor: '#0a0d12' }}>
      {/* Primary Cursor Spotlight Hero Experience */}
      <SpotlightHero
        activeTab={activeTab}
        onNavigateTab={onNavigateTab}
        onSelectArticle={onSelectArticle}
      />

      {/* Main Portfolio Sections */}
      <TickerMarquee />
      <CurrentFocus />
      <ProjectsSection />
      <PhilosophySection />
      <DevOpsStack />
      <JourneyTimeline />

      {/* 300vh Scroll-Driven System Interruption (Scroll404) */}
      <Scroll404 />

      {/* Recovery into Learning & Journal */}
      <TodayILearned onReadArticle={onSelectArticle} />
      <JournalList onSelectArticle={onSelectArticle} />
      <AboutSection />
    </main>
  );
}

function ArticlePage({ onBack, onSelectArticle }: { onBack: () => void; onSelectArticle: (id: string) => void }) {
  const { articleId } = useParams<{ articleId: string }>();
  return (
    <main style={{ flex: 1, backgroundColor: '#0a0d12', paddingTop: '2rem' }}>
      <JournalArticleView articleId={articleId || ''} onBack={onBack} onSelectArticle={onSelectArticle} />
    </main>
  );
}

export function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState<boolean>(false);
  const [inspectOpen, setInspectOpen] = useState<boolean>(false);

  // Initialize smooth scroll engine
  useEffect(() => {
    const cleanup = initLenis();
    return cleanup;
  }, []);

  // Scroll-spy observer for section highlighting on homepage
  useEffect(() => {
    if (location.pathname !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCmdPaletteOpen(false);
    if (tab === '404') {
      navigate('/404');
      scrollToTop();
      return;
    }
    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(() => scrollToSection(tab), 60);
    } else {
      scrollToSection(tab);
    }
  };

  const handleSelectArticle = (articleId: string) => {
    navigate(`/journal/${articleId}`);
    scrollToTop();
  };

  const handleSelectProject = (_projectId: string) => {
    handleTabChange('projects');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0a0d12' }}>
      {/* Floating System Status Indicator */}
      <SystemStatus fixed={true} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              activeTab={activeTab}
              onNavigateTab={handleTabChange}
              onSelectArticle={handleSelectArticle}
            />
          }
        />
        <Route
          path="/journal/:articleId"
          element={
            <ArticlePage
              onBack={() => handleTabChange('journal')}
              onSelectArticle={handleSelectArticle}
            />
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer onNavigateTab={handleTabChange} />

      <CommandPalette
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
        onSelectArticle={handleSelectArticle}
        onSelectProject={handleSelectProject}
        onSelectTab={handleTabChange}
        onOpenInspect={() => setInspectOpen(true)}
      />

      <InspectMode
        isOpen={inspectOpen}
        onClose={() => setInspectOpen(false)}
      />
    </div>
  );
}

export default App;
