import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certs from './components/Certs';
import Writings from './components/Writings';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 selection:bg-[rgba(0,255,65,0.25)] selection:text-[#00ff41] relative grid-bg scanlines">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certs />
        <Writings />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
