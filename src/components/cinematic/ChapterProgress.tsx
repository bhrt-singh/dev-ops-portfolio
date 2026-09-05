import React from 'react';

interface ChapterProgressProps {
  currentChapter: number;
  totalChapters: number;
  progress: number; // 0 to 1
  contrast: 'light' | 'dark';
}

export const ChapterProgress: React.FC<ChapterProgressProps> = ({
  currentChapter,
  totalChapters,
  progress,
  contrast,
}) => {
  const isLight = contrast === 'light';
  const color = isLight ? '#1D3045' : '#FFFFFF';
  const trackColor = isLight ? 'rgba(29, 48, 69, 0.15)' : 'rgba(255, 255, 255, 0.15)';

  return (
    <div
      style={{
        position: 'absolute',
        right: '3rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        transition: 'color 0.4s ease',
        fontFamily: '"Helvetica Neue ME", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
      className="cinematic-progress-container"
    >
      {/* Chapter Counter */}
      <div
        style={{
          fontSize: '0.7rem',
          fontWeight: 500,
          letterSpacing: '0.2em',
          color: color,
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          transition: 'color 0.4s ease',
        }}
      >
        0{currentChapter} / 0{totalChapters}
      </div>

      {/* Vertical Progress Bar */}
      <div
        style={{
          width: '2px',
          height: '100px',
          backgroundColor: trackColor,
          position: 'relative',
          borderRadius: '1px',
          overflow: 'hidden',
          transition: 'background-color 0.4s ease',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: `${Math.min(100, Math.max(0, progress * 100))}%`,
            backgroundColor: color,
            transition: 'height 0.1s linear, background-color 0.4s ease',
          }}
        />
      </div>

      {/* Circle Control Indicator */}
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          border: `1.5px solid ${color}`,
          backgroundColor: progress >= 0.99 ? color : 'transparent',
          transition: 'border-color 0.4s ease, background-color 0.4s ease',
        }}
      />

      <style>{`
        @media (max-width: 768px) {
          .cinematic-progress-container {
            right: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};
