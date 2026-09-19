import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: 'easeOut' }
  })
};

const CERTS = [
  { name: 'Google Cybersecurity Professional Certificate', issuer: 'Google', date: 'Mar 2025', color: 'blue' },
  { name: 'Cyber Security', issuer: 'Palo Alto Networks', date: 'Dec 2024', color: 'orange' },
  { name: 'CCNA', issuer: 'Cisco', date: 'Sept 2025', color: 'teal' },
  { name: 'Foundation of Threat Hunting', issuer: 'Picus Security', date: 'Jan 2026', color: 'purple' },
];

const colors = {
  blue: { border: 'border-blue-500/20 hover:border-blue-500/40', badge: 'text-blue-400 bg-blue-500/10' },
  orange: { border: 'border-orange-500/20 hover:border-orange-500/40', badge: 'text-orange-400 bg-orange-500/10' },
  teal: { border: 'border-teal-500/20 hover:border-teal-500/40', badge: 'text-teal-400 bg-teal-500/10' },
  purple: { border: 'border-purple-500/20 hover:border-purple-500/40', badge: 'text-purple-400 bg-purple-500/10' },
};

export default function Certs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certs" ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[rgba(0,255,65,0.08)] border border-[rgba(0,255,65,0.2)] rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#00ff41] text-sm font-mono">🎓 Certifications</span>
          </div>
          <h2 className="font-mono text-4xl sm:text-5xl font-bold text-white">
            Credentials &{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #00ff41, #06b6d4)' }}>
              Badges
            </span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTS.map((cert, i) => {
            const c = colors[cert.color];
            return (
              <motion.div
                key={cert.name}
                variants={fadeUp} custom={i + 1} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                className={`bg-[#111] border ${c.border} rounded-xl p-5 flex flex-col gap-4 transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] relative overflow-hidden`}
              >
                {/* Corner glow */}
                <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full opacity-20"
                     style={{ background: `radial-gradient(circle, currentColor, transparent)` }} />

                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${c.badge} border border-current/30`}>
                  <Award size={22} />
                </div>
                <div>
                  <h3 className="font-mono text-white font-semibold text-sm leading-snug mb-1">{cert.name}</h3>
                  <p className={`font-mono text-xs ${c.badge.split(' ')[0]}`}>{cert.issuer}</p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-mono text-gray-500 text-xs">{cert.date}</span>
                  <span className="flex items-center gap-1 text-[#00ff41] text-xs font-mono bg-[rgba(0,255,65,0.08)] border border-[rgba(0,255,65,0.2)] rounded-full px-2 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse" />
                    Active
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
