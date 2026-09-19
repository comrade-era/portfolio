import { Shield, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-[rgba(0,255,65,0.15)] bg-[#070707] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <Shield size={15} className="text-[#00ff41]" />
          <span>© 2026 — Dev Pandey</span>
          <span className="text-[#00ff41] bg-[rgba(0,255,65,0.1)] border border-[rgba(0,255,65,0.25)] rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wider">
            [PROTECTED]
          </span>
        </div>

        {/* Center / Right links */}
        <div className="flex items-center gap-6 text-xs font-mono">
          <button
            onClick={() => scrollTo('#contact')}
            className="text-gray-400 hover:text-[#00ff41] transition-colors"
          >
            Contact
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#00ff41] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#00ff41] transition-colors"
          >
            LinkedIn
          </a>
          <button
            onClick={() => scrollTo('#hero')}
            aria-label="Back to top"
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-[rgba(0,255,65,0.2)] text-gray-400 hover:text-[#00ff41] hover:border-[rgba(0,255,65,0.5)] hover:bg-[rgba(0,255,65,0.08)] transition-all ml-2"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
