import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion, useInView, useScroll, useTransform,
  AnimatePresence
} from 'framer-motion';
import {
  Clock, Menu, X, ArrowRight, Play, MapPin,
  Mail, Phone, ChevronDown, Zap, Award, Film,
  CheckCircle, Sparkles, Smartphone, PlayCircle, MonitorPlay
} from 'lucide-react';
import { Shader, ChromaFlow, FilmGrain, FlutedGlass, Swirl } from 'shaders/react';
import { AnimatedMarqueeHero } from '@/components/ui/hero-3';
import TestimonialMarqueeDemo from '@/components/ui/marquee-01';

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
function FadeIn({ children, delay = 0, className = '', direction = 'up' }: {
  children: React.ReactNode; delay?: number; className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const initial = {
    opacity: 0,
    y: direction === 'up' ? 36 : 0,
    x: direction === 'left' ? -36 : direction === 'right' ? 36 : 0,
    filter: 'blur(6px)',
  };
  return (
    <motion.div ref={ref} initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0, filter: 'blur(0px)' } : initial}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
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
  const EMOJIS = ['❤️', '🔥'];

  const burst = () => {
    setLiked(true);
    const newParticles: Particle[] = Array.from({ length: 8 }, () => {
      idRef.current += 1;
      return {
        id: idRef.current,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        x: (Math.random() - 0.5) * 70,
        rotate: (Math.random() - 0.5) * 40,
      };
    });
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Confetti particles */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.span
            key={p.id}
            className="absolute text-[18px] pointer-events-none select-none"
            initial={{ y: 0, x: p.x * 0.2, opacity: 1, scale: 0.6, rotate: 0 }}
            animate={{ y: -70, x: p.x, opacity: 0, scale: 1.3, rotate: p.rotate }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {p.emoji}
          </motion.span>
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

const services = [
  { icon: PlayCircle, tag: 'Reels & TikToks', title: 'High-Retention Short Form', desc: 'Fast-paced, hook-driven edits designed specifically for the algorithms. Perfect for Instagram Reels, TikTok, and YouTube Shorts.', features: ['Dynamic Captions', 'B-Roll Sourcing', 'Sound Effects & Music', 'Motion Graphics', 'Color Grading'], accent: '#FF5C28', border: 'rgba(255,92,40,0.15)', bg: 'rgba(255,92,40,0.04)' },
  { icon: MonitorPlay, tag: 'Long Form', title: 'YouTube & Podcasts', desc: 'Engaging, story-driven edits for long-form content. Keeping viewers hooked from intro to outro without losing momentum.', features: ['Multi-Cam Editing', 'Story Pacing', 'Audio Cleaning', 'Lower Thirds', 'A-Roll / B-Roll Cuts'], accent: '#a855f7', border: 'rgba(168,85,247,0.15)', bg: 'rgba(168,85,247,0.04)' },
  { icon: Smartphone, tag: 'Content Retainer', title: 'Monthly Video Partner', desc: 'A dedicated editing partnership. You film, I handle the rest. Consistent, high-quality content delivered on autopilot every month.', features: ['Guaranteed Turnarounds', 'Unlimited Revisions', 'Trend Research', 'Priority Support', 'Cloud Storage'], accent: '#22d3ee', border: 'rgba(34,211,238,0.15)', bg: 'rgba(34,211,238,0.04)' },
];

const process = [
  { n: '01', title: 'Discovery & Brief', desc: "We discuss your brand, audience, and the vibe you're going for. Send me your raw footage and any references.", icon: Film },
  { n: '02', title: 'The Hook & Assembly', desc: 'I find the best moments, craft a strong 3-second hook, and build the initial rough cut for pacing.', icon: Zap },
  { n: '03', title: 'Polish & VFX', desc: 'Adding dynamic captions, sound design, color grading, and motion graphics to make the video pop.', icon: Sparkles },
  { n: '04', title: 'Review & Delivery', desc: 'You review the draft. I make any needed tweaks, and deliver the final high-res file ready to post.', icon: CheckCircle },
];

const portfolioItems = [
  { id: 1, title: 'Gym Motivation Reel', views: '2.1M Views', type: 'Fitness', video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4' },
  { id: 2, title: 'Real Estate Tour', views: '850K Views', type: 'Property', video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4' },
  { id: 3, title: 'Podcast Clip', views: '1.5M Views', type: 'Interview', video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4' },
  { id: 4, title: 'Fashion Brand Ad', views: '500K Views', type: 'E-commerce', video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4' },
];

// Hero images for the animated marquee
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1756312148347-611b60723c7a?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1757865579201-693dd2080c73?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1756786605218-28f7dd95a493?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1757519740947-eef07a74c4ab?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1757263005786-43d955f07fb1?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1757207445614-d1e12b8f753e?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1757269746970-dc477517268f?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1755119902709-a53513bcbedc?w=900&auto=format&fit=crop&q=60",
];

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shaderFailed, setShaderFailed] = useState(false);
  const handleShaderUnavailable = useCallback((_r: string) => setShaderFailed(true), []);
  const navLinks = ['Work', 'Services', 'Timeline', 'About', 'Contact'];

  const theme = {
    bg: '#F7F6F3', bgAlt: '#FFFFFF', bgCard: 'rgba(255,255,255,0.7)',
    text: '#111111', textMuted: '#555555', textDim: '#888888',
    border: 'rgba(0,0,0,0.06)', navBg: 'rgba(255,255,255,0.4)',
    navBorder: 'rgba(255,255,255,0.8)', inputBg: 'rgba(255,255,255,0.6)',
  };

  return (
    <div style={{ background: theme.bg, color: theme.text }} className="min-h-screen overflow-x-hidden font-body selection:bg-[#FF5C28]/20 selection:text-[#FF5C28]">

      {/* ── ABSOLUTE NAVBAR (scrolls away) ───────────────────────────────── */}
      <div className="absolute top-0 inset-x-0 z-[100] max-w-[1400px] mx-auto px-4 sm:px-6 pt-5 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between rounded-full px-5 py-3.5 shadow-[0_4px_24px_rgb(0,0,0,0.06)]"
          style={{ background: theme.navBg, border: `1px solid ${theme.navBorder}`, backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)' }}>
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3.5 shrink-0 group">
            <div className="w-10 h-10 bg-[#FF5C28] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-md shadow-[#FF5C28]/30">
              <span className="text-white text-[12px] font-bold font-ui">SV</span>
            </div>
            <div>
              <div className="font-ui text-[15px] font-bold tracking-tight leading-none text-[#111]">SharonRaj Vasave</div>
              <div className="font-ui text-[11px] font-medium mt-1 text-stone-500 hidden sm:block">Video Editor · Kamothe</div>
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
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/60">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-ui text-[12px] font-bold text-stone-600">Available</span>
            </div>
            <LiveClock />
            <button onClick={() => setMenuOpen(true)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 border border-black/6 bg-white/60">
              <Menu size={18} className="text-[#111]" />
            </button>
          </div>
        </nav>
      </div>

      {/* ── HERO (AnimatedMarqueeHero) ─────────────────────────────────────── */}
      <AnimatedMarqueeHero
        tagline="Available for new projects"
        title={
          <>
            I craft short-form videos<br className="hidden sm:block" />
            that{' '}
            <span style={{ background: 'linear-gradient(135deg,#FF5C28,#ff9a6c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} className="italic">
              stop the scroll.
            </span>
          </>
        }
        description="Specializing in high-retention Reels, TikToks, and Shorts. I help brands capture attention in the first 3 seconds and turn views into real results."
        ctaText="Let's work together"
        ctaHref="#contact"
        images={HERO_IMAGES}
      />

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
      <section id="work" className="py-20 sm:py-24 lg:py-36 relative bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20">
            <div>
              <FadeIn><SectionBadge label="My Edits" /></FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em] max-w-lg text-[#111]">
                  Engineered for <span className="italic" style={{ background: 'linear-gradient(135deg,#FF5C28,#ff9a6c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>retention.</span>
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <p className="font-body text-[15px] sm:text-[16px] leading-[1.75] max-w-sm text-stone-500 font-medium">
                Vertical content requires a completely different pacing. Here are some of my best performing short-form edits.
              </p>
            </FadeIn>
          </div>

          {/* 9:16 Grid with Reaction Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {portfolioItems.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.1}>
                <div className="group cursor-pointer flex flex-col h-full rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-shadow duration-500">
                  <div className="relative w-full aspect-[9/16] bg-stone-100">
                    <video src={item.video} autoPlay muted loop playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    {/* Type badge */}
                    <div className="absolute top-4 left-4">
                      <span className="text-white text-[11px] font-bold font-ui px-2.5 py-1.5 rounded-lg"
                        style={{ background: 'rgba(255,92,40,0.9)', backdropFilter: 'blur(4px)', boxShadow: '0 4px 12px rgba(255,92,40,0.3)' }}>
                        {item.type}
                      </span>
                    </div>

                    {/* Reaction button — top right */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ReactionButton />
                    </div>

                    {/* Play icon on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                        <Play size={20} className="text-white ml-1" />
                      </div>
                    </div>

                    {/* Title & views */}
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="font-display text-[18px] text-white font-medium mb-1.5 leading-tight">{item.title}</div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-ui text-[12px] font-bold text-white/80">
                          <Film size={14} className="text-[#FF5C28]" />
                          {item.views}
                        </div>
                        {/* Always-visible reaction button at the bottom */}
                        <ReactionButton />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section id="services" className="py-20 sm:py-24 lg:py-36 relative bg-[#F7F6F3]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none bg-[#FF5C28]/5 blur-[150px]" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
          <FadeIn><SectionBadge label="What I do" /></FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-20 mb-12 sm:mb-16 lg:mb-20">
            <FadeIn delay={0.1} className="flex-1">
              <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em] text-[#111]">
                Video editing that <span className="italic text-stone-400">gets views.</span>
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {services.map((s, i) => (
              <FadeIn key={s.tag} delay={i * 0.1}>
                <div className="relative rounded-3xl p-8 sm:p-10 h-full flex flex-col overflow-hidden group transition-all duration-500 bg-white border border-black/[0.04] shadow-[0_4px_24px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]">
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `${s.accent}15` }} />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 shadow-sm"
                      style={{ background: `${s.accent}10`, border: `1px solid ${s.accent}20` }}>
                      <s.icon size={24} style={{ color: s.accent }} />
                    </div>
                    <div className="font-ui text-[12px] font-bold tracking-widest uppercase mb-4" style={{ color: s.accent }}>{s.tag}</div>
                    <h3 className="font-display text-[1.4rem] sm:text-[1.6rem] leading-[1.2] mb-4 text-[#111]">{s.title}</h3>
                    <p className="font-body text-[15px] sm:text-[16px] leading-[1.75] mb-8 text-stone-500 font-medium">{s.desc}</p>
                    <ul className="flex flex-col gap-3.5 mt-auto">
                      {s.features.map(f => (
                        <li key={f} className="flex items-center gap-3 font-ui text-[13px] sm:text-[14px] font-medium text-stone-600">
                          <CheckCircle size={15} style={{ color: s.accent, flexShrink: 0 }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 mb-12 sm:mb-16">
          <FadeIn><SectionBadge label="What clients say" /></FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em] text-[#111] max-w-2xl">
              Real results. <span className="italic text-stone-400">Real clients.</span>
            </h2>
          </FadeIn>
        </div>
        <FadeIn delay={0.15}>
          <TestimonialMarqueeDemo />
        </FadeIn>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────────────── */}
      <section id="timeline" className="py-20 sm:py-24 lg:py-36 bg-[#F7F6F3]">
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
            <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-stone-200" />
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

                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-ui text-[15px] font-bold shrink-0"
                          style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color, boxShadow: `0 8px 24px ${item.color}20` }}>
                          '{item.year.slice(2)}
                        </div>
                        {i < 3 && <div className="w-px bg-stone-200" style={{ height: 60 }} />}
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
                    SV
                  </div>
                  <h3 className="font-display text-[2.2rem] font-bold text-[#111] mb-2 tracking-tight">SharonRaj Vasave</h3>
                  <p className="font-ui text-[14px] font-bold tracking-wide text-[#FF5C28] mb-8">FREELANCE VIDEO EDITOR</p>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-8 pt-8 border-t border-stone-200 w-full">
                    {[['Location', 'Kamothe, Navi Mumbai'], ['Experience', '3+ Years'], ['Primary Tool', 'Premiere Pro'], ['Specialty', 'Short-Form Content']].map(([label, val]) => (
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
                  I edit videos so you don't have to.
                </h2>
                <div className="space-y-6 font-body text-[16px] sm:text-[18px] leading-[1.8] text-stone-500 font-medium">
                  <p>As a solo freelance editor, you work directly with me. No account managers, no delays, no junior editors touching your footage.</p>
                  <p>I specialize in understanding algorithms. Every cut, caption, and sound effect is engineered to maximize retention and engagement for your specific audience.</p>
                </div>
                <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-stone-200">
                  {[{ n: 100, s: '+', l: 'Videos Edited' }, { n: 15, s: 'M+', l: 'Total Views' }, { n: 99, s: '%', l: 'Client Satisfaction' }].map(({ n, s, l }) => (
                    <div key={l}>
                      <div className="font-display text-[2.2rem] font-bold text-[#111] leading-none"><Counter to={n} suffix={s} /></div>
                      <div className="font-ui text-[12px] font-bold text-stone-400 mt-1.5 uppercase tracking-wide">{l}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-10">
                  {['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut', 'Photoshop', 'Audition'].map(s => (
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
              <a href="mailto:sharonraj@example.com" className="inline-flex items-center gap-2.5 font-ui text-[15px] font-bold text-white/80 hover:text-white transition-colors">
                <Mail size={18} />sharonraj@example.com
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 pt-10 sm:pt-12 border-t border-white/20">
              {[{ icon: MapPin, label: 'Kamothe, Navi Mumbai — 410209' }, { icon: Mail, label: 'sharonraj@example.com' }, { icon: Phone, label: '+91 98765 43210' }].map(({ icon: Icon, label }) => (
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
                <span className="text-white text-[13px] font-bold font-ui">SV</span>
              </div>
              <div>
                <div className="font-ui text-[16px] font-bold text-white tracking-tight">SharonRaj Vasave</div>
                <div className="font-ui text-[12px] font-medium text-white/40 mt-0.5">Video Editor · Kamothe, Navi Mumbai</div>
              </div>
            </div>
            <nav className="flex flex-wrap gap-x-8 gap-y-3">
              {navLinks.map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="font-ui text-[14px] font-semibold text-white/40 hover:text-white transition-colors">{l}</a>
              ))}
            </nav>
            <p className="font-ui text-[13px] font-semibold text-white/30">© 2026 SharonRaj Vasave.</p>
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
                    <span className="text-white text-[12px] font-bold font-ui">SV</span>
                  </div>
                  <span className="font-ui font-bold text-[16px] text-[#111]">SharonRaj</span>
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
    </div>
  );
}
