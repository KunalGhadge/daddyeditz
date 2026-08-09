import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  motion, useInView,
  AnimatePresence, useScroll, useTransform
} from 'framer-motion';
import {
  Clock, Menu, X, ArrowRight, MapPin,
  Mail, Phone, Zap, Film,
  CheckCircle, Sparkles
} from 'lucide-react';
import { Shader, ChromaFlow, FilmGrain, FlutedGlass, Swirl } from 'shaders/react';

import { PremiumVideoPlayer } from '@/components/ui/PremiumVideoPlayer';

// ─── Live Clock ──────────────────────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const t = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false
      }).format(new Date());
      setTime(`${t} IST`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex items-center gap-1.5 text-[12px] font-ui text-stone-500 font-medium">
      <Clock size={11} />
      <span>{time}</span>
    </div>
  );
}

// ─── Text Roll Button ─────────────────────────────────────────────────────────
function TextRollBtn({
  text, href = '#', variant = 'orange', className = ''
}: { text: string; href?: string; variant?: 'orange' | 'dark' | 'white'; className?: string }) {
  const variants = {
    orange: 'bg-[#FF5C28] text-white hover:bg-[#e04d1e] shadow-lg shadow-[#FF5C28]/20',
    dark: 'bg-[#111] text-white hover:bg-[#222]',
    white: 'bg-white text-[#111] hover:bg-stone-50',
  };
  const arrowVariants = {
    orange: 'bg-white text-[#FF5C28]',
    dark: 'bg-white text-[#111]',
    white: 'bg-[#111] text-white',
  };
  return (
    <a href={href}
      className={`group inline-flex items-center gap-3 rounded-full font-ui font-bold text-[14px] sm:text-[15px] pl-6 pr-2.5 py-2.5 transition-all duration-300 ${variants[variant]} ${className}`}>
      <div className="overflow-hidden h-[20px] flex flex-col">
        <div className="text-roll-inner flex flex-col">
          <span className="h-[20px] flex items-center">{text}</span>
          <span className="h-[20px] flex items-center">{text}</span>
        </div>
      </div>
      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 ${arrowVariants[variant]}`}>
        <ArrowRight size={15} className="transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
      </div>
    </a>
  );
}

// ─── FadeIn ───────────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '', direction = 'up', style }: {
  children: React.ReactNode; delay?: number; className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const dir = direction;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: dir === 'up' ? 24 : 0, x: dir === 'left' ? -24 : dir === 'right' ? 24 : 0 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── Counter ──────────────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / (1800 / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, to);
      setCount(start);
      if (start >= to) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Section Badge ────────────────────────────────────────────────────────────
function SectionBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 sm:mb-8 font-ui text-[11px] sm:text-[12px] font-bold tracking-widest uppercase bg-[#FF5C28]/10 border border-[#FF5C28]/20 text-[#FF5C28]">
      <Sparkles size={11} />
      {label}
    </div>
  );
}

// ─── Marquee (text ticker) ────────────────────────────────────────────────────
const marqueeItems = [
  'Reels', 'TikToks', 'YouTube Shorts', 'Podcast Clips', 'Vlogs',
  'Commercials', 'Brand Stories', 'Event Highlights', 'Music Videos', 'Social Campaigns'
];
function TextMarquee() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="w-full overflow-hidden py-6 sm:py-8 border-y border-stone-200 relative bg-[#F7F6F3]">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#F7F6F3] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#F7F6F3] to-transparent" />
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-3 font-ui text-[14px] sm:text-[15px] font-medium shrink-0 text-stone-500">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C28] shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Emoji Reaction Burst ─────────────────────────────────────────────────────
interface Particle { id: number; emoji: string; x: number; rotate: number; }
function ReactionButton() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [liked, setLiked] = useState(false);
  const idRef = useRef(0);

  const burst = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(true);
    const newParticles: Particle[] = Array.from({ length: 6 }, () => {
      idRef.current += 1;
      return {
        id: idRef.current,
        emoji: '',
        x: (Math.random() - 0.5) * 60,
        rotate: (Math.random() - 0.5) * 60,
      };
    });
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 800);
  };

  return (
    <div className="relative flex items-center justify-center pointer-events-auto">
      {/* Spark particles */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute w-2 h-2 rounded-full pointer-events-none"
            style={{ background: 'linear-gradient(135deg,#FF5C28,#ff9a6c)' }}
            initial={{ y: 0, x: p.x * 0.2, opacity: 1, scale: 0.5 }}
            animate={{ y: -50 - Math.random() * 20, x: p.x, opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Button shaped like Instagram DM bubble */}
      <motion.button
        onClick={burst}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.88 }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-200 font-ui text-[12px] font-bold border"
        style={{
          background: liked ? 'rgba(255,92,40,0.15)' : 'rgba(255,255,255,0.18)',
          borderColor: liked ? 'rgba(255,92,40,0.4)' : 'rgba(255,255,255,0.3)',
          color: liked ? '#FF5C28' : 'rgba(255,255,255,0.85)',
        }}
      >
        <span className="text-[14px]">❤️</span>
        <span className="text-[11px]">React</span>
      </motion.button>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const videoTimeline = [
  { year: '2023', tag: 'The Beginning', title: 'First edits, raw passion', desc: 'Started experimenting with Premiere Pro. Basic cuts, simple transitions — but the obsession with fast-paced storytelling was already there.', skills: ['Premiere Pro', 'Basic Grading', 'YouTube Content'], color: '#FF5C28' },
  { year: '2024', tag: 'Style Unlocked', title: 'Finding the hook', desc: 'Shifted focus to short-form. Mastered motion tracking, dynamic captions, and sound design. Started landing my first paid clients.', skills: ['After Effects', 'Sound Design', 'Shorts & Reels'], color: '#f59e0b' },
  { year: '2025', tag: 'High Performance', title: 'Data-driven edits', desc: 'Began editing for retention. Learned what makes viewers stay, what makes them scroll, and how to craft perfect 3-second hooks for brands.', skills: ['Retention Editing', 'Hook Science', 'Color Grading'], color: '#a855f7' },
  { year: '2026', tag: 'Current Era', title: 'Master of Short-Form', desc: "Exclusively helping businesses and creators dominate Instagram and TikTok through high-converting, cinematic short-form video content.", skills: ['Brand Building', 'Viral Formulas', 'DaVinci Resolve'], color: '#22d3ee' },
];



const portfolioItems = [
  {
    id: 1,
    title: "Event Branding",
    client: "Navi Mumbai Festival",
    metrics: "+40% Engagement",
    video: "/assets/v11.mp4",
    color: "from-blue-500/20",
    link: "/services/event-branding",
  },
  {
    id: 2,
    title: "Logo Design",
    client: "Tech Startup",
    metrics: "Brand Identity",
    video: "/assets/v22.mp4",
    color: "from-purple-500/20",
    link: "/services/logo-design-navi-mumbai",
  },
  {
    id: 3,
    title: "Social Media Posts",
    client: "Fitness Coach",
    metrics: "1M+ Impressions",
    video: "/assets/v33.mp4",
    color: "from-emerald-500/20",
    link: "/services/social-media-kamothe",
  },
  {
    id: 4,
    title: "Product Marketing",
    client: "E-commerce Brand",
    metrics: "3x Sales Boost",
    video: "/assets/v44.mp4",
    color: "from-orange-500/20",
    link: "/services/product-marketing",
  }
];

const process = [
  { n: '01', title: 'Discovery & Brief', desc: "We discuss your brand, audience, and the vibe you're going for. Send me your raw footage and any references.", icon: Film },
  { n: '02', title: 'The Hook & Assembly', desc: 'I find the best moments, craft a strong 3-second hook, and build the initial rough cut for pacing.', icon: Zap },
  { n: '03', title: 'Polish & VFX', desc: 'Adding dynamic captions, sound design, color grading, and motion graphics to make the video pop.', icon: Sparkles },
  { n: '04', title: 'Review & Delivery', desc: 'You review the draft. I make any needed tweaks, and deliver the final high-res file ready to post.', icon: CheckCircle },
];


// ─── App ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shaderFailed, setShaderFailed] = useState(false);
  const handleShaderUnavailable = useCallback((_r: string) => setShaderFailed(true), []);
  const navLinks = ['Work', 'Services', 'Timeline', 'About', 'Contact'];

  const timelineRef = useRef<HTMLElement>(null);
  const { scrollYProgress: timelineScroll } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const timelineScale = useTransform(timelineScroll, [0, 1], [0, 1]);

  const workRef = useRef<HTMLElement>(null);
  const { scrollYProgress: workScroll } = useScroll({
    target: workRef,
  });
  const workX = useTransform(workScroll, [0, 1], ["0%", "-40%"]);


  const theme = {
    bg: '#F7F6F3', bgAlt: '#FFFFFF', bgCard: 'rgba(255,255,255,0.7)',
    text: '#111111', textMuted: '#555555', textDim: '#888888',
    border: 'rgba(0,0,0,0.06)', navBg: 'rgba(255,255,255,0.4)',
    navBorder: 'rgba(255,255,255,0.8)', inputBg: 'rgba(255,255,255,0.6)',
  };

  return (
    <div style={{ background: theme.bg, color: theme.text }} className="min-h-screen overflow-x-hidden font-body selection:bg-[#FF5C28]/20 selection:text-[#FF5C28]">
      <Helmet>
        <title>Sid Graphics | Business Growth Designs in Kamothe, Navi Mumbai</title>
        <meta name="description" content="Siddhesh Navale (Sid Graphics) is a premium graphic designer specializing in logo design, social media posts, and brand identity in Navi Mumbai." />
      </Helmet>

      {/* ── ABSOLUTE NAVBAR (scrolls away) ───────────────────────────────── */}
      <div className="absolute top-0 inset-x-0 z-[100] max-w-[1400px] mx-auto px-4 sm:px-6 pt-5 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between rounded-full px-5 py-3.5 shadow-[0_4px_24px_rgb(0,0,0,0.06)]"
          style={{ background: theme.navBg, border: `1px solid ${theme.navBorder}`, backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)' }}>
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3.5 shrink-0 group">
            <div className="w-10 h-10 bg-[#FF5C28] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-md shadow-[#FF5C28]/30">
              <span className="text-white text-[12px] font-bold font-ui">SG</span>
            </div>
            <div>
              <div className="text-[15px] font-bold tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Sid Graphics</div>
            </div>
          </a>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="px-4 py-2 font-ui text-[14px] font-semibold rounded-full transition-all duration-200 hover:bg-black/5 hover:text-[#111] text-stone-600">
                {l}
              </a>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="https://instagram.com/sid._.graphics" target="_blank" rel="noreferrer" 
               className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300"
               style={{ background: 'rgba(255,92,40,0.1)', borderColor: 'rgba(255,92,40,0.3)', color: '#FF5C28' }}>
               <span className="font-ui text-[13px] font-bold">Instagram</span>
            </a>
            <LiveClock />
            <button onClick={() => setMenuOpen(true)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 border border-black/6 bg-white/60">
              <Menu size={18} className="text-[#111]" />
            </button>
          </div>
        </nav>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 overflow-hidden" style={{ background: '#F7F6F3' }}>
        {/* Subtle background gradient blob */}
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,92,40,0.08) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,92,40,0.05) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border"
            style={{ background: 'rgba(255,92,40,0.06)', borderColor: 'rgba(255,92,40,0.15)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C28] animate-pulse" />
            <span className="text-[12px] font-bold tracking-wider text-[#FF5C28] uppercase" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Kamothe, Navi Mumbai</span>
          </motion.div>

          {/* Main headline — mixed fonts */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
          >
            <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#111' }}>Designs that</span>
            {' '}
            <span style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontWeight: 700, color: '#FF5C28' }}>grow</span>
            <br />
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, color: '#111' }}>your </span>
            <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: '#111' }}>business.</span>
          </motion.h1>

          {/* Subtext — short and clean */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto mb-10 text-stone-500 leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            Logo design, social media posts &amp; brand identity — for businesses in Navi Mumbai ready to stand out.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 items-center justify-center"
          >
            <a href="#contact" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-white font-bold text-[15px] transition-transform hover:scale-105"
              style={{ background: '#FF5C28', boxShadow: '0 8px 30px rgba(255,92,40,0.35)', fontFamily: 'Space Grotesk, sans-serif' }}>
              Work with me <ArrowRight size={16} />
            </a>
            <a href="#work" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-[15px] border transition-all hover:bg-stone-100"
              style={{ color: '#111', borderColor: 'rgba(0,0,0,0.12)', fontFamily: 'Space Grotesk, sans-serif' }}>
              See my work
            </a>
          </motion.div>

          {/* Service pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-2.5 mt-12"
          >
            {['Logo Design', 'Social Media Posts', 'Event Posters', 'Brand Identity'].map(s => (
              <span key={s} className="px-3.5 py-1.5 rounded-full text-[12px] font-semibold border"
                style={{ fontFamily: 'Space Grotesk, sans-serif', background: 'rgba(255,255,255,0.8)', borderColor: 'rgba(0,0,0,0.08)', color: '#555' }}>
                {s}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scrolling image strip at the bottom */}
        {(() => {
          const HERO_IMAGES = [
            "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1634942536790-6c1ccfa8e1c9?w=600&auto=format&fit=crop&q=60",
          ];
          const doubled = [...HERO_IMAGES, ...HERO_IMAGES];
          return (
            <div className="absolute bottom-0 left-0 w-full h-[36%] sm:h-[40%] pointer-events-none overflow-hidden"
              style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 75%, transparent)' }}>
              <motion.div
                className="flex gap-4 h-full"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ ease: 'linear', duration: 50, repeat: Infinity }}
              >
                {doubled.map((src, i) => (
                  <div key={i} className="relative aspect-[3/4] h-full flex-shrink-0"
                    style={{ rotate: `${i % 2 === 0 ? -2 : 2}deg` }}>
                    <img src={src} alt={`Design work ${i + 1}`}
                      className="w-full h-full object-cover rounded-2xl shadow-md opacity-80" />
                  </div>
                ))}
              </motion.div>
            </div>
          );
        })()}
      </section>

      {/* ── Shader layer for hero (fallback gradient if shader fails) ──────── */}
      {!shaderFailed && (
        <div className="absolute top-0 left-0 w-full h-screen z-0 pointer-events-none opacity-20">
          <Shader style={{ width: '100%', height: '100%' }} onUnavailable={handleShaderUnavailable}>
            <Swirl colorA="#faf8f5" colorB="#ffffff" detail={1.7} />
            <ChromaFlow baseColor="#faf8f5" downColor="#ff5f03" leftColor="#ff5f03" rightColor="#ff5f03" upColor="#ff5f03" momentum={13} radius={3.5} />
            <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.12} />
            <FilmGrain strength={0.03} />
          </Shader>
        </div>
      )}

      <TextMarquee />

      {/* ── 9:16 SHORT FORM WORK ───────────────────────────────────────────── */}
      <section id="work" ref={workRef} className="relative bg-[#111] lg:h-[200vh]">
        <div className="lg:sticky top-0 lg:h-screen flex flex-col justify-center overflow-hidden py-20 lg:py-0">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 w-full mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <FadeIn>
                  <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 sm:mb-6 font-ui text-[11px] sm:text-[12px] font-bold tracking-widest uppercase bg-white/10 border border-white/20 text-white">
                    <Sparkles size={11} />
                    My Edits
                  </div>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em] max-w-lg text-white">
                    Engineered for <span className="italic" style={{ background: 'linear-gradient(135deg,#FF5C28,#ff9a6c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>retention.</span>
                  </h2>
                </FadeIn>
              </div>
              <FadeIn delay={0.2} className="flex flex-col gap-2">
                <p className="font-body text-[15px] sm:text-[16px] leading-[1.75] max-w-sm text-stone-400 font-medium">
                  Vertical content requires a completely different pacing. Swipe to browse.
                </p>
                <p className="font-body text-[12px] opacity-40 text-white">
                  * Video quality may adapt to your network connection.
                </p>
              </FadeIn>
            </div>
          </div>

          <motion.div 
            style={{ x: isMobile ? "0%" : workX }} 
            className="flex gap-4 sm:gap-6 px-4 sm:px-8 lg:px-12 w-full lg:w-max overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory pb-8 lg:pb-0 scrollbar-hide"
          >
            {portfolioItems.map((item) => (
              <div key={item.id} className="group cursor-pointer flex flex-col h-[60vh] lg:h-[65vh] w-[85vw] sm:w-[45vw] lg:w-[25vw] shrink-0 snap-center rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.8)] transition-shadow duration-500">
                <PremiumVideoPlayer 
                  src={item.video} 
                  className="relative w-full h-full bg-stone-900"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                  {/* Type badge */}
                  <div className="absolute top-4 right-4 pointer-events-auto hidden lg:block">
                    <span className="text-white text-[11px] font-bold font-ui px-2.5 py-1.5 rounded-lg"
                      style={{ background: 'rgba(255,92,40,0.9)', backdropFilter: 'blur(4px)', boxShadow: '0 4px 12px rgba(255,92,40,0.3)' }}>
                      {item.metrics}
                    </span>
                  </div>

                  {/* Title & views */}
                  <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                    <div className="font-display text-[1.4rem] sm:text-[1.8rem] text-white font-medium mb-3 leading-tight">{item.title}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-ui text-[13px] font-bold text-white/80">
                        <Film size={15} className="text-[#FF5C28]" />
                        {item.client}
                      </div>
                      <div className="pointer-events-auto">
                        <ReactionButton />
                      </div>
                    </div>
                  </div>
                </PremiumVideoPlayer>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STATIC DESIGNS */}
      <section className="py-20 sm:py-24 lg:py-36 relative bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20">
            <div>
              <FadeIn><SectionBadge label="Brand & Print" /></FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em] max-w-lg text-[#111]">
                  Visual identities that <span className="italic" style={{ background: 'linear-gradient(135deg,#FF5C28,#ff9a6c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>last.</span>
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <p className="font-body text-[15px] sm:text-[16px] leading-[1.75] max-w-sm text-stone-500 font-medium">
                From striking event posters to minimal logos. Clean, precise, and memorable.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Large Hero Item */}
            <FadeIn delay={0.1} className="md:col-span-2 md:row-span-2">
              <div 
                onClick={() => setSelectedImage('/assets/haldi-function-poster.jpeg')}
                className="relative rounded-3xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-sm hover:shadow-[0_0_40px_rgba(255,92,40,0.3)] hover:border-[#FF5C28]/50 transition-all duration-500 bg-stone-100 border border-black/5"
              >
                <img src="/assets/haldi-function-poster.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Haldi Function Poster" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-white/20 backdrop-blur-md rounded-full p-4 border border-white/30 text-white shadow-xl">
                        <Sparkles size={24} />
                    </div>
                </div>
                <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[#FF5C28] font-ui text-[12px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full mb-2 inline-block">Event Poster</span>
                  <div className="text-white font-display text-2xl lg:text-3xl">Haldi Function Poster</div>
                </div>
              </div>
            </FadeIn>
            
            {/* Small Item 1 */}
            <FadeIn delay={0.2}>
              <div 
                onClick={() => setSelectedImage('/assets/baby-birthday-poster.jpeg')}
                className="relative rounded-3xl overflow-hidden aspect-square group cursor-pointer shadow-sm hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:border-[#a855f7]/50 transition-all duration-500 bg-stone-100 border border-black/5"
              >
                <img src="/assets/baby-birthday-poster.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Baby Birthday Poster" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[#a855f7] font-ui text-[12px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full mb-2 inline-block">Celebration</span>
                  <div className="text-white font-display text-xl">Baby Birthday Poster</div>
                </div>
              </div>
            </FadeIn>

            {/* Small Item 2 */}
            <FadeIn delay={0.3}>
              <div 
                onClick={() => setSelectedImage('/assets/JCB-service-visiting-card.jpeg')}
                className="relative rounded-3xl overflow-hidden aspect-square group cursor-pointer shadow-sm hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:border-[#22d3ee]/50 transition-all duration-500 bg-stone-100 border border-black/5"
              >
                <img src="/assets/JCB-service-visiting-card.jpeg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="JCB Service Visiting Card" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[#22d3ee] font-ui text-[12px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full mb-2 inline-block">Identity</span>
                  <div className="text-white font-display text-xl">JCB Visiting Card</div>
                </div>
              </div>
            </FadeIn>
            
            {/* Wide Item 3 */}
            <FadeIn delay={0.4} className="md:col-span-3">
              <div 
                onClick={() => setSelectedImage('/assets/property-pooja-poster.jpeg')}
                className="relative rounded-3xl overflow-hidden aspect-[21/9] md:aspect-[3/1] group cursor-pointer shadow-sm hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:border-emerald-500/50 transition-all duration-500 bg-stone-100 border border-black/5"
              >
                <img src="/assets/property-pooja-poster.jpeg" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" alt="Property Pooja Poster" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-emerald-500 font-ui text-[12px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full mb-2 inline-block">Real Estate</span>
                  <div className="text-white font-display text-2xl lg:text-3xl">Property Pooja Poster</div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" ref={timelineRef} className="py-20 sm:py-24 lg:py-36 bg-[#F7F6F3]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <FadeIn><SectionBadge label="My journey" /></FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-20 mb-16 sm:mb-20">
            <FadeIn delay={0.1} className="flex-1">
              <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em] text-[#111]">
                The evolution of an <span className="italic text-stone-400">editor.</span>
              </h2>
            </FadeIn>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-stone-200 z-0">
              <motion.div 
                className="w-full bg-[#FF5C28] origin-top"
                style={{ scaleY: timelineScale, height: '100%' }}
              />
            </div>
            <div className="flex flex-col gap-10 sm:gap-16">
              {videoTimeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <FadeIn key={item.year} delay={i * 0.08} direction={isLeft ? 'left' : 'right'}>
                    {/* Mobile */}
                    <div className="lg:hidden flex gap-5">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-ui text-[13px] font-bold shadow-sm"
                          style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color }}>
                          {item.year.slice(2)}
                        </div>
                        {i < 3 && <div className="w-px flex-1 mt-4 min-h-[40px] bg-stone-200" />}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="font-display text-[1.3rem] sm:text-[1.5rem] font-bold text-[#111]">{item.title}</span>
                          <span className="font-ui text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md" style={{ background: `${item.color}10`, color: item.color }}>{item.tag}</span>
                        </div>
                        <p className="font-body text-[14px] sm:text-[15px] font-medium leading-[1.75] mb-4 text-stone-500">{item.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map(s => (
                            <span key={s} className="font-ui text-[12px] font-semibold px-3 py-1.5 rounded-full bg-stone-50 text-stone-600 border border-stone-200">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Desktop: alternating */}
                    <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-start gap-12 xl:gap-16">
                      {isLeft ? (
                        <div className="flex flex-col items-end text-right pr-6 pt-2">
                          <div className="flex items-center justify-end gap-3 mb-3">
                            <span className="font-ui text-[12px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md" style={{ background: `${item.color}10`, color: item.color }}>{item.tag}</span>
                            <span className="font-display text-[1.5rem] font-bold text-[#111]">{item.title}</span>
                          </div>
                          <p className="font-body text-[15px] font-medium leading-[1.75] mb-5 max-w-sm text-stone-500">{item.desc}</p>
                          <div className="flex flex-wrap gap-2 justify-end">
                            {item.skills.map(s => (
                              <span key={s} className="font-ui text-[12px] font-semibold px-3 py-1.5 rounded-full bg-stone-50 text-stone-600 border border-stone-200">{s}</span>
                            ))}
                          </div>
                        </div>
                      ) : <div />}

                      <div className="flex flex-col items-center gap-3 relative z-10">
                        <div className="relative z-10 bg-[#F7F6F3] rounded-2xl">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-ui text-[15px] font-bold shrink-0"
                            style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color, boxShadow: `0 8px 24px ${item.color}20` }}>
                            '{item.year.slice(2)}
                          </div>
                        </div>
                      </div>

                      {!isLeft ? (
                        <div className="flex flex-col pl-6 pt-2">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="font-display text-[1.5rem] font-bold text-[#111]">{item.title}</span>
                            <span className="font-ui text-[12px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md" style={{ background: `${item.color}10`, color: item.color }}>{item.tag}</span>
                          </div>
                          <p className="font-body text-[15px] font-medium leading-[1.75] mb-5 max-w-sm text-stone-500">{item.desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.skills.map(s => (
                              <span key={s} className="font-ui text-[12px] font-semibold px-3 py-1.5 rounded-full bg-stone-50 text-stone-600 border border-stone-200">{s}</span>
                            ))}
                          </div>
                        </div>
                      ) : <div />}
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ME ──────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 sm:py-24 lg:py-36 relative overflow-hidden bg-white">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[60%] rounded-full pointer-events-none bg-[#FF5C28]/5 blur-[150px]" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <FadeIn><SectionBadge label="About Me" /></FadeIn>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <FadeIn delay={0.1} direction="left" className="w-full lg:w-5/12">
              <div className="rounded-[2rem] p-8 sm:p-12 relative overflow-hidden bg-[#F7F6F3] border border-stone-100 shadow-[0_20px_60px_rgb(0,0,0,0.06)]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5C28] opacity-8 blur-[80px] rounded-full pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-36 h-36 rounded-full flex items-center justify-center font-display text-[54px] font-bold text-white mb-6 shadow-2xl"
                    style={{ background: `linear-gradient(135deg, #FF5C28, #ff9a6c)`, boxShadow: `0 12px 40px rgba(255,92,40,0.3)` }}>
                    SG
                  </div>
                  <h3 className="font-display text-[2.2rem] font-bold text-[#111] mb-2 tracking-tight">Sid Graphics</h3>
                  <p className="font-ui text-[14px] font-bold tracking-wide text-[#FF5C28] mb-8">PREMIUM GRAPHIC DESIGNER</p>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-8 pt-8 border-t border-stone-200 w-full">
                    {[['Location', 'Kamothe, Navi Mumbai'], ['Experience', '3+ Years'], ['Primary Tool', 'Illustrator'], ['Specialty', 'Logo & Brand Design']].map(([label, val]) => (
                      <div key={label} className="text-left">
                        <div className="font-ui text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">{label}</div>
                        <div className="font-body text-[14px] font-semibold text-[#111]">{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
            <div className="w-full lg:w-7/12">
              <FadeIn delay={0.2} direction="right">
                <h2 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em] mb-8 text-[#111]">
                  Designs that grow your business.
                </h2>
                <div className="space-y-6 font-body text-[16px] sm:text-[18px] leading-[1.8] text-stone-500 font-medium">
                  <p>I am Siddhesh Navale — a freelance graphic designer based in Kamothe, Navi Mumbai. You work directly with me, no middlemen.</p>
                  <p>I specialize in making brands look credible and premium — from logos and social media posts to event posters and full brand identities.</p>
                </div>
                <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-stone-200">
                  {[{ n: 50, s: '+', l: 'Brands Designed' }, { n: 3, s: '+', l: 'Years Experience' }, { n: 99, s: '%', l: 'Client Satisfaction' }].map(({ n, s, l }) => (
                    <div key={l}>
                      <div className="font-display text-[2.2rem] font-bold text-[#111] leading-none"><Counter to={n} suffix={s} /></div>
                      <div className="font-ui text-[12px] font-bold text-stone-400 mt-1.5 uppercase tracking-wide">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-10">
                  {['Adobe Illustrator', 'Photoshop', 'Canva Pro', 'CorelDRAW', 'InDesign', 'Figma'].map(s => (
                    <span key={s} className="font-ui text-[13px] font-bold px-4 py-2 rounded-full"
                      style={{ background: 'rgba(255,92,40,0.08)', border: '1px solid rgba(255,92,40,0.15)', color: '#FF5C28' }}>{s}</span>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 lg:py-32 bg-[#F7F6F3]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <FadeIn><SectionBadge label="How it works" /></FadeIn>
          <FadeIn delay={0.1} className="mb-12 sm:mb-16">
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em] text-[#111]">
              Simple. <span className="italic text-stone-400">No surprises.</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {process.map((p, i) => (
              <FadeIn key={p.n} delay={i * 0.1}>
                <div className="rounded-2xl p-7 h-full flex flex-col group bg-white border border-stone-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] transition-all duration-300">
                  <div className="font-ui text-[11px] font-bold tracking-widest mb-5 text-stone-400">{p.n}</div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105"
                    style={{ background: 'rgba(255,92,40,0.08)', border: '1px solid rgba(255,92,40,0.2)' }}>
                    <p.icon size={20} className="text-[#FF5C28]" />
                  </div>
                  <h3 className="font-display text-[1.1rem] mb-3 text-[#111]">{p.title}</h3>
                  <p className="font-body text-[14px] leading-[1.75] text-stone-500 font-medium mt-auto">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section id="contact" className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-[#FF5C28]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-30%] left-[-10%] w-[60%] h-[140%] rounded-full blur-[120px] bg-black/10" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[120%] rounded-full blur-[100px] bg-black/10" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.08] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise2"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/></filter>
            <rect width="100%" height="100%" filter="url(#noise2)" />
          </svg>
        </div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 mb-10 bg-white/10 backdrop-blur-md border border-white/20">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-ui text-[13px] font-bold text-white tracking-wide">Available for new projects</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.03em] text-white mb-6 sm:mb-8 max-w-4xl mx-auto">
              Need a video edited? Let's talk.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-body text-[16px] sm:text-[19px] font-medium leading-[1.7] text-white/80 mb-10 sm:mb-14 max-w-xl mx-auto">
              Shoot me an email or text. We can discuss your content needs, turnaround times, and pricing.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16 sm:mb-20">
              <TextRollBtn text="Contact on WhatsApp" href="https://wa.me/919876543210" variant="white" />
              <a href="mailto:sidgraphics@example.com" className="inline-flex items-center gap-2.5 font-ui text-[15px] font-bold text-white/80 hover:text-white transition-colors">
                <Mail size={18} />sidgraphics@example.com
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 pt-10 sm:pt-12 border-t border-white/20">
              {[{ icon: MapPin, label: 'Kamothe, Navi Mumbai — 410209' }, { icon: Mail, label: 'sidgraphics@example.com' }, { icon: Phone, label: '+91 98765 43210' }].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 font-ui text-[14px] font-semibold text-white/70">
                  <Icon size={16} className="text-white/50 shrink-0" />{label}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="py-10 sm:py-12 bg-[#111] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#FF5C28] rounded-xl flex items-center justify-center">
                <span className="text-white text-[13px] font-bold font-ui">SG</span>
              </div>
              <div>
                <div className="font-ui text-[16px] font-bold text-white tracking-tight">Sid Graphics</div>
                <div className="font-ui text-[12px] font-medium text-white/40 mt-0.5">Graphic Designer · Kamothe, Navi Mumbai</div>
              </div>
            </div>
            <nav className="flex flex-wrap gap-x-8 gap-y-3">
              {navLinks.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="font-ui text-[14px] font-semibold text-white/40 hover:text-white transition-colors">{l}</a>
              ))}
            </nav>
            <p className="font-ui text-[13px] font-semibold text-white/30">© 2026 Sid Graphics.</p>
          </div>
        </div>
      </footer>

      {/* ── MOBILE MENU ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200]">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm flex flex-col p-6 pt-8 bg-white shadow-2xl">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FF5C28] rounded-full flex items-center justify-center">
                    <span className="text-white text-[12px] font-bold font-ui">SG</span>
                  </div>
                  <a href="https://instagram.com/sid._.graphics" target="_blank" rel="noreferrer" className="text-sm font-medium hover:text-[#111]/70 transition-colors">Instagram</a>
                </div>
                <button onClick={() => setMenuOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center bg-stone-100 text-[#111] hover:bg-stone-200">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-2 flex-1">
                {navLinks.map((l, i) => (
                  <motion.a key={l} href={`#${l.toLowerCase()}`}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-[2rem] font-bold py-3 transition-colors text-stone-400 hover:text-[#111]">
                    {l}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-8">
                <TextRollBtn text="Contact Me" href="#contact" className="w-full justify-center" />
                <div className="mt-5 text-center font-ui text-[13px] font-medium text-stone-400">Kamothe, Navi Mumbai · 410209</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FLOATING INSTAGRAM BUTTON ─────────────────────────────────────── */}
      <a href="https://instagram.com/sid._.graphics" target="_blank" rel="noreferrer"
         className="fixed bottom-6 right-6 z-[150] w-14 h-14 bg-gradient-to-tr from-[#FF5C28] to-[#ff9a6c] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(255,92,40,0.4)] hover:scale-110 transition-transform duration-300 group">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
        <div className="absolute inset-0 rounded-full border-2 border-white/40 scale-110 opacity-0 group-hover:animate-ping" />
      </a>
    
      {/* ── IMAGE LIGHTBOX ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <div className="absolute top-6 right-6 z-[310]">
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
              >
                <X size={24} />
              </button>
            </div>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage} 
              alt="Fullscreen view" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
