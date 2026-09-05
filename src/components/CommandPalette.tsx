import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText, FolderGit2, Cpu, ArrowRight, X, Terminal } from 'lucide-react';
import { journalArticlesData } from '../data/journalData';
import { projectsData } from '../data/projectsData';
import { stackData } from '../data/stackData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (articleId: string) => void;
  onSelectProject: (projectId: string) => void;
  onSelectTab: (tabId: string) => void;
  onOpenInspect?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  onSelectProject,
  onSelectTab,
  onOpenInspect,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          const searchBtn = document.querySelector('[title*="Search command palette"]') as HTMLButtonElement;
          searchBtn?.click();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const lowerQuery = query.toLowerCase().trim();

  // Navigation Items
  const navSuggestions = [
    { id: 'home', label: 'Go to Home', icon: Terminal },
    { id: 'journal', label: 'Browse Journal & Daily TIL', icon: FileText },
    { id: 'projects', label: 'View DevOps Projects', icon: FolderGit2 },
    { id: 'lab', label: 'Explore Lab & Stack', icon: Cpu },
    { id: 'inspect', label: 'inspect --system-architecture', icon: Terminal },
    { id: '404', label: 'View 404 System Error Page', icon: Terminal },
  ].filter(item => item.label.toLowerCase().includes(lowerQuery));

  // Journal Items
  const matchingArticles = journalArticlesData.filter(article =>
    article.title.toLowerCase().includes(lowerQuery) ||
    article.summary.toLowerCase().includes(lowerQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );

  // Project Items
  const matchingProjects = projectsData.filter(project =>
    project.name.toLowerCase().includes(lowerQuery) ||
    project.shortDescription.toLowerCase().includes(lowerQuery) ||
    project.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );

  // Stack Items
  const matchingStack = stackData.flatMap(group =>
    group.items.filter(item => item.name.toLowerCase().includes(lowerQuery))
  );

  return (
    <div className="cmd-backdrop" onClick={onClose}>
      <div className="cmd-modal" onClick={e => e.stopPropagation()}>
        {/* Search Input Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--border-color)',
        }}>
          <Search size={18} style={{ color: 'var(--accent-green)' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search engineering notes, projects, docker, linux, sip..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.95rem',
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Results List */}
        <div style={{
          maxHeight: '380px',
          overflowY: 'auto',
          padding: '0.75rem',
        }}>
          {/* Quick Tags Suggestions if query is empty */}
          {!query && (
            <div style={{ padding: '0.5rem 0.5rem 1rem 0.5rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Quick Tag Search:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['docker', 'kubernetes', 'linux', 'sip', 'observability', 'terraform', 'nginx'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="tag-pill"
                    style={{ cursor: 'pointer' }}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Section */}
          {navSuggestions.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', padding: '0.25rem 0.5rem', textTransform: 'uppercase' }}>
                Navigation
              </div>
              {navSuggestions.map(nav => {
                const IconComponent = nav.icon;
                return (
                  <div
                    key={nav.id}
                    onClick={() => {
                      if (nav.id === 'inspect') {
                        if (onOpenInspect) onOpenInspect();
                      } else {
                        onSelectTab(nav.id);
                      }
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.6rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      transition: 'background var(--transition-fast)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <IconComponent size={16} style={{ color: 'var(--accent-green)' }} />
                      <span style={{ fontSize: '0.875rem' }}>{nav.label}</span>
                    </div>
                    <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Journal Articles */}
          {matchingArticles.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', padding: '0.25rem 0.5rem', textTransform: 'uppercase' }}>
                Journal & TIL Entries ({matchingArticles.length})
              </div>
              {matchingArticles.map(article => (
                <div
                  key={article.id}
                  onClick={() => {
                    onSelectArticle(article.id);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {article.title}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
                      {article.date} • {article.readTime}
                    </div>
                  </div>
                  <ArrowRight size={14} style={{ color: 'var(--accent-cyan)' }} />
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {matchingProjects.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', padding: '0.25rem 0.5rem', textTransform: 'uppercase' }}>
                Projects ({matchingProjects.length})
              </div>
              {matchingProjects.map(project => (
                <div
                  key={project.id}
                  onClick={() => {
                    onSelectProject(project.id);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {project.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {project.shortDescription}
                    </div>
                  </div>
                  <ArrowRight size={14} style={{ color: 'var(--accent-green)' }} />
                </div>
              ))}
            </div>
          )}

          {/* Stack Match */}
          {matchingStack.length > 0 && (
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', padding: '0.25rem 0.5rem', textTransform: 'uppercase' }}>
                Tech Stack Matches
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', padding: '0.5rem' }}>
                {matchingStack.map(st => (
                  <span key={st.name} className="tag-pill tag-green">
                    {st.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {query && navSuggestions.length === 0 && matchingArticles.length === 0 && matchingProjects.length === 0 && matchingStack.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              No notes or projects found for &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer info */}
        <div style={{
          padding: '0.65rem 1.25rem',
          backgroundColor: '#0e1117',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.725rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
        }}>
          <span>Press ESC to exit</span>
          <span>DEV OPS LAB COMMAND PALETTE</span>
        </div>
      </div>
    </div>
  );
};
