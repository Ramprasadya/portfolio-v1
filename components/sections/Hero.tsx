"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Terminal } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] max-w-7xl w-full mx-auto flex items-center justify-center pt-32 pb-16 md:pt-40 md:pb-20 xl:py-32 overflow-hidden radial-bg"
    >
      {/* Background abstract element */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/5 rounded-full blur-[100px] md:blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-white/5 rounded-full blur-[120px] md:blur-[150px] mix-blend-screen" />
      </div>

      <div className=" mx-auto px-5 md:px-6 xl:px-8 w-full relative z-10  gap-12 lg:gap-16 items-center min-w-0">
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
            Front-End Developer with 2+ years of experience in developing responsive web applications using React.js, Next.js, TypeScript, and Tailwind CSS.
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
       
      </div>
    </section>
  );
}
