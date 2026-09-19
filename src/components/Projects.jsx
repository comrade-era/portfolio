import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
};

const FILTERS = ['All', 'Red Teaming', 'Blue Teaming', 'Research', 'AppSec'];

const PROJECTS = [
  {
    id: 1,
    name: 'NeuraSecure',
    subtitle: 'Real-Time Threat Data Processing System (Patent App.)',
    date: 'Sept 2025',
    category: 'Blue Teaming',
    status: 'Completed',
    featured: true,
    tags: ['AI', 'Blue Teaming', 'Python'],
    tagColor: 'blue',
    desc: 'Real-time web crawler + Naive Bayes classification pipeline achieving 87.65% accuracy in filtering and clustering high-volume threat-intel feeds. Methodology formalized into a published patent application (App. No. 202511038881).',
    github: '#',
    demo: '#',
  },
  {
    id: 2,
    name: 'DefaceGuard',
    subtitle: 'Content Integrity Gate & Rollback System',
    date: 'Dec 2025',
    category: 'Blue Teaming',
    status: 'Completed',
    featured: true,
    tags: ['Blue Teaming', 'Python/FastAPI', 'Node.js'],
    tagColor: 'blue',
    desc: 'Defense-in-depth Content Gate intercepting file/DB mutations for signed, time-bound owner approval; Notary & Snapshot Store with hash-tree manifests for tamper-evident rollback; host Guard Agent (FIM + OS hardening) quarantines compromised accounts and streams logs to SIEM.',
    github: '#',
    demo: '#',
  },
  {
    id: 3,
    name: 'Dark Web in India: A Modern Catalyst for Cybercrime',
    subtitle: 'Research Paper',
    date: 'In Progress',
    category: 'Research',
    status: 'Ongoing',
    featured: false,
    progress: 60,
    tags: ['OSINT', 'Research'],
    tagColor: 'purple',
    desc: 'Studying how Telegram and similar public channels function as accessible dark-web equivalents in India, mapping fraud, data leaks, and illicit trade.',
    github: null,
    demo: null,
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const tagColors = {
    blue: 'tag-blue',
    green: 'tag-green',
    purple: 'tag-purple',
    red: 'tag-red',
    teal: 'tag-teal',
    amber: 'tag-amber',
  };

  return (
    <motion.div
      ref={ref}
      variants={fadeUp} custom={index} initial="hidden" animate={inView ? 'visible' : 'hidden'}
      className="bg-[#111] border border-[rgba(0,255,65,0.15)] rounded-xl p-5 flex flex-col gap-4
                 hover:border-[rgba(0,255,65,0.35)] hover:shadow-[0_0_30px_rgba(0,255,65,0.08)]
                 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
    >
      {/* Top glow line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {project.featured && (
              <span className="tag-green font-mono text-[10px] px-2 py-0.5 rounded-full">Featured</span>
            )}
            <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
              project.status === 'Ongoing' ? 'tag-amber' : 'tag-teal'
            }`}>
              {project.status}
            </span>
          </div>
          <h3 className="font-mono text-white font-semibold text-sm leading-snug">{project.name}</h3>
          <p className="text-gray-500 text-xs mt-0.5">{project.subtitle} · {project.date}</p>
        </div>
        {(project.github || project.demo) && (
          <div className="flex gap-2 shrink-0">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                 className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:text-[#00ff41] hover:border-[rgba(0,255,65,0.4)] transition-all">
                <GithubIcon size={14} />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                 className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:text-[#00ff41] hover:border-[rgba(0,255,65,0.4)] transition-all">
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        )}
      </div>

      <p className="text-gray-400 text-xs leading-relaxed flex-1">{project.desc}</p>

      {/* Progress bar for WIP */}
      {project.progress != null && (
        <div>
          <div className="flex justify-between text-xs font-mono text-gray-500 mb-1">
            <span>Progress</span><span className="text-[#00ff41]">{project.progress}%</span>
          </div>
          <div className="h-1.5 bg-[rgba(0,255,65,0.1)] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${project.progress}%` } : { width: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#00cc33] to-[#00ff41] rounded-full"
            />
          </div>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map(tag => (
          <span key={tag} className={`${tagColors[project.tagColor] || 'tag-green'} font-mono text-[10px] px-2.5 py-0.5 rounded-full`}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [filter, setFilter] = useState('All');

  const filtered = PROJECTS.filter(p => filter === 'All' || p.category === filter);

  return (
    <section id="projects" ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-[rgba(0,255,65,0.08)] border border-[rgba(0,255,65,0.2)] rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#00ff41] text-sm font-mono">💼 Projects</span>
          </div>
          <h2 className="font-mono text-4xl sm:text-5xl font-bold text-white">
            Featured{' '}
            <span className="text-[#00ff41] text-glow">Work</span>
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          variants={fadeUp} custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs px-4 py-2 rounded-full border transition-all ${
                filter === f
                  ? 'border-[rgba(0,255,65,0.5)] bg-[rgba(0,255,65,0.1)] text-[#00ff41]'
                  : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all button */}
        <motion.div
          variants={fadeUp} custom={5} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex justify-center mt-10"
        >
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 border border-[rgba(0,255,65,0.3)] text-[#00ff41] font-mono text-sm px-6 py-3 rounded-lg hover:bg-[rgba(0,255,65,0.08)] transition-all">
            <ChevronRight size={16} /> View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
}
