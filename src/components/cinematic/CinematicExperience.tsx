import React, { useState, useEffect, useRef } from 'react';
import { useVideoScrub } from './useVideoScrub';
import { ScrollVideo } from './ScrollVideo';
import { CinematicNavbar } from './CinematicNavbar';
import { MobileMenu } from './MobileMenu';
import { ChapterProgress } from './ChapterProgress';
import { CinematicChapter } from './CinematicChapter';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260821_114821_a8ca298f-be2c-4613-a4dd-51b69e16bbde.mp4';

interface CinematicExperienceProps {
  activeTab: string;
  onNavigateTab: (tab: string) => void;
  onSelectArticle: (articleId: string) => void;
}

export const CinematicExperience: React.FC<CinematicExperienceProps> = ({
  activeTab,
  onNavigateTab,
  onSelectArticle,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Measure scroll progress through the 500vh container
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const totalScrollable = el.clientHeight - window.innerHeight;
      if (totalScrollable <= 0) {
        setScrollProgress(0);
        return;
      }

      // top is negative as we scroll down
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const { canvasRef, isLoaded, contrast } = useVideoScrub({
    videoUrl: VIDEO_URL,
    scrollProgress,
  });

  // Calculate current chapter index (1 to 5)
  const currentChapter = Math.min(5, Math.max(1, Math.floor(scrollProgress * 5) + 1));

  return (
    <div
      ref={containerRef}
      id="home"
      style={{
        position: 'relative',
        height: '500vh',
        width: '100%',
        backgroundColor: '#0a0d12',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Background Video Renderer */}
        <ScrollVideo canvasRef={canvasRef} isLoaded={isLoaded} />

        {/* Dynamic Nav Header */}
        <CinematicNavbar
          activeTab={activeTab}
          onNavigateTab={onNavigateTab}
          contrast={contrast}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Mobile Navigation Drawer */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeTab={activeTab}
          onNavigateTab={onNavigateTab}
        />

        {/* Right Vertical Chapter Progress Bar */}
        <ChapterProgress
          currentChapter={currentChapter}
          totalChapters={5}
          progress={scrollProgress}
          contrast={contrast}
        />

        {/* Sequential Text Chapters Layer */}
        <CinematicChapter
          progress={scrollProgress}
          contrast={contrast}
          onNavigateTab={onNavigateTab}
          onSelectArticle={onSelectArticle}
        />
      </div>
    </div>
  );
};
