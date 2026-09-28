"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Layout,
  Globe,
  Terminal,
  Cpu,
  Layers,
  Workflow
} from "lucide-react";

const skills = [
  {
    icon: <Code2 className="w-6 h-6" />,
    name: "Languages",
    tags: ["JavaScript", "TypeScript", "HTML", "CSS"]
  },
  {
    icon: <Layout className="w-6 h-6" />,
    name: "Libraries & Frameworks",
    tags: ["React.js", "Redux", "Zustand", "Tailwind CSS", "Material UI", "Bootstrap"]
  },
  {
    icon: <Server className="w-6 h-6" />,
    name: "Backend & Database",
    tags: ["Node.js", "Express.js", "MongoDB", "REST APIs"]
  },
  {
    icon: <Layers className="w-6 h-6" />,
    name: "DevOps & Deployment",
    tags: ["Docker", "AWS", "Vercel", "Netlify", "Render"]
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    name: "Developer Tools",
    tags: ["Git", "GitHub", "Postman", "VS Code", "GCP"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-16 md:py-20 xl:py-32 relative">
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
              Technical <span className="text-white/40">Arsenal</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="text-base md:text-lg text-white/50 max-w-2xl font-light mx-auto md:mx-0"
            >
              A curated set of tools and frameworks I use to build robust, scalable,
              and performant applications.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_rgba(255,255,255,0.02)_28%,_rgba(0,0,0,0.12)_100%)] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_18px_55px_rgba(59,130,246,0.12)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/[0.09] group-hover:text-white">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-semibold tracking-tight text-white">{skill.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-xs font-medium text-white/70 backdrop-blur-sm transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.04] hover:text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
