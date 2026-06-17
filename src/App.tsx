import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  MessageSquare, 
  Sparkles, 
  Send, 
  Check,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

// Import Custom Components
import Navbar from './components/Navbar';
import ContactButton from './components/ContactButton';
import FadeIn from './components/FadeIn';
import AnimatedText from './components/AnimatedText';
import ProjectCard from './components/ProjectCard';
import RevealLayer from './components/RevealLayer';

// Spotlight URLs
const BG_IMAGE_1 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85";
const BG_IMAGE_2 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85";

// Image data for the horizontal scrolling marquee rows
const MARQUEE_ROW1 = [
  '/data_dashboard.png',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  '/data_analyst_hero.png',
  '/data_pipeline.png',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
];

const MARQUEE_ROW2 = [
  '/neural_network.png',
  '/business_flow.png',
  '/predictive_modeling.png',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
];

// Project Data
const PROJECTS_DATA = [
  {
    number: '01',
    category: 'Data Analytics Web Application',
    name: 'ReviewInsight AI',
    images: {
      col1_1: '/projects/Screenshot 2026-06-15 172206.png', // swapped (insight screen)
      col1_2: '/projects/Screenshot 2026-06-15 172149.png',
      col2: '/projects/Screenshot 2026-06-15 172130.png', // swapped (dashboard)
    },
    link: 'https://reviewinsightt-cyan.vercel.app/'
  },
  {
    number: '02',
    category: 'AI Resume Analyzer',
    name: 'TalentLens AI',
    images: {
      col1_1: '/projects/Screenshot 2026-06-15 172252.png', // swapped (resume upload screen)
      col1_2: '/projects/Screenshot 2026-06-16 145731.png',
      col2: '/projects/Screenshot 2026-06-16 145711.png', // swapped (main analyzer dashboard)
    },
    link: 'https://talentlens-ai-imrankhanmik7.streamlit.app/'
  },
  {
    number: '03',
    category: 'Data Analytics Dashboard',
    name: 'Business Performance Analytics',
    images: {
      col1_1: '/projects/Screenshot 2024-10-05 185740.png', // swapped
      col1_2: '/projects/Screenshot 2024-10-05 185725.png',
      col2: '/projects/Screenshot 2026-06-15 172303.png', // swapped (dashboard)
    },
    link: '/certificates/Power BI_CERTIFICATE.pdf'
  },
];

// Certificates List (replacing Services)
const CERTIFICATES_DATA = [
  {
    num: '01',
    name: 'Data Science & Analytics Certification',
    issuer: 'Tata Group',
    desc: 'Practical data science project certification focusing on visualization, regression models, and exploratory analyses.',
    pdf: '/certificates/Data_Science_certificate.pdf',
  },
  {
    num: '02',
    name: 'Microsoft Power BI Associate',
    issuer: 'Microsoft',
    desc: 'Credential verifying advanced dashboard design, data modeling, custom KPI tracking, and DAX query scripting.',
    pdf: '/certificates/Mircrosoft Certificate.pdf',
  },
  {
    num: '03',
    name: 'Data Analyst Intern Experience',
    issuer: 'Accenture (Forage Program)',
    desc: 'Project training on data modeling, content type optimization, and delivering insights to business leads.',
    pdf: '/certificates/accenture.pdf',
  },
  {
    num: '04',
    name: 'Power BI Dashboard Developer',
    issuer: 'KultureHire',
    desc: 'Core BI developer credential verifying creation of dynamic operational trackers and custom corporate charts.',
    pdf: '/certificates/Power BI_CERTIFICATE.pdf',
  },
  {
    num: '05',
    name: 'SQL Database Management',
    issuer: 'KultureHire',
    desc: 'Relational database training verifying queries, join logic, index optimization, and data retrieval scripts.',
    pdf: '/certificates/HIRE SQL.pdf',
  },
  {
    num: '06',
    name: 'Advanced Excel & Dashboard Dev',
    issuer: 'KultureHire',
    desc: 'Pivot matrices, VLOOKUP/XLOOKUP nesting, condition formulas, and interactive dashboard UI construction.',
    pdf: '/certificates/HIRE EXCEL.pdf',
  },
  {
    num: '07',
    name: 'AI Prompting for Data Analytics',
    issuer: 'KultureHire',
    desc: 'Leveraging ChatGPT models, prompt parameters, and frameworks to accelerate Python coding and SQL pipelines.',
    pdf: '/certificates/HIRE FRAME + CHATGPT.pdf',
  },
];

export default function App() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Preloader progress count
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
          }, 600); // Wait for fade out
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(prev + diff, 100);
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  // Counting logic for Metrics (repeats every 12 seconds)
  const [metricsProgress, setMetricsProgress] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;
    const duration = 2000; // 2 seconds animation duration

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setMetricsProgress(progress);
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    const interval = setInterval(() => {
      startTimestamp = null;
      animationFrameId = requestAnimationFrame(step);
    }, 12000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, []);

  // Spotlight Eased Coordinates
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const updateEasedCoordinates = () => {
      if (smooth.current.x === -999) {
        smooth.current = { ...mouse.current };
      } else {
        smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
        smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      }
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(updateEasedCoordinates);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(updateEasedCoordinates);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormStatus('submitting');
    
    try {
      // Simulate API form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus('submitted');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch {
      setFormStatus('error');
    }
  };

  const handleSendMessageClick = () => {
    const input = document.getElementById('contact-name');
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Track page scroll for custom marquee translate offsets
  useEffect(() => {
    const onScroll = () => {
      if (!marqueeRef.current) return;
      const rect = marqueeRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const offsetVal = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setScrollOffset(offsetVal);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const recordsVal = Math.floor(metricsProgress * 10000);
  const customersVal = Math.floor(metricsProgress * 5000);
  const revenueVal = Math.floor(metricsProgress * 20);
  const accuracyVal = Math.floor(metricsProgress * 98);

  const row1Images = [...MARQUEE_ROW1, ...MARQUEE_ROW1, ...MARQUEE_ROW1];
  const row2Images = [...MARQUEE_ROW2, ...MARQUEE_ROW2, ...MARQUEE_ROW2];

  return (
    <div className="relative w-full overflow-x-clip bg-[#0C0C0C] font-kanit">
      
      {/* Premium Loader Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0C0C0C]">
          {/* Subtle Background Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e8702a]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4A72E5]/10 rounded-full blur-[120px] pointer-events-none" />
          
          {/* Stylized Abstract Grid/Map Paths in Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center overflow-hidden">
            <svg className="w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] text-white/10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.2">
              {/* Abstract minimalist map paths */}
              <path d="M 10 50 Q 30 20 50 50 T 90 50" />
              <path d="M 20 20 Q 50 80 80 20" />
              <path d="M 50 0 L 50 100" />
              <path d="M 0 50 L 100 50" />
              <circle cx="50" cy="50" r="30" strokeDasharray="2 2" />
              <circle cx="50" cy="50" r="10" />
              <circle cx="30" cy="35" r="1.5" fill="currentColor" className="animate-pulse" />
              <circle cx="70" cy="65" r="1.5" fill="currentColor" className="animate-pulse" />
              <circle cx="50" cy="50" r="2" fill="#e8702a" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-xs px-4">
            {/* Presenter Name (dribbble maps style layout) */}
            <span className="font-space text-sm sm:text-base tracking-[0.3em] uppercase text-[#e8702a] mb-4 font-bold min-h-[24px]">
              {"IMRAN KAHN PRESENT".slice(0, Math.floor((loadingProgress / 100) * "IMRAN KAHN PRESENT".length))}
              <span className="animate-pulse">|</span>
            </span>

            <h2 className="font-space font-black uppercase text-2xl sm:text-3xl tracking-[0.25em] text-white/95 mb-1 text-center">
              PORTFOLIO
            </h2>
            <p className="font-fira text-[9px] tracking-[0.4em] uppercase text-white/40 mb-10">
              DATA ANALYST
            </p>

            {/* Glowing Loader Bar Container */}
            <div className="relative w-full h-[3px] bg-white/5 rounded-full overflow-hidden mb-4 border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-[#e8702a] via-[#f78f4a] to-[#4A72E5] shadow-[0_0_12px_#e8702a] transition-all duration-100 ease-out rounded-full"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            {/* Percentage Display */}
            <div className="font-space font-bold text-lg sm:text-xl text-[#e8702a]/90 tracking-widest">
              {Math.round(loadingProgress)}%
            </div>
          </div>
        </div>
      )}
      
      {/* 1. HERO SECTION */}
      <section
        id="home"
        className="relative h-screen w-full flex flex-col justify-between overflow-x-clip"
      >
        {/* Fullscreen Hero Video Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            className="w-full h-full object-cover opacity-95"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          />
          <div className="absolute inset-0 bg-black/15 z-0" />
        </div>

        <Navbar />

        {/* Massive Centered Heading */}
        <div className="flex-1 flex items-center w-full z-0 overflow-hidden relative">
          <FadeIn delay={0.15} y={40} className="w-full flex justify-center">
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] text-center w-full mt-6 sm:mt-4 md:-mt-5 select-none">
              Hi, i&apos;m imran
            </h1>
          </FadeIn>
        </div>

        {/* Bottom Bar Details Row */}
        <div className="w-full px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 flex items-end justify-between z-20">
          {/* Left Interactive Metrics Counter */}
          <FadeIn delay={0.4} y={20} className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-6 md:gap-8 select-none max-w-[320px] sm:max-w-none text-left">
            <div className="flex flex-col">
              <span className="text-base sm:text-lg md:text-xl font-black text-white leading-none">
                {recordsVal.toLocaleString()}+
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-wider uppercase font-semibold text-white/50 mt-0.5">
                Processed Records
              </span>
            </div>
            <div className="hidden sm:block w-[1px] h-6 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg md:text-xl font-black text-white leading-none">
                {customersVal.toLocaleString()}+
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-wider uppercase font-semibold text-white/50 mt-0.5">
                Analyzed Customers
              </span>
            </div>
            <div className="hidden sm:block w-[1px] h-6 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg md:text-xl font-black text-white leading-none">
                {revenueVal}%
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-wider uppercase font-semibold text-white/50 mt-0.5">
                Revenue Growth
              </span>
            </div>
            <div className="hidden sm:block w-[1px] h-6 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg md:text-xl font-black text-white leading-none">
                {accuracyVal}%
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-wider uppercase font-semibold text-white/50 mt-0.5">
                Data Accuracy
              </span>
            </div>
          </FadeIn>

          {/* Right Action Button */}
          <FadeIn delay={0.5} y={20}>
            <ContactButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
          </FadeIn>
        </div>
      </section>

      {/* 2. MARQUEE SECTION */}
      <section
        ref={marqueeRef}
        className="w-full overflow-hidden bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 flex flex-col gap-3 select-none"
      >
        <div 
          className="flex gap-3 will-change-transform"
          style={{
            transform: `translate3d(${scrollOffset - 200}px, 0px, 0px)`,
          }}
        >
          {row1Images.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-[420px] h-[270px]">
              <img
                src={src}
                alt={`Portfolio piece 1-${i}`}
                className="w-full h-full rounded-2xl object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div 
          className="flex gap-3 will-change-transform"
          style={{
            transform: `translate3d(${- (scrollOffset - 200)}px, 0px, 0px)`,
          }}
        >
          {row2Images.map((src, i) => (
            <div key={i} className="flex-shrink-0 w-[420px] h-[270px]">
              <img
                src={src}
                alt={`Portfolio piece 2-${i}`}
                className="w-full h-full rounded-2xl object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT SECTION with premium video background */}
      <section
        id="about"
        className="relative min-h-screen w-full flex items-center justify-center bg-black px-5 sm:px-8 md:px-10 py-20 select-text overflow-hidden"
      >
        {/* Fullscreen Video Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover select-none pointer-events-none opacity-65"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
          />
          <div className="absolute inset-0 bg-[#0C0C0C]/50 z-0" />
        </div>

        {/* Corner Decor 3D Objects */}
        <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 select-none pointer-events-none">
          <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
              alt="Moon 3D icon"
              className="w-[120px] sm:w-[160px] md:w-[210px] h-auto"
            />
          </FadeIn>
        </div>

        <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 select-none pointer-events-none">
          <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
              alt="Floating 3D object"
              className="w-[100px] sm:w-[140px] md:w-[180px] h-auto"
            />
          </FadeIn>
        </div>

        <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 select-none pointer-events-none">
          <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
              alt="Lego 3D icon"
              className="w-[120px] sm:w-[160px] md:w-[210px] h-auto"
            />
          </FadeIn>
        </div>

        <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 select-none pointer-events-none">
          <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
              alt="3D Group Object"
              className="w-[130px] sm:w-[170px] md:w-[220px] h-auto"
            />
          </FadeIn>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-2xl">
          <FadeIn delay={0} y={40}>
            <h2 
              className="hero-heading font-black uppercase leading-none tracking-tight text-center"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              About me
            </h2>
          </FadeIn>

          <div className="mt-10 sm:mt-14 md:mt-16 mb-16 sm:mb-20 md:mb-24 px-4">
            <AnimatedText
              text="I am Mohammad Imran Khan, a passionate Data Analyst and Machine Learning specialist. I specialize in transforming complex datasets into actionable business insights through advanced visualization, robust data modeling, and predictive analytics. Let's collaborate to solve real-world problems with data!"
              className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' } as React.CSSProperties}
            />
          </div>

          <FadeIn delay={0.1} y={20}>
            <ContactButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
          </FadeIn>
        </div>
      </section>

      {/* 4. CERTIFICATES SECTION with video background */}
      <section
        id="certificates"
        className="w-full relative px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 text-white overflow-hidden"
      >
        {/* Fullscreen Video Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover select-none pointer-events-none opacity-100"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_102933_4e8f73b5-775a-4179-b2fb-472f59063dcd.mp4"
          />
          <div className="absolute inset-0 bg-[#0C0C0C]/15 z-0" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <h2 
            className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Certificates
          </h2>

          <div className="flex flex-col border-t border-white/10">
            {CERTIFICATES_DATA.map((cert, idx) => (
              <FadeIn key={cert.num} delay={idx * 0.1} y={30}>
                {/* Clicking on a certificate row opens the PDF safely */}
                <a
                  href={cert.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col sm:flex-row sm:items-center py-8 border-b border-white/10 gap-4 sm:gap-8 justify-between cursor-pointer group"
                >
                  {/* Left Column: Number (animated color & scale) */}
                  <div className="font-black leading-none text-white min-w-[70px] md:min-w-[140px] transition-all duration-300 group-hover:text-[#e8702a] group-hover:scale-105 transform origin-left">
                    <span style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}>
                      {cert.num}
                    </span>
                  </div>

                  {/* Right Column: Name, Issuer, and Description (animated translation) */}
                  <div className="flex-1 flex flex-col md:flex-row md:items-start justify-between gap-2 md:gap-8 transition-transform duration-300 md:group-hover:translate-x-2">
                    <div className="md:w-1/2">
                      <h3 
                        className="font-medium uppercase text-white leading-tight group-hover:underline decoration-1"
                        style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                      >
                        {cert.name}
                      </h3>
                      <span className="font-fira text-[10px] md:text-xs tracking-widest text-white/60 uppercase font-semibold block mt-1">
                        {cert.issuer}
                      </span>
                    </div>
                    <p 
                      className="font-light leading-relaxed text-white opacity-60 md:w-1/2"
                      style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                    >
                      {cert.desc}
                    </p>
                  </div>

                  {/* Right Indicator Arrow (fades and slides in on hover) */}
                  <div className="text-white/0 group-hover:text-white/80 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0 self-center hidden sm:block">
                    <ArrowRight size={24} />
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROJECTS SECTION */}
      <section
        id="projects"
        className="w-full relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 pb-32 px-5 sm:px-8 md:px-10 z-10"
      >
        {/* Fullscreen Video Background */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            webkit-playsinline="true"
            className="w-full h-full object-cover opacity-95"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
          />
          <div className="absolute inset-0 bg-[#0C0C0C]/30 z-0" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <h2 
            className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28 tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>

          <div className="flex flex-col gap-10">
            {PROJECTS_DATA.map((proj, idx) => (
              <ProjectCard
                key={proj.number}
                index={idx}
                totalCards={PROJECTS_DATA.length}
                number={proj.number}
                category={proj.category}
                name={proj.name}
                images={proj.images}
                link={proj.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5.5. EXPERIENCE SECTION (Spotlight Reveal Layout with Left-to-Right Horizontal Timeline) */}
      <section
        id="experience"
        className="relative w-full overflow-hidden bg-black z-20 flex flex-col justify-between py-12 md:py-16 min-h-screen"
      >
        {/* Base Image (BG_IMAGE_1) */}
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        {/* Reveal Layer (BG_IMAGE_2) */}
        <RevealLayer 
          image={BG_IMAGE_2}
          cursorX={cursorPos.x}
          cursorY={cursorPos.y}
        />

        {/* Heading (In flow for full mobile responsiveness) */}
        <div className="relative z-50 w-full flex flex-col items-center text-center px-5 pointer-events-none mb-6">
          <h2 className="text-white leading-[0.95] text-4xl sm:text-6xl md:text-7xl font-black uppercase text-center">
            <span 
              className="block font-playfair italic font-normal text-4xl sm:text-6xl md:text-7xl hero-anim hero-reveal"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
            >
              Building impact
            </span>
            <span 
              className="block font-normal text-4xl sm:text-6xl md:text-7xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              through data
            </span>
          </h2>
        </div>

        {/* Timeline Container (Rendered directly, always visible) */}
        <div className="relative z-50 flex-1 w-full max-w-7xl mx-auto px-6 mt-2 mb-6 flex flex-col justify-center overflow-hidden">
          <div 
            className="w-full overflow-x-auto py-6 flex items-stretch gap-6 min-h-[300px] select-none scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Timeline Line Wrapper */}
            <div className="relative flex items-center gap-8 px-4 h-full min-w-max">
              {/* Central horizontal timeline axis connector */}
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-[#e8702a]/10 via-[#e8702a] to-white/10 top-1/2 -translate-y-1/2 z-0" />

              {/* Node 1: BCA */}
              <motion.div 
                whileHover={{ 
                  scale: 1.03, 
                  rotateX: 3, 
                  rotateY: -3, 
                  perspective: 1000,
                  boxShadow: "0 0 20px rgba(232,112,42,0.25)",
                  borderColor: "rgba(232,112,42,0.6)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-[240px] sm:w-[280px] bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col gap-2 z-10 self-start transition-colors duration-300 cursor-default"
              >
                <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-white/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                </div>
                <span className="text-[10px] text-white/40 font-mono tracking-wider">2020 – 2023</span>
                <h5 className="font-bold text-white text-sm">Bachelor of Computer Applications (BCA)</h5>
                <p className="text-xs text-white/60">Barkatullah University</p>
                <div className="text-[9px] text-[#e8702a] font-semibold uppercase mt-1">Specialization: Computer Science</div>
              </motion.div>

              {/* Node 2: MCA */}
              <motion.div 
                whileHover={{ 
                  scale: 1.03, 
                  rotateX: 3, 
                  rotateY: -3, 
                  perspective: 1000,
                  boxShadow: "0 0 20px rgba(232,112,42,0.25)",
                  borderColor: "rgba(232,112,42,0.6)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-[260px] sm:w-[300px] bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col gap-2 z-10 self-end transition-colors duration-300 cursor-default"
              >
                <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-white/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                </div>
                <span className="text-[10px] text-white/40 font-mono tracking-wider">2023 – 2025</span>
                <h5 className="font-bold text-white text-sm">Master of Computer Applications (MCA)</h5>
                <p className="text-xs text-white/60">RGPV Bhopal</p>
                <div className="text-[9px] text-[#e8702a] font-semibold uppercase mt-1">Specialization: Machine Learning</div>
              </motion.div>

              {/* Node 3: KultureHire */}
              <motion.div 
                whileHover={{ 
                  scale: 1.03, 
                  rotateX: 3, 
                  rotateY: -3, 
                  perspective: 1000,
                  boxShadow: "0 0 20px rgba(232,112,42,0.25)",
                  borderColor: "rgba(232,112,42,0.6)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-[300px] sm:w-[340px] bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col gap-2 z-10 self-start transition-colors duration-300 cursor-default"
              >
                <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-black border-2 border-[#e8702a] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#e8702a] animate-pulse" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-[#e8702a] font-semibold tracking-wider font-mono">Jun 2025 – Oct 2025</span>
                  <span className="text-[9px] text-white/40 uppercase bg-white/5 px-2 py-0.5 rounded font-fira">Business Analyst</span>
                </div>
                <h5 className="font-bold text-white text-sm">Business Analyst Intern</h5>
                <span className="text-xs text-white/60">KultureHire</span>
                <ul className="text-[10px] text-white/70 list-disc list-inside leading-relaxed mt-1 flex flex-col gap-1 pl-1 font-body">
                  <li>Identified 3 untapped market segments</li>
                  <li>Analyzed 5,000+ customer records (SQL)</li>
                  <li>Built core Power BI reporting dashboards</li>
                </ul>
              </motion.div>

              {/* Node 4: Singularium Technologies */}
              <motion.div 
                whileHover={{ 
                  scale: 1.03, 
                  rotateX: 3, 
                  rotateY: -3, 
                  perspective: 1000,
                  boxShadow: "0 0 20px rgba(232,112,42,0.25)",
                  borderColor: "rgba(232,112,42,0.6)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-[300px] sm:w-[340px] bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col gap-2 z-10 self-end transition-colors duration-300 cursor-default"
              >
                <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-black border-2 border-[#e8702a] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#e8702a] animate-pulse" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-[#e8702a] font-semibold tracking-wider font-mono">Dec 2025 – Apr 2026</span>
                  <span className="text-[9px] text-white/40 uppercase bg-white/5 px-2 py-0.5 rounded font-fira">Data Analyst</span>
                </div>
                <h5 className="font-bold text-white text-sm">Data Analyst Intern</h5>
                <span className="text-xs text-white/60">Singularium Technologies</span>
                <ul className="text-[10px] text-white/70 list-disc list-inside leading-relaxed mt-1 flex flex-col gap-1 pl-1 font-body">
                  <li>Processed 10,000+ structured records</li>
                  <li>Achieved 98%+ data quality accuracy</li>
                  <li>Reduced data inconsistencies by 30%</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer Info (Metrics & Skills tags) always visible at the bottom */}
        <div className="relative z-50 w-full max-w-7xl mx-auto px-6 pb-6 flex flex-col gap-4">
          {/* Impact Metrics Row (glowing & tilting on hover) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            <motion.div 
              whileHover={{ 
                scale: 1.05, 
                rotateX: 6, 
                rotateY: -6, 
                perspective: 1000,
                boxShadow: "0 0 15px rgba(255,255,255,0.15)",
                borderColor: "rgba(255,255,255,0.3)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center transition-colors duration-300 cursor-default"
            >
              <div className="text-sm sm:text-base font-bold text-white">
                {recordsVal.toLocaleString()}+
              </div>
              <div className="text-[8px] text-white/40 uppercase">Processed Records</div>
            </motion.div>
            
            <motion.div 
              whileHover={{ 
                scale: 1.05, 
                rotateX: 6, 
                rotateY: -6, 
                perspective: 1000,
                boxShadow: "0 0 15px rgba(255,255,255,0.15)",
                borderColor: "rgba(255,255,255,0.3)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center transition-colors duration-300 cursor-default"
            >
              <div className="text-sm sm:text-base font-bold text-white">
                {customersVal.toLocaleString()}+
              </div>
              <div className="text-[8px] text-white/40 uppercase">Analyzed Customers</div>
            </motion.div>

            <motion.div 
              whileHover={{ 
                scale: 1.05, 
                rotateX: 6, 
                rotateY: -6, 
                perspective: 1000,
                boxShadow: "0 0 15px rgba(232,112,42,0.2)",
                borderColor: "rgba(232,112,42,0.5)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center transition-colors duration-300 cursor-default"
            >
              <div className="text-sm sm:text-base font-bold text-[#e8702a]">
                {revenueVal}%
              </div>
              <div className="text-[8px] text-white/40 uppercase">Revenue Growth</div>
            </motion.div>

            <motion.div 
              whileHover={{ 
                scale: 1.05, 
                rotateX: 6, 
                rotateY: -6, 
                perspective: 1000,
                boxShadow: "0 0 15px rgba(74,222,128,0.2)",
                borderColor: "rgba(74,222,128,0.5)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-center transition-colors duration-300 cursor-default"
            >
              <div className="text-sm sm:text-base font-bold text-green-400">
                {accuracyVal}%
              </div>
              <div className="text-[8px] text-white/40 uppercase">Data Accuracy</div>
            </motion.div>
          </div>

          {/* Competency skill bubbles */}
          <div className="flex flex-wrap gap-1.5 items-center justify-center">
            {['Python', 'SQL', 'Power BI', 'Excel', 'Tableau', 'Machine Learning', 'Business Intelligence', 'Data Visualization'].map((skill) => (
              <span 
                key={skill} 
                className="bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded-full text-[10px] text-white/75 font-body hover:bg-white/10 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section
        id="contact"
        className="w-full relative overflow-hidden bg-slate-50 py-12 md:py-16 pb-0 flex flex-col items-center justify-center select-text"
      >
        {/* Fullscreen Background Video Loop */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover select-none pointer-events-none opacity-100"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4"
          />
          {/* Transparent overlay to ensure maximum video clarity without wash-out */}
          <div className="absolute inset-0 bg-transparent z-0" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-6 md:px-10">
          
          {/* Badge */}
          <FadeIn delay={0} y={10} duration={0.5}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-600 font-body mb-6 shadow-sm">
              <Sparkles size={14} className="text-amber-500 animate-pulse" />
              Let&apos;s build something amazing together ✨
            </span>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={0.1} y={16} duration={0.6}>
            <h2 className="text-center font-display text-5xl md:text-7xl lg:text-[5rem] leading-[0.95] tracking-tight text-slate-900 max-w-2xl font-black uppercase">
              Get in Touch and Let&apos;s Create <span className="font-instrument italic font-normal lowercase tracking-normal text-slate-600">Something Extraordinary</span>
            </h2>
          </FadeIn>

          {/* Subheadline */}
          <FadeIn delay={0.2} y={16} duration={0.6}>
            <p className="mt-6 text-center text-base md:text-lg text-slate-600 max-w-[650px] leading-relaxed font-body">
              Whether you have a project, collaboration, business inquiry, or just want to say hello, I&apos;d love to hear from you.
            </p>
          </FadeIn>

          {/* Contact CTA Buttons */}
          <FadeIn delay={0.3} y={16} duration={0.6}>
            <div className="mt-8 flex items-center gap-3">
              <button 
                onClick={handleSendMessageClick}
                className="rounded-full px-6 py-4 bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 font-medium text-sm font-body cursor-pointer flex items-center gap-2 active:scale-95 shadow-md"
              >
                Send Message
                <ArrowRight size={14} />
              </button>
            </div>
          </FadeIn>

          {/* Contact Card (Clean white card) */}
          <FadeIn delay={0.5} y={30} duration={0.8} className="w-full mt-6 pb-6">
            <div 
              className="w-full rounded-2xl overflow-hidden p-5 md:p-8 border border-slate-200/80 shadow-2xl bg-white"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Contact details & Additional Info */}
                <div className="lg:col-span-5 flex flex-col gap-6 select-text text-left">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 font-display">Contact Information</h3>
                    <p className="text-sm text-slate-500 mt-2 font-body leading-relaxed">
                      Available for freelance projects, collaborations, and full-time opportunities.
                    </p>
                  </div>

                  {/* Details List */}
                  <div className="flex flex-col gap-1.5 font-body">
                    {/* Email */}
                    <a
                      href="mailto:imrankhan.renowned@gmail.com"
                      className="group flex items-center gap-3 p-3.5 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 hover:shadow-sm transition-all duration-300 cursor-pointer"
                    >
                      <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white shadow-sm transition-all duration-300">
                        <Mail size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Email</span>
                        <span className="block text-sm font-semibold text-slate-800 truncate">imrankhan.renowned@gmail.com</span>
                      </div>
                      <ExternalLink size={12} className="text-slate-400/0 group-hover:text-slate-400/60 transition-opacity duration-300" />
                    </a>

                    {/* Phone */}
                    <a
                      href="tel:+918889038390"
                      className="group flex items-center gap-3 p-3.5 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 hover:shadow-sm transition-all duration-300 cursor-pointer"
                    >
                      <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white shadow-sm transition-all duration-300">
                        <Phone size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Phone Number</span>
                        <span className="block text-sm font-semibold text-slate-800 truncate">+91 8889038390</span>
                      </div>
                      <ExternalLink size={12} className="text-slate-400/0 group-hover:text-slate-400/60 transition-opacity duration-300" />
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com/in/imrankhanmik"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-3.5 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 hover:shadow-sm transition-all duration-300 cursor-pointer"
                    >
                      <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white shadow-sm transition-all duration-300">
                        <Linkedin size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">LinkedIn</span>
                        <span className="block text-sm font-semibold text-slate-800 truncate text-left">linkedin.com/in/imrankhanmik</span>
                      </div>
                      <ExternalLink size={12} className="text-slate-400/40 group-hover:text-slate-400/80 transition-opacity duration-300" />
                    </a>

                    {/* GitHub */}
                    <a
                      href="https://github.com/ImrankhanMIK7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-3.5 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 hover:shadow-sm transition-all duration-300 cursor-pointer"
                    >
                      <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white shadow-sm transition-all duration-300">
                        <Github size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">GitHub</span>
                        <span className="block text-sm font-semibold text-slate-800 truncate text-left">github.com/ImrankhanMIK7</span>
                      </div>
                      <ExternalLink size={12} className="text-slate-400/40 group-hover:text-slate-400/80 transition-opacity duration-300" />
                    </a>
                  </div>

                  {/* Additional Information Card */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50/90 p-5 shadow-sm flex flex-col gap-3.5 mt-2">
                    <div className="flex justify-between items-center text-sm font-body">
                      <div className="flex items-center gap-2 text-slate-500">
                        <MessageSquare size={14} />
                        <span>Preferred Contact</span>
                      </div>
                      <span className="font-semibold text-slate-800">Email / LinkedIn</span>
                    </div>
                  </div>

                </div>

                {/* Right Side: Contact Form */}
                <div className="lg:col-span-7 bg-slate-50/50 border border-slate-200 p-5 md:p-7 rounded-xl flex flex-col gap-5 shadow-inner">
                  
                  {formStatus === 'submitted' ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in-95 duration-500">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
                        <Check size={32} strokeWidth={3} />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 font-display">Message Sent Successfully!</h4>
                      <p className="text-sm text-slate-500 mt-2 max-w-sm font-body leading-relaxed">
                        Thank you for reaching out, Imran. I have received your message and will get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                          <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 font-body">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="contact-name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            disabled={formStatus === 'submitting'}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 font-body text-sm shadow-sm"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 font-body">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="contact-email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            disabled={formStatus === 'submitting'}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 font-body text-sm shadow-sm"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 font-body">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="contact-subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Project Inquiry / Job Opportunity"
                          disabled={formStatus === 'submitting'}
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 font-body text-sm shadow-sm"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 font-body">
                          Message *
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell me about your project or inquiry..."
                          disabled={formStatus === 'submitting'}
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 font-body text-sm min-h-[140px] resize-none shadow-sm"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="w-full rounded-full py-4 bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 font-medium text-sm font-body cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md mt-2"
                      >
                        {formStatus === 'submitting' ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={14} />
                          </>
                        )}
                      </button>
                    </form>
                  )}

                </div>

              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Light-Themed Footer matching semantic variables */}
      <footer className="w-full bg-white border-t border-slate-200 py-6 px-6 relative z-10">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 font-body text-xs tracking-wider text-slate-500 uppercase text-center sm:text-left">
          <div>Mohammad Imran Khan © {new Date().getFullYear()}</div>
        </div>
      </footer>
    </div>
  );
}
