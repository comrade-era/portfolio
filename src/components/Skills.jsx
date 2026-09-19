import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckSquare } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
};

const skillCategories = [
  {
    title: 'Security & Testing',
    icon: '🛡',
    skills: [
      'VAPT', 'Penetration Testing', 'AppSec', 'OWASP Top 10 & ASVS',
      'SAST/DAST', 'Threat Modeling', 'Vulnerability Management',
      'Risk Assessment', 'CVE Analysis', 'API Security', 'Network Security',
      'Secure Coding', 'OSINT', 'Blue Team Ops', 'ISO 27001/SOC 2'
    ],
    color: 'green',
  },
  {
    title: 'Languages & Frameworks',
    icon: '⌨',
    skills: ['Python', 'JavaScript', 'SQL', 'C++', 'Bash', 'Django', 'FastAPI', 'Node.js', 'REST APIs'],
    color: 'cyan',
  },
  {
    title: 'Infrastructure & Databases',
    icon: '☁',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'CI/CD', 'Git'],
    color: 'blue',
  },
];

const redTools = ['Burp Suite', 'Metasploit', 'SQLMap', 'Nmap', 'Postman'];
const blueTools = ['Wazuh', 'Splunk', 'Snort', 'YARA', 'Maltego', 'Nessus', 'Qualys', 'OpenVAS'];
const certs = [
  'Google Cybersecurity Professional',
  'Cyber Security — Palo Alto Networks',
  'CCNA — Cisco',
  'Foundation of Threat Hunting — Picus Security',
];

const colorMap = {
  green: { tag: 'tag-green', border: 'border-[rgba(0,255,65,0.2)] hover:border-[rgba(0,255,65,0.4)]', head: 'text-[#00ff41]' },
  cyan:  { tag: 'tag-teal',  border: 'border-[rgba(20,184,166,0.2)] hover:border-[rgba(20,184,166,0.4)]', head: 'text-teal-400' },
  blue:  { tag: 'tag-blue',  border: 'border-[rgba(59,130,246,0.2)] hover:border-[rgba(59,130,246,0.4)]', head: 'text-blue-400' },
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[rgba(0,255,65,0.08)] border border-[rgba(0,255,65,0.2)] rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#00ff41] text-sm font-mono">✨ Technical Skills</span>
          </div>
          <h2 className="font-mono text-4xl sm:text-5xl font-bold text-white">
            Skills &{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #00ff41, #06b6d4)' }}>
              Expertise
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
          {/* Left — skill categories */}
          <div className="space-y-5">
            {skillCategories.map((cat, i) => {
              const c = colorMap[cat.color];
              return (
                <motion.div
                  key={cat.title}
                  variants={fadeUp} custom={i + 1} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                  className={`bg-[#111] border ${c.border} rounded-xl p-5 transition-all`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <CheckSquare size={15} className={c.head} />
                    <h3 className={`font-mono text-sm font-semibold ${c.head}`}>{cat.title}</h3>
                    <span className="text-base">{cat.icon}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map(s => (
                      <span key={s} className={`${c.tag} font-mono text-xs px-3 py-1 rounded-full`}>{s}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">
            {/* Red Team tools */}
            <motion.div
              variants={fadeUp} custom={4} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="bg-[#111] border border-[rgba(239,68,68,0.2)] hover:border-[rgba(239,68,68,0.4)] rounded-xl p-5 transition-all"
            >
              <h3 className="font-mono text-red-400 text-sm font-semibold mb-3 flex items-center gap-2">🔴 Red Teaming Tools</h3>
              <div className="flex flex-wrap gap-2">
                {redTools.map(t => (
                  <span key={t} className="tag-red font-mono text-xs px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </motion.div>

            {/* Blue Team tools */}
            <motion.div
              variants={fadeUp} custom={5} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="bg-[#111] border border-[rgba(59,130,246,0.2)] hover:border-[rgba(59,130,246,0.4)] rounded-xl p-5 transition-all"
            >
              <h3 className="font-mono text-blue-400 text-sm font-semibold mb-3 flex items-center gap-2">🔵 Blue Teaming Tools</h3>
              <div className="flex flex-wrap gap-2">
                {blueTools.map(t => (
                  <span key={t} className="tag-blue font-mono text-xs px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </motion.div>

            {/* Verified certs */}
            <motion.div
              variants={fadeUp} custom={6} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="bg-[#111] border border-[rgba(0,255,65,0.15)] rounded-xl p-5"
            >
              <h3 className="font-mono text-[#00ff41] text-sm font-semibold mb-3">🏅 Verified Credentials</h3>
              <div className="space-y-2">
                {certs.map(c => (
                  <div key={c} className="flex items-center gap-2 text-xs text-gray-300">
                    <span className="text-[#00ff41] text-[10px]">✓</span>
                    {c}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
