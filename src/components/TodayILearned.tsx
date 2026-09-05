import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { journalArticlesData } from '../data/journalData';
import { Reveal } from './Reveal';
import { Background3D } from './Background3D';

interface TodayILearnedProps {
  onReadArticle: (articleId: string) => void;
}

export const TodayILearned: React.FC<TodayILearnedProps> = ({ onReadArticle }) => {
  const latestTil = journalArticlesData.find(a => a.isTodayILearned) || journalArticlesData[0];

  return (
    <section id="journal" className="zone zone-deep" style={{ padding: '2.5rem 0 3.5rem 0' }}>
      <Background3D variant="stream" intensity={0.7} />
      <div className="container">
        {/* Terminal Frame for Today I Learned Signature Component */}
        <Reveal style={{
          backgroundColor: '#0c0f16',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 10px 35px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(63, 185, 80, 0.05)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Header Bar */}
          <div style={{
            backgroundColor: '#121722',
            borderBottom: '1px solid var(--border-color)',
            padding: '0.65rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-green)',
              }} className="pulse-glow" />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--accent-green)',
                letterSpacing: '0.08em',
              }}>
                TODAY I LEARNED (TIL) • DAILY LOG
              </span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
            }}>
              <Calendar size={13} style={{ color: 'var(--accent-cyan)' }} />
              <span>{latestTil.date}</span>
            </div>
          </div>

          {/* Main Card Content */}
          <div style={{ padding: '1.75rem 1.5rem 1.5rem 1.5rem' }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem',
              letterSpacing: '-0.01em',
            }}>
              {latestTil.title}
            </h3>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.98rem',
              lineHeight: 1.65,
              marginBottom: '1.25rem',
              maxWidth: '780px',
            }}>
              {latestTil.summary}
            </p>

            {/* Tags & Action CTA */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingTop: '1rem',
              borderTop: '1px dashed var(--border-color)',
            }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {latestTil.tags.map(tag => (
                  <span key={tag} className="tag-pill tag-green">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onReadArticle(latestTil.id)}
                className="btn-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.825rem' }}
              >
                <span>Read Today's Entry</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
