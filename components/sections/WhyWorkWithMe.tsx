"use client";

import { motion } from "framer-motion";
import { Zap, Search, LayoutTemplate, Box, Database, Smartphone, Palette, Gauge } from "lucide-react";

const reasons = [
  { icon: <Zap />, title: "Lightning Fast", desc: "Optimized for speed, ensuring sub-second load times and peak performance." },
  { icon: <Search />, title: "SEO Optimized", desc: "Structured data and semantic markup to boost your search engine visibility." },
  { icon: <LayoutTemplate />, title: "Clean Architecture", desc: "Maintainable, scalable, and robust codebases designed for longevity." },
  { icon: <Box />, title: "Reusable Components", desc: "Modular design systems that grow with your project requirements." },
  { icon: <Database />, title: "Scalable Backend", desc: "High-performance data management that handles growth seamlessly." },
  { icon: <Smartphone />, title: "Responsive Design", desc: "Flawless experiences across all devices from mobile to desktop." },
  { icon: <Palette />, title: "Modern UI", desc: "Beautiful, intuitive interfaces that delight users at every interaction." },
  { icon: <Gauge />, title: "Performance First", desc: "Rigorous optimization to ensure your app stays fast and efficient." }
];

export function WhyWorkWithMe() {
  return (
    <section className="py-16 md:py-20 xl:py-32 relative">
      <div className="max-w-[1400px] mx-auto px-5 md:px-6 xl:px-8">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="text-3xl md:text-4xl xl:text-5xl font-bold text-white tracking-tight"
          >
            Why Partner <span className="text-white/40">With Me?</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="glass-card p-6 md:p-8 flex gap-6 group hover:border-white/10 transition-colors"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-white/[0.05] group-hover:border-white/10 transition-all duration-500">
                {reason.icon}
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 tracking-tight group-hover:text-white/90">{reason.title}</h3>
                <p className="text-sm md:text-base text-white/40 leading-relaxed font-light">
                  {reason.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
