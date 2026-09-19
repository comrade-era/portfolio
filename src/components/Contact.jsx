import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, FileText, Lock, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
};

const CONTACT_METHODS = [
  { icon: <Mail size={18} />, label: 'Email', value: 'devvvpandey20@gmail.com', href: 'mailto:devvvpandey20@gmail.com', color: 'green' },
  { icon: <GithubIcon size={18} />, label: 'GitHub', value: 'github.com/devpandey', href: 'https://github.com', color: 'gray' },
  { icon: <LinkedinIcon size={18} />, label: 'LinkedIn', value: 'linkedin.com/in/devpandey', href: 'https://linkedin.com', color: 'blue' },
  { icon: <FileText size={18} />, label: 'Medium', value: 'medium.com/@devpandey', href: 'https://medium.com', color: 'teal' },
];

const colMap = {
  green: 'text-[#00ff41] bg-[rgba(0,255,65,0.1)] border-[rgba(0,255,65,0.2)]',
  gray: 'text-gray-400 bg-gray-800/50 border-gray-700/50',
  blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  teal: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
};

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => { setStatus('idle'); e.target.reset(); }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[rgba(0,255,65,0.08)] border border-[rgba(0,255,65,0.2)] rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#00ff41] text-sm font-mono">✉ Contact</span>
          </div>
          <h2 className="font-mono text-4xl sm:text-5xl font-bold text-white">
            Let's{' '}
            <span className="text-[#00ff41] text-glow">Connect</span>
          </h2>
          <p className="text-gray-400 text-sm mt-3 max-w-lg mx-auto">Have a project, question, or want to collaborate? Drop me a message.</p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10">
          {/* Left — info */}
          <motion.div
            variants={fadeUp} custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-4"
          >
            <div className="terminal-window border-glow">
              <div className="terminal-header">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="font-mono text-gray-500 text-xs ml-2">~/contact_info.sh</span>
              </div>
              <div className="p-4">
                <p className="font-mono text-[#00ff41] text-xs mb-2">$ cat contact.txt</p>
                <p className="text-gray-300 text-xs leading-relaxed">
                  I'm always open to discussing cybersecurity, collaboration opportunities, freelance pentesting engagements, or just talking shop. Reach out through any channel below.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {CONTACT_METHODS.map(m => (
                <a key={m.label} href={m.href} target="_blank" rel="noopener noreferrer"
                   className={`flex items-center gap-3 p-3 bg-[#111] border rounded-lg hover:scale-[1.01] transition-all ${colMap[m.color]}`}>
                  <div className={`w-9 h-9 flex items-center justify-center rounded-lg border ${colMap[m.color]}`}>
                    {m.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-[10px] font-mono uppercase tracking-wider">{m.label}</p>
                    <p className="text-gray-200 text-xs font-mono">{m.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* PGP note */}
            <div className="flex items-center gap-2 bg-[rgba(0,255,65,0.05)] border border-[rgba(0,255,65,0.15)] rounded-lg p-3">
              <Lock size={14} className="text-[#00ff41] shrink-0" />
              <p className="text-gray-400 text-xs font-mono">
                🔒 Secure Communication — PGP key available on request.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={fadeUp} custom={2} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          >
            <div className="terminal-window border-glow h-full">
              <div className="terminal-header">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="font-mono text-gray-500 text-xs ml-2">~/send_message.sh</span>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-gray-500 text-xs uppercase tracking-wider mb-1.5 block">Name</label>
                    <input
                      type="text" required placeholder="Your name"
                      className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-3 py-2.5 text-sm text-gray-200 font-mono
                                 focus:border-[rgba(0,255,65,0.5)] focus:shadow-[0_0_0_2px_rgba(0,255,65,0.1)] outline-none transition-all placeholder:text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-gray-500 text-xs uppercase tracking-wider mb-1.5 block">Email</label>
                    <input
                      type="email" required placeholder="your@email.com"
                      className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-3 py-2.5 text-sm text-gray-200 font-mono
                                 focus:border-[rgba(0,255,65,0.5)] focus:shadow-[0_0_0_2px_rgba(0,255,65,0.1)] outline-none transition-all placeholder:text-gray-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-gray-500 text-xs uppercase tracking-wider mb-1.5 block">Message</label>
                  <textarea
                    required rows={5} placeholder="Tell me about your project or question..."
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-3 py-2.5 text-sm text-gray-200 font-mono resize-none
                               focus:border-[rgba(0,255,65,0.5)] focus:shadow-[0_0_0_2px_rgba(0,255,65,0.1)] outline-none transition-all placeholder:text-gray-700"
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-gray-600 text-xs font-mono">
                    🔒 Your info is never shared.
                  </p>
                  <button
                    type="submit"
                    disabled={status !== 'idle'}
                    className={`flex items-center gap-2 font-mono text-sm font-semibold px-5 py-2.5 rounded-lg transition-all ${
                      status === 'sent'
                        ? 'bg-[#00cc33] text-black cursor-default'
                        : 'bg-[#00ff41] text-black hover:bg-[#00cc33] hover:shadow-[0_0_20px_rgba(0,255,65,0.4)]'
                    } disabled:opacity-80`}
                  >
                    {status === 'idle' && <><Send size={15} /> Send Message</>}
                    {status === 'sending' && <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Sending...</>}
                    {status === 'sent' && <>✓ Message Sent!</>}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
