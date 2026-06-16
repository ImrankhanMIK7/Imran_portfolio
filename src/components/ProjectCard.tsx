import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiveProjectButton from './LiveProjectButton';

interface ProjectCardProps {
  index: number;
  totalCards: number;
  number: string;
  category: string;
  name: string;
  images: {
    col1_1: string;
    col1_2: string;
    col2: string;
  };
  link?: string;
}

export default function ProjectCard({
  index,
  totalCards,
  number,
  category,
  name,
  images,
  link,
}: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[85vh] flex items-start justify-center"
      style={{
        zIndex: index + 10,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
        style={{
          scale,
          top: `calc(clamp(96px, 12vw, 128px) + ${index * 28}px)`,
        }}
        className="sticky top-24 md:top-32 w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] pb-6 sm:pb-8 md:pb-10"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D7E2EA]/10 pb-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-sans font-black text-white leading-none text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6.5rem]">
              {number}
            </span>
            <div className="flex flex-col">
              <span className="font-fira text-[9px] sm:text-[10px] tracking-widest text-[#D7E2EA]/60 uppercase">
                {category}
              </span>
              <h3 className="font-space font-bold text-white uppercase text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide mt-0.5">
                {name}
              </h3>
            </div>
          </div>
          <div>
            <LiveProjectButton onClick={() => link && window.open(link, '_blank')} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-10 gap-3 sm:gap-4 mt-4 h-full min-h-0 overflow-hidden">
          <div className="md:col-span-4 hidden md:flex flex-col gap-3 sm:gap-4 h-full justify-between">
            <div 
              className="relative w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-slate-950"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              <img
                src={images.col1_1}
                alt={`${name} preview 1`}
                className="w-full h-full object-contain bg-slate-950/40 transition-transform duration-500 hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
            <div 
              className="relative w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] flex-1 min-h-0 bg-slate-950"
              style={{ maxHeight: 'clamp(160px, 22vw, 340px)' }}
            >
              <img
                src={images.col1_2}
                alt={`${name} preview 2`}
                className="w-full h-full object-contain bg-slate-950/40 transition-transform duration-500 hover:scale-[1.04]"
                loading="lazy"
              />
            </div>
          </div>

          <div className="md:col-span-6 relative w-full h-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-slate-950">
            <img
              src={images.col2}
              alt={`${name} main preview`}
              className="w-full h-full object-contain bg-slate-950/40 transition-transform duration-500 hover:scale-[1.04]"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
