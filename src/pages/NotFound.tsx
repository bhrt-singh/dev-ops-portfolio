import React from 'react';
import { profileData } from '../data/profileData';
import './NotFound.css';

const VIDEO_404_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260801_001207_ec20d138-aa45-4b2b-ab8c-bdc71607f240.mp4';

export const NotFound: React.FC = () => {
  return (
    <div className="cinematic-404-container">
      {/* Native Autoplay Background Video */}
      <video
        className="cinematic-404-video"
        src={VIDEO_404_URL}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Brand Mark Header (Clickable to return Home) */}
      <a href="/" className="cinematic-404-brand" aria-label={`${profileData.name} - Return Home`}>
        <span className="cinematic-404-brand-symbol">&gt;</span>
        <span>{profileData.name}</span>
      </a>

      {/* Centered Content */}
      <div className="cinematic-404-content">
        <h1 className="cinematic-404-title">404</h1>
        <div className="cinematic-404-divider" aria-hidden="true" />
        <p className="cinematic-404-message">
          The path may be broken, but the journey isn&apos;t. Let&apos;s get you back.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
