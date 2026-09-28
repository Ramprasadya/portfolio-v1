"use client";

import { motion } from "framer-motion";
import { Monitor, Layers, Server } from "lucide-react";

const services = [
  {
    icon: <Monitor className="w-8 h-8" />,
    title: "Web Development",
    description: "End-to-end web applications built with scalable architectures and modern frameworks."
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: "Frontend Engineering",
    description: "Pixel-perfect, responsive, SEO-friendly, Performance-optimized, and accessible interfaces engineered for the best user experience."
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: "Backend APIs",
    description: "Secure, fast, and reliable REST and GraphQL APIs powering complex applications."
  }
];

export function Services() {
  return (
    <section className="py-16 md:py-20 xl:py-32 relative overflow-hidden">
      <div className="absolute inset-0 radial-bg opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-5 md:px-6 xl:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="text-3xl md:text-4xl xl:text-5xl font-bold text-white tracking-tight mb-4"
          >
            Core <span className="text-white/40">Services</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="glass-card group p-6 md:p-8 text-center flex flex-col items-center gap-4 md:gap-6 relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/50 group-hover:scale-110 group-hover:text-white transition-all duration-700 ease-[0.23,1,0.32,1] shadow-[0_0_15px_rgba(255,255,255,0.02)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]">
                {service.icon}
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium text-white mb-2 md:mb-3 tracking-tight">{service.title}</h3>
                <p className="text-sm md:text-base text-white/40 leading-relaxed font-light">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
