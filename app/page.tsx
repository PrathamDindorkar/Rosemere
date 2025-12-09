'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Globe, CheckCircle, ArrowDown, Menu, X, MapPinned, Settings, FileCheck, Users, Brain, Zap } from 'lucide-react';

const clients = [
  'gsk.com',
  'roche.com',
  'twinings.co.uk',
  'univer.com',
  'tnt.com',
  'maersk.com',
  'boc.com'
];

const navItems = [
  { label: 'About', section: 'about' },
  { label: 'Vision', section: 'vision' },
  { label: 'Footprint', section: 'footprint' },
  { label: 'Expertise', section: 'expertise' },
  { label: 'Clients', section: 'clients' },
  { label: 'Contact', section: 'contact' },
];

export default function RosemereWebsite() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Intersection Observers
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [visionRef, visionInView] = useInView({ threshold: 0.4, triggerOnce: true });
  const [footprintRef, footprintInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [expertiseRef, expertiseInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [clientsRef, clientsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [contactRef, contactInView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 z-50 origin-left shadow-lg shadow-blue-500/50"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
        className={`fixed z-50 cursor-pointer transition-all duration-500 ${
          isScrolled ? 'top-3 left-3 sm:top-4 sm:left-4' : 'top-4 left-4 sm:top-6 sm:left-6'
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
            className={`transition-all duration-500 ${
              isScrolled 
                ? 'w-16 sm:w-20' 
                : 'w-20 sm:w-24'
            }`}
            style={{
              filter: 'brightness(0) invert(1) drop-shadow(0 1px 3px rgba(255, 255, 255, 0.3))'
            }}
          />
        </div>
      </motion.div>

      <motion.nav
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isScrolled ? 'top-4' : 'top-8'}`}
      >
        <div className={`
          backdrop-blur-3xl rounded-full shadow-2xl border px-10 py-3.5
          transition-all duration-700 ease-out
          ${isScrolled
            ? 'bg-white/20 border-white/40 backdrop-blur-3xl scale-95'
            : 'bg-white/10 border-white/30'
          }
          hover:bg-white/25 hover:border-white/50
        `}>
          <div className="flex items-center gap-12">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.section)}
                className="relative text-white font-medium text-[15px] tracking-widest uppercase hover:text-cyan-300 transition-all duration-400 group"
              >
                <span className="relative z-10">{item.label}</span>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        className={`fixed top-10 right-8 z-50 md:hidden backdrop-blur-3xl rounded-full p-3.5 shadow-xl border bg-white/20 border-white/40 hover:bg-white/30 transition-all ${isScrolled ? 'top-8' : ''}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </motion.button>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 backdrop-blur-2xl z-40 md:hidden flex items-center justify-center"
          >
            <motion.div className="text-center space-y-10">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(item.section)}
                  className="block text-5xl font-light text-white hover:text-cyan-300 transition-all"
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950">
        <motion.div style={{ y: yParallax }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent" />
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-96 h-96 rounded-full filter blur-3xl opacity-30"
              style={{
                background: i % 2 === 0 ? 'radial-gradient(circle, #0ea5e9, transparent)' : 'radial-gradient(circle, #06b6d4, transparent)',
                left: `${15 + i * 18}%`,
                top: `${10 + i * 12}%`,
              }}
              animate={{
                x: [0, 120, -100, 0],
                y: [0, -80, 100, 0],
                scale: [1, 1.4, 0.9, 1],
              }}
              transition={{
                duration: 25 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </motion.div>

        <div className="relative z-10 text-center px-8 max-w-7xl mx-auto">
          <motion.div style={{ opacity }}>
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="text-7xl md:text-9xl font-extrabold text-white tracking-tighter leading-none"
            >
              <br />
              Rosemere
              <span className="block text-5xl md:text-7xl text-cyan-300 font-light mt-4">
                Limited
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="mt-16 backdrop-blur-3xl bg-white/10 border border-white/30 rounded-3xl p-14 max-w-5xl mx-auto shadow-2xl"
            >
              <p className="text-2xl md:text-4xl text-gray-100 font-light leading-relaxed">
                Global Specialists in <span className="font-bold text-cyan-300">SAP OpenText VIM</span> & E-Invoicing Rollouts
              </p>
              <p className="text-lg text-cyan-200 mt-6">Since 2007 • United Kingdom • Precision in Intelligent Automation</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="mt-24"
            >
              <ArrowDown className="w-10 h-10 text-cyan-400 mx-auto" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="about" ref={aboutRef} className="py-32 px-8 bg-gradient-to-b from-blue-950 to-indigo-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2 }}
            className="backdrop-blur-3xl bg-white/10 border border-white/20 rounded-3xl p-16 shadow-2xl text-center"
          >
            <h2 className="text-6xl font-bold text-white mb-12">About Rosemere</h2>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-5xl mx-auto">
              At <span className="text-cyan-300 font-bold">Rosemere Limited</span>, we bring world-class expertise to SAP OpenText Vendor Invoice Management (VIM) implementations, delivering seamless global rollouts for some of the world’s most recognised organisations. Our proven track record spans multiple industries and regions, ensuring consistent, high-quality delivery wherever your business operates.
            </p>
            <p className="text-lg text-gray-400 mt-10 max-w-4xl mx-auto">
              Trusted by Fortune 500 giants including GlaxoSmithKline, Roche, Maersk, Twinings, TNT, and BOC — we bring precision, experience, and innovation to every implementation.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="vision" ref={visionRef} className="py-32 px-8 bg-gradient-to-b from-indigo-950 to-blue-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          {[
            { title: "Our Vision", text: "To set the global benchmark in intelligent invoice automation through innovation, precision, and unmatched SAP OpenText VIM expertise." },
            { title: "Our Mission", text: "To empower enterprises with reliable, efficient, and future-proof SAP VIM solutions — delivered with integrity and relentless focus on measurable success." }
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: item.title === "Our Vision" ? -100 : 100 }}
              animate={visionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: item.title === "Our Vision" ? 0 : 0.3 }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="backdrop-blur-3xl bg-white/10 border border-cyan-500/30 rounded-3xl p-14 shadow-2xl hover:bg-white/15 hover:border-cyan-400 transition-all duration-500"
            >
              <h3 className="text-5xl font-bold text-cyan-300 mb-8">{item.title}</h3>
              <p className="text-gray-300 text-xl leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="footprint" ref={footprintRef} className="py-32 px-8 bg-gradient-to-b from-blue-950 to-indigo-950">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={footprintInView ? { opacity: 1, y: 0 } : {}}
            className="text-6xl font-bold text-white mb-20"
          >
            Global Rollout Footprint
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={footprintInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 mb-16 max-w-4xl mx-auto"
          >
            Our delivery experience covers a truly international landscape:
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            {['North America', 'South America', 'Europe', 'United Kingdom', 'Asia'].map((region, i) => (
              <motion.div
                key={region}
                initial={{ opacity: 0, y: 40 }}
                animate={footprintInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.1}}
                className="backdrop-blur-xl bg-white/10 border border-cyan-500/30 rounded-3xl p-10 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-500"
              >
                <MapPinned className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <p className="text-lg font-semibold text-white">{region}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="expertise" ref={expertiseRef} className="py-32 px-8 bg-gradient-to-b from-indigo-950 to-blue-950">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={expertiseInView ? { opacity: 1, y: 0 } : {}}
            className="text-6xl font-bold text-white text-center mb-20"
          >
            Our OpenText VIM Expertise
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: <Settings className="w-10 h-10" />, title: "Solution Design & Configuration", desc: "Tailored VIM architecture and best-practice configuration" },
              { icon: <FileCheck className="w-10 h-10" />, title: "Comprehensive Testing", desc: "FUT, SIT, UAT cycles with full traceability" },
              { icon: <Zap className="w-10 h-10" />, title: "Cutover & Hypercare", desc: "Seamless go-live and post-go-live support" },
              { icon: <Brain className="w-10 h-10" />, title: "OCR / IES Automation", desc: "Intelligent invoice processing with AI-powered extraction" },
              { icon: <Users className="w-10 h-10" />, title: "Training & Knowledge Transfer", desc: "End-user adoption programs and documentation" },
              { icon: <Globe className="w-10 h-10" />, title: "Redesign & Optimisation", desc: "Performance tuning and process re-engineering" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={expertiseInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="backdrop-blur-3xl bg-white/10 border border-cyan-500/30 rounded-3xl p-10 hover:bg-white/15 hover:border-cyan-400 transition-all duration-500 group"
              >
                <div className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h4 className="text-2xl font-bold text-white mb-3">{item.title}</h4>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="clients" ref={clientsRef} className="py-32 px-8 bg-gradient-to-b from-blue-950 to-indigo-950">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={clientsInView ? { opacity: 1, y: 0 } : {}}
            className="text-6xl font-bold text-white mb-20"
          >
            Trusted by Global Leaders
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16">
            {[
              { name: "GlaxoSmithKline", domain: "gsk.com" },
              { name: "Roche", domain: "roche.com" },
              { name: "Twinings", domain: "twinings.co.uk" },
              { name: "Unilever", domain: "unilever.com" },
              { name: "TNT / FedEx", domain: "tnt.com" },
              { name: "Maersk", domain: "maersk.com" },
              { name: "BOC Linde", domain: "boc.com" },
            ].map((client, i) => (
              <motion.div
                key={client.domain}
                initial={{ opacity: 0, y: 60 }}
                animate={clientsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.8 }}
                whileHover={{ y: -12, scale: 1.1 }}
                className="group relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 hover:bg-white/20 hover:border-cyan-400/60 transition-all duration-500 shadow-2xl"
              >

                <div className="h-32 flex items-center justify-center mb-4">
                  <img
                    src={`https://img.logo.dev/${client.domain}?token=pk_WcY2mQn5SXKX1lcnvkY-mA`}
                    alt={`${client.name} logo`}
                    className="
      max-h-30          /* bigger than before */
      max-w-full 
      object-contain 
      rounded-2xl       /* soft rounded corners */
      border border-gray-200 
      shadow-sm
      transition-all duration-500 
      group-hover:scale-110
    "
                  />
                </div>

                <p className="text-sm font-medium text-gray-300 tracking-wider uppercase mt-6 opacity-80 group-hover:opacity-100 transition-opacity">
                  {client.name}
                </p>

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" ref={contactRef} className="py-40 px-8 bg-gradient-to-t from-blue-950 via-indigo-950 to-blue-900 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={contactInView ? { opacity: 1, scale: 1 } : {}}
            className="text-7xl font-extrabold text-white mb-16"
          >
            Transform Your SAP Journey
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="backdrop-blur-3xl bg-white/15 border border-white/30 rounded-3xl p-16 shadow-2xl"
          >
            <h3 className="text-4xl font-bold text-white mb-12">Start a Conversation</h3>
            <div className="space-y-8 text-left text-gray-300 text-xl max-w-md mx-auto">
              <div className="flex items-center gap-5"><Mail className="w-7 h-7 text-cyan-400" /><span>pras@rosemere-ltd.co.uk</span></div>
              <div className="flex items-center gap-5"><Phone className="w-7 h-7 text-cyan-400" /><span>+44 7818 876333</span></div>
              <div className="flex items-center gap-5"><MapPin className="w-7 h-7 text-cyan-400" /><span>United Kingdom</span></div>
            </div>

            <motion.a
              href="mailto:pras@rosemere-ltd.co.uk"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="mt-16 inline-block px-16 py-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-2xl rounded-full shadow-2xl hover:from-cyan-400 hover:to-blue-400 transition-all duration-400"
            >
              Begin Your Project
            </motion.a>
          </motion.div>
        </div>
      </section>

      <footer className="py-16 bg-blue-950/50 text-center text-gray-400 border-t border-cyan-900">
        <p>© 2007–{new Date().getFullYear()} Rosemere Limited. All rights reserved.</p>
      </footer>
    </>
  );
}