"use client";

import { Play, Zap, Globe, Layers, ArrowUpRight, Instagram, Twitter, Linkedin, Sparkles, Cpu, BarChart3, Clock, Award, Volume2, Video, Settings, Film, Eye, X, ChevronDown, Star, Users, Target, Edit3, Monitor, Headphones, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import ChatWidget from "./components/ChatWidget";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

import type { Variants } from "framer-motion";

// Animation Variants - Properly typed
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    } 
  }
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.6,
      ease: "easeOut" 
    } 
  }
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.7, 
      ease: "easeOut" 
    } 
  }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8,
      ease: "easeOut" 
    } 
  }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.8,
      ease: "easeOut" 
    } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};


// Video Modal Component
const VideoModal = ({ 
  isOpen, 
  onClose, 
  videoUrl, 
  title, 
  description 
}: { 
  isOpen: boolean, 
  onClose: () => void,
  videoUrl: string,
  title: string,
  description: string
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden bg-black border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-lg transition-all"
            >
              <X size={24} />
            </button>
            
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-cyan-900/20" />
            
            {isPlaying ? (
              <div className="relative h-full">
                <iframe
                  src={videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative h-full flex flex-col items-center justify-center p-12">
                <motion.button
                  onClick={() => setIsPlaying(true)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center mb-8 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all"
                >
                  <Play size={40} fill="white" className="ml-2" />
                </motion.button>
                
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {title}
                </h3>
                <p className="text-neutral-400 mb-8 max-w-lg text-center">{description}</p>
                <div className="text-sm text-neutral-500">Click to play • Fullscreen available</div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Project Card Component
const ProjectCard = ({ 
  project, 
  index,
  onPlayVideo 
}: { 
  project: any, 
  index: number,
  onPlayVideo: (project: any) => void 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={index}
      variants={scaleUp}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer"
      onClick={() => onPlayVideo(project)}
    >
      {/* Video Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <div className={`absolute inset-0 ${project.thumbnailColor} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <Play size={24} className="text-white ml-1" />
          </motion.div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <div className="text-xs font-medium px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
            {project.category}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-sm text-neutral-400">{project.client}</p>
          </div>
          <motion.div
            animate={{ rotate: isHovered ? 45 : 0 }}
            className="p-2 rounded-full bg-white/10"
          >
            <ExternalLink size={16} />
          </motion.div>
        </div>
        
        <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <div className="text-neutral-400">Views</div>
              <div className="font-medium">{project.stats}</div>
            </div>
            <div className="text-sm">
              <div className="text-neutral-400">Duration</div>
              <div className="font-medium">{project.duration}</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            {project.tags.map((tag: string, i: number) => (
              <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [hoveredWork, setHoveredWork] = useState<number | null>(null);

  // Parallax effects
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  // Sample client videos (YouTube/Vimeo URLs)
  const projects = [
    {
      id: 1,
      title: "Nike - Run Forever",
      client: "Nike Inc.",
      category: "Short form",
      description: "Dynamic commercial campaign showcasing Nike's latest running collection with high-energy editing and color grading.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video URL
      stats: "2.5M+ Views",
      duration: "60s",
      tags: ["4K", "Color Grading", "VFX"],
      thumbnailColor: "bg-gradient-to-br from-orange-500/20 to-rose-600/20"
    },
    {
      id: 2,
      title: "TechReview 2024",
      client: "TechReview Channel",
      category: "Short form",
      description: "8-episode series with complex animations and motion graphics explaining cutting-edge technology.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      stats: "1.8M+ Views",
      duration: "8 Episodes",
      tags: ["Animation", "Motion", "Series"],
      thumbnailColor: "bg-gradient-to-br from-blue-500/20 to-teal-500/20"
    },
    {
      id: 3,
      title: "Neon Nights",
      client: "Universal Music",
      category: "Short form",
      description: "Award-winning music video featuring neon aesthetics and complex visual effects synchronized to the beat.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      stats: "15M+ Views",
      duration: "3:45",
      tags: ["Animation", "motion", "VFX"],
      thumbnailColor: "bg-gradient-to-br from-purple-500/20 to-pink-500/20"
    },
    {
      id: 4,
      title: "Future of AI",
      client: "National Geographic",
      category: "Long form",
      description: "Feature documentary exploring artificial intelligence with interviews, b-roll, and explanatory animations.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      stats: "5.2M+ Views",
      duration: "25min",
      tags: ["Documentary", "Interview", "Animation"],
      thumbnailColor: "bg-gradient-to-br from-emerald-500/20 to-green-500/20"
    },
    {
      id: 5,
      title: "Cosmic Journey",
      client: "Indie Film Festival",
      category: "Long form",
      description: "Sci-fi short film with extensive visual effects and atmospheric sound design.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      stats: "Award Winning",
      duration: "12min",
      tags: ["Sci-Fi", "VFX", "Sound"],
      thumbnailColor: "bg-gradient-to-br from-indigo-500/20 to-violet-500/20"
    },
    {
      id: 6,
      title: "Brand Identity 2024",
      client: "Corporate Client",
      category: "Long form",
      description: "Corporate brand video highlighting company values and services with professional narration.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      stats: "300% ROI",
      duration: "90s",
      tags: ["Corporate", "Brand", "Marketing"],
      thumbnailColor: "bg-gradient-to-br from-amber-500/20 to-orange-500/20"
    }
  ];

  const stats = [
    { value: "100M+", label: "Views Generated", icon: Eye },
    { value: "500+", label: "Projects Delivered", icon: Film },
    { value: "48h", label: "Avg Turnaround", icon: Clock },
    { value: "45%", label: "Avg Retention", icon: BarChart3 },
  ];

  // Function handlers
  const handlePlayVideo = (videoData: any) => {
    setSelectedVideo(videoData);
    setIsVideoOpen(true);
  };

  const handleOpenShowreel = () => {
    handlePlayVideo({
      title: "Studio Showreel 2024",
      description: "A compilation of our best work from 2024 featuring commercial, documentary, and creative projects.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual showreel URL
    });
  };

  const handleViewAllProjects = () => {
    // In a real app, this would navigate to a portfolio page
    alert("View all projects - This would navigate to a detailed portfolio page");
  };

  const handleStartProject = () => {
    window.location.href = "mailto:hello@studio.com?subject=New%20Project%20Inquiry&body=Hello,%20I'm%20interested%20in%20starting%20a%20project.";
  };

  const handleScheduleCall = () => {
    // In a real app, this would open a calendar booking widget
    window.open("https://calendly.com/studio/consultation", "_blank");
  };

  const handleContactEmail = () => {
    window.location.href = "mailto:hello@studio.com";
  };

  const handleSocialLink = (platform: string) => {
    const urls: Record<string, string> = {
      instagram: "https://instagram.com/ractoresa_",
      twitter: "https://twitter.com/studio",
      linkedin: "https://linkedin.com/company/studio"
    };
    window.open(urls[platform], "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">
      {/* Minimal Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-black/40 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="h-2 w-2 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500" />
              <span className="text-xl font-bold tracking-tight">STUDIO</span>
            </button>

            <div className="hidden md:flex items-center gap-8">
              {['Work', 'Process', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.getElementById(item.toLowerCase());
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            <button 
              onClick={handleStartProject}
              className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Start Project
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-violet-500/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-7xl text-center"
        >
          {/* Badge */}
          <motion.div 
            variants={fadeInUp}
            className="mb-12 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-neutral-300">
                ACCEPTING 2025 CLIENTS
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter mb-8"
          >
            <span className="text-white">VISUAL</span>
            <br />
            <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              STORYTELLING
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="mx-auto mt-8 max-w-2xl text-lg text-neutral-400 leading-relaxed">
            We craft cinematic experiences that captivate audiences and deliver measurable results. 
            Premium editing for visionary creators and forward-thinking brands.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleOpenShowreel}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 font-medium text-white"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Play size={18} />
                Watch Showreel
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button 
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full border border-white/20 bg-transparent px-8 py-4 font-medium text-white hover:bg-white/5 transition-colors"
            >
              <span className="flex items-center gap-3">
                View Portfolio
                <ArrowUpRight size={18} />
              </span>
            </button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={staggerContainer}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleUp}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown size={20} className="text-neutral-500" />
        </motion.div>
      </section>

      {/* Work Showcase - With Video Cards */}
      <section id="work" className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeInUp} className="mb-16">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px w-12 bg-gradient-to-r from-violet-500 to-transparent" />
                    <span className="text-sm font-medium text-violet-400 uppercase tracking-widest">Selected Work</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-bold">
                    <span className="text-white">Featured</span>
                    <br />
                    <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                      Projects
                    </span>
                  </h2>
                </div>
                <button 
                  onClick={handleViewAllProjects}
                  className="text-sm text-neutral-400 hover:text-white transition-colors hidden md:flex items-center gap-2"
                >
                  View All
                  <ArrowUpRight size={16} />
                </button>
              </div>

              {/* Work Grid with Videos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onPlayVideo={handlePlayVideo}
                  />
                ))}
              </div>

              <button 
                onClick={handleViewAllProjects}
                className="mt-8 w-full md:hidden rounded-full border border-white/20 px-6 py-3 text-white hover:bg-white/5 transition-colors"
              >
                View All Projects
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="process" className="px-6 py-24 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                <span className="text-sm font-medium text-cyan-400 uppercase tracking-widest">Methodology</span>
                <div className="h-px w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                <span className="text-white">Our Creative</span>
                <br />
                <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                  Process
                </span>
              </h2>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                A streamlined workflow ensuring quality and efficiency from concept to delivery
              </p>
            </motion.div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Edit3,
                  title: "Concept & Strategy",
                  description: "We analyze your vision and develop a creative strategy tailored to your audience.",
                  step: "01",
                  
                },
                {
                  icon: Settings,
                  title: "Production & Editing",
                  description: "High-end editing with advanced VFX, color grading, and sound design.",
                  step: "02",
                
                },
                {
                  icon: Volume2,
                  title: "Final Polish & Delivery",
                  description: "Multi-platform optimization with analytics and performance insights.",
                  step: "03",
                  
                }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  variants={scaleUp}
                  whileHover={{ y: -8 }}
                  className="relative p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm cursor-pointer"
                  onClick={process.action}
                >
                  <div className="absolute -top-4 left-8 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center font-bold">
                    {process.step}
                  </div>
                  
                  <div className="pt-4">
                    <process.icon className="w-10 h-10 mb-6 text-violet-400" />
                    <h3 className="text-2xl font-bold mb-4">{process.title}</h3>
                    <p className="text-neutral-400 leading-relaxed">
                      {process.description}
                    </p>
                    
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-500">Timeline</span>
                        <span className="font-medium">2-5 days</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              ref={targetRef}
              style={{ opacity, scale }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-violet-900/20 to-cyan-900/20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20">
                      <Cpu size={24} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-bold">State-of-the-Art Studio</p>
                      <div className="flex items-center gap-2 text-sm text-neutral-400">
                        <MapPin size={12} />
                        <span>New York City</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
              >
                Studio <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Excellence</span>
                <br />in Every Frame
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-neutral-300 mb-10 leading-relaxed"
              >
                We combine cutting-edge technology with artistic vision to engineer visual experiences that resonate and convert.
              </motion.p>

              <div className="space-y-4 mb-12">
                {[
                  { icon: Zap, text: "Real-time collaboration with clients worldwide" },
                  { icon: Globe, text: "Multi-platform delivery optimized for all devices" },
                  { icon: Layers, text: "Advanced VFX and motion graphics pipeline" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
                      <item.icon size={20} className="text-cyan-400" />
                    </div>
                    <span className="text-lg">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => handleSocialLink('instagram')}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <Instagram size={20} />
                </button>
                <button 
                  onClick={() => handleSocialLink('twitter')}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <Twitter size={20} />
                </button>
                <button 
                  onClick={() => handleSocialLink('linkedin')}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <Linkedin size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="text-white">Ready to</span>
            <br />
            <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
              Elevate Your Vision?
            </span>
          </h2>
          
          <p className="text-lg text-neutral-400 mb-12 max-w-2xl mx-auto">
            Let's create something extraordinary together. Get in touch for a free creative consultation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartProject}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-lg font-medium text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] transition-all"
            >
              Start Your Project
            </button>
            <button
              onClick={handleScheduleCall}
              className="px-10 py-4 rounded-full border border-white/20 bg-transparent text-lg font-medium text-white hover:bg-white/5 transition-colors"
            >
              Schedule Call
            </button>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-neutral-500">
            <a href="mailto:hello@studio.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={16} />
              hello@studio.com
            </a>
            <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={16} />
              +1 (555) 123-4567
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-20 border-t border-white/10 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 flex flex-col items-start justify-between gap-10 md:flex-row md:items-end"
          >
            <div>
              <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter text-white">
                Let's Create
              </h2>
              <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-400">
                Together
              </h2>
            </div>
            
            <button
              onClick={handleContactEmail}
              className="group flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all"
            >
              <ArrowUpRight size={48} className="transition-transform group-hover:rotate-45" />
            </button>
          </motion.div>

          <div className="grid gap-10 border-t border-white/10 pt-10 md:grid-cols-4">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-2 w-2 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500" />
                <span className="text-2xl font-bold">STUDIO</span>
              </div>
              <p className="max-w-sm text-neutral-500 mb-6">
                Crafting visual narratives for the digital age. Based in NYC, working globally.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => handleSocialLink('instagram')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Instagram
                </button>
                <button 
                  onClick={() => handleSocialLink('twitter')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Twitter
                </button>
                <button 
                  onClick={() => handleSocialLink('linkedin')}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </button>
              </div>
            </div>
            
            {['Work', 'Process', 'About', 'Contact'].map((title, idx) => (
              <div key={idx}>
                <h5 className="mb-4 font-medium text-white">{title}</h5>
                <ul className="space-y-3 text-neutral-500">
                  {projects.slice(idx * 1, idx * 1 + 2).map((project) => (
                    <li key={project.id}>
                      <button 
                        onClick={() => handlePlayVideo(project)}
                        className="hover:text-violet-400 transition-colors text-left"
                      >
                        {project.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center text-sm text-neutral-600">
            © 2026 EESA Studio. All rights reserved.
          </div>
        </div>
      </footer>

      <ChatWidget />
      
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={selectedVideo?.videoUrl || ""}
        title={selectedVideo?.title || "Video Preview"}
        description={selectedVideo?.description || "Watch our featured work"}
      />
    </div>
  );
}