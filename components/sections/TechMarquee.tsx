"use client";

import Marquee from "react-fast-marquee";

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "Docker",
  "AWS",
  "Redux",
  "TailwindCSS"
];

export function TechMarquee() {
  return (
    <section className="py-16 md:py-20 xl:py-32 border-y border-white/5 bg-black/50 relative z-10 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10" />
      
      <div className="max-w-[1400px] mx-auto px-5 md:px-6 xl:px-8 mb-8 md:mb-12 text-center">
        <p className="text-xs md:text-sm font-medium text-white/40 tracking-[0.2em] uppercase">
          Powered By Modern Technologies
        </p>
      </div>

      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        <div className="flex items-center gap-12 md:gap-24 xl:gap-32 pr-12 md:pr-24 xl:pr-32">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="text-xl md:text-2xl xl:text-3xl font-bold text-white/20 hover:text-white/60 transition-colors cursor-default"
            >
              {tech}
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
}
