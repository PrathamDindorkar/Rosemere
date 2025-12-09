'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Mail, Phone, MapPin, Globe, CheckCircle, ArrowDown, Menu, X, MapPinned, Settings, FileCheck, Users, Brain, Zap, Settings as SettingsIcon } from 'lucide-react';

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
  { label: 'Footprint', section: 'footprint' },
  { label: 'Expertise', section: 'expertise' },
  { label: 'Clients', section: 'clients' },
  { label: 'Contact', section: 'contact' },
];

export default function RosemereWebsite() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  // Intersection Observers
  const [aboutRef, aboutInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [visionRef, visionInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [footprintRef, footprintInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [expertiseRef, expertiseInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [clientsRef, clientsInView] = useInView({ threshold: 0.15, triggerOnce: true });
  const [contactRef, contactInView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 z-50 origin-left shadow-lg shadow-cyan-500/50"
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

      {/* Desktop Nav */}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-blue-950 via-indigo-950 to-blue-900 z-40 flex items-center justify-center px-8"
          >
            <div className="text-center space-y-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  onClick={() => scrollToSection(item.section)}
                  className="block text-4xl sm:text-5xl font-light text-white hover:text-cyan-300 transition"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}

      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 px-6 pt-32 pb-20 md:pt-40">
        {/* Background parallax blobs */}
        <motion.div style={{ y: yParallax }} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent" />
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-30"
              style={{
                background: i % 2 === 0 ? 'radial-gradient(circle, #0ea5e9, transparent)' : 'radial-gradient(circle, #06b6d4, transparent)',
                left: `${10 + i * 20}%`,
                top: `${5 + i * 15}%`,
              }}
              animate={{
                x: [0, 100, -80, 0],
                y: [0, -60, 80, 0],
                scale: [1, 1.3, 0.9, 1],
              }}
              transition={{ duration: 20 + i * 6, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </motion.div>

        {/* Hero Content – Always visible & perfectly centered */}
        <div className="relative z-10 text-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            <h1 className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-extrabold text-white tracking-tight leading-none">
              Rosemere
              <span className="block text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-cyan-300 font-light mt-3 sm:mt-4">
                Limited
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="mt-12 sm:mt-16 md:mt-20 backdrop-blur-3xl bg-white/10 border border-white/20 rounded-3xl p-10 sm:p-14 max-w-5xl mx-auto shadow-2xl"
            >
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-100 font-light leading-relaxed">
                Global Specialists in{" "}
                <span className="font-bold text-cyan-300">SAP OpenText VIM</span> & E-Invoicing Rollouts
              </p>
              <p className="text-base sm:text-lg md:text-xl text-cyan-200 mt-6">
                Since 2007 • United Kingdom • Precision in Intelligent Automation
              </p>
            </motion.div>

            {/* Scroll down indicator */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="mt-20 sm:mt-28 md:mt-32"
            >
              <ArrowDown className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 mx-auto" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" ref={aboutRef} className="py-24 sm:py-32 px-6 sm:px-8 bg-gradient-to-b from-blue-950 to-indigo-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="backdrop-blur-3xl bg-white/10 border border-white/20 rounded-3xl p-10 sm:p-16 shadow-2xl text-center"
          >
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-10">About Rosemere</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed max-w-5xl mx-auto">
              At <span className="text-cyan-300 font-bold">Rosemere Limited</span>, we bring world-class expertise to SAP OpenText Vendor Invoice Management (VIM) implementations, delivering seamless global rollouts for some of the world’s most recognised organisations.
            </p>
            <p className="text-base sm:text-lg text-gray-400 mt-8 max-w-4xl mx-auto">
              Trusted by Fortune 500 companies including GlaxoSmithKline, Roche, Maersk, Twinings, TNT, and BOC — we deliver precision, experience, and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" ref={visionRef} className="py-24 sm:py-32 px-6 sm:px-8 bg-gradient-to-b from-indigo-950 to-blue-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16">
          {[
            { title: "Our Vision", text: "To set the global benchmark in intelligent invoice automation through innovation, precision, and unmatched SAP OpenText VIM expertise." },
            { title: "Our Mission", text: "To empower enterprises with reliable, efficient, and future-proof SAP VIM solutions — delivered with integrity and measurable success." }
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: idx === 0 ? -80 : 80 }}
              animate={visionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: idx * 0.3 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="backdrop-blur-3xl bg-white/10 border border-cyan-500/30 rounded-3xl p-10 sm:p-14 hover:bg-white/15 transition-all duration-500"
            >
              <h3 className="text-4xl sm:text-5xl font-bold text-cyan-300 mb-8">{item.title}</h3>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Global Footprint */}
      <section id="footprint" ref={footprintRef} className="py-24 sm:py-32 px-6 sm:px-8 bg-gradient-to-b from-blue-950 to-indigo-950">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={footprintInView ? { opacity: 1, y: 0 } : {}}
            className="text-5xl sm:text-6xl font-bold text-white mb-16"
          >
            Global Rollout Footprint
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {['North America', 'South America', 'Europe', 'United Kingdom', 'Asia'].map((region, i) => (
              <motion.div
                key={region}
                initial={{ opacity: 0, y: 40 }}
                animate={footprintInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.1 }}
                className="bg-white/10 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 hover:bg-cyan-500/20 transition-all"
              >
                <MapPinned className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 mx-auto mb-4" />
                <p className="text-base sm:text-lg font-semibold text-white">{region}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section id="expertise" ref={expertiseRef} className="py-24 sm:py-32 px-6 sm:px-8 bg-gradient-to-b from-indigo-950 to-blue-950">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={expertiseInView ? { opacity: 1, y: 0 } : {}}
            className="text-5xl sm:text-6xl font-bold text-white text-center mb-16"
          >
            Our OpenText VIM Expertise
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <SettingsIcon className="w-10 h-10" />, title: "Solution Design & Configuration", desc: "Tailored VIM architecture and best-practice configuration" },
              { icon: <FileCheck className="w-10 h-10" />, title: "Comprehensive Testing", desc: "FUT, SIT, UAT with full traceability" },
              { icon: <Zap className="w-10 h-10" />, title: "Cutover & Hypercare", desc: "Seamless go-live and post-go-live support" },
              { icon: <Brain className="w-10 h-10" />, title: "OCR / IES Automation", desc: "Intelligent invoice processing with AI-powered extraction" },
              { icon: <Users className="w-10 h-10" />, title: "Training & Knowledge Transfer", desc: "End-user adoption programs and documentation" },
              { icon: <Globe className="w-10 h-10" />, title: "Redesign & Optimisation", desc: "Performance tuning and process re-engineering" },
              {
          icon: <BookOpen className="w-10 h-10" />,
          title: "SAP OpenText VIM Training",
          desc: "Certified expert-led training — from basics to advanced VIM administration, tailored for your team"
        },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={expertiseInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white/10 backdrop-blur-3xl border border-cyan-500/30 rounded-3xl p-8 hover:bg-white/15 transition-all group"
              >
                <div className="text-cyan-400 mb-6 group-hover:scale-110 transition">{item.icon}</div>
                <h4 className="text-2xl font-bold text-white mb-3">{item.title}</h4>
                <p className="text-gray-400 text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section id="clients" ref={clientsRef} className="py-24 sm:py-32 px-6 sm:px-8 bg-gradient-to-b from-blue-950 to-indigo-950">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={clientsInView ? { opacity: 1, y: 0 } : {}}
            className="text-5xl sm:text-6xl font-bold text-white mb-16"
          >
            Trusted by Global Leaders
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-16">
            {clients.map((client, i) => (
              <motion.div
                key={client.domain}
                initial={{ opacity: 0, y: 60 }}
                animate={clientsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.1 }}
                className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/20 hover:border-cyan-400/60 transition-all shadow-2xl overflow-hidden"
              >
                <div className="h-28 sm:h-32 flex items-center justify-center">
                  <img
                    src={`https://img.logo.dev/${client.domain}?token=pk_WcY2mQn5SXKX1lcnvkY-mA&size=256`}
                    alt={`${client.name} logo`}
                    className="max-h-24 sm:max-h-32 max-w-full object-contain rounded-xl shadow-md transition-transform group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/200x100/1e293b/94a3b8?text=${client.name.split(' ')[0]}`;
                    }}
                  />
                </div>
                <p className="mt-6 text-sm sm:text-base font-medium text-gray-300 uppercase tracking-wider opacity-80 group-hover:opacity-100 transition">
                  {client.name}
                </p>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition blur-xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" ref={contactRef} className="py-32 sm:py-40 px-6 sm:px-8 bg-gradient-to-t from-blue-950 via-indigo-950 to-blue-900 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={contactInView ? { opacity: 1, scale: 1 } : {}}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-16"
          >
            Transform Your SAP Journey
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="backdrop-blur-3xl bg-white/15 border border-white/30 rounded-3xl p-12 sm:p-16 shadow-2xl"
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-12">Start a Conversation</h3>
            <div className="space-y-8 text-left text-gray-300 text-lg sm:text-xl max-w-md mx-auto">
              <div className="flex items-center gap-5"><Mail className="w-7 h-7 text-cyan-400" /><span>pras@rosemere-ltd.co.uk</span></div>
              <div className="flex items-center gap-5"><Phone className="w-7 h-7 text-cyan-400" /><span>+44 7818 876333</span></div>
              <div className="flex items-center gap-5"><MapPin className="w-7 h-7 text-cyan-400" /><span>United Kingdom</span></div>
            </div>
            <motion.a
              href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=pras@rosemere-ltd.co.uk&su=Let's Start a SAP OpenText VIM Project&body=Hi Pras,%0D%0A%0D%0AI came across Rosemere Limited and I'm interested in discussing how your SAP OpenText VIM expertise can help our organization with:%0D%0A%0D%0A• Global rollout%0D%0A• Invoice automation%0D%0A• Training & support%0D%0A%0D%0ACould we schedule a quick call?%0D%0A%0D%0ABest regards"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="mt-16 inline-block px-12 sm:px-16 py-5 sm:py-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-xl sm:text-2xl rounded-full shadow-2xl hover:from-cyan-400 hover:to-blue-400 transition-all"
            >
              Begin Your Project
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 sm:py-16 bg-blue-950/70 text-center text-gray-400 border-t border-cyan-900">
        <p className="text-sm sm:text-base">© 2007–{new Date().getFullYear()} Rosemere Limited. All rights reserved.</p>
      </footer>
    </>
  );
}