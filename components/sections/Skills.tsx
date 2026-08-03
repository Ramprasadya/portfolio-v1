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
    description: "JavaScript, TypeScript, HTML, CSS"
  },
  {
    icon: <Layout className="w-6 h-6" />,
    name: "Libraries & Frameworks",
    description: "React.js, Redux, Zustand, Tailwind CSS, Material UI, Bootstrap"
  },
  {
    icon: <Server className="w-6 h-6" />,
    name: "Backend & Database",
    description: "Node.js, Express.js, MongoDB, REST APIs"
  },
  {
    icon: <Layers className="w-6 h-6" />,
    name: "DevOps & Deployment",
    description: "Docker, AWS (EC2, S3, Route 53), Vercel, Netlify, Render"
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    name: "Developer Tools",
    description: "Git, GitHub, Postman, VS Code, Google Cloud Platform"
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-16 md:py-20 xl:py-32 relative">
      <div className="max-w-[1400px] mx-auto px-5 md:px-6 xl:px-8">
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
              className="glass-card group p-6 flex flex-col gap-4 relative overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-white/[0.08] transition-all duration-500">
                {skill.icon}
              </div>
              <div className="relative z-10">
                <h3 className="text-lg font-medium text-white mb-1.5 tracking-tight">{skill.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">{skill.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
