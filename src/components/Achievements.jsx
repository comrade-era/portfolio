import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: 'easeOut' }
  })
};

const ACHIEVEMENTS = [
  { icon: '🏛', title: 'Smart India Hackathon', sub: '2024 & 2025 Qualifier', color: 'green' },
  { icon: '🏆', title: '11+ Hackathons Won', sub: 'Dataverse · Innotech · Others', color: 'amber' },
  { icon: '💡', title: 'IdeaTex Winner', sub: 'Pitching Competition', color: 'purple' },
  { icon: '🎯', title: 'Top 10% TryHackMe', sub: 'Global Ranking', color: 'red' },
  { icon: '💻', title: '100+ DSA Problems', sub: 'Solved & Documented', color: 'blue' },
  { icon: '🕷', title: 'PortSwigger Academy', sub: 'Practitioner Level', color: 'orange' },
];

const colMap = {
  green: 'border-[rgba(0,255,65,0.2)] hover:border-[rgba(0,255,65,0.5)] text-[#00ff41] bg-[rgba(0,255,65,0.05)]',
  amber: 'border-[rgba(245,158,11,0.2)] hover:border-[rgba(245,158,11,0.5)] text-amber-400 bg-[rgba(245,158,11,0.05)]',
  purple: 'border-[rgba(139,92,246,0.2)] hover:border-[rgba(139,92,246,0.5)] text-purple-400 bg-[rgba(139,92,246,0.05)]',
  red: 'border-[rgba(239,68,68,0.2)] hover:border-[rgba(239,68,68,0.5)] text-red-400 bg-[rgba(239,68,68,0.05)]',
  blue: 'border-[rgba(59,130,246,0.2)] hover:border-[rgba(59,130,246,0.5)] text-blue-400 bg-[rgba(59,130,246,0.05)]',
  orange: 'border-[rgba(249,115,22,0.2)] hover:border-[rgba(249,115,22,0.5)] text-orange-400 bg-[rgba(249,115,22,0.05)]',
};

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="achievements" ref={ref} className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-8"
        >
          <h2 className="font-mono text-2xl font-bold text-white">
            🏅 Achievements &{' '}
            <span className="text-[#00ff41]">Highlights</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.title}
              variants={fadeUp} custom={i + 1} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className={`${colMap[a.color]} border rounded-xl p-4 text-center flex flex-col items-center gap-2 transition-all hover:-translate-y-1 cursor-default`}
            >
              <span className="text-2xl">{a.icon}</span>
              <p className="font-mono text-xs font-semibold leading-tight">{a.title}</p>
              <p className="text-gray-500 text-[10px] leading-tight">{a.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
