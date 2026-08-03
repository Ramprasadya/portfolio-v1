"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Frontend Developer",
    company: "Catabatic Technology Pvt Ltd",
    date: "Jan 2026 - Present",
    description: "Developed and maintained scalable travel web applications using Next.js. Built and integrated server-side APIs for dynamic data handling, authentication, booking workflows. Managed multiple client websites from a shared codebase.",
  },
  {
    role: "Frontend Developer",
    company: "Tapop Smart Tech PVT LTD",
    date: "Aug 2024 - Dec 2025",
    description: "Implemented a 3-tier subscription plan system with feature-level access control. Developed scalable website templates, expanding 5 core templates into 30+ interactive layouts. Built 40+ reusable UI components with API-driven data.",
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-20 xl:py-32 relative">
      <div className="max-w-[1000px] mx-auto px-5 md:px-6 xl:px-8">
        <div className="mb-16 md:mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="text-3xl md:text-4xl xl:text-5xl font-bold text-white tracking-tight mb-4"
          >
            Professional <span className="text-white/40">Journey</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 xl:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent xl:-translate-x-1/2" />

          <div className="flex flex-col gap-10 md:gap-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={exp.role + exp.date}
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                  className={`flex flex-col xl:flex-row relative ${
                    isEven ? "xl:justify-end" : ""
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-[-5px] xl:left-1/2 w-3 h-3 rounded-full bg-black border border-white/30 xl:-translate-x-1/2 top-8 z-10 shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                  
                  {/* Content Card */}
                  <div
                    className={`w-full xl:w-[45%] pl-8 md:pl-10 xl:pl-0 ${
                      isEven ? "xl:text-left" : "xl:text-right xl:pr-10"
                    }`}
                  >
                    <div className="glass-card p-6 md:p-8 group hover:border-white/10 transition-colors">
                      <div className="text-white/40 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                        {exp.date}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1 tracking-tight">
                        {exp.role}
                      </h3>
                      <h4 className="text-sm md:text-base text-white/50 mb-3 md:mb-4 font-medium">
                        {exp.company}
                      </h4>
                      <p className="text-sm text-white/40 leading-relaxed font-light">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
