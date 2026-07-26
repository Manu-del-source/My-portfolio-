import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import {
  Github, Linkedin, Mail, MessageCircle, Send, ExternalLink,
  Menu, X, Download, Code2, Globe, Bot, Cpu, Database,
  CreditCard, Zap, Terminal, ArrowRight, MapPin, Phone
} from 'lucide-react';

// ─── TYPES ─────────────────────────────────────────────────────────────────

interface Project {
  title: string;
  description: string;
  tags: string[];
  badge: string;
  badgeColor: 'cyan' | 'green' | 'purple' | 'yellow';
  link: string;
  icon: string;
  image?: string;
}

interface SkillGroup {
  title: string;
  icon: React.ReactNode;
  color: 'cyan' | 'purple' | 'pink' | 'yellow';
  tags: string[];
}

// ─── DATA ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Frontend',
    icon: <Globe className="w-5 h-5" />,
    color: 'cyan',
    tags: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion'],
  },
  {
    title: 'Backend',
    icon: <Code2 className="w-5 h-5" />,
    color: 'purple',
    tags: ['Node.js', 'Express', 'Python', 'FastAPI', 'Socket.IO', 'Redis'],
  },
  {
    title: 'Data & Infra',
    icon: <Database className="w-5 h-5" />,
    color: 'pink',
    tags: ['Supabase', 'PostgreSQL', 'MongoDB', 'Prisma', 'Docker', 'SQLite'],
  },
  {
    title: 'Payments & APIs',
    icon: <CreditCard className="w-5 h-5" />,
    color: 'yellow',
    tags: ['M-Pesa Daraja', 'STK Push', 'MikroTik API', 'Telegram Bot API', 'WebSockets'],
  },
  {
    title: 'AI & Trading',
    icon: <Bot className="w-5 h-5" />,
    color: 'cyan',
    tags: ['Claude API', 'Gemini API', 'RSI / MACD', 'Bollinger Bands', 'ccxt', 'SMC / BOS'],
  },
  {
    title: 'Tools & Env',
    icon: <Terminal className="w-5 h-5" />,
    color: 'purple',
    tags: ['Termux / Android', 'Git', 'Vercel', 'PWA', 'JWT Auth', 'ReportLab'],
  },
];

const PROJECTS: Project[] = [
  {
    title: 'Poppies',
    description: 'Restaurant website for an urban dining spot in Nairobi CBD. Bold editorial design with specials, full menu, gallery, reviews, and table booking — deployed and live on Vercel.',
    tags: ['React', 'Framer Motion', 'Tailwind', 'Vercel'],
    badge: 'Live',
    badgeColor: 'green',
    link: 'https://poppies.vercel.app',
    icon: '🍽️',
    image: '/images/projects/poppies.png',
  },
  {
    title: 'Lumina',
    description: 'Immersive event landing page for an audiovisual festival in Nairobi. Animated hero, lineup, ticketing sections, and a glowing neon aesthetic with scrolling marquee — live on Vercel.',
    tags: ['React', 'Framer Motion', 'CSS Animations', 'Vercel'],
    badge: 'Live',
    badgeColor: 'green',
    link: 'https://lumina-rosy.vercel.app',
    icon: '🎆',
    image: '/images/projects/lumina.png',
  },
  {
    title: 'MaliHub Kenya',
    description: 'Full-stack second-hand goods marketplace for Kenya. M-Pesa STK Push payments, Supabase PostgreSQL backend, seller dashboards, and a complete Next.js 15 frontend with listing management.',
    tags: ['Next.js 15', 'Supabase', 'M-Pesa Daraja', 'TypeScript', 'Tailwind'],
    badge: 'Live',
    badgeColor: 'green',
    link: 'https://github.com/Manu-del-source',
    icon: '🛒',
  },
  {
    title: 'DollarPrinter AI',
    description: 'AI-powered automated trading platform with a full technical analysis engine — RSI, MACD, Bollinger Bands, EMA signals. Real-time via Socket.IO, containerised with Docker, persisted via Prisma + Redis.',
    tags: ['Node.js', 'Express', 'Socket.IO', 'Redis', 'Docker', 'Prisma'],
    badge: 'Backend',
    badgeColor: 'purple',
    link: 'https://github.com/Manu-del-source',
    icon: '📈',
  },
  {
    title: 'WiFiFLOW',
    image: '/images/projects/wififlow.jpg',
    description: 'A modern WiFi hotspot billing and management platform built for ISPs, hotels, cafés, schools, and businesses. It includes voucher management, customer accounts, billing, usage monitoring, and a responsive admin dashboard.',
    tags: [
      'React',
      'Node.js',
      'Supabase',
      'Tailwind CSS',
      'WiFi Billing'
     ],
     badge: 'GitHub',
     badgeColor: 'cyan',
     link: 'https://github.com/Manu-del-source/wifi-billing-system',
     icon: '📶',
  },
  {
    title: 'JARVIS AI Assistant',
    description: 'Iron Man HUD dashboard backed by a Python FastAPI + Claude API engine. Dual-layer SQLite memory, WebSocket real-time comms, and tool-use — built entirely on Termux.',
    tags: ['Python', 'FastAPI', 'Claude API', 'React', 'SQLite', 'WebSockets'],
    badge: 'Full-Stack',
    badgeColor: 'cyan',
    link: 'https://github.com/Manu-del-source',
    icon: '🤖',
  },
  {
    title: 'StreetWear KE',
    image: '/images/projects/streetwear-ke.jpg',
    description: 'A modern e-commerce storefront for a Kenyan streetwear brand featuring a premium dark UI, responsive design, product catalog, and WhatsApp ordering.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Responsive'],
    badge: 'Live',
    badgeColor: 'green',
    link: 'https://streetwear-ke.vercel.app/',
    icon: '👕',
},
];

const EXPERIENCE = [
  {
    period: '2024 — Present',
    role: 'Independent Full-Stack Developer',
    company: 'Freelance · Eldoret, Kenya',
    desc: 'Building and shipping full-stack SaaS platforms, fintech products, and AI-powered tools targeting African markets. Specialising in M-Pesa integrations, real-time systems, and mobile-first development on Termux.',
  },
  {
    period: '2023 — 2024',
    role: 'Algorithmic Trading Developer',
    company: 'Self-Directed · Deriv / Crypto Markets',
    desc: 'Designed and built automated trading systems using RSI, MACD, EMA, SMC, and Bollinger Bands strategies. Deployed live signal engines on Deriv synthetic indices with real-time Telegram delivery and React dashboards.',
  },
  {
    period: '2022 — 2023',
    role: 'Web Developer & Digital Entrepreneur',
    company: 'Independent · Kenya',
    desc: 'Built and sold digital products including school management systems, POS platforms, and eBooks. Established M-Pesa payment integrations and SaaS monetisation strategies tailored to the Kenyan SMB market.',
  },
];

const TECH_MARQUEE = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'M-Pesa Daraja',
  'Supabase', 'PostgreSQL', 'Docker', 'Socket.IO', 'FastAPI', 'Redis',
  'Claude API', 'Tailwind CSS', 'Prisma', 'MikroTik API', 'WebSockets', 'Vite',
];

// ─── PARTICLE CANVAS ────────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0;
    let raf: number;

    const COLORS = ['#00ffff', '#bf5fff', '#ff4dac', '#ffe94d'];

    interface P { x: number; y: number; vx: number; vy: number; r: number; color: string; alpha: number; }
    let particles: P[] = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function makeParticle(): P {
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.5 + 0.15,
      };
    }

    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 90; i++) particles.push(makeParticle());

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8; ctx.shadowColor = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill(); ctx.restore();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / 130) * 0.12;
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.stroke(); ctx.restore();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.5 }}
    />
  );
}

// ─── TYPEWRITER ──────────────────────────────────────────────────────────────

function TypeWriter({ words }: { words: string[] }) {
  const [displayed, setDisplayed] = useState('');
  const [wi, setWi] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wi];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (displayed.length < word.length) {
        timer = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 75);
      } else {
        timer = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      } else {
        setDeleting(false);
        setWi((wi + 1) % words.length);
      }
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, wi, words]);

  return (
    <span style={{ color: '#bf5fff', fontWeight: 500 }}>
      {displayed}<span className="animate-blink" style={{ color: '#0ff' }}>|</span>
    </span>
  );
}

// ─── SECTION REVEAL ──────────────────────────────────────────────────────────

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── BADGE ───────────────────────────────────────────────────────────────────

const BADGE_STYLES = {
  cyan:   { bg: 'rgba(0,255,255,0.1)',   color: '#0ff',    border: 'rgba(0,255,255,0.3)'   },
  green:  { bg: 'rgba(0,230,100,0.1)',   color: '#00e664', border: 'rgba(0,230,100,0.3)'   },
  purple: { bg: 'rgba(191,95,255,0.1)',  color: '#bf5fff', border: 'rgba(191,95,255,0.3)'  },
  yellow: { bg: 'rgba(255,233,77,0.1)',  color: '#ffe94d', border: 'rgba(255,233,77,0.3)'  },
  pink:   { bg: 'rgba(255,77,172,0.1)',  color: '#ff4dac', border: 'rgba(255,77,172,0.3)'  },
};

function Badge({ label, color }: { label: string; color: keyof typeof BADGE_STYLES }) {
  const s = BADGE_STYLES[color];
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '3px 9px',
      borderRadius: '999px', background: s.bg, color: s.color,
      border: `1px solid ${s.border}`,
    }}>
      {label}
    </span>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const ids = ['skills', 'projects', 'experience', 'contact'];
      let cur = '';
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) cur = id;
      });
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1rem 2rem',
      background: scrolled ? 'rgba(6,6,16,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(120,120,200,0.15)' : '1px solid transparent',
      transition: 'all 0.3s',
    }}>
      <a href="#" style={{
        fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 600,
        background: 'linear-gradient(90deg,#0ff,#bf5fff)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        textDecoration: 'none',
      }}>
        manu.dev
      </a>

      {/* desktop links */}
      <ul style={{ display: 'flex', gap: '1.8rem', listStyle: 'none', margin: 0, padding: 0 }} className="hidden-mobile">
        {NAV_LINKS.map(l => (
          <li key={l.name}>
            <a href={l.href} style={{
              color: active === l.href.slice(1) ? '#0ff' : '#7878a8',
              textDecoration: 'none', fontSize: '0.82rem',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = '#0ff'; }}
            onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = active === l.href.slice(1) ? '#0ff' : '#7878a8'; }}
            >
              {l.name}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" style={{
            padding: '0.5rem 1.2rem', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600,
            background: 'linear-gradient(135deg,#0ff,#bf5fff)',
            color: '#060610', textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => { (e.target as HTMLAnchorElement).style.opacity = '0.85'; }}
          onMouseLeave={e => { (e.target as HTMLAnchorElement).style.opacity = '1'; }}
          >
            Hire Me
          </a>
        </li>
      </ul>

      {/* mobile burger */}
      <button
        onClick={() => setOpen(!open)}
        style={{ background: 'none', border: 'none', color: '#e8e8f8', cursor: 'pointer', display: 'none' }}
        className="show-mobile"
        aria-label="Toggle menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: '#0d0d1f',
              borderBottom: '1px solid rgba(120,120,200,0.2)',
              padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem',
            }}
          >
            {NAV_LINKS.map(l => (
              <a key={l.name} href={l.href}
                onClick={() => setOpen(false)}
                style={{ color: '#e8e8f8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}
              >
                {l.name}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} style={{
              padding: '0.6rem 1.2rem', borderRadius: '6px', textAlign: 'center', fontWeight: 600,
              background: 'linear-gradient(135deg,#0ff,#bf5fff)', color: '#060610', textDecoration: 'none',
            }}>
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function CountUp({ to, suffix = '', duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

function HeroPortrait() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative', width: 'min(320px, 75vw)', flexShrink: 0, margin: '0 auto' }}
    >
      {/* rotating ring behind portrait */}
      <div style={{
        position: 'absolute', inset: '-28px', pointerEvents: 'none', opacity: 0.55,
      }}>
        <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin-slow" style={{ width: '100%', height: '100%' }}>
          <circle cx="160" cy="160" r="155" stroke="url(#rg)" strokeWidth="1" strokeDasharray="8 6" />
          <circle cx="160" cy="160" r="140" stroke="url(#rg2)" strokeWidth="0.5" strokeDasharray="4 8" />
          <defs>
            <linearGradient id="rg" x1="0" y1="0" x2="320" y2="320" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0ff" /><stop offset="1" stopColor="#bf5fff" />
            </linearGradient>
            <linearGradient id="rg2" x1="0" y1="320" x2="320" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff4dac" /><stop offset="1" stopColor="#ffe94d" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* glow behind image */}
      <div style={{
        position: 'absolute', inset: '10%',
        background: 'radial-gradient(circle, rgba(191,95,255,0.35) 0%, rgba(0,255,255,0.12) 55%, transparent 75%)',
        filter: 'blur(30px)', pointerEvents: 'none',
      }} />

      <div className="animate-float" style={{
        position: 'relative', borderRadius: '50%', overflow: 'hidden',
        aspectRatio: '1 / 1',
        border: '2px solid rgba(0,255,255,0.45)',
        boxShadow: '0 0 40px rgba(0,255,255,0.18), 0 0 80px rgba(191,95,255,0.15)',
        background: '#0d0d1f',
      }}>
        <img
          src="/images/emmanuel-headshot.png"
          alt="Emmanuel Kiptoo — Full-Stack Developer"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
        />
        {/* subtle color wash to blend with theme */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 55%, rgba(6,6,16,0.55) 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* status chip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
        style={{
          position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'center', gap: '0.45rem', whiteSpace: 'nowrap',
          background: 'rgba(13,13,31,0.9)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0,230,100,0.35)', borderRadius: '999px',
          padding: '0.4rem 0.9rem', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#00e664',
        }}
      >
        <span className="animate-pulseGlow" style={{
          width: '7px', height: '7px', borderRadius: '50%',
          background: '#00e664', boxShadow: '0 0 8px #00e664', display: 'inline-block',
        }} />
        Open to work
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const ROLES = ['M-Pesa Integrations', 'SaaS Platforms', 'AI Trading Bots', 'Real-Time Systems', 'Kenyan Fintech'];

  return (
    <section id="home" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      padding: '7rem 2rem 4rem',
      maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1,
    }}>
    <div className="hero-grid" style={{
      display: 'flex', alignItems: 'center', gap: '3.5rem', width: '100%',
    }}>
    <div style={{ flex: 1, minWidth: 0 }}>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#0ff', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.2rem' }}
      >
        // Available for freelance &amp; contracts
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
        style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 700, lineHeight: 1.05, marginBottom: '1rem' }}
      >
        Emmanuel<br />
        <span className="grad-text">Kiptoo</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}
        style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: '#7878a8', marginBottom: '1.5rem' }}
      >
        Full-Stack Developer &nbsp;·&nbsp; <TypeWriter words={ROLES} />
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46 }}
        style={{ color: '#7878a8', maxWidth: '520px', lineHeight: 1.75, marginBottom: '2.5rem', fontSize: '1rem' }}
      >
        Building production-grade platforms for the African market — from SaaS dashboards to AI trading engines. Based in Eldoret, Kenya.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58 }}
        style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}
      >
        <a href="#projects" style={{
          padding: '0.75rem 1.8rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.9rem',
          background: 'linear-gradient(135deg,#0ff,#bf5fff)', color: '#060610',
          textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(0,255,255,0.2)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ''; (e.currentTarget as HTMLAnchorElement).style.boxShadow = ''; }}
        >
          View Projects <ArrowRight size={16} />
        </a>
        <a href="https://github.com/Manu-del-source" target="_blank" rel="noopener noreferrer" style={{
          padding: '0.75rem 1.8rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.9rem',
          background: 'transparent', color: '#bf5fff',
          border: '1.5px solid #bf5fff', textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(191,95,255,0.1)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
        >
          <Github size={16} /> GitHub
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72 }}
        style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}
      >
        {[
          { num: <><CountUp to={12} suffix="+" /></>, label: 'Projects built' },
          { num: '3+', label: 'Years building' },
          { num: 'KE', label: 'Based in Kenya' },
        ].map(s => (
          <div key={s.label}>
            <div style={{
              fontSize: '1.8rem', fontWeight: 700,
              background: 'linear-gradient(90deg,#0ff,#bf5fff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{s.num}</div>
            <div style={{ fontSize: '0.72rem', color: '#7878a8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
          </div>
        ))}
      </motion.div>
    </div>

    <HeroPortrait />
    </div>
    </section>
  );
}

// ─── DIVIDER ─────────────────────────────────────────────────────────────────

function Divider() {
  return (
    <div style={{
      width: '100%', height: '1px',
      background: 'linear-gradient(90deg,transparent,#bf5fff,#0ff,transparent)',
      opacity: 0.25,
    }} />
  );
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────

function TechMarquee() {
  const doubled = [...TECH_MARQUEE, ...TECH_MARQUEE];
  return (
    <div style={{ overflow: 'hidden', padding: '1.5rem 0', borderTop: '1px solid rgba(120,120,200,0.1)', borderBottom: '1px solid rgba(120,120,200,0.1)', background: '#0d0d1f', position: 'relative', zIndex: 1 }}>
      <div className="animate-marquee" style={{ display: 'flex', gap: '2rem', width: 'max-content' }}>
        {doubled.map((t, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#7878a8',
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem', whiteSpace: 'nowrap',
          }}>
            <span style={{ color: '#bf5fff', opacity: 0.6 }}>✦</span> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────

const TAG_COLORS = {
  cyan:   { bg: 'rgba(0,255,255,0.07)',  color: '#0ff',    border: 'rgba(0,255,255,0.18)'  },
  purple: { bg: 'rgba(191,95,255,0.07)', color: '#bf5fff', border: 'rgba(191,95,255,0.18)' },
  pink:   { bg: 'rgba(255,77,172,0.07)', color: '#ff4dac', border: 'rgba(255,77,172,0.18)' },
  yellow: { bg: 'rgba(255,233,77,0.07)', color: '#ffe94d', border: 'rgba(255,233,77,0.18)' },
};

function Skills() {
  return (
    <section id="skills" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <Reveal>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#0ff', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>// what I work with</p>
        <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, marginBottom: '0.8rem' }}>
          Technical <span className="grad-text-2">Stack</span>
        </h2>
        <p style={{ color: '#7878a8', fontSize: '1rem', maxWidth: '480px', lineHeight: 1.7, marginBottom: '3rem' }}>
          End-to-end development across web, mobile, payments, and AI — built and shipped on Termux and deployed live.
        </p>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.2rem' }}>
        {SKILL_GROUPS.map((g, i) => {
          const tc = TAG_COLORS[g.color];
          return (
            <Reveal key={g.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4, borderColor: 'rgba(191,95,255,0.45)' }}
                style={{
                  background: '#0d0d1f', border: '1px solid rgba(120,120,200,0.18)',
                  borderRadius: '12px', padding: '1.4rem', transition: 'border-color 0.3s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.9rem', color: tc.color }}>
                  {g.icon}
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#e8e8f8' }}>{g.title}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {g.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.68rem', padding: '3px 9px',
                      borderRadius: '4px', background: tc.bg, color: tc.color, border: `1px solid ${tc.border}`,
                    }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section id="projects" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <Reveal>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#0ff', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>// things I've shipped</p>
        <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, marginBottom: '0.8rem' }}>
          Featured <span className="grad-text-2">Projects</span>
        </h2>
        <p style={{ color: '#7878a8', fontSize: '1rem', maxWidth: '480px', lineHeight: 1.7, marginBottom: '3rem' }}>
          Production-level builds covering SaaS, fintech, AI, and marketplaces — all targeting real Kenyan and African market needs.
        </p>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '1.4rem' }}>
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -6 }}
              style={{
                background: '#0d0d1f', border: '1px solid rgba(120,120,200,0.18)',
                borderRadius: '14px', padding: '1.6rem', position: 'relative', overflow: 'hidden',
                height: '100%', display: 'flex', flexDirection: 'column',
              }}
            >
              {/* top accent bar on hover via CSS trick — use a pseudo via JS */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: 'linear-gradient(90deg,#0ff,#bf5fff,#ff4dac)',
                opacity: 0.8,
              }} />

              {p.image && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', margin: '-0.3rem -0.3rem 1.1rem', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(120,120,200,0.22)' }}>
                  <img
                    src={p.image}
                    alt={`${p.title} — live site preview`}
                    loading="lazy"
                    style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                  />
                </a>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>{p.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: '1rem', color: '#e8e8f8' }}>{p.title}</span>
                </div>
                <Badge label={p.badge} color={p.badgeColor} />
              </div>

              <p style={{ fontSize: '0.87rem', color: '#7878a8', lineHeight: 1.65, marginBottom: '1.2rem', flex: 1 }}>{p.description}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.66rem', padding: '2px 7px',
                      borderRadius: '4px', background: '#12122a', color: '#7878a8',
                      border: '1px solid rgba(120,120,200,0.18)',
                    }}>{t}</span>
                  ))}
                </div>
                <a href={p.link} target="_blank" rel="noopener noreferrer"
                  style={{ color: '#7878a8', marginLeft: '0.8rem', flexShrink: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#0ff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#7878a8'; }}
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────

function Experience() {
  return (
    <section id="experience" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <Reveal>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#0ff', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>// my journey</p>
        <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, marginBottom: '0.8rem' }}>
          Experience &amp; <span className="grad-text-2">Background</span>
        </h2>
        <p style={{ color: '#7878a8', fontSize: '1rem', maxWidth: '480px', lineHeight: 1.7, marginBottom: '3rem' }}>
          Independent builder shipping real products for the Kenyan and African tech market.
        </p>
      </Reveal>

      <div style={{ position: 'relative', paddingLeft: '2rem' }}>
        {/* timeline line */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px',
          background: 'linear-gradient(180deg,#0ff,#bf5fff,#ff4dac)',
          opacity: 0.5,
        }} />

        {EXPERIENCE.map((e, i) => (
          <Reveal key={e.role} delay={i * 0.1}>
            <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
              {/* dot */}
              <div style={{
                position: 'absolute', left: '-2.42rem', top: '0.4rem',
                width: '10px', height: '10px', borderRadius: '50%',
                background: '#bf5fff', boxShadow: '0 0 12px #bf5fff',
              }} />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#0ff', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>{e.period}</p>
              <p style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.15rem', color: '#e8e8f8' }}>{e.role}</p>
              <p style={{ fontSize: '0.85rem', color: '#bf5fff', marginBottom: '0.5rem' }}>{e.company}</p>
              <p style={{ fontSize: '0.87rem', color: '#7878a8', lineHeight: 1.7 }}>{e.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  }, []);

  const LINKS = [
    { icon: <MessageCircle size={18} />, label: 'WhatsApp', sub: '+254 726 090 372', href: 'https://wa.me/254726090372', color: '#00e664' },
    { icon: <Send size={18} />, label: 'Telegram', sub: '@Bohsell', href: 'https://t.me/Bohsell', color: '#2aabee' },
    { icon: <Mail size={18} />, label: 'Email', sub: 'kiptooe213@gmail.com', href: 'mailto:kiptooe213@gmail.com', color: '#ff4dac' },
    { icon: <Github size={18} />, label: 'GitHub', sub: 'Manu-del-source', href: 'https://github.com/Manu-del-source', color: '#e8e8f8' },
    { icon: <Linkedin size={18} />, label: 'LinkedIn', sub: 'Emmanuel Kiptoo', href: 'https://www.linkedin.com/in/emmanuel-kiptoo-aa5b383a8', color: '#0a66c2' },
    { icon: <MapPin size={18} />, label: 'Location', sub: 'Eldoret, Kenya', href: '#', color: '#ffe94d' },
  ];

  const inputStyle: React.CSSProperties = {
    background: '#0d0d1f', border: '1px solid rgba(120,120,200,0.2)', borderRadius: '8px',
    padding: '0.75rem 1rem', color: '#e8e8f8', fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
    outline: 'none', width: '100%', transition: 'border-color 0.2s',
  };

  return (
    <section id="contact" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <Reveal>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#0ff', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>// let's build something</p>
        <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, marginBottom: '0.8rem' }}>
          Get in <span className="grad-text-2">Touch</span>
        </h2>
        <p style={{ color: '#7878a8', fontSize: '1rem', maxWidth: '480px', lineHeight: 1.7, marginBottom: '3rem' }}>
          Open to freelance contracts, SaaS collaborations, and consulting for African-market fintech and web projects.
        </p>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '2rem', alignItems: 'start' }}>

        {/* Contact links */}
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '0.75rem' }}>
            {LINKS.map(l => (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ y: -3, borderColor: 'rgba(191,95,255,0.4)' }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  background: '#0d0d1f', border: '1px solid rgba(120,120,200,0.18)',
                  borderRadius: '10px', padding: '0.9rem 1rem',
                  textDecoration: 'none', color: '#e8e8f8',
                }}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: '#12122a', border: '1px solid rgba(120,120,200,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: l.color, flexShrink: 0,
                }}>
                  {l.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{l.label}</div>
                  <div style={{ fontSize: '0.72rem', color: '#7878a8' }}>{l.sub}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text" placeholder="Your name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
              onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#bf5fff'; }}
              onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(120,120,200,0.2)'; }}
            />
            <input
              type="email" placeholder="Your email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
              onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#bf5fff'; }}
              onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(120,120,200,0.2)'; }}
            />
            <textarea
              placeholder="Tell me about your project..." value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              rows={5}
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = '#bf5fff'; }}
              onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(120,120,200,0.2)'; }}
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.8rem 1.8rem', borderRadius: '8px', fontWeight: 600,
                fontSize: '0.9rem', border: 'none', cursor: 'pointer',
                background: sent
                  ? 'linear-gradient(135deg,#00e664,#00b8ff)'
                  : 'linear-gradient(135deg,#0ff,#bf5fff)',
                color: '#060610',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                transition: 'background 0.4s',
                alignSelf: 'flex-start',
              }}
            >
              {sent ? '✓ Message sent!' : <><Send size={16} /> Send Message</>}
            </motion.button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(120,120,200,0.15)',
      padding: '2rem', textAlign: 'center',
      color: '#7878a8', fontSize: '0.8rem',
      background: '#0d0d1f', position: 'relative', zIndex: 1,
    }}>
      <p>
        Designed &amp; built by{' '}
        <span style={{ background: 'linear-gradient(90deg,#0ff,#bf5fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Emmanuel Kiptoo
        </span>
        {' '}· Eldoret, Kenya · 2025
      </p>
      <p style={{ marginTop: '0.4rem', fontSize: '0.72rem', opacity: 0.7 }}>
        React 19 + TypeScript + Vite · Deployed on Vercel
      </p>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <ParticleCanvas />
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <Divider />
        <Skills />
        <Divider />
        <Projects />
        <Divider />
        <Experience />
        <Divider />
        <Contact />
      </main>
      <Footer />

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: block !important; }
        }
        @media (max-width: 900px) {
          .hero-grid { flex-direction: column-reverse !important; gap: 2.5rem !important; }
        }
        @media (min-width: 641px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}
