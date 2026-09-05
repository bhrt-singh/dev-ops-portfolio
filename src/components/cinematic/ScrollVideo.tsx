import React from 'react';

interface ScrollVideoProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isLoaded: boolean;
}

export const ScrollVideo: React.FC<ScrollVideoProps> = ({ canvasRef, isLoaded }) => {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#0a0d12',
      zIndex: 0,
      overflow: 'hidden',
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      />
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255, 255, 255, 0.4)',
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
          fontSize: '0.85rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          INITIALIZING CINEMATIC ENVIRONMENT...
        </div>
      )}
    </div>
  );
};
