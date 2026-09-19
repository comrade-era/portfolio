import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, ChevronRight, Clock } from 'lucide-react';
import { YoutubeIcon } from './SocialIcons';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
};

const MEDIUM_POSTS = [
  {
    title: 'How I Found 3 High-Severity Vulnerabilities in a Real Web App',
    excerpt: 'A deep-dive into manual parameter tampering, business-logic abuse, and the report writing process for a paid penetration test.',
    readTime: '8 min read',
    tag: 'VAPT',
    tagColor: 'tag-red',
    href: 'https://medium.com',
  },
  {
    title: 'OSINT Investigations: 3 Real-World Case Studies',
    excerpt: 'Breaking down how I solved three private OSINT cases using only publicly available data and ethical methodology.',
    readTime: '6 min read',
    tag: 'OSINT',
    tagColor: 'tag-blue',
    href: 'https://medium.com',
  },
  {
    title: 'CTF Writeup: OWASP Hacker\'s Gambit 2025 — 38/40 Challenges',
    excerpt: 'Ranked 23rd in India. Detailed writeups for the hardest OSINT, crypto, and web exploitation challenges in the competition.',
    readTime: '12 min read',
    tag: 'CTF',
    tagColor: 'tag-purple',
    href: 'https://medium.com',
  },
  {
    title: 'Building NeuraSecure: A Patent-Filed Threat Intelligence Pipeline',
    excerpt: 'How we built a real-time threat data processing system with 87.65% classification accuracy using Naive Bayes and Python.',
    readTime: '10 min read',
    tag: 'Research',
    tagColor: 'tag-teal',
    href: 'https://medium.com',
  },
];

const YOUTUBE_VIDEOS = [
  {
    title: 'Web Application Penetration Testing — Full Walkthrough',
    channel: 'Comrade Security',
    duration: '1h 12m',
    views: '2.3K views',
    thumb: null,
    href: 'https://youtube.com',
  },
  {
    title: 'OSINT Masterclass: Finding People & Data Ethically',
    channel: 'Comrade Security',
    duration: '58m',
    views: '1.8K views',
    thumb: null,
    href: 'https://youtube.com',
  },
  {
    title: 'CTF Beginner\'s Guide: From Zero to First Solve',
    channel: 'Comrade Security',
    duration: '45m',
    views: '3.1K views',
    thumb: null,
    href: 'https://youtube.com',
  },
];

function MediumCard({ post, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.a
      ref={ref}
      href={post.href} target="_blank" rel="noopener noreferrer"
      variants={fadeUp} custom={index} initial="hidden" animate={inView ? 'visible' : 'hidden'}
      className="bg-[#111] border border-gray-800 hover:border-[rgba(0,255,65,0.3)] rounded-xl p-5 flex flex-col gap-3
                 hover:shadow-[0_0_20px_rgba(0,255,65,0.06)] hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between">
        <span className={`${post.tagColor} font-mono text-[10px] px-2.5 py-0.5 rounded-full`}>{post.tag}</span>
        <span className="text-gray-600 text-[10px] font-mono flex items-center gap-1">
          <Clock size={10} /> {post.readTime}
        </span>
      </div>
      <h3 className="font-mono text-white text-sm font-semibold leading-snug group-hover:text-[#00ff41] transition-colors">{post.title}</h3>
      <p className="text-gray-400 text-xs leading-relaxed flex-1">{post.excerpt}</p>
      <span className="font-mono text-[#00ff41] text-xs flex items-center gap-1 mt-auto">
        Read More <ChevronRight size={12} />
      </span>
    </motion.a>
  );
}

function YoutubeCard({ video, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.a
      ref={ref}
      href={video.href} target="_blank" rel="noopener noreferrer"
      variants={fadeUp} custom={index} initial="hidden" animate={inView ? 'visible' : 'hidden'}
      className="bg-[#111] border border-gray-800 hover:border-[rgba(239,68,68,0.3)] rounded-xl overflow-hidden
                 hover:shadow-[0_0_20px_rgba(239,68,68,0.08)] hover:-translate-y-1 transition-all duration-300 group"
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-[#1a1a1a] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent" />
        <div className="relative z-10 w-14 h-14 rounded-full bg-red-600/80 flex items-center justify-center
                        group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(239,68,68,0.4)]">
          <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[14px] border-t-transparent border-b-transparent border-l-white ml-1" />
        </div>
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </div>
      <div className="p-4">
        <p className="font-mono text-white text-xs font-semibold leading-snug mb-1 group-hover:text-red-400 transition-colors">
          {video.title}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-red-400 text-[10px] font-mono flex items-center gap-1">
            <YoutubeIcon size={10} /> {video.channel}
          </span>
          <span className="text-gray-500 text-[10px] font-mono">{video.views}</span>
        </div>
      </div>
    </motion.a>
  );
}

export default function Writings() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="writings" ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[rgba(0,255,65,0.08)] border border-[rgba(0,255,65,0.2)] rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#00ff41] text-sm font-mono">✍ Writings & Content</span>
          </div>
          <h2 className="font-mono text-4xl sm:text-5xl font-bold text-white">
            Articles &{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #00ff41, #f87171)' }}>
              Videos
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Medium articles */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <FileText size={16} className="text-gray-400" />
              <h3 className="font-mono text-gray-300 text-sm font-semibold">Medium Articles</h3>
            </div>
            <div className="grid gap-4">
              {MEDIUM_POSTS.map((post, i) => (
                <MediumCard key={post.title} post={post} index={i} />
              ))}
            </div>
          </div>

          {/* YouTube videos */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <YoutubeIcon size={16} className="text-red-400" />
              <h3 className="font-mono text-gray-300 text-sm font-semibold">
                Comrade Security — YouTube
                <span className="ml-2 text-gray-500 text-xs font-normal">(5+ hrs of content)</span>
              </h3>
            </div>
            <div className="grid gap-4">
              {YOUTUBE_VIDEOS.map((v, i) => (
                <YoutubeCard key={v.title} video={v} index={i} />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          variants={fadeUp} custom={8} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="flex justify-center mt-10"
        >
          <a href="https://medium.com" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 border border-[rgba(0,255,65,0.3)] text-[#00ff41] font-mono text-sm px-6 py-3 rounded-lg hover:bg-[rgba(0,255,65,0.08)] transition-all">
            <ChevronRight size={16} /> Explore All Writings
          </a>
        </motion.div>
      </div>
    </section>
  );
}
