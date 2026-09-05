import React from 'react';

interface TechIconProps {
  name: string;
  brandColor?: string;
  size?: number;
  active?: boolean;
}

export const TechIcon: React.FC<TechIconProps> = ({
  name,
  brandColor = '#38bdf8',
  size = 18,
  active = false
}) => {
  const iconContainerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${size}px`,
    height: `${size}px`,
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    filter: active ? 'none' : 'grayscale(0.35) opacity(0.75)',
    transform: active ? 'scale(1.08)' : 'scale(1)',
    flexShrink: 0,
  };

  const renderSvgContent = () => {
    switch (name) {
      case 'Linux':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="3" fill={`${brandColor}15`} />
            <path d="M9 9l3 3-3 3" />
            <path d="M13 15h3" />
          </svg>
        );
      case 'Fedora':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" fill={`${brandColor}15`} />
            <path d="M12 7v10" />
            <path d="M8 11h8" />
          </svg>
        );
      case 'Ubuntu':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill={brandColor}>
            <circle cx="12" cy="12" r="9" fill="none" stroke={brandColor} strokeWidth="1.8"/>
            <circle cx="12" cy="6" r="2.2"/>
            <circle cx="6.8" cy="15" r="2.2"/>
            <circle cx="17.2" cy="15" r="2.2"/>
          </svg>
        );
      case 'Docker':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill={brandColor}>
            <rect x="3" y="13" width="3" height="3" rx="0.5" />
            <rect x="7" y="13" width="3" height="3" rx="0.5" />
            <rect x="11" y="13" width="3" height="3" rx="0.5" />
            <rect x="7" y="9" width="3" height="3" rx="0.5" />
            <rect x="11" y="9" width="3" height="3" rx="0.5" />
            <rect x="15" y="13" width="3" height="3" rx="0.5" />
            <path d="M2 17c2 2 6 2 9 2s9-1 11-4c-1 0-3 .5-4.5 0-1.5-.5-2.5-1.5-3.5-1.5H2z" fill={brandColor} />
          </svg>
        );
      case 'Podman':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="2">
            <polygon points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5" fill={`${brandColor}20`} />
            <circle cx="12" cy="12" r="3" fill={brandColor} />
          </svg>
        );
      case 'Kubernetes':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="1.8">
            <polygon points="12 2 20 6.5 20 15.5 12 20 4 15.5 4 6.5" fill={`${brandColor}15`} />
            <circle cx="12" cy="11" r="2.5" fill={brandColor} />
            <line x1="12" y1="2" x2="12" y2="8.5" />
            <line x1="20" y1="6.5" x2="14" y2="10" />
            <line x1="20" y1="15.5" x2="14" y2="12" />
            <line x1="12" y1="20" x2="12" y2="13.5" />
            <line x1="4" y1="15.5" x2="10" y2="12" />
            <line x1="4" y1="6.5" x2="10" y2="10" />
          </svg>
        );
      case 'Prometheus':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 3c-3 4-6 6.5-6 10a6 6 0 0 0 12 0c0-3.5-3-6-6-10z" fill={`${brandColor}25`} />
            <path d="M12 8c-1.5 2-3 3.5-3 5.5a3 3 0 0 0 6 0c0-2-1.5-3.5-3-5.5z" fill={brandColor} />
          </svg>
        );
      case 'Grafana':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="2">
            <circle cx="12" cy="12" r="8" fill={`${brandColor}15`} />
            <path d="M12 6a6 6 0 0 1 6 6" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="12" cy="12" r="2.2" fill={brandColor} />
          </svg>
        );
      case 'Loki':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="1.8" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill={`${brandColor}15`} />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="13" x2="16" y2="13" />
            <line x1="8" y1="17" x2="13" y2="17" />
          </svg>
        );
      case 'OpenTelemetry':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" fill={`${brandColor}15`} />
            <polygon points="12 6 16 14 8 14" fill={brandColor} fillOpacity="0.6" />
            <circle cx="12" cy="12" r="2" fill={brandColor} />
          </svg>
        );
      case 'NGINX':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 21 7 21 17 12 22 3 17 3 7" fill={`${brandColor}15`} />
            <path d="M9 16V8l6 8V8" strokeWidth="2" />
          </svg>
        );
      case 'HAProxy':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" fill={`${brandColor}15`} />
            <path d="M8 12h8M12 8v8" strokeWidth="2" />
            <path d="M8 8l8 8" />
          </svg>
        );
      case 'DNS':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" fill={`${brandColor}15`} />
            <ellipse cx="12" cy="12" rx="4" ry="9" />
            <line x1="3" y1="12" x2="21" y2="12" />
          </svg>
        );
      case 'TCP/IP':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="1.8" strokeLinecap="round">
            <rect x="3" y="4" width="18" height="6" rx="2" fill={`${brandColor}15`} />
            <rect x="3" y="14" width="18" height="6" rx="2" fill={`${brandColor}15`} />
            <line x1="8" y1="10" x2="8" y2="14" strokeWidth="2" />
            <line x1="16" y1="10" x2="16" y2="14" strokeWidth="2" />
          </svg>
        );
      case 'SIP':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="1.8" strokeLinecap="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill={`${brandColor}15`} />
          </svg>
        );
      case 'Bash':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="4" width="18" height="16" rx="2" fill={`${brandColor}15`} strokeWidth="1.5" />
            <polyline points="7 15 11 11 7 7" />
            <line x1="13" y1="15" x2="17" y2="15" />
          </svg>
        );
      case 'Python':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill={brandColor}>
            <path d="M12 2C6.5 2 6 3.5 6 5.5V8h6v1H5C3 9 2 10.5 2 13.5s1.5 4.5 3.5 4.5H7v-2.5c0-1.5 1-2.5 2.5-2.5h5c1.5 0 2.5 1 2.5 2.5V18h1c2 0 3.5-1.5 3.5-4.5s-1.5-4.5-3.5-4.5H18V6.5C18 3.5 16.5 2 12 2zm-2.5 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" opacity="0.9" />
            <path d="M12 22c5.5 0 6-1.5 6-3.5V16h-6v-1h7c2 0 3-1.5 3-4.5S20.5 6 18.5 6H17v2.5c0 1.5-1 2.5-2.5 2.5h-5C8 11 7 12 7 13.5V14H6c-2 0-3.5 1.5-3.5 4.5S4 22 6 22h6zm2.5-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
          </svg>
        );
      case 'Ansible':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" fill={`${brandColor}15`} />
            <path d="M12 6l-5 12h3.5l1.5-3.5h4L17 18" />
          </svg>
        );
      case 'Terraform':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill={brandColor}>
            <polygon points="3 4 10.5 8.3 10.5 16.7 3 12.4" opacity="0.8" />
            <polygon points="11.5 8.3 19 4 19 12.4 11.5 16.7" fillOpacity="0.9" />
            <polygon points="11.5 17.7 19 13.4 19 21.8 11.5 26.1" transform="translate(0, -8)" />
          </svg>
        );
      case 'GitHub Actions':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="1.8" strokeLinecap="round">
            <circle cx="6" cy="6" r="3" fill={`${brandColor}20`} />
            <circle cx="6" cy="18" r="3" fill={`${brandColor}20`} />
            <circle cx="18" cy="12" r="3" fill={`${brandColor}20`} />
            <path d="M6 9v6" />
            <path d="M9 6h4a5 5 0 0 1 5 5" />
          </svg>
        );
      case 'GitLab CI':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill={brandColor}>
            <polygon points="12 21 21 14 18 3 14 3 12 9 10 3 6 3 3 14" />
          </svg>
        );
      case 'Jenkins':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="1.8" strokeLinecap="round">
            <rect x="4" y="6" width="16" height="12" rx="2" fill={`${brandColor}15`} />
            <path d="M12 10v4" />
            <path d="M10 12h4" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={brandColor} strokeWidth="1.8">
            <circle cx="12" cy="12" r="8" />
          </svg>
        );
    }
  };

  return <span style={iconContainerStyle}>{renderSvgContent()}</span>;
};
