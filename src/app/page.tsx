import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import DynamicProjects from '@/components/DynamicProjects';
import Contact from '@/components/Contact';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <Header />
      <Hero />
      <Skills />
      <Projects />
      <DynamicProjects />
      <Contact />
    </main>
  );
}