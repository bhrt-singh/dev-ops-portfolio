import React, { useState } from 'react';
import { ExternalLink, ArrowRight, FolderGit2 } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import type { Project } from '../data/projectsData';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';
import { Reveal } from './Reveal';
import { TiltCard } from './TiltCard';
import { Background3D } from './Background3D';

interface ProjectsSectionProps {
  limit?: number;
  initialCategory?: string;
  onSelectProject?: (projectId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  limit,
  initialCategory = 'All',
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Infrastructure', 'DevOps', 'Monitoring', 'Networking'];

  const filteredProjects = projectsData.filter(project => {
    if (activeCategory === 'All') return true;
    return project.category === activeCategory;
  });

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  const handleOpenDetail = (project: Project) => {
    if (onSelectProject) {
      onSelectProject(project.id);
    }
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="zone zone-elevated" style={{ padding: '3rem 0 4.5rem 0' }}>
      <Background3D variant="containers" intensity={0.75} />
      <div className="container-wide">
        {/* Section Title */}
        <div className="section-header">
          <div className="section-label">
            <span style={{ color: 'var(--accent-green)' }}>//</span> LAB REPOSITORIES
          </div>
          <h2 className="section-title">FEATURED PROJECTS</h2>
          <p className="section-desc">
            Production-grade infrastructure automation, observability stacks, container pipelines, and custom DevOps utilities.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
        }}>
          {categories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  backgroundColor: isActive ? 'var(--accent-green-bright)' : 'var(--bg-card)',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  border: isActive ? '1px solid var(--accent-green)' : '1px solid var(--border-color)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                [ {cat} ]
              </button>
            );
          })}
        </div>

        {/* Projects Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: limit ? 'repeat(auto-fill, minmax(320px, 1fr))' : 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem',
        }}>
          {displayedProjects.map((project, i) => (
            <Reveal key={project.id} index={i}>
              <TiltCard
                className="lab-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
              <div>
                {/* Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--accent-green)',
                  }}>
                    <FolderGit2 size={16} />
                    <span>{project.category}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: 'var(--text-secondary)' }}
                      title="GitHub Repository"
                      onClick={e => e.stopPropagation()}
                    >
                      <GithubIcon size={16} />
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--accent-cyan)' }}
                        title="Live Demo"
                        onClick={e => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}>
                  {project.name}
                </h3>

                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: 1.55,
                  marginBottom: '1.25rem',
                }}>
                  {project.shortDescription}
                </p>
              </div>

              <div>
                {/* Tech Pills */}
                <div style={{
                  display: 'flex',
                  gap: '0.4rem',
                  flexWrap: 'wrap',
                  marginBottom: '1.25rem',
                }}>
                  {project.tags.map(t => (
                    <span key={t} className="tag-pill">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Details Trigger Button */}
                <button
                  onClick={() => handleOpenDetail(project)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    padding: '0.55rem',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent-green)';
                    e.currentTarget.style.color = 'var(--accent-green)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  <span>View Project Details</span>
                  <ArrowRight size={14} />
                </button>
              </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
