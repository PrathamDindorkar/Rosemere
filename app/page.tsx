'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  BookOpen, Mail, Phone, MapPin, Globe, CheckCircle, ArrowDown, 
  Menu, X, Settings, FileCheck, Users, Brain, Zap, ShieldCheck, ChevronRight, 
  MapPinned
} from 'lucide-react';

// Note: Replace these with actual paths or Unsplash URLs for better visuals
const clients = [
  { name: "GlaxoSmithKline", domain: "gsk.com" },
  { name: "Roche", domain: "roche.com" },
  { name: "Twinings", domain: "twinings.co.uk" },
  { name: "Unilever", domain: "unilever.com" },
  { name: "TNT / FedEx", domain: "tnt.com" },
  { name: "Maersk", domain: "maersk.com" },
  { name: "BOC Linde", domain: "boc.com" },
];

const navItems = [
  { label: 'About', section: 'about' },
  { label: 'Vision', section: 'vision' },
  {label: 'Footprint', section: 'footprint'},
  { label: 'Services', section: 'expertise' },
  { label: 'Clients', section: 'clients' },
  { label: 'Contact', section: 'contact' },
];

export default function RosemereWebsite() {
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const offset = 80;
    if (element) {
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  //const [aboutRef, aboutInView] = useInView({ threshold: 0.2, triggerOnce: true });
  //const [visionRef, visionInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [footprintRef, footprintInView] = useInView({ threshold: 0.2, triggerOnce: true });
  //const [expertiseRef, expertiseInView] = useInView({ threshold: 0.2, triggerOnce: true });
  //const [clientsRef, clientsInView] = useInView({ threshold: 0.15, triggerOnce: true });
  //const [contactRef, contactInView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div className="bg-slate-950 text-slate-200 selection:bg-cyan-500/30 font-sans antialiased">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-600 to-blue-600 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Logo - Fixed Left */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
        className={`fixed z-50 cursor-pointer transition-all duration-500 ${isScrolled ? 'top-3 left-3 sm:top-4 sm:left-4' : 'top-4 left-4 sm:top-6 sm:left-6'
          }`}
      >
        <div className={`
          transparent border border-transparent rounded-xl
          transition-all duration-500 
          hover:bg-white/10 hover:border-white/20
          ${isScrolled
            ? 'p-1.5 sm:p-2'
            : 'p-2 sm:p-2.5'
          }
        `}>
          <img
            src="/logo.png"
            alt="Rosemere Limited Logo"
            onClick={scrollToTop}
            className={`transition-all duration-500 ${isScrolled
                ? 'w-16 sm:w-20'
                : 'w-20 sm:w-24'
              }`}
            style={{
              filter: 'brightness(0) invert(1) drop-shadow(0 1px 3px rgba(255, 255, 255, 0.3))'
            }}
          />
        </div>
      </motion.div>

      {/* Modern Navigation */}
      <motion.nav
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-40"
      >
        <div className="bg-white/10 backdrop-blur-3xl border border-white/30 rounded-full px-8 py-4 shadow-2xl hover:bg-white/20 transition-all">
          <div className="flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.section)}
                className="text-white font-medium text-sm lg:text-base tracking-wider hover:text-cyan-300 transition relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed top-6 right-4 sm:right-6 z-50 md:hidden bg-white/20 backdrop-blur-xl border border-white/30 rounded-full p-3 shadow-xl"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
      </motion.button>

      {/* Mobile Menu Overlay */}
<AnimatePresence>
  {mobileMenuOpen && (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: '100%' }} 
      transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 p-10 
                 bg-gradient-to-br from-cyan-900/40 via-slate-950/40 to-slate-900/40 
                 backdrop-blur-2xl border-l border-white/10"
    >
       {/* Close Button Inside Menu */}
       <button 
         className="absolute top-8 right-8 p-3 bg-white/5 rounded-full border border-white/10 text-white" 
         onClick={() => setMobileMenuOpen(false)}
       >
         <X size={28}/>
       </button>

       {/* Navigation Links */}
       <div className="flex flex-col items-center gap-6">
         {navItems.map((item, i) => (
            <motion.button 
              key={item.label} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => scrollToSection(item.section)} 
              className="text-4xl font-bold tracking-tighter text-white hover:text-cyan-400 transition-colors"
            >
              {item.label}
            </motion.button>
         ))}
       </div>

       {/* Socials or Secondary Info */}
       <motion.div 
         initial={{ opacity: 0 }} 
         animate={{ opacity: 1 }} 
         transition={{ delay: 0.5 }}
         className="absolute bottom-12 flex gap-6"
       >
          <div className="text-slate-500 text-xs tracking-widest font-bold uppercase">Rosemere Limited</div>
       </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950" />
            <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              United Kingdom • Global Logistics Specialists
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[0.9]">
              Rosemere Limited <br /> 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Intelligent Automation</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Transforming global finance landscapes with SAP OpenText VIM excellence since 2007. Trusted by the world's most complex enterprises.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <button onClick={() => scrollToSection('expertise')} className="bg-white text-slate-950 px-10 py-4 rounded-full font-bold hover:bg-cyan-400 transition-all flex items-center gap-2 group">
                 Our Solutions <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </button>
               <button onClick={() => scrollToSection('contact')} className="border border-white/20 hover:bg-white/5 px-10 py-4 rounded-full font-bold transition-all">
                 Get in Touch
               </button>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 animate-bounce text-slate-500">
           <ArrowDown size={30} strokeWidth={1} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Driving Excellence in <br />
                <span className="text-cyan-500 italic">Financial Digitalization.</span>
              </h2>
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <p>
                  At Rosemere Limited, we bridge the gap between complex SAP ecosystems and seamless business operations. With over a decade of specialized focus, we deliver world-class expertise in Vendor Invoice Management (VIM).
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="border-l-2 border-cyan-500 pl-4">
                    <div className="text-3xl font-bold text-white">25+</div>
                    <div className="text-sm uppercase tracking-widest text-slate-500">Years Experience</div>
                  </div>
                  <div className="border-l-2 border-cyan-500 pl-4">
                    <div className="text-3xl font-bold text-white">15</div>
                    <div className="text-sm uppercase tracking-widest text-slate-500">Global Rollouts</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                  alt="Data Analytics" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay" />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-slate-900 border border-white/10 p-6 rounded-2xl shadow-2xl backdrop-blur-xl">
                 <ShieldCheck className="text-cyan-400 mb-2" size={32} />
                 <p className="text-sm font-bold text-white uppercase tracking-tighter">Certified SAP Partners</p>
                 <p className="text-xs text-slate-500 font-medium">Industry Standard Security</p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Footprint Section - Re-designed */}
      <section id="footprint" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">Global Reach</h2>
            <p className="text-slate-500 uppercase tracking-[0.2em] text-xs font-bold">Our implementation footprint across the continents</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {['North America', 'South America', 'Europe', 'United Kingdom', 'Asia'].map((region, i) => (
              <motion.div
                key={region}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl text-center group hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all"
              >
                <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5 group-hover:border-cyan-500/50 transition-colors">
                  <MapPinned className="w-6 h-6 text-cyan-400" />
                </div>
                <p className="text-sm font-bold text-white tracking-wide">{region}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise - Service Cards */}
      <section id="expertise" className="py-32 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Expertise & Solutions</h2>
            <p className="text-slate-400 max-w-2xl mx-auto italic">End-to-end SAP OpenText VIM services tailored for complex global environments.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Settings className="text-cyan-400" />, title: "Solution Architecture", desc: "Enterprise-grade VIM configuration and design." },
              { icon: <FileCheck className="text-blue-400" />, title: "Quality Assurance", desc: "Rigorous FUT, SIT, and UAT with automated tracking." },
              { icon: <Zap className="text-yellow-400" />, title: "OCR / AI Automation", desc: "Intelligent data extraction with OpenText IES." },
              { icon: <Brain className="text-purple-400" />, title: "Optimisation", desc: "Performance tuning and process re-engineering." },
              { icon: <Users className="text-emerald-400" />, title: "Training Programs", desc: "Expert-led knowledge transfer for global teams." },
              { icon: <Globe className="text-orange-400" />, title: "Global Rollouts", desc: "Multi-country, multi-language deployment strategies." },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-cyan-500/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section - Modern Polished */}
<section id="clients" className="py-32 bg-slate-950">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
          Trusted by Leaders
        </h2>
        <p className="text-slate-500 mt-4 tracking-[0.1em] uppercase text-sm font-semibold">
          Strategic partnerships with Fortune 500 companies
        </p>
      </motion.div>
      <div className="text-cyan-500 font-mono text-sm tracking-widest bg-cyan-500/5 px-4 py-2 rounded-full border border-cyan-500/10">
        ESTABLISHED 2007
      </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {clients.map((client, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="h-32 flex items-center justify-center p-8 bg-white/5 rounded-2xl border border-white/5 
                     hover:bg-white hover:border-white transition-all duration-500 group relative overflow-hidden"
        >
          {/* Logo Image */}
          <img 
            // Replace 'YOUR_TOKEN' with your actual logo.dev secret token
            src={`https://img.logo.dev/${client.domain}?token=pk_WcY2mQn5SXKX1lcnvkY-mA&size=256`} 
            alt={`${client.name} logo`}
            className="max-h-12 w-auto object-contain transition-all duration-500 
                       grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
            // Fallback: If image fails to load, show the text name
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'block';
            }}
          />

          {/* Fallback Text (Hidden by default, shown if image fails) */}
          <span className="hidden text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors uppercase tracking-widest text-center">
             {client.name}
          </span>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Contact Section */}
      <section id="contact" className="py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 relative z-10">Ready to automate?</h2>
            <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto font-light relative z-10">
              Let's discuss how Rosemere can optimize your global financial workflows.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center relative z-10">
               <a href="mailto:pras@rosemere-ltd.co.uk" className="flex items-center gap-3 bg-slate-950 px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-xl">
                 <Mail size={18} className="text-cyan-400" /> pras@rosemere-ltd.co.uk
               </a>
               <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-bold">
                 <MapPin size={18} /> United Kingdom
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-widest text-white">ROSEMERE LIMITED</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2007–{new Date().getFullYear()} Rosemere Limited. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-bold tracking-widest text-slate-500 uppercase">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}