"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Discover", desc: "Understanding the problem, defining goals, and architecting the perfect solution." },
  { num: "02", title: "Design", desc: "Crafting wireframes and high-fidelity mockups with a focus on user experience." },
  { num: "03", title: "Develop", desc: "Writing clean, scalable code with modern frameworks and best practices." },
  { num: "04", title: "Deploy", desc: "Launching the product with CI/CD pipelines and performance monitoring." }
];

export function Process() {
  return (
    <section className="py-16 md:py-20 xl:py-32 relative overflow-hidden border-y border-white/[0.02]">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-5 md:px-6 xl:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="text-3xl md:text-4xl xl:text-5xl font-bold text-white tracking-tight"
          >
            Development <span className="text-white/40">Process</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-10 left-12 right-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="relative flex flex-col items-center text-center gap-6"
            >
              <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center relative z-10 bg-black/50 text-2xl font-bold text-white/40 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_0_20px_rgba(255,255,255,0.02)] rotate-3 hover:rotate-0 transition-transform duration-500">
                {step.num}
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3 tracking-tight">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-[250px] mx-auto font-light">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
