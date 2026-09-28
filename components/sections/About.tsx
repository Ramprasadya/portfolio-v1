"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-16 md:py-20 xl:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-6 xl:px-8 grid lg:grid-cols-2 gap-10 xl:gap-20 items-center">
        {/* Left: Description */}
        <div className="flex flex-col gap-4 md:gap-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 text-white tracking-tight">
              Engineering the <span className="text-white/40">Future</span>
            </h2>
            <div className="space-y-6 text-base md:text-lg text-white/50 font-light leading-relaxed max-w-[600px] mx-auto lg:mx-0">
              <p>
                With 2+ years of dedicated experience, I have developed
                a deep understanding of building robust, scalable, and high-performance
                web applications using React.js, Next.js, and the MERN stack.
              </p>
              <p>
                My approach combines clean architecture with pixel-perfect design,
                SEO-friendly, Performance-optimized, and accessible interfaces,
                ensuring that every project not only functions flawlessly under load
                but also delivers an exceptional user experience.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right: Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            delay={0.1}
            value="2+"
            label="Years Experience"
          />
          <StatCard
            delay={0.2}
            value="20+"
            label="Projects Delivered"
          />
          <StatCard
            delay={0.3}
            value="10+"
            label="Core Technologies"
          />
          <StatCard
            delay={0.4}
            value="100%"
            label="Responsive Design"
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({ delay, value, label }: { delay: number; value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay }}
      className="glass-card p-6 md:p-8 flex flex-col items-center justify-center text-center gap-2"
    >
      <div className="text-3xl md:text-4xl xl:text-5xl font-bold text-white tracking-tighter text-glow">
        {value}
      </div>
      <div className="text-[10px] md:text-xs font-semibold text-white/40 uppercase tracking-[0.2em] leading-snug">
        {label}
      </div>
    </motion.div>
  );
}
