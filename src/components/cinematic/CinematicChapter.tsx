import React from 'react';
import { profileData } from '../../data/profileData';
import { projectsData } from '../../data/projectsData';
import { journalArticlesData } from '../../data/journalData';

interface CinematicChapterProps {
  progress: number; // 0 to 1
  contrast: 'light' | 'dark';
  onNavigateTab: (tab: string) => void;
  onSelectArticle: (articleId: string) => void;
}

// Calculate strict sequential opacity for chapter N out of 5
function getChapterOpacity(progress: number, index: number): number {
  // Index 0: 0.00 - 0.20
  // Index 1: 0.20 - 0.40
  // Index 2: 0.40 - 0.60
  // Index 3: 0.60 - 0.80
  // Index 4: 0.80 - 1.00
  const start = index * 0.2;
  const end = (index + 1) * 0.2;
  
  if (progress < start || progress > end) return 0;
  
  const fadeInWindow = 0.04;
  const fadeOutWindow = 0.04;
  
  if (progress < start + fadeInWindow) {
    return (progress - start) / fadeInWindow;
  }
  if (progress > end - fadeOutWindow) {
    return (end - progress) / fadeOutWindow;
  }
  return 1;
}

export const CinematicChapter: React.FC<CinematicChapterProps> = ({
  progress,
  contrast,
  onNavigateTab,
  onSelectArticle,
}) => {
  const isLight = contrast === 'light';
  const textColor = isLight ? '#1D3045' : '#FFFFFF';
  const dimColor = isLight ? 'rgba(29, 48, 69, 0.75)' : 'rgba(255, 255, 255, 0.75)';
  const borderBtnColor = isLight ? '#1D3045' : '#FFFFFF';

  // Latest TIL article
  const latestTil = journalArticlesData.find((a) => a.isTodayILearned) || journalArticlesData[0];
  const featuredProjects = projectsData.slice(0, 3);

  // Chapter opacities
  const op0 = getChapterOpacity(progress, 0);
  const op1 = getChapterOpacity(progress, 1);
  const op2 = getChapterOpacity(progress, 2);
  const op3 = getChapterOpacity(progress, 3);
  const op4 = getChapterOpacity(progress, 4);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 20,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        fontFamily: '"Helvetica Neue ME", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      {/* CHAPTER 1: HERO / IDENTITY */}
      <div
        style={{
          position: 'absolute',
          maxWidth: '900px',
          width: '100%',
          opacity: op0,
          pointerEvents: op0 > 0.1 ? 'auto' : 'none',
          transition: 'opacity 0.2s ease, color 0.4s ease',
          textAlign: 'center',
          color: textColor,
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: dimColor,
            display: 'block',
            marginBottom: '1.25rem',
          }}
        >
          CHAPTER 01 /// IDENTITY
        </span>
        
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 200,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
          }}
        >
          {profileData.name}
        </h1>
        
        <p
          style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.25rem)',
            fontWeight: 300,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: dimColor,
            marginBottom: '2.5rem',
          }}
        >
          {profileData.role}
        </p>
        
        <p
          style={{
            fontSize: '1rem',
            fontWeight: 300,
            lineHeight: 1.8,
            maxWidth: '620px',
            margin: '0 auto 3rem auto',
            color: textColor,
          }}
        >
          {profileData.bio}
        </p>

        {/* Primary & Secondary CTAs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => onNavigateTab('projects')}
            style={{
              background: 'transparent',
              border: `1px solid ${borderBtnColor}`,
              color: textColor,
              padding: '0.85rem 2rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            EXPLORE MY WORK
          </button>
          
          <button
            onClick={() => onNavigateTab('journal')}
            style={{
              background: 'transparent',
              border: 'none',
              color: dimColor,
              padding: '0.85rem 1.5rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
            }}
          >
            READ MY JOURNAL →
          </button>
        </div>
      </div>

      {/* CHAPTER 2: ENGINEERING APPROACH */}
      <div
        style={{
          position: 'absolute',
          maxWidth: '850px',
          width: '100%',
          opacity: op1,
          pointerEvents: op1 > 0.1 ? 'auto' : 'none',
          transition: 'opacity 0.2s ease, color 0.4s ease',
          textAlign: 'center',
          color: textColor,
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: dimColor,
            display: 'block',
            marginBottom: '1.5rem',
          }}
        >
          CHAPTER 02 /// ENGINEERING APPROACH
        </span>

        <h2
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 200,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            lineHeight: 1.2,
            marginBottom: '2rem',
          }}
        >
          &quot;{profileData.philosophyQuote}&quot;
        </h2>

        <p
          style={{
            fontSize: '1.1rem',
            fontWeight: 300,
            lineHeight: 1.8,
            maxWidth: '650px',
            margin: '0 auto',
            color: dimColor,
          }}
        >
          {profileData.philosophyText}
        </p>
      </div>

      {/* CHAPTER 3: PROJECTS */}
      <div
        style={{
          position: 'absolute',
          maxWidth: '960px',
          width: '100%',
          opacity: op2,
          pointerEvents: op2 > 0.1 ? 'auto' : 'none',
          transition: 'opacity 0.2s ease, color 0.4s ease',
          textAlign: 'center',
          color: textColor,
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: dimColor,
            display: 'block',
            marginBottom: '1.25rem',
          }}
        >
          CHAPTER 03 /// SELECTED SYSTEMS
        </span>

        <h2
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 200,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '2.5rem',
          }}
        >
          PROVEN INFRASTRUCTURE
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            textAlign: 'left',
          }}
        >
          {featuredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => onNavigateTab('projects')}
              style={{
                border: `1px solid ${isLight ? 'rgba(29, 48, 69, 0.25)' : 'rgba(255, 255, 255, 0.2)'}`,
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
                backgroundColor: isLight ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <span
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: dimColor,
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                {p.category}
              </span>
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  color: textColor,
                  marginBottom: '0.75rem',
                }}
              >
                {p.name}
              </h3>
              <p
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: dimColor,
                }}
              >
                {p.shortDescription}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CHAPTER 4: LEARNING / TODAY I LEARNED */}
      <div
        style={{
          position: 'absolute',
          maxWidth: '850px',
          width: '100%',
          opacity: op3,
          pointerEvents: op3 > 0.1 ? 'auto' : 'none',
          transition: 'opacity 0.2s ease, color 0.4s ease',
          textAlign: 'center',
          color: textColor,
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: dimColor,
            display: 'block',
            marginBottom: '1.25rem',
          }}
        >
          CHAPTER 04 /// TODAY I LEARNED
        </span>

        <h2
          style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 200,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}
        >
          CONTINUOUS DISCOVERY
        </h2>

        {latestTil && (
          <div
            onClick={() => onSelectArticle(latestTil.id)}
            style={{
              border: `1px solid ${isLight ? 'rgba(29, 48, 69, 0.3)' : 'rgba(255, 255, 255, 0.25)'}`,
              padding: '2rem',
              cursor: 'pointer',
              textAlign: 'left',
              margin: '0 auto',
              maxWidth: '700px',
              backgroundColor: isLight ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: dimColor }}>
                {latestTil.date}
              </span>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: dimColor }}>
                {latestTil.readTime}
              </span>
            </div>
            <h3
              style={{
                fontSize: '1.2rem',
                fontWeight: 400,
                color: textColor,
                marginBottom: '0.75rem',
                letterSpacing: '0.02em',
              }}
            >
              {latestTil.title}
            </h3>
            <p style={{ fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.7, color: dimColor, marginBottom: '1.25rem' }}>
              {latestTil.summary}
            </p>
            <span style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: textColor }}>
              READ DISCOVERY →
            </span>
          </div>
        )}
      </div>

      {/* CHAPTER 5: JOURNEY & PORTFOLIO */}
      <div
        style={{
          position: 'absolute',
          maxWidth: '850px',
          width: '100%',
          opacity: op4,
          pointerEvents: op4 > 0.1 ? 'auto' : 'none',
          transition: 'opacity 0.2s ease, color 0.4s ease',
          textAlign: 'center',
          color: textColor,
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: dimColor,
            display: 'block',
            marginBottom: '1.25rem',
          }}
        >
          CHAPTER 05 /// JOURNEY & PORTFOLIO
        </span>

        <h2
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 200,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            lineHeight: 1.2,
            marginBottom: '2rem',
          }}
        >
          EXPLORE THE FULL PROFILE
        </h2>

        <p
          style={{
            fontSize: '1.05rem',
            fontWeight: 300,
            lineHeight: 1.8,
            maxWidth: '600px',
            margin: '0 auto 2.5rem auto',
            color: dimColor,
          }}
        >
          Scroll down to inspect detailed system architectures, lab configurations, journey milestones, and technical journal notes.
        </p>

        <button
          onClick={() => onNavigateTab('about')}
          style={{
            background: 'transparent',
            border: `1px solid ${borderBtnColor}`,
            color: textColor,
            padding: '0.85rem 2.25rem',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          CONTINUE TO PORTFOLIO ↓
        </button>
      </div>
    </div>
  );
};
