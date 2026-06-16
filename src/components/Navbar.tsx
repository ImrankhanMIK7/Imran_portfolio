import FadeIn from './FadeIn';

export default function Navbar() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <FadeIn delay={0} y={-20} as="nav" className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between py-1 px-4 sm:py-2 sm:px-6 select-none bg-black/15 backdrop-blur-md border-b border-white/5">
      {/* Left logo + wordmark */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScrollTo('home')}>
        <svg className="w-[26px] h-[26px]" viewBox="0 0 256 256" fill="#ffffff">
          <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
        </svg>
        <span className="text-white text-base sm:text-lg md:text-xl font-playfair italic font-medium tracking-tight whitespace-nowrap">
          MOHAMMAD IMRAN KHAN
        </span>
      </div>

      {/* Center pill */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
        <button 
          onClick={() => handleScrollTo('experience')}
          className="text-white/80 hover:bg-white/20 hover:text-white transition-colors px-4 py-1.5 rounded-full text-sm font-medium"
        >
          Experience
        </button>
        <button 
          onClick={() => handleScrollTo('about')}
          className="text-white/80 hover:bg-white/20 hover:text-white transition-colors px-4 py-1.5 rounded-full text-sm font-medium"
        >
          About
        </button>
        <button 
          onClick={() => handleScrollTo('projects')}
          className="text-white/80 hover:bg-white/20 hover:text-white transition-colors px-4 py-1.5 rounded-full text-sm font-medium"
        >
          Projects
        </button>
        <button 
          onClick={() => handleScrollTo('certificates')}
          className="text-white/80 hover:bg-white/20 hover:text-white transition-colors px-4 py-1.5 rounded-full text-sm font-medium"
        >
          Certifications
        </button>
        <button 
          onClick={() => handleScrollTo('contact')}
          className="text-white/80 hover:bg-white/20 hover:text-white transition-colors px-4 py-1.5 rounded-full text-sm font-medium"
        >
          Contact
        </button>
      </div>

      {/* Right CTA */}
      <div>
        <a 
          href="/Imran_Khan_DataAnalyst_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-gray-900 text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-gray-100 transition-all active:scale-95 shadow-sm block text-center"
        >
          Download Resume
        </a>
      </div>
    </FadeIn>
  );
}
