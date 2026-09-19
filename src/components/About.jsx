import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
};

function SectionBadge({ children }) {
  return (
    <div className="inline-flex items-center gap-2 bg-[rgba(0,255,65,0.08)] border border-[rgba(0,255,65,0.2)] rounded-full px-4 py-1.5 mb-4">
      <span className="text-[#00ff41] text-sm font-mono">✨ {children}</span>
    </div>
  );
}

function StatCard({ num, label }) {
  return (
    <div className="bg-[#111] border border-[rgba(0,255,65,0.15)] rounded-xl p-5 text-center hover:border-[rgba(0,255,65,0.4)] hover:shadow-[0_0_20px_rgba(0,255,65,0.08)] transition-all">
      <div className="font-mono text-3xl font-bold text-[#00ff41] text-glow mb-1">{num}</div>
      <div className="text-gray-400 text-xs font-mono uppercase tracking-wide">{label}</div>
    </div>
  );
}

function EduCard() {
  return (
    <div className="bg-[#111] border border-[rgba(139,92,246,0.2)] rounded-xl p-5 hover:border-[rgba(139,92,246,0.4)] transition-all">
      <h3 className="font-mono text-purple-400 font-semibold text-sm mb-3 flex items-center gap-2">🎓 Education</h3>
      <div className="relative pl-4 border-l-2 border-purple-500/30">
        <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-purple-500" />
        <p className="font-mono text-white text-sm font-semibold">B.Tech, Computer Science & Engineering</p>
        <p className="text-purple-300 text-xs mt-0.5">KIET Group of Institutions, Delhi-NCR</p>
        <p className="text-gray-500 text-xs mt-0.5">Aug 2023 – Present · SGPA: 8.1</p>
        <p className="text-gray-500 text-xs mt-1 italic">DSA · DBMS · OS · OOP</p>
      </div>
    </div>
  );
}

function CertCard() {
  const certs = [
    { name: 'Google Cybersecurity Professional', date: 'Mar 2025' },
    { name: 'Cyber Security, Palo Alto Networks', date: 'Dec 2024' },
    { name: 'CCNA, Cisco', date: 'Sept 2025' },
    { name: 'Foundation of Threat Hunting, Picus Security', date: 'Jan 2026' },
  ];
  return (
    <div className="bg-[#111] border border-[rgba(0,255,65,0.15)] rounded-xl p-5">
      <h3 className="font-mono text-[#00ff41] font-semibold text-sm mb-3 flex items-center gap-2">🏅 Certifications</h3>
      <div className="space-y-2">
        {certs.map(c => (
          <div key={c.name} className="flex items-start justify-between gap-2">
            <span className="text-gray-300 text-xs flex items-center gap-2">
              <span className="text-[#00ff41] text-[10px]">✓</span>{c.name}
            </span>
            <span className="text-gray-500 text-xs whitespace-nowrap">{c.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExpCard({ title, org, period, desc, color = 'teal' }) {
  const colors = {
    teal: 'border-teal-500/20 hover:border-teal-500/40 text-teal-400',
    purple: 'border-purple-500/20 hover:border-purple-500/40 text-purple-400',
    green: 'border-green-500/20 hover:border-green-500/40 text-[#00ff41]',
  };
  return (
    <div className={`bg-[#111] border ${colors[color]} rounded-xl p-5 transition-all hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]`}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className={`font-mono font-semibold text-sm ${colors[color].split(' ').pop()}`}>{title}</p>
          <p className="text-gray-400 text-xs">{org}</p>
        </div>
        <span className="font-mono text-gray-500 text-xs whitespace-nowrap">{period}</span>
      </div>
      <p className="text-gray-300 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <SectionBadge>About Me</SectionBadge>
          <h2 className="font-mono text-4xl sm:text-5xl font-bold text-white">
            Building{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #06b6d4, #00ff41)' }}>
              Secure
            </span>{' '}
            Systems
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 mb-10">
          {/* Terminal card — bio */}
          <motion.div
            variants={fadeUp} custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            <div className="terminal-window h-full border-glow">
              <div className="terminal-header">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="font-mono text-gray-500 text-xs ml-2">~/about_me.sh</span>
              </div>
              <div className="p-6">
                <p className="font-mono text-[#00ff41] text-xs mb-3">$ cat about.txt</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  <span className="text-[#00ff41] font-semibold">Dev Pandey</span> — Cybersecurity Engineer specializing in{' '}
                  <span className="text-cyan-400 font-medium">VAPT & Application Security</span>. I break web applications and infrastructure for a living — then help teams build defenses that actually hold up.
                </p>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Founder of <span className="text-purple-400 font-medium">Comrade Security</span>, ranked CTF competitor with{' '}
                  <span className="text-yellow-400 font-medium">ByteHunters</span>, and a freelance pentester who's found{' '}
                  <span className="text-red-400 font-semibold">19 vulnerabilities</span> (3 high/critical) in real paid engagements.
                </p>
                <p className="font-mono text-[#00ff41] text-xs mb-3 mt-5">$ cat tags.txt</p>
                <div className="flex flex-wrap gap-2">
                  {['VAPT', 'AppSec', 'OSINT', 'Blue Team', 'CTF Player'].map(t => (
                    <span key={t} className="tag-green font-mono text-xs px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp} custom={2} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-4"
          >
            <p className="font-mono text-[#00ff41] text-xs">⚡ Quick Stats</p>
            <div className="grid grid-cols-2 gap-4">
              <StatCard num="4" label="Certifications" />
              <StatCard num="2+" label="Years Experience" />
              <StatCard num="3+" label="Major Projects" />
              <StatCard num="4" label="Leadership Roles" />
            </div>
          </motion.div>
        </div>

        {/* Education + Certs row */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <motion.div variants={fadeUp} custom={3} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <EduCard />
          </motion.div>
          <motion.div variants={fadeUp} custom={4} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <CertCard />
          </motion.div>
        </div>

        {/* Professional Experience */}
        <motion.div variants={fadeUp} custom={5} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mb-8">
          <h3 className="font-mono text-gray-400 text-xs mb-4 flex items-center gap-2">
            <span className="text-[#00ff41]">💼</span> PROFESSIONAL EXPERIENCE
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <ExpCard
              title="Freelance Penetration Tester"
              org="Independent"
              period="Feb 2024 – Present"
              color="teal"
              desc="Conducted paid independent penetration tests on live web applications; identified 19 vulnerabilities, including 3 high/critical-severity findings, via manual parameter tampering and business-logic abuse testing."
            />
            <ExpCard
              title="OSINT Case Analysis"
              org="Independent Private Investigations"
              period="Ongoing"
              color="teal"
              desc="Solved 3+ real-world OSINT investigations using ethical, public-source methodology."
            />
          </div>
        </motion.div>

        {/* Leadership */}
        <motion.div variants={fadeUp} custom={6} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <h3 className="font-mono text-gray-400 text-xs mb-4 flex items-center gap-2">
            <span className="text-purple-400">🧑‍🤝‍🧑</span> POSITIONS & LEADERSHIP
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <ExpCard
              title="Founder"
              org="Comrade Security"
              period="Apr 2024 – Present"
              color="purple"
              desc="Train members via workshops, mentorship, and hackathon prep; produce cybersecurity content on an active YouTube channel (5+ hrs of content)."
            />
            <ExpCard
              title="Competitive CTF Player"
              org="ByteHunters (internationally ranked)"
              period="Jun 2025 – Present"
              color="purple"
              desc="31st worldwide / 450+ teams — H7CTF 2025. Rank 23 in India, OWASP Hacker's Gambit 2025 (38/40 solved). Top 10 — ZeroDay CTF 2025."
            />
            <ExpCard
              title="Lead Organizer"
              org="CyberSecX · MythX CTF · CyberQuest"
              period="Nov 2024 – Mar 2026"
              color="purple"
              desc="Directed end-to-end operations for CTFs serving 2,000+ participants; authored OSINT, crypto, and attack-sim challenges."
            />
            <ExpCard
              title="Club Coordinator"
              org="Cyber Peace Centre"
              period="Oct 2023 – Present"
              color="purple"
              desc="Coordinated workshops/hackathons across 10+ institutions, reaching 600+ students, +30% participation."
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
