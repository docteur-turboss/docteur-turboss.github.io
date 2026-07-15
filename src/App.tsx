/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Mail, 
  Download, 
  X,
  Columns,
  Grid,
  ExternalLink
} from 'lucide-react';

import { PERSONAL_INFO, SKILL_GROUPS, PHILOSOPHY_ITEMS, EXPERIENCE_ITEMS, PROJECT_ITEMS } from './data';
import { ProjectItem, ExperienceItem } from './types';
import ProjectDetailModal from './components/ProjectDetailModal';
import SkillBadge from './components/SkillBadge';

export default function App() {
  // Layout mode: 'grid' (Layout 1) or 'bento' (Layout 2)
  const [layoutMode, setLayoutMode] = useState<'grid' | 'bento'>('grid');
  
  // Interaction & Filter states
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('profile');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['profile', 'stack', 'experience', 'projects'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if an experience item matches the active skill
  const isExperienceHighlighted = (item: ExperienceItem) => {
    if (!selectedSkill) return false;
    const skillLower = selectedSkill.toLowerCase();
    
    // Check company, title, or bullet points for keyword matching
    if (item.title.toLowerCase().includes(skillLower)) return true;
    if (item.company.toLowerCase().includes(skillLower)) return true;
    return item.bullets.some(bullet => bullet.toLowerCase().includes(skillLower));
  };

  // Determine if a project item matches the active skill
  const isProjectHighlighted = (item: ProjectItem) => {
    if (!selectedSkill) return false;
    const skillLower = selectedSkill.toLowerCase();
    
    if (item.tags && item.tags.some(tag => tag.toLowerCase() === skillLower)) return true;
    if (item.title.toLowerCase().includes(skillLower)) return true;
    return item.description.toLowerCase().includes(skillLower);
  };

  // Handler for smooth scroll navigation
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  // Standard Print CV command
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-background text-on-surface font-sans min-h-screen pb-20 md:pb-12 select-none selection:bg-secondary-container selection:text-on-secondary-container transition-colors duration-300">
      
      {/* Top Navigation Bar / Header */}
      <header className="fixed top-0 w-full z-40 bg-surface border-b border-outline-variant h-16 no-print">
        <div className="flex items-center justify-between px-6 md:px-12 h-16 w-full max-w-7xl mx-auto">
          
          {/* Logo & Headshot */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant bg-surface-container-high shrink-0">
              <img 
                src={layoutMode === 'grid' ? PERSONAL_INFO.avatarWide : PERSONAL_INFO.avatarCompact} 
                alt="Thomas Cherbonnel Portrait" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-headline-md text-base md:text-lg text-primary tracking-tight font-bold uppercase">
                T. CHERBONNEL
              </h1>
              <span className="text-[10px] text-on-surface-variant font-mono block leading-none">Senior Architect</span>
            </div>
          </div>

          {/* Nav Links for Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="#profile" 
              onClick={(e) => scrollToSection(e, 'profile')}
              className={`font-label-md text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all duration-200 ${
                activeSection === 'profile' 
                  ? 'text-secondary bg-secondary-container/10 font-bold shadow-xs' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              Profile
            </a>
            <a 
              href="#stack" 
              onClick={(e) => scrollToSection(e, 'stack')}
              className={`font-label-md text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all duration-200 ${
                activeSection === 'stack' 
                  ? 'text-secondary bg-secondary-container/10 font-bold shadow-xs' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              Stack
            </a>
            <a 
              href="#experience" 
              onClick={(e) => scrollToSection(e, 'experience')}
              className={`font-label-md text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all duration-200 ${
                activeSection === 'experience' 
                  ? 'text-secondary bg-secondary-container/10 font-bold shadow-xs' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              Journey
            </a>
            <a 
              href="#projects" 
              onClick={(e) => scrollToSection(e, 'projects')}
              className={`font-label-md text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded transition-all duration-200 ${
                activeSection === 'projects' 
                  ? 'text-secondary bg-secondary-container/10 font-bold shadow-xs' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              Projects
            </a>
          </nav>

          {/* Interactive Controls & Print Option */}
          <div className="flex items-center gap-3">
            {/* Layout switch buttons */}
            <div className="hidden sm:flex items-center bg-surface-container rounded-lg p-0.5 border border-outline-variant/60">
              <button 
                id="layout-grid-toggle"
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded-md transition-all ${
                  layoutMode === 'grid' 
                    ? 'bg-white text-secondary shadow-xs font-bold' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                title="Switch to Extended Grid Layout"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                id="layout-bento-toggle"
                onClick={() => setLayoutMode('bento')}
                className={`p-1.5 rounded-md transition-all ${
                  layoutMode === 'bento' 
                    ? 'bg-white text-secondary shadow-xs font-bold' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                title="Switch to Compact Bento Layout"
              >
                <Columns className="w-4 h-4" />
              </button>
            </div>

            {/* Print trigger */}
            <button 
              id="header-print-btn"
              onClick={handlePrint}
              className="p-2 text-secondary hover:bg-surface-container-high rounded-full transition-colors"
              title="Print standard high-end PDF version of this CV"
            >
              <FileText className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Primary Container / Wrapper */}
      <main className="pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* Floating Skill Filter Active Alert */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-18 left-1/2 -translate-x-1/2 z-30 bg-primary text-white border border-secondary px-4 py-2 rounded-full flex items-center gap-3 shadow-lg text-xs font-mono no-print"
            >
              <span>Filtering by: <strong className="text-secondary-fixed">{selectedSkill}</strong></span>
              <button 
                onClick={() => setSelectedSkill(null)}
                className="p-0.5 rounded-full bg-surface-container-high/20 hover:bg-surface-container-high/45 transition-colors"
                title="Clear filtering focus"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section id="profile" className="mb-8 md:mb-12 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-outline-variant pb-8 gap-6">
            <div className="space-y-2">
              <span className="text-secondary font-mono text-xs uppercase tracking-widest font-bold block">
                {PERSONAL_INFO.roleLevel}
              </span>
              <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
                {PERSONAL_INFO.title}
              </h2>
              <p className="text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>
            </div>
            
            {/* Primary Action Panel */}
            <div className="flex gap-3 shrink-0 no-print">
              <button 
                id="hero-print-pdf-btn"
                onClick={handlePrint}
                className="bg-secondary text-on-secondary px-5 py-2.5 rounded-lg font-label-md text-xs font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-xs"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button 
                id="hero-contact-btn"
                onClick={() => window.location.href = `mailto:${PERSONAL_INFO.email}`}
                className="border border-outline text-on-surface px-5 py-2.5 rounded-lg font-label-md text-xs font-bold flex items-center gap-2 hover:bg-surface-container-low active:scale-95 transition-all"
              >
                <Mail className="w-4 h-4 text-secondary" />
                Contact
              </button>
            </div>
          </div>
        </section>

        {/* Interactive Layout Renderers */}
        <AnimatePresence mode="wait">
          {layoutMode === 'grid' ? (
            
            /* =========================================================
               LAYOUT 1: EXTENDED TWO-COLUMN GRID LAYOUT
               ========================================================= */
            <motion.div 
              key="grid-layout"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-12 gap-gutter print-row"
            >
              {/* Left Column (col-span-4): Sidebar details */}
              <aside className="col-span-12 md:col-span-4 space-y-8 print-col-1">
                
                {/* Core Tech Stack Section */}
                <section id="stack" className="scroll-mt-24">
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex flex-col mb-4">
                    Core Tech Stack
                    <span className="accent-bar"></span>
                  </h3>
                  
                  <div className="bg-primary-container rounded-xl p-6 space-y-5 border border-outline-variant/20 shadow-xs">
                    {SKILL_GROUPS.map((group) => (
                      <div key={group.category}>
                        <span className="font-mono text-xs text-primary-fixed/75 mb-2 block font-medium">
                          // {group.category}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {group.skills.map(skill => (
                            <SkillBadge 
                              key={skill}
                              name={skill}
                              variant="dark"
                              isSelected={selectedSkill === skill}
                              onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Philosophy Section */}
                <section className="scroll-mt-24">
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex flex-col mb-4">
                    Philosophy
                    <span className="accent-bar"></span>
                  </h3>
                  <div className="space-y-2.5">
                    {PHILOSOPHY_ITEMS.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30 hover:border-secondary/40 transition-colors cursor-default"
                      >
                        <div className="flex items-center gap-2.5 mb-1">
                          <span className="material-symbols-outlined text-secondary text-lg" data-icon={item.icon}>
                            {item.icon}
                          </span>
                          <h4 className="font-label-md font-bold text-secondary text-xs uppercase tracking-wide">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-body-md text-on-surface-variant text-xs leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Contact Information Cards */}
                <section className="bg-surface-container-high rounded-xl p-6 border border-outline-variant/80 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary" data-icon="location_on">location_on</span>
                    <span className="font-body-md text-on-surface font-medium text-sm">{PERSONAL_INFO.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary" data-icon="link">link</span>
                    <a href={`https://${PERSONAL_INFO.website}`} target="_blank" rel="noopener noreferrer" className="font-body-md text-secondary hover:underline text-sm font-medium flex items-center gap-1">
                      {PERSONAL_INFO.website}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary" data-icon="alternate_email">alternate_email</span>
                    <span className="font-body-md text-on-surface text-sm font-medium">{PERSONAL_INFO.email}</span>
                  </div>
                </section>

              </aside>

              {/* Right Column (col-span-8): Experiences and Engineering Lab */}
              <div className="col-span-12 md:col-span-8 space-y-10 print-col-2">
                
                {/* Professional Journey timeline */}
                <section id="experience" className="scroll-mt-24">
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex flex-col mb-6">
                    Professional Journey
                    <span className="accent-bar"></span>
                  </h3>
                  
                  <div className="space-y-8 pl-4 relative">
                    {EXPERIENCE_ITEMS.map((item) => {
                      return (
                        <div 
                          key={item.id} 
                          className={`timeline-dot-grid relative transition-all duration-300 p-4 pt-0 pb-0 border-l-2 border-outline-variant`}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-1.5">
                            <h4 className="font-headline-sm text-on-surface font-bold text-base">
                              {item.title}
                            </h4>
                            <span className={`font-label-md text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full text-right ${
                              item.isScheduled 
                                ? 'bg-surface-container text-on-surface-variant border border-outline-variant/30' 
                                : 'bg-secondary-container/10 text-secondary'
                            }`}>
                              {item.period}
                            </span>
                          </div>
                          
                          <p className="text-secondary font-semibold text-sm mb-3">
                            {item.company}
                          </p>
                          
                          <ul className="space-y-2">
                            {item.bullets.map((bullet, index) => (
                              <li key={index} className="flex gap-2.5 items-start">
                                <span className="material-symbols-outlined text-secondary text-sm shrink-0 mt-0.5" data-icon="chevron_right">
                                  chevron_right
                                </span>
                                <span className="text-body-md text-on-surface-variant text-sm leading-relaxed">
                                  {bullet}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Engineering Lab projects section */}
                <section id="projects" className="scroll-mt-24">
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex flex-col mb-6">
                    Engineering Lab
                    <span className="accent-bar"></span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-grid">
                    {PROJECT_ITEMS.map((project) => {
                      const highlighted = isProjectHighlighted(project);
                      const isFullWidth = project.id === 'project-3'; // GlaDOS Project is wide row
                      
                      return (
                        <div 
                          key={project.id}
                          id={`lab-card-${project.id}`}
                          onClick={() => setActiveProject(project)}
                          className={`group cursor-pointer bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:border-secondary hover:shadow-md transition-all duration-300 flex flex-col ${
                            isFullWidth ? 'md:col-span-2' : ''
                          } ${
                            highlighted 
                              ? 'ring-2 ring-secondary ring-offset-2 scale-[1.01] bg-secondary/5 border-secondary' 
                              : selectedSkill 
                                ? 'opacity-40' 
                                : ''
                          }`}
                        >
                          {/* Image preview (only if image exists & not GlaDOS) */}
                          {project.image && (
                            <div className="h-32 bg-primary-container relative overflow-hidden">
                              <div 
                                className="absolute inset-0 bg-cover bg-center opacity-45 group-hover:scale-105 transition-transform duration-500"
                                style={{ backgroundImage: `url('${project.image}')` }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-primary-container to-transparent" />
                              <div className="absolute bottom-4 left-4">
                                <span className="font-mono text-on-secondary-container bg-secondary px-2.5 py-0.5 rounded text-[10px] uppercase tracking-widest font-bold">
                                  {project.category}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Info Body */}
                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start gap-3 mb-2">
                                <h4 className="font-headline-sm text-on-surface font-bold text-base leading-snug group-hover:text-secondary transition-colors">
                                  {project.title}
                                </h4>
                                {!project.image && (
                                  <span className="material-symbols-outlined text-secondary" data-icon={project.icon}>
                                    {project.icon}
                                  </span>
                                )}
                              </div>
                              <p className="text-body-md text-on-surface-variant text-sm leading-relaxed mb-4">
                                {project.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
                              <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-mono">
                                <span className="material-symbols-outlined text-xs" data-icon="terminal">terminal</span>
                                <span>Interactive sandbox</span>
                              </div>
                              <span className="material-symbols-outlined text-secondary group-hover:translate-x-1 transition-transform" data-icon="arrow_outward">
                                arrow_outward
                              </span>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </section>

              </div>
            </motion.div>
          ) : (
            
            /* =========================================================
               LAYOUT 2: COMPACT BENTO / PORTFOLIO LAYOUT
               ========================================================= */
            <motion.div 
              key="bento-layout"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-3xl mx-auto space-y-12"
            >
              
              {/* Technical Stack Card Group */}
              <section id="stack" className="space-y-4 scroll-mt-24">
                <h3 className="font-headline-sm text-base text-primary font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary" data-icon="terminal">terminal</span>
                  Core Tech Stack
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Languages Column */}
                  <div className="bg-primary p-5 rounded-xl border border-outline-variant">
                    <p className="text-primary-fixed/75 font-mono text-[10px] tracking-widest uppercase mb-3">
                      LANGUAGES
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {SKILL_GROUPS[0].skills.map(skill => (
                        <SkillBadge 
                          key={skill}
                          name={skill}
                          variant="dark"
                          isSelected={selectedSkill === skill}
                          onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Frameworks Column */}
                  <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant">
                    <p className="text-on-surface-variant font-mono text-[10px] tracking-widest uppercase mb-3">
                      DATABASES & PROTOCOLS
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {SKILL_GROUPS[1].skills.slice(2, 7).map(skill => (
                        <SkillBadge 
                          key={skill}
                          name={skill}
                          isSelected={selectedSkill === skill}
                          onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Infrastructure Column (Full Span) */}
                  <div className="col-span-1 sm:col-span-2 bg-secondary p-5 rounded-xl border border-secondary-container flex flex-col justify-between">
                    <div>
                      <p className="text-on-secondary font-mono text-[10px] font-bold tracking-widest uppercase mb-3 opacity-90">
                        INFRASTRUCTURE & ORCHESTRATION
                      </p>
                      <div className="flex flex-wrap gap-2.5">
                        <span className="font-mono text-xs text-on-secondary flex items-center gap-1.5 cursor-default bg-white/10 px-2.5 py-1 rounded">
                          <span className="material-symbols-outlined text-xs" data-icon="deployed_code">deployed_code</span>
                          Docker
                        </span>
                        <span className="font-mono text-xs text-on-secondary flex items-center gap-1.5 cursor-default bg-white/10 px-2.5 py-1 rounded">
                          <span className="material-symbols-outlined text-xs" data-icon="auto_settings">settings</span>
                          CI/CD
                        </span>
                        <span className="font-mono text-xs text-on-secondary flex items-center gap-1.5 cursor-default bg-white/10 px-2.5 py-1 rounded">
                          <span className="material-symbols-outlined text-xs" data-icon="hub">hub</span>
                          Microservices
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Journey / Experiences Bento list */}
              <section id="experience" className="space-y-4 scroll-mt-24">
                <h3 className="font-headline-sm text-base text-primary font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary" data-icon="database">database</span>
                  Professional Journey
                </h3>

                <div className="space-y-6 relative">
                  {EXPERIENCE_ITEMS.map((item) => {
                    const highlighted = isExperienceHighlighted(item);
                    return (
                      <div 
                        key={item.id} 
                        className={`relative space-y-2 p-5 rounded-xl border border-outline-variant/40 bg-surface-container-lowest transition-all duration-300 ${
                          highlighted 
                            ? 'ring-2 ring-secondary bg-secondary/5 border-secondary' 
                            : selectedSkill 
                              ? 'opacity-40' 
                              : 'hover:border-secondary-container/40'
                        }`}
                      >
                        <span className="font-mono text-[10px] font-bold tracking-wider text-secondary uppercase block">
                          {item.period}
                        </span>
                        <h4 className="font-headline-sm text-on-surface font-bold text-base leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-on-surface-variant font-semibold text-xs">
                          {item.company}
                        </p>
                        
                        <ul className="space-y-1.5">
                          {item.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex gap-2 items-start text-xs text-on-surface-variant">
                              <span className="material-symbols-outlined text-secondary text-xs mt-0.5" data-icon="chevron_right">
                                chevron_right
                              </span>
                              <span className="leading-relaxed">
                                {bullet}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Engineering Lab Bento list */}
              <section id="projects" className="space-y-4 scroll-mt-24">
                <h3 className="font-headline-sm text-base text-primary font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary" data-icon="code_blocks">code_blocks</span>
                  Engineering Lab
                </h3>

                <div className="space-y-3">
                  {PROJECT_ITEMS.map((project) => {
                    const highlighted = isProjectHighlighted(project);
                    return (
                      <div 
                        key={project.id}
                        onClick={() => setActiveProject(project)}
                        className={`p-5 bg-surface-container rounded-xl border border-outline-variant hover:border-secondary transition-all cursor-pointer space-y-3 ${
                          highlighted 
                            ? 'ring-2 ring-secondary bg-secondary/5 border-secondary' 
                            : selectedSkill 
                              ? 'opacity-40' 
                              : ''
                        }`}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="font-headline-sm text-on-surface font-bold text-base">
                            {project.title}
                          </h4>
                          <span className="material-symbols-outlined text-secondary mt-0.5 shrink-0" data-icon={project.icon}>
                            {project.icon || 'terminal'}
                          </span>
                        </div>
                        <p className="text-on-surface-variant text-xs leading-relaxed">
                          {project.description}
                        </p>
                        {project.tags && (
                          <div className="flex flex-wrap gap-1.5 pt-1.5">
                            {project.tags.map(tag => (
                              <span 
                                key={tag} 
                                className="px-2.5 py-0.5 bg-white text-primary text-[10px] font-bold rounded uppercase tracking-wider"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Philosophy (Dark Callout Box in Bento) */}
              <section className="bg-primary p-8 rounded-2xl text-on-primary-fixed-variant space-y-4">
                <h3 className="font-headline-md text-headline-md text-secondary font-bold">
                  Philosophy
                </h3>
                <p className="font-body-md leading-relaxed text-on-primary-container text-xs md:text-sm">
                  I believe in engineering systems that are invisible—robust enough to run without intervention and modular enough to evolve without friction. My approach is governed by three primary pillars:
                </p>
                
                <div className="grid grid-cols-1 gap-4 mt-6">
                  {PHILOSOPHY_ITEMS.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded bg-primary-container flex items-center justify-center text-secondary shrink-0">
                        <span className="material-symbols-outlined text-sm" data-icon={item.icon}>
                          {item.icon}
                        </span>
                      </span>
                      <span className="font-medium text-surface text-sm">{item.title}</span>
                    </div>
                  ))}
                </div>
              </section>

            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Footer / Copyright Section */}
      <footer className="w-full text-center py-6 border-t border-outline-variant/45 mt-12 text-xs text-on-surface-variant no-print">
        <p>© 2026 Thomas Cherbonnel. Professional Developer CV Portfolio.</p>
        <p className="mt-1 text-[10px] font-mono">// Built cleanly with React 19, Tailwind, & motion</p>
      </footer>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 bg-surface border-t border-outline-variant z-40 no-print">
        <a 
          href="#profile" 
          onClick={(e) => scrollToSection(e, 'profile')}
          className={`flex flex-col items-center justify-center rounded-xl px-3 py-1.5 transition-all duration-200 ${
            activeSection === 'profile' 
              ? 'bg-secondary-container text-on-secondary-container font-bold shadow-xs' 
              : 'text-on-surface-variant hover:text-secondary'
          }`}
        >
          <span className="material-symbols-outlined text-lg" data-icon="person_apron">person_apron</span>
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Profile</span>
        </a>
        <a 
          href="#stack" 
          onClick={(e) => scrollToSection(e, 'stack')}
          className={`flex flex-col items-center justify-center rounded-xl px-3 py-1.5 transition-all duration-200 ${
            activeSection === 'stack' 
              ? 'bg-secondary-container text-on-secondary-container font-bold shadow-xs' 
              : 'text-on-surface-variant hover:text-secondary'
          }`}
        >
          <span className="material-symbols-outlined text-lg" data-icon="terminal">terminal</span>
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Stack</span>
        </a>
        <a 
          href="#experience" 
          onClick={(e) => scrollToSection(e, 'experience')}
          className={`flex flex-col items-center justify-center rounded-xl px-3 py-1.5 transition-all duration-200 ${
            activeSection === 'experience' 
              ? 'bg-secondary-container text-on-secondary-container font-bold shadow-xs' 
              : 'text-on-surface-variant hover:text-secondary'
          }`}
        >
          <span className="material-symbols-outlined text-lg" data-icon="database">database</span>
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Journey</span>
        </a>
        <a 
          href="#projects" 
          onClick={(e) => scrollToSection(e, 'projects')}
          className={`flex flex-col items-center justify-center rounded-xl px-3 py-1.5 transition-all duration-200 ${
            activeSection === 'projects' 
              ? 'bg-secondary-container text-on-secondary-container font-bold shadow-xs' 
              : 'text-on-surface-variant hover:text-secondary'
          }`}
        >
          <span className="material-symbols-outlined text-lg" data-icon="code_blocks">code_blocks</span>
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Projects</span>
        </a>
      </nav>

      {/* Detail Overlay Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetailModal 
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
