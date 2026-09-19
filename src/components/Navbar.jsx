import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';

const navLinks = [
  { label: 'Home',     icon: '🏠', href: '#hero' },
  { label: 'About',    icon: '👤', href: '#about' },
  { label: 'Projects', icon: '💼', href: '#projects' },
  { label: 'Skills',   icon: '<>', href: '#skills' },
  { label: 'Certs',    icon: '🎓', href: '#certs' },
  { label: 'Writings', icon: '✍', href: '#writings' },
  { label: 'Contact',  icon: '✉', href: '#contact' },
];

function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toTimeString().slice(0, 8));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-mono text-xs text-green-400 tabular-nums">{time}</span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[rgba(0,255,65,0.15)] shadow-[0_4px_30px_rgba(0,255,65,0.05)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#hero"
              onClick={e => { e.preventDefault(); scrollTo('#hero'); }}
              className="font-mono text-[#00ff41] font-bold text-lg tracking-wide hover:text-glow transition-all"
            >
              ❯_ ./dev.sh
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                    active === link.href.slice(1)
                      ? 'text-[#00ff41] bg-[rgba(0,255,65,0.08)]'
                      : 'text-gray-400 hover:text-[#00ff41] hover:bg-[rgba(0,255,65,0.05)]'
                  }`}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3">
              <LiveClock />
              <div className="flex items-center gap-1.5 bg-[rgba(0,255,65,0.1)] border border-[rgba(0,255,65,0.3)] rounded-full px-3 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse" />
                <span className="font-mono text-[#00ff41] text-xs font-semibold tracking-widest">SECURE</span>
              </div>
              <button
                className="lg:hidden"
                onClick={() => setOpen(!open)}
              >
                {open ? <X size={20} className="text-[#00ff41]" /> : <Menu size={20} className="text-[#00ff41]" />}
              </button>
            </div>

            {/* Mobile hamburger */}
            <button className="lg:hidden" onClick={() => setOpen(!open)}>
              {open ? <X size={22} className="text-[#00ff41]" /> : <Menu size={22} className="text-gray-300" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/98 backdrop-blur-xl pt-20 flex flex-col items-center gap-2 lg:hidden"
          >
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="w-full max-w-xs py-3 px-6 text-left font-mono text-gray-300 hover:text-[#00ff41] hover:bg-[rgba(0,255,65,0.05)] rounded-lg transition-all flex items-center gap-3 text-base"
              >
                <span>{link.icon}</span> {link.label}
              </button>
            ))}
            <div className="mt-4 flex items-center gap-3">
              <LiveClock />
              <div className="flex items-center gap-1.5 bg-[rgba(0,255,65,0.1)] border border-[rgba(0,255,65,0.3)] rounded-full px-3 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse" />
                <span className="font-mono text-[#00ff41] text-xs font-semibold tracking-widest">SECURE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
