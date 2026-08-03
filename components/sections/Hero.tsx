"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center pt-32 pb-16 md:pt-40 md:pb-20 xl:py-32 overflow-hidden radial-bg"
    >
      {/* Background abstract element */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/5 rounded-full blur-[100px] md:blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-white/5 rounded-full blur-[120px] md:blur-[150px] mix-blend-screen" />
      </div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-6 xl:px-8 w-full relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-w-0">
        {/* Left Content */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6 md:gap-8 min-w-0 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs md:text-sm text-white/70 max-w-full overflow-hidden"
          >
            <span className="w-2 h-2 shrink-0 rounded-full bg-green-500 animate-pulse" />
            <span className="truncate">Available for new opportunities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[36px] sm:text-[40px] leading-[1.1] md:text-6xl lg:text-[80px] xl:text-[96px] font-bold tracking-tight text-white break-words w-full"
          >
            Hi, I&apos;m <span className="text-white/50">Ramprasad.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg xl:text-xl text-white/70 max-w-[600px] font-light leading-relaxed break-words w-full"
          >
            Front-End Developer with 2 years of experience in developing responsive web applications using React.js, Next.js, TypeScript, and Tailwind CSS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center w-full lg:w-auto gap-4 pt-4 min-w-0"
          >
            <Button size="lg" className="rounded-full w-full sm:w-auto gap-2 min-w-0">
              <a href="#projects" className="flex items-center gap-2 ">
                <span className="truncate">View Projects</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </a>
            </Button>
            <Button size="lg" variant="secondary" className="rounded-full w-full sm:w-auto gap-2 min-w-0">
              <a href="#contact" className="flex items-center gap-2 ">
                <Terminal className="w-4 h-4 shrink-0" />
                <span className="truncate">Contact Me</span>
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Right Visual - Abstract Premium Glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="flex justify-center lg:justify-end relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full mt-8 lg:mt-0 opacity-80 md:opacity-100 pointer-events-none min-w-0"
        >
          <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] aspect-square flex items-center justify-center">
            {/* Soft pulsing rings */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
              className="absolute inset-0 rounded-full border border-white/5 bg-gradient-to-tr from-white/5 to-transparent blur-[2px]"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, delay: 1 }}
              className="absolute inset-4 sm:inset-8 rounded-full border border-white/10 bg-white/[0.02] blur-[4px]"
            />

            {/* Core Orb */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
              className="absolute inset-10 sm:inset-16 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-white/5 backdrop-blur-3xl border border-white/10 shadow-[inset_0_0_40px_rgba(255,255,255,0.05),0_0_80px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_70%)]" />
              <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent absolute left-1/2 -translate-x-1/2 rotate-45" />
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent absolute top-1/2 -translate-y-1/2 rotate-45" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
