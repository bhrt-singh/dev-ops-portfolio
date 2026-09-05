import React from 'react';
import { X, ExternalLink, Cpu } from 'lucide-react';
import type { Project } from '../data/projectsData';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="cmd-backdrop" onClick={onClose}>
      <div
        className="cmd-modal"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <div style={{
          backgroundColor: '#121620',
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Cpu size={18} style={{ color: 'var(--accent-green)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-green)' }}>
              PROJECT SPECIFICATION
            </span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Content Body */}
        <div style={{ padding: '1.75rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            {project.name}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            {project.longDescription}
          </p>

          {/* Technology Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {project.tags.map(tag => (
              <span key={tag} className="tag-pill tag-green">
                {tag}
              </span>
            ))}
          </div>

          <div style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }} />

          {/* Key Features */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem' }}>
              // KEY ARCHITECTURE FEATURES
            </h4>
            <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {project.features.map((feat, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture Overview */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-green)', marginBottom: '0.5rem' }}>
              // INFRASTRUCTURE FLOW
            </h4>
            <div style={{
              backgroundColor: '#090c10',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.85rem 1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.825rem',
              color: 'var(--accent-green)',
            }}>
              {project.architectureOverview}
            </div>
          </div>

          {/* Challenges & Lessons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.75rem' }}>
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              padding: '1rem',
              borderRadius: 'var(--radius-sm)',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-amber)', marginBottom: '0.35rem' }}>
                CHALLENGES OVERCOME
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {project.challenges}
              </p>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              padding: '1rem',
              borderRadius: 'var(--radius-sm)',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)', marginBottom: '0.35rem' }}>
                KEY LESSON LEARNED
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {project.lessonsLearned}
              </p>
            </div>
          </div>

          {/* Action Links */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-primary">
              <GithubIcon size={16} />
              <span>View Source Code on GitHub</span>
            </a>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                <ExternalLink size={16} style={{ color: 'var(--accent-cyan)' }} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
