"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

const projects = [
  {
    title: "RamWear : E-Commerce",
    description: "Built a full-featured fashion e-commerce platform with a seamless shopping experience. Implemented secure user authentication, Razorpay payments, COD support, and an admin panel.",
    tech: ["React Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/Ramprasadya/ramwear",
    live: "https://ramwear.vercel.app/",
    image: "/Ecomeerce.png"
  },
  {
    title: "AnimateIcons (Open Source)",
    description: "Contributed two animated icons  to the open-source project AnimateIcons. Improved UI consistency and enhanced the icon animation library's component collection.",
    tech: ["React", "CSS Animations", "Motion/React", "Shadcn", "Lucide"],
    github: "https://github.com/Avijit07x/animateicons",
    live: "https://animateicons.in",
    image: "/animateicons.png"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-20 xl:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-6 xl:px-8">
        <div className="mb-12 md:mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="text-3xl md:text-4xl xl:text-5xl font-bold text-white tracking-tight mb-4"
            >
              Featured <span className="text-white/40">Work</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="text-base md:text-lg text-white/50 max-w-2xl font-light mx-auto md:mx-0"
            >
              A selection of projects that showcase my ability to build complex,
              production-ready applications.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="glass-card group overflow-hidden flex flex-col h-full relative"
            >
              {/* Thumbnail Area */}
              <div className="w-full aspect-[16/10] overflow-hidden relative bg-black/50 border-b border-white/5 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent mix-blend-overlay z-10" />
                <div 
                  className="w-full h-full relative group-hover:scale-105 transition-transform duration-1000 ease-[0.23,1,0.32,1] flex items-center justify-center bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
                </div>
              </div>

              {/* Content Area */}
              <div className="flex flex-col flex-1 p-6 lg:p-8 bg-gradient-to-b from-white/[0.02] to-transparent">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 tracking-tight group-hover:text-white/90 transition-colors">{project.title}</h3>
                <p className="text-white/50 text-sm md:text-base mb-6 leading-relaxed font-light flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-white/60 text-xs font-medium tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  <Link href={project.github} target="_blank" className="flex-1">
                    <Button variant="secondary" className="w-full gap-2 text-xs">
                      <Github className="w-3.5 h-3.5" />
                      Code
                    </Button>
                  </Link>
                  <Link href={project.live} target="_blank" className="flex-1">
                    <Button variant="default" className="w-full gap-2 text-xs">
                      <ExternalLink className="w-3.5 h-3.5 text-black" />
                      Live
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
