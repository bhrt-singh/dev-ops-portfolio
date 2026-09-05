import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, Copy, Check, Hash, Terminal } from 'lucide-react';
import { journalArticlesData } from '../data/journalData';

interface JournalArticleProps {
  articleId: string;
  onBack: () => void;
  onSelectArticle: (id: string) => void;
}

export const JournalArticleView: React.FC<JournalArticleProps> = ({ articleId, onBack, onSelectArticle }) => {
  const article = journalArticlesData.find(a => a.id === articleId) || journalArticlesData[0];
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const currentIndex = journalArticlesData.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? journalArticlesData[currentIndex - 1] : null;
  const nextArticle = currentIndex < journalArticlesData.length - 1 ? journalArticlesData[currentIndex + 1] : null;

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <article style={{ padding: '2.5rem 0 4rem 0' }}>
      <div className="container">
        {/* Back navigation button */}
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'none',
            border: 'none',
            color: 'var(--accent-cyan)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            cursor: 'pointer',
            marginBottom: '2rem',
          }}
        >
          <ArrowLeft size={16} />
          <span>&lt; Back to Journal List</span>
        </button>

        {/* Article Layout Grid (Main content + Sidebar TOC) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 260px',
          gap: '3rem',
          alignItems: 'start',
        }} className="article-grid">

          {/* Left: Article Main Body */}
          <div>
            {/* Header Metadata */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              marginBottom: '0.75rem',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Calendar size={14} style={{ color: 'var(--accent-green)' }} />
                {article.date}
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={14} style={{ color: 'var(--accent-cyan)' }} />
                {article.readTime}
              </span>
            </div>

            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: '1.25rem',
              letterSpacing: '-0.02em',
            }}>
              {article.title}
            </h1>

            {/* Tag List */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {article.tags.map(tag => (
                <span key={tag} className="tag-pill tag-green">
                  #{tag}
                </span>
              ))}
            </div>

            <div style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }} />

            {/* Article Sections */}

            {/* 1. What Happened */}
            <section id="what-happened" style={{ marginBottom: '2.25rem' }}>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Hash size={18} /> What Happened?
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.975rem' }}>
                {article.content.whatHappened}
              </p>
            </section>

            {/* 2. Investigation */}
            <section id="investigation" style={{ marginBottom: '2.25rem' }}>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Hash size={18} /> Investigation &amp; Diagnostics
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.975rem' }}>
                {article.content.investigation}
              </p>
            </section>

            {/* 3. Root Cause */}
            <section id="root-cause" style={{ marginBottom: '2.25rem' }}>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Hash size={18} /> Root Cause Analysis
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.975rem' }}>
                {article.content.rootCause}
              </p>
            </section>

            {/* 4. Solution */}
            <section id="solution" style={{ marginBottom: '2.25rem' }}>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Hash size={18} /> Solution &amp; Fix
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.975rem' }}>
                {article.content.solution}
              </p>
            </section>

            {/* 5. Commands Executed (Terminal Code Window) */}
            <section id="commands" style={{ marginBottom: '2.25rem' }}>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Terminal size={18} style={{ color: 'var(--accent-green)' }} /> Terminal Commands
              </h2>
              <div className="terminal-window" style={{ marginBottom: '1rem' }}>
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <span className="terminal-title">┌─ bash ─┐</span>
                  <button
                    onClick={() => handleCopyCode(article.content.commands.join('\n'), 999)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    title="Copy all commands"
                  >
                    {copiedIndex === 999 ? <Check size={14} style={{ color: 'var(--accent-green)' }} /> : <Copy size={14} />}
                  </button>
                </div>
                <div className="terminal-body" style={{ backgroundColor: '#090c10' }}>
                  {article.content.commands.map((cmd, idx) => (
                    <div key={idx} style={{ color: 'var(--accent-green)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                      {cmd}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 6. Lessons & Next Steps */}
            <section id="lessons" style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Hash size={18} /> Lessons Learned &amp; Next Steps
              </h2>
              <div style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '1rem',
              }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  Key Takeaway:
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  {article.content.whatILearned}
                </p>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                <span>Next up for investigation: </span>
                <span style={{ color: 'var(--accent-cyan)' }}>{article.content.nextSteps}</span>
              </div>
            </section>

            {/* Bottom Prev / Next Article Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border-color)',
            }}>
              {prevArticle ? (
                <button
                  onClick={() => onSelectArticle(prevArticle.id)}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>← PREVIOUS ENTRY</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '0.2rem' }}>{prevArticle.title}</div>
                </button>
              ) : <div />}

              {nextArticle && (
                <button
                  onClick={() => onSelectArticle(nextArticle.id)}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    textAlign: 'right',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>NEXT ENTRY →</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '0.2rem' }}>{nextArticle.title}</div>
                </button>
              )}
            </div>
          </div>

          {/* Right Sidebar: Article Table of Contents */}
          <div style={{
            position: 'sticky',
            top: '84px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
          }} className="article-toc">
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--accent-green)',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}>
              Table of Contents
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.825rem', fontFamily: 'var(--font-mono)' }}>
              <a href="#what-happened" style={{ color: 'var(--text-secondary)' }}>1. What Happened</a>
              <a href="#investigation" style={{ color: 'var(--text-secondary)' }}>2. Investigation</a>
              <a href="#root-cause" style={{ color: 'var(--text-secondary)' }}>3. Root Cause</a>
              <a href="#solution" style={{ color: 'var(--text-secondary)' }}>4. Solution &amp; Fix</a>
              <a href="#commands" style={{ color: 'var(--text-secondary)' }}>5. Commands</a>
              <a href="#lessons" style={{ color: 'var(--text-secondary)' }}>6. Lessons Learned</a>
            </nav>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .article-grid {
            grid-template-columns: 1fr !important;
          }
          .article-toc {
            display: none !important;
          }
        }
      `}</style>
    </article>
  );
};
