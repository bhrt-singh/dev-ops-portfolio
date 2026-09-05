import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Copy, Check } from 'lucide-react';
import { profileData } from '../data/profileData';

interface TerminalHeroProps {
  onNavigateTab?: (tab: string) => void;
}

export const TerminalHero: React.FC<TerminalHeroProps> = ({ onNavigateTab }) => {
  const [copied, setCopied] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [history, setHistory] = useState<Array<{ cmd: string; output: string | React.ReactNode }>>([
    { cmd: 'whoami', output: 'devops-engineer' },
    {
      cmd: 'cat current_focus.txt',
      output: (
        <div style={{ color: 'var(--accent-cyan)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem 1rem' }}>
          <div>• Linux</div>
          <div>• Docker</div>
          <div>• Kubernetes</div>
          <div>• Observability</div>
          <div>• Networking</div>
          <div>• SIP</div>
          <div>• Automation</div>
          <div>• Cloud</div>
        </div>
      )
    },
    { cmd: 'echo $STATUS', output: profileData.status },
    { cmd: 'uptime', output: profileData.uptime },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleCopyTerminal = () => {
    const textContent = `whoami: devops-engineer\nfocus: Linux, Docker, Kubernetes, Observability, Networking, SIP, Automation, Cloud\nstatus: ${profileData.status}\nuptime: ${profileData.uptime}`;
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = commandInput.trim();
    if (!trimmed) return;

    let output: string | React.ReactNode = '';
    const cmd = trimmed.toLowerCase();

    if (cmd === 'clear') {
      setHistory([]);
      setCommandInput('');
      return;
    } else if (cmd === 'help') {
      output = (
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Available commands: <span style={{ color: 'var(--accent-green)' }}>whoami</span>, <span style={{ color: 'var(--accent-green)' }}>cat current_focus.txt</span>, <span style={{ color: 'var(--accent-green)' }}>echo $STATUS</span>, <span style={{ color: 'var(--accent-green)' }}>uptime</span>, <span style={{ color: 'var(--accent-green)' }}>projects</span>, <span style={{ color: 'var(--accent-green)' }}>til</span>, <span style={{ color: 'var(--accent-green)' }}>contact</span>, <span style={{ color: 'var(--accent-green)' }}>clear</span>
        </div>
      );
    } else if (cmd === 'whoami') {
      output = 'devops-engineer';
    } else if (cmd.includes('current_focus') || cmd.includes('focus')) {
      output = 'Linux • Docker • Kubernetes • Observability • Networking • SIP • Automation • Cloud';
    } else if (cmd.includes('status')) {
      output = profileData.status;
    } else if (cmd === 'uptime') {
      output = profileData.uptime;
    } else if (cmd === 'projects') {
      output = 'Opening Featured DevOps Projects...';
      if (onNavigateTab) onNavigateTab('projects');
    } else if (cmd === 'til' || cmd === 'journal') {
      output = 'Opening Daily Learning Journal...';
      if (onNavigateTab) onNavigateTab('journal');
    } else if (cmd === 'contact') {
      output = `Email: ${profileData.socials.email} | GitHub: ${profileData.socials.github}`;
    } else {
      output = `zsh: command not found: ${trimmed}. Type 'help' for available commands.`;
    }

    setHistory(prev => [...prev, { cmd: trimmed, output }]);
    setCommandInput('');
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="terminal-window" style={{ width: '100%' }}>
      {/* Terminal Title Bar */}
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <div className="terminal-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <TerminalIcon size={14} style={{ color: 'var(--accent-green)' }} />
          <span>┌─ {profileData.handle} ─┐</span>
        </div>
        <button
          onClick={handleCopyTerminal}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.2rem',
            borderRadius: 'var(--radius-sm)',
            transition: 'color var(--transition-fast)',
          }}
          title="Copy terminal summary"
        >
          {copied ? <Check size={14} style={{ color: 'var(--accent-green)' }} /> : <Copy size={14} />}
        </button>
      </div>

      {/* Terminal Content Body */}
      <div className="terminal-body">
        {history.map((item, index) => (
          <div key={index} style={{ marginBottom: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>$</span>
              <span style={{ fontWeight: 500 }}>{item.cmd}</span>
            </div>
            <div style={{ color: 'var(--text-secondary)', marginTop: '0.2rem', paddingLeft: '1rem' }}>
              {item.output}
            </div>
          </div>
        ))}

        {/* Interactive CLI Prompt */}
        <form onSubmit={handleCommandSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>$</span>
          <input
            type="text"
            value={commandInput}
            onChange={e => setCommandInput(e.target.value)}
            placeholder="type 'help', 'projects', 'cat current_focus.txt'..."
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
            }}
          />
          <span className="animate-blink" style={{
            display: 'inline-block',
            width: '8px',
            height: '16px',
            backgroundColor: 'var(--accent-green)',
          }}></span>
        </form>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
