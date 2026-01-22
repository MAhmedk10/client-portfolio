"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

// --- 1. DATA CONFIGURATION ---
// Add your real Google Drive links and thumbnail image paths here
const projects = [
  // --- SHORT FORM PROJECTS (Vertical) ---
  {
    id: 1,
    title: "Fashion Reels 2024",
    category: "Social Media",
    type: "short", 
    image: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=", // Replace with your image path
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    thumbnailColor: "bg-purple-900" // Fallback color if image fails
  },
  {
    id: 2,
    title: "Product Teaser",
    category: "Commercial",
    type: "short",
    image: "/images/thumbnails/reel2.jpg", 
    videoUrl: "YOUR_DRIVE_LINK_HERE", 
    thumbnailColor: "bg-blue-900"
  },
  {
    id: 3,
    title: "Travel Vlog Short",
    category: "Lifestyle",
    type: "short",
    image: "/images/thumbnails/reel3.jpg", 
    videoUrl: "YOUR_DRIVE_LINK_HERE", 
    thumbnailColor: "bg-emerald-900"
  },
  
  // --- LONG FORM PROJECTS (Horizontal) ---
  {
    id: 4,
    title: "Corporate Documentary",
    category: "Documentary",
    type: "long", 
    image: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=", 
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
    thumbnailColor: "bg-amber-900"
  },
  {
    id: 5,
    title: "Full Brand Campaign",
    category: "Commercial",
    type: "long",
    image: "/images/thumbnails/ad1.jpg", 
    videoUrl: "YOUR_DRIVE_LINK_HERE", 
    thumbnailColor: "bg-rose-900"
  },
];

// --- 2. CARD COMPONENT ---
const ProjectCard = ({ project, onPlayVideo, isVertical }: any) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className={`group relative w-full overflow-hidden rounded-2xl cursor-pointer bg-neutral-900 border border-white/5 ${
        // Dynamic Aspect Ratio: Tall for shorts, Wide for long form
        isVertical ? "aspect-9/16" : "aspect-video"
      }`}
      onClick={() => onPlayVideo(project)}
    >
      {/* Thumbnail */}
      <div className="absolute inset-0">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className={`absolute inset-0 ${project.thumbnailColor}`} />
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
      </div>

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.div
          whileHover={{ scale: 1.15 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-black shadow-xl backdrop-blur-sm"
        >
          <Play size={24} className="ml-1 fill-black" />
        </motion.div>
      </div>

      {/* Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
            {project.category}
          </span>
          <h3 className="text-xl font-bold text-white leading-tight">
            {project.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

// --- 3. MAIN EXPORTED COMPONENT ---
interface WorkShowcaseProps {
  handlePlayVideo: (project: any) => void;
}

const WorkShowcase = ({ handlePlayVideo }: WorkShowcaseProps) => {
  const [activeTab, setActiveTab] = useState<"short" | "long">("short");

  const filteredProjects = projects.filter((p) => p.type === activeTab);

  return (
    <section id="work" className="px-6 py-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Toggle Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-violet-500 to-transparent" />
              <span className="text-sm font-medium text-violet-400 uppercase tracking-widest">
                Selected Work
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              Featured <br />
              <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
          </div>

          {/* Toggle Switch */}
          <div className="bg-white/5 p-1.5 rounded-xl border border-white/10 flex items-center gap-1 backdrop-blur-sm">
            {["short", "long"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "short" | "long")}
                className={`relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab ? "text-white" : "text-neutral-400 hover:text-white"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-neutral-800 rounded-lg shadow-sm border border-white/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 capitalize">
                  {tab === "short" ? "Short Form" : "Long Form"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Grid */}
        <motion.div
          layout
          className={`grid gap-8 ${
            activeTab === "short"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" // 3 Columns for Short Form
              : "grid-cols-1 md:grid-cols-2" // 2 Columns for Long Form
          }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onPlayVideo={handlePlayVideo}
                isVertical={activeTab === "short"}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-neutral-500">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkShowcase;