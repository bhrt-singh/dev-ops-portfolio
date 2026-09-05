import React from 'react';

const VIDEO_404_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260801_001207_ec20d138-aa45-4b2b-ab8c-bdc71607f240.mp4';

interface Scroll404VideoProps {
  opacity: number;
  prefersReducedMotion?: boolean;
}

export const Scroll404Video: React.FC<Scroll404VideoProps> = ({ opacity, prefersReducedMotion }) => {
  return (
    <video
      src={VIDEO_404_URL}
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity,
        transition: prefersReducedMotion ? 'opacity 0.3s ease' : 'none',
        pointerEvents: 'none',
      }}
    />
  );
};
