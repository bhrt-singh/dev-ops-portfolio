import React, { useState } from 'react';
import { Search, Clock, ArrowRight, Tag } from 'lucide-react';
import { journalArticlesData } from '../data/journalData';

interface JournalListProps {
  onSelectArticle: (articleId: string) => void;
}

export const JournalList: React.FC<JournalListProps> = ({ onSelectArticle }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const allTags = Array.from(new Set(journalArticlesData.flatMap(a => a.tags)));

  const filteredArticles = journalArticlesData.filter(article => {
    const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;
    const matchesSearch = searchTerm
      ? article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesTag && matchesSearch;
  });

  return (
    <section className="zone zone-deep" style={{ padding: '1rem 0 4rem 0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">
            <span style={{ color: 'var(--accent-green)' }}>//</span> ENGINEERING LOGS
          </div>
          <h2 className="section-title">DAILY JOURNAL &amp; TIL</h2>
          <p className="section-desc">
            Documenting real troubleshooting incidents, infrastructure bugs, technology discoveries, and architectural solutions.
          </p>
        </div>

        {/* Filter Toolbar (Search input + Tag pills) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          marginBottom: '2rem',
        }}>
          {/* Search bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.5rem 0.85rem',
          }}>
            <Search size={16} style={{ color: 'var(--accent-green)' }} />
            <input
              type="text"
              placeholder="Search journal entries by keyword or problem..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
              }}
            />
          </div>

          {/* Tags list */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Tag size={12} /> Filter Tag:
            </span>
            <button
              onClick={() => setSelectedTag(null)}
              className={`tag-pill ${selectedTag === null ? 'tag-green' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              [ All Posts ]
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`tag-pill ${selectedTag === tag ? 'tag-green' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Table / Row List View */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article.id)}
              className="lab-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                cursor: 'pointer',
                borderLeft: article.isTodayILearned ? '3px solid var(--accent-green)' : '1px solid var(--border-color)',
              }}
            >
              {/* Row Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                  }}>
                    {article.date}
                  </span>
                  {article.isTodayILearned && (
                    <span style={{
                      backgroundColor: 'rgba(63, 185, 80, 0.15)',
                      color: 'var(--accent-green)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '0.1rem 0.4rem',
                      borderRadius: '3px',
                    }}>
                      TODAY I LEARNED
                    </span>
                  )}
                </div>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}>
                  <Clock size={12} />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Title & Summary */}
              <div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.35rem',
                }}>
                  {article.title}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: 1.55,
                }}>
                  {article.summary}
                </p>
              </div>

              {/* Footer Row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '0.25rem',
              }}>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {article.tags.map(t => (
                    <span key={t} className="tag-pill">
                      #{t}
                    </span>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  color: 'var(--accent-green)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}>
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}

          {filteredArticles.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}>
              No journal entries found matching criteria.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
