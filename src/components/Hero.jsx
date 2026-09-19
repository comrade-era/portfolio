import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { FileText, Shield, ChevronRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

const TITLES = [
  'Penetration Tester',
  'VAPT Engineer',
  'CTF Player @ ByteHunters',
  'Founder, Comrade Security',
  'AppSec Specialist',
  'Ethical Hacker',
];

export default function Hero() {
  const typed = useTypingEffect(TITLES, 120, 60, 2200);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アイウエオカキクケコ01アBCDEFGHIJKLMN$#@%&*!?><';
    const charArr = chars.split('');
    const fontSize = 13;
    let cols = Math.floor(canvas.width / fontSize);
    let drops = Array(cols).fill(0).map(() => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = 'rgba(10,10,10,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        const alpha = 0.2 + Math.random() * 0.5;
        ctx.fillStyle = `rgba(0,255,65,${alpha})`;
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5 + Math.random() * 0.5;
      }
      animId = requestAnimationFrame(draw);
    };

    const resizeHandler = () => {
      resize();
      cols = Math.floor(canvas.width / fontSize);
      drops = Array(cols).fill(0).map(() => Math.random() * -100);
    };
    window.addEventListener('resize', resizeHandler);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Matrix canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0, opacity: 0.07 }} />

      {/* Hero ambient glow */}
      <div className="absolute inset-0 hero-glow opacity-40" style={{ zIndex: 1 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center gap-6 order-2 lg:order-1"
          >
            {/* Glowing ring avatar */}
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[#00ff41] border-pulse"
                   style={{ boxShadow: '0 0 30px rgba(0,255,65,0.4), 0 0 60px rgba(0,255,65,0.15)', transform: 'scale(1.06)' }} />
              {/* Profile image */}
              <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-2 border-[rgba(0,255,65,0.5)] relative"
                   style={{ boxShadow: '0 0 40px rgba(0,255,65,0.2)' }}>
                <img
                  src="/profile.jpg"
                  alt="Dev Pandey"
                  className="w-full h-full object-cover object-[center_20%]"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback avatar */}
                <div className="absolute inset-0 bg-[#111] flex-col items-center justify-center hidden">
                  <span className="font-mono text-[#00ff41] text-4xl font-bold">DP</span>
                  <span className="font-mono text-[rgba(0,255,65,0.5)] text-sm mt-1">Dev Pandey</span>
                </div>
              </div>
              {/* Scan line on photo */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                   style={{ background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)' }} />
            </div>

            {/* Available pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-2 bg-[rgba(0,255,65,0.1)] border border-[rgba(0,255,65,0.3)] rounded-full px-4 py-2"
            >
              <div className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
              <span className="font-mono text-[#00ff41] text-sm font-medium">🟢 Available for freelance</span>
            </motion.div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { href: 'https://github.com', icon: <GithubIcon size={18} />, label: 'GitHub' },
                { href: 'https://linkedin.com', icon: <LinkedinIcon size={18} />, label: 'LinkedIn' },
                { href: 'https://medium.com', icon: <FileText size={18} />, label: 'Medium' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                   className="w-10 h-10 flex items-center justify-center rounded-lg border border-[rgba(0,255,65,0.2)] text-gray-400 hover:text-[#00ff41] hover:border-[rgba(0,255,65,0.5)] hover:bg-[rgba(0,255,65,0.08)] transition-all duration-200"
                   aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Text content */}
          <div className="order-1 lg:order-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-gray-400 text-base mb-2"
            >
              <span className="text-[#00ff41]">$</span> whoami
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-sans text-gray-300 text-lg mb-1"
            >
              Hello, I'm
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-mono font-bold text-5xl sm:text-6xl text-[#00ff41] text-glow-lg mb-3 leading-tight"
            >
              Dev Pandey
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-mono text-lg sm:text-xl text-gray-300 mb-2 min-h-[2rem]"
            >
              I'm a{' '}
              <span className="text-[#00ff41] font-semibold">{typed}</span>
              <span className="inline-block w-0.5 h-5 bg-[#00ff41] ml-0.5 animate-pulse align-middle" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-mono text-sm text-[rgba(0,255,65,0.7)] mb-6 italic"
            >
              "Breaking systems ethically, so no one else has to break them maliciously."
            </motion.p>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {['Penetration Testing', 'VAPT', 'AppSec', 'OSINT', 'CTF'].map(tag => (
                <span key={tag} className="tag-green font-mono text-xs px-3 py-1 rounded-full">{tag}</span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => scrollTo('#contact')}
                className="flex items-center gap-2 bg-[#00ff41] text-[#0a0a0a] font-mono font-semibold px-6 py-3 rounded-lg hover:bg-[#00cc33] transition-all hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] text-sm"
              >
                <Shield size={16} />
                Contact Me
              </button>
              <button
                onClick={() => scrollTo('#projects')}
                className="flex items-center gap-2 border border-[rgba(0,255,65,0.4)] text-[#00ff41] font-mono font-semibold px-6 py-3 rounded-lg hover:bg-[rgba(0,255,65,0.08)] transition-all text-sm"
              >
                <ChevronRight size={16} />
                View My Work
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-gray-700 text-gray-300 font-mono font-medium px-6 py-3 rounded-lg hover:border-gray-500 hover:text-white transition-all text-sm"
              >
                <FileText size={16} />
                View Resume
              </a>
            </motion.div>

            {/* Location / contact line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 font-mono text-xs text-gray-500 flex items-center gap-3"
            >
              <span>📍 India</span>
              <span className="text-gray-700">|</span>
              <a href="mailto:devvvpandey20@gmail.com" className="hover:text-[#00ff41] transition-colors">
                devvvpandey20@gmail.com
              </a>
              <span className="text-gray-700">|</span>
              <span>+91-9118688144</span>
            </motion.p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
      >
        <span className="font-mono text-xs text-gray-600 tracking-widest uppercase">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#00ff41] to-transparent" />
      </motion.div>
    </section>
  );
}
