'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  animate,
  PanInfo,
} from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

// ── GOOGLE FONTS ──────────────────────────────────────────────────────────────
const FontInjector = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1' +
      '&family=Space+Mono:ital,wght@0,400;0,700;1,400' +
      '&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600' +
      '&display=swap';
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch (_) {} };
  }, []);
  return null;
};

// ── PROJECT DATA ──────────────────────────────────────────────────────────────
const projects = [
  {
    title: 'Marine eDNA AI Pipeline',
    tagline: "The Ocean's Code",
    chapter: 'I',
    description:
      'An AI-driven bioinformatics pipeline that identifies marine biodiversity directly from environmental DNA sequences. Combines K-means and DBSCAN clustering with custom neural networks to automate taxonomy classification from phylum down to species level — no physical specimen required.',
    technologies: ['Python', 'PyTorch', 'Bioinformatics', 'DBSCAN'],
    githubLink: 'https://github.com/Anbu-Malligarjun-Sri/AI-driven-pipeline-for-Marine-species-identification-using-eDNA',
    liveLink: null,
    image: '/projects/Ai pipeline eDNA..png',
    frame: '01',
    year: '2025',
    accent: '#6eb8c8',
    accentDim: 'rgba(110,184,200,0.15)',
    accentText: '#2d7a92',
    coverDark: '#081820',
    coverMid: '#163040',
    gold: '#c9a84a',
    marginalia: 'Genus · Species · Phylum',
  },
  {
    title: 'TARS — Local LLM Agent',
    tagline: 'Silicon Minds',
    chapter: 'II',
    description:
      'A privacy-first, Interstellar-inspired AI chatbot powered by local LLMs and Retrieval-Augmented Generation. Dual CLI and React web interface, ChromaDB knowledge base covering Physics, Astronomy and Movie Lore, plus a configurable personality engine with adjustable humor and honesty controls.',
    technologies: ['Python', 'FastAPI', 'RAG', 'ChromaDB', 'React'],
    githubLink: 'https://github.com/Anbu-Malligarjun-Sri/TARS-Local-LLM-Augementation-Retrieval-System',
    liveLink: null,
    image: '/projects/The TARS profile.png',
    frame: '02',
    year: '2025',
    accent: '#c8a96e',
    accentDim: 'rgba(200,169,110,0.15)',
    accentText: '#7a5c18',
    coverDark: '#1e1006',
    coverMid: '#382010',
    gold: '#d4a030',
    marginalia: 'Honesty · Humour · Truth',
  },
  {
    title: 'HabitQuest',
    tagline: 'Rewiring the Mind',
    chapter: 'III',
    description:
      'A gamified habit-tracking application that transforms daily routines into an RPG experience. Earn XP, climb through 9 unique ranks, collect resources to repair broken streaks, and track progress across fitness, finance, journal, and developer goals — all on a fully type-safe tRPC stack.',
    technologies: ['TypeScript', 'Next.js', 'tRPC', 'PostgreSQL', 'Prisma'],
    githubLink: 'https://github.com/Anbu-Malligarjun-Sri/Habit-Tracker',
    liveLink: null,
    image: '/projects/habit-tracker.png',
    frame: '03',
    year: '2025',
    accent: '#b8c87e',
    accentDim: 'rgba(184,200,126,0.15)',
    accentText: '#496018',
    coverDark: '#0e1806',
    coverMid: '#1e2e0e',
    gold: '#b8b030',
    marginalia: 'XP · Rank · Streak',
  },
  {
    title: 'J.A.R.V.I.S.',
    tagline: 'Just A Rather Very Intelligent System',
    chapter: 'IV',
    description:
      'A Claude Code-inspired terminal AI assistant that runs entirely offline via local LLMs. Features a Textual-based TUI with a Project Explorer, AI Reasoning panel, File Preview, and sandboxed shell execution — fully keyboard-driven with voice push-to-talk support.',
    technologies: ['Python', 'Textual', 'LM Studio', 'Ollama'],
    githubLink: 'https://github.com/Anbu-Malligarjun-Sri/Terminal-Graphical-User-Interface-TUI-',
    liveLink: null,
    image: '/projects/Jarvis-terminal.png',
    frame: '04',
    year: '2025',
    accent: '#c87ea0',
    accentDim: 'rgba(200,126,160,0.15)',
    accentText: '#8c2a58',
    coverDark: '#180810',
    coverMid: '#2e1222',
    gold: '#c08858',
    marginalia: 'Terminal · Voice · AI',
  },
] as const;

type Project = (typeof projects)[number];
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
const LEFT_PAGE_RATIO = 58;

// ── BOOKSHELF SILHOUETTES — flanks the scene with a dark library ──────────────
function ShelfSilhouettes() {
  const leftBooks = [
    { x: 4,  h: 92,  w: 15, tilt: 0  },
    { x: 21, h: 108, w: 11, tilt: 1  },
    { x: 34, h: 78,  w: 17, tilt: -1 },
    { x: 53, h: 98,  w: 13, tilt: 0  },
    { x: 68, h: 82,  w: 19, tilt: 1  },
    { x: 89, h: 112, w: 12, tilt: 0  },
    { x: 103,h: 74,  w: 15, tilt: -1 },
    { x: 120,h: 94,  w: 16, tilt: 0  },
  ];
  const shelf = (y: number) => (
    <rect x={0} y={y} width={155} height={9} fill="rgba(130,88,30,1)" rx="1" />
  );
  const renderBooks = (books: typeof leftBooks, yBase: number) =>
    books.map((b, i) => (
      <rect
        key={i}
        x={b.x + b.tilt}
        y={yBase - b.h}
        width={b.w}
        height={b.h}
        fill="rgba(210,178,102,1)"
        rx="1.5"
      />
    ));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {/* Left shelf */}
      <svg style={{ position: 'absolute', left: 0, top: '6%', opacity: 0.065 }} width="155" height="500" viewBox="0 0 155 500">
        {renderBooks(leftBooks, 195)}
        {shelf(195)}
        {renderBooks(leftBooks.slice(0, 6).map(b => ({ ...b, h: b.h * 0.82 })), 340)}
        {shelf(340)}
      </svg>
      {/* Right shelf (mirrored) */}
      <svg style={{ position: 'absolute', right: 0, top: '6%', opacity: 0.065, transform: 'scaleX(-1)' }} width="155" height="500" viewBox="0 0 155 500">
        {renderBooks(leftBooks, 195)}
        {shelf(195)}
        {renderBooks(leftBooks.slice(0, 6).map(b => ({ ...b, h: b.h * 0.82 })), 340)}
        {shelf(340)}
      </svg>
    </div>
  );
}

// ── LIBRARY BACKGROUND ────────────────────────────────────────────────────────
function LibraryBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* Horizontal shelf-ruled lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(180deg,
          transparent 0px, transparent 90px,
          rgba(90,58,18,0.09) 90px, rgba(90,58,18,0.09) 93px,
          rgba(50,32,8,0.05) 93px, rgba(50,32,8,0.05) 98px)`,
      }} />
      {/* Fine vertical wood-grain lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `repeating-linear-gradient(90deg,
          rgba(255,200,90,0.011) 0px, rgba(255,200,90,0.011) 1px, transparent 1px, transparent 18px,
          rgba(0,0,0,0.016) 18px, rgba(0,0,0,0.016) 19px, transparent 19px, transparent 42px)`,
        filter: 'blur(0.4px)', opacity: 0.75,
      }} />
      {/* Dark wainscoting — left side panel */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '11%',
        background: 'linear-gradient(to right, rgba(4,3,2,0.70), transparent)',
        borderRight: '1px solid rgba(90,58,18,0.09)',
      }} />
      {/* Dark wainscoting — right side panel */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '11%',
        background: 'linear-gradient(to left, rgba(4,3,2,0.70), transparent)',
        borderLeft: '1px solid rgba(90,58,18,0.09)',
      }} />
      {/* Ceiling shadow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '18%',
        background: 'linear-gradient(to bottom, rgba(2,1,1,0.75), transparent)',
      }} />
      {/* Floor shadow */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '20%',
        background: 'linear-gradient(to top, rgba(2,1,1,0.72), transparent)',
      }} />
      {/* Main vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 70% at 50% 50%, transparent 5%, rgba(4,3,2,0.86) 100%)',
      }} />
    </div>
  );
}

// ── LIGHT RAYS — chandelier god rays filter through the library ───────────────
function LightRays({ project }: { project: Project }) {
  const rays = [
    { left: '30%', w: 55,  rot: -7,  dur: 5.2, del: 0.0 },
    { left: '38%', w: 35,  rot: -3,  dur: 4.6, del: 0.9 },
    { left: '46%', w: 80,  rot:  0,  dur: 6.0, del: 0.3 },
    { left: '55%', w: 40,  rot:  3,  dur: 4.8, del: 1.4 },
    { left: '63%', w: 55,  rot:  7,  dur: 5.5, del: 0.6 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {rays.map((r, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.016, 0.032, 0.016], scaleY: [1, 1.02, 1] }}
          transition={{ duration: r.dur, repeat: Infinity, ease: 'easeInOut', delay: r.del }}
          style={{
            position: 'absolute', top: '-2%', left: r.left,
            width: r.w, height: '72%',
            background: `linear-gradient(to bottom, ${project.accent}60 0%, transparent 100%)`,
            transformOrigin: 'top center',
            transform: `rotate(${r.rot}deg)`,
            filter: 'blur(20px)',
          }}
        />
      ))}
    </div>
  );
}

// ── CANDLE FLICKER — multi-source ambient warmth ──────────────────────────────
function CandleLight({ project }: { project: Project }) {
  return (
    <>
      {/* Warm overhead halo */}
      <div style={{
        position: 'absolute', top: '-18%', left: '50%', transform: 'translateX(-50%)',
        width: 620, height: 420,
        background: 'radial-gradient(ellipse, rgba(255,185,70,0.065) 0%, transparent 68%)',
        pointerEvents: 'none', zIndex: 1,
      }} />
      {/* Main accent glow — breathing */}
      <motion.div
        animate={{ opacity: [0.55, 0.73, 0.49, 0.68, 0.51, 0.80, 0.54], scale: [1, 1.06, 0.97, 1.04, 0.98, 1.08, 1.01] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '28%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 820, height: 600,
          background: `radial-gradient(ellipse, ${project.accentDim.replace('0.15', '0.058')} 0%, transparent 60%)`,
          pointerEvents: 'none', zIndex: 1,
        }}
      />
      {/* Left candle fill */}
      <motion.div
        animate={{ opacity: [0.22, 0.38, 0.20, 0.35, 0.25] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        style={{
          position: 'absolute', top: '38%', left: '10%',
          width: 320, height: 240,
          background: `radial-gradient(ellipse, ${project.accentDim.replace('0.15', '0.042')} 0%, transparent 68%)`,
          pointerEvents: 'none', zIndex: 1,
        }}
      />
      {/* Right candle fill */}
      <motion.div
        animate={{ opacity: [0.26, 0.40, 0.22, 0.36, 0.28] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }}
        style={{
          position: 'absolute', top: '38%', right: '10%',
          width: 320, height: 240,
          background: `radial-gradient(ellipse, ${project.accentDim.replace('0.15', '0.042')} 0%, transparent 68%)`,
          pointerEvents: 'none', zIndex: 1,
        }}
      />
    </>
  );
}

// ── WAX SEAL — elaborate multi-ring seal with chapter numeral ─────────────────
function WaxSeal({ project }: { project: Project }) {
  const numeral = ROMAN[parseInt(project.frame) - 1] ?? project.chapter;
  return (
    <motion.div
      whileHover={{ rotate: 9, scale: 1.12 }}
      transition={{ type: 'spring', stiffness: 155, damping: 13 }}
      style={{ position: 'relative', zIndex: 2, cursor: 'default' }}
    >
      <svg width="84" height="84" viewBox="0 0 84 84">
        {/* Subtle outer glow fill */}
        <circle cx="42" cy="42" r="40" fill={project.gold} opacity="0.04" />
        {/* Outer dot ring — 30 dots */}
        {Array.from({ length: 30 }, (_, i) => {
          const a = (i / 30) * Math.PI * 2 - Math.PI / 2;
          return <circle key={i} cx={42 + Math.cos(a) * 36} cy={42 + Math.sin(a) * 36} r="1.8" fill={project.gold} opacity="0.26" />;
        })}
        {/* Gear-tooth outer rim */}
        {Array.from({ length: 16 }, (_, i) => {
          const a1 = (i / 16) * Math.PI * 2;
          const a2 = ((i + 0.45) / 16) * Math.PI * 2;
          return (
            <line key={i}
              x1={42 + Math.cos(a1) * 32} y1={42 + Math.sin(a1) * 32}
              x2={42 + Math.cos(a2) * 36} y2={42 + Math.sin(a2) * 36}
              stroke={project.gold} strokeWidth="1.6" opacity="0.18"
            />
          );
        })}
        {/* Concentric rings */}
        <circle cx="42" cy="42" r="30" fill="none" stroke={project.gold} strokeWidth="0.9" opacity="0.52" />
        <circle cx="42" cy="42" r="26" fill="none" stroke={project.gold} strokeWidth="0.5" opacity="0.28" />
        <circle cx="42" cy="42" r="22" fill="none" stroke={project.gold} strokeWidth="0.3" opacity="0.18" />
        {/* Cross guides */}
        <line x1="42" y1="18" x2="42" y2="66" stroke={project.gold} strokeWidth="0.35" opacity="0.13" />
        <line x1="18" y1="42" x2="66" y2="42" stroke={project.gold} strokeWidth="0.35" opacity="0.13" />
        <line x1="24" y1="24" x2="60" y2="60" stroke={project.gold} strokeWidth="0.25" opacity="0.08" />
        <line x1="60" y1="24" x2="24" y2="60" stroke={project.gold} strokeWidth="0.25" opacity="0.08" />
        {/* Inner dot accent ring — 8 dots */}
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
          return <circle key={i} cx={42 + Math.cos(a) * 19} cy={42 + Math.sin(a) * 19} r="1" fill={project.gold} opacity="0.22" />;
        })}
        {/* Roman numeral */}
        <text
          x="42" y="50"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', serif"
          fontSize="24"
          fontWeight="400"
          fontStyle="italic"
          fill={project.gold}
          opacity="0.88"
        >
          {numeral}
        </text>
      </svg>
    </motion.div>
  );
}

// ── CORNER FILIGREE — elaborate SVG corner ornament ───────────────────────────
function CornerFiligree({ flip, gold }: { flip: [boolean, boolean]; gold: string }) {
  return (
    <svg
      width="52" height="52" viewBox="0 0 52 52"
      style={{ transform: `scale(${flip[0] ? -1 : 1}, ${flip[1] ? -1 : 1})`, opacity: 0.58 }}
    >
      {/* Main L-bracket */}
      <path d="M2,2 L24,2 M2,2 L2,24" stroke={gold} strokeWidth="1.4" fill="none" />
      {/* Inner bracket */}
      <path d="M6,6 L18,6 M6,6 L6,18" stroke={gold} strokeWidth="0.55" fill="none" opacity="0.42" />
      {/* Primary flourish */}
      <path d="M6,6 C6,6 15,6 17,15" stroke={gold} strokeWidth="0.65" fill="none" opacity="0.52" />
      {/* Secondary arc */}
      <path d="M11,2 C11,8 7,11 2,11" stroke={gold} strokeWidth="0.45" fill="none" opacity="0.32" />
      {/* Tertiary micro arc */}
      <path d="M7,2 C7,5 5,7 2,7" stroke={gold} strokeWidth="0.3" fill="none" opacity="0.20" />
      {/* Corner dot — main */}
      <circle cx="6" cy="6" r="1.6" fill={gold} opacity="0.62" />
      {/* End dots */}
      <circle cx="24" cy="2" r="1.1" fill={gold} opacity="0.42" />
      <circle cx="2" cy="24" r="1.1" fill={gold} opacity="0.42" />
      {/* Mid-run dots */}
      <circle cx="16" cy="2" r="0.7" fill={gold} opacity="0.26" />
      <circle cx="2" cy="16" r="0.7" fill={gold} opacity="0.26" />
      {/* Tiny ornament dot */}
      <circle cx="10" cy="10" r="0.6" fill={gold} opacity="0.20" />
    </svg>
  );
}

// ── COVER FRONT ───────────────────────────────────────────────────────────────
function CoverFront({ project }: { project: Project }) {
  const corners: [boolean, boolean][] = [
    [false, false], [true, false], [false, true], [true, true],
  ];
  const cornerPos = ['top', 'top', 'bottom', 'bottom'];
  const cornerSide = ['left', 'right', 'left', 'right'];

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: `
        repeating-linear-gradient(135deg, rgba(255,255,255,0.014) 0px, rgba(255,255,255,0.014) 1px, transparent 1px, transparent 9px),
        repeating-linear-gradient(45deg,  rgba(0,0,0,0.033)       0px, rgba(0,0,0,0.033)       1px, transparent 1px, transparent 9px),
        repeating-linear-gradient(0deg,   rgba(255,255,255,0.006) 0px, rgba(255,255,255,0.006) 1px, transparent 1px, transparent 4px),
        linear-gradient(165deg, ${project.coverMid} 0%, ${project.coverDark} 50%, #03040a 100%)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Four-layer gilt border system */}
      <div style={{ position: 'absolute', inset: 7,  border: `1.6px solid ${project.gold}45`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 11, border: `0.5px solid ${project.gold}20`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 15, border: `1px solid ${project.gold}38`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 19, border: `0.5px solid ${project.gold}14`, pointerEvents: 'none' }} />

      {/* Corner filigrees */}
      {corners.map((flip, idx) => (
        <div key={idx} style={{ position: 'absolute', [cornerPos[idx]]: 16, [cornerSide[idx]]: 16, pointerEvents: 'none' }}>
          <CornerFiligree flip={flip} gold={project.gold} />
        </div>
      ))}

      {/* Top ornamental rule */}
      <div style={{
        position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)',
        width: 'calc(100% - 100px)', display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'none',
      }}>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${project.gold}58)` }} />
        <svg width="13" height="13" viewBox="0 0 13 13">
          <rect x="2.5" y="2.5" width="8" height="8" fill="none" stroke={project.gold} strokeWidth="0.9" opacity="0.68" transform="rotate(45 6.5 6.5)" />
          <circle cx="6.5" cy="6.5" r="1.3" fill={project.gold} opacity="0.52" />
        </svg>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${project.gold}58)` }} />
      </div>

      {/* Chapter label */}
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: 7.5, letterSpacing: '0.68em',
        color: `${project.gold}7a`, marginBottom: 9, textTransform: 'uppercase',
        position: 'relative', zIndex: 1,
      }}>
        Chapter {project.chapter}
      </div>

      {/* Title separator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 13, position: 'relative', zIndex: 1, width: 'calc(100% - 100px)' }}>
        <div style={{ flex: 1, height: '0.5px', background: `${project.gold}32` }} />
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: `${project.gold}58` }} />
        <div style={{ flex: 1, height: '0.5px', background: `${project.gold}32` }} />
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: 'clamp(14px, 2.3vw, 26px)',
        fontWeight: 400, color: project.gold, textAlign: 'center',
        lineHeight: 1.16, margin: '0 0 8px 0', padding: '0 52px',
        letterSpacing: '-0.01em', position: 'relative', zIndex: 1,
        textShadow: `0 0 90px ${project.gold}42, 0 1px 4px rgba(0,0,0,0.85), 0 0 220px ${project.gold}12`,
      }}>
        {project.title}
      </h3>

      {/* Tagline */}
      <div style={{
        fontFamily: "'Cormorant Garamond', serif", fontSize: 10.5, fontStyle: 'italic',
        color: `${project.gold}52`, letterSpacing: '0.12em', marginBottom: 24,
        position: 'relative', zIndex: 1,
      }}>
        {project.tagline}
      </div>

      {/* Wax seal */}
      <WaxSeal project={project} />

      {/* Year */}
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: 8, letterSpacing: '0.40em',
        color: `${project.gold}35`, marginTop: 15, position: 'relative', zIndex: 1,
      }}>
        {project.year}
      </div>

      {/* Bottom ornamental rule */}
      <div style={{
        position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)',
        width: 'calc(100% - 100px)', display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'none',
      }}>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${project.gold}58)` }} />
        <svg width="13" height="13" viewBox="0 0 13 13">
          <rect x="2.5" y="2.5" width="8" height="8" fill="none" stroke={project.gold} strokeWidth="0.9" opacity="0.68" transform="rotate(45 6.5 6.5)" />
          <circle cx="6.5" cy="6.5" r="1.3" fill={project.gold} opacity="0.52" />
        </svg>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${project.gold}58)` }} />
      </div>

      {/* Depth overlays */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 58% 52% at 50% 47%, ${project.accentDim} 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 82% at 50% 50%, transparent 22%, rgba(0,0,0,0.68) 100%)', pointerEvents: 'none' }} />
      {/* Top sheen */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '36%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.022), transparent)', pointerEvents: 'none' }} />
      {/* Left spine-edge light catch */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '7%', background: 'linear-gradient(to right, rgba(255,255,255,0.022), transparent)', pointerEvents: 'none' }} />
    </div>
  );
}

// ── COVER BACK — marbled endpaper ─────────────────────────────────────────────
function CoverBack({ project }: { project: Project }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: `
        repeating-linear-gradient(135deg, ${project.accent}07 0px, ${project.accent}07 1px, transparent 1px, transparent 14px),
        repeating-linear-gradient(45deg,  ${project.accent}04 0px, ${project.accent}04 1px, transparent 1px, transparent 14px),
        #ece3c5`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
    }}>
      {/* Marbled wave overlay */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.09 }} viewBox="0 0 600 548" preserveAspectRatio="xMidYMid slice">
        <path d="M0,90 Q90,68 200,100 Q320,132 460,88 Q540,68 600,95 L600,135 Q540,108 460,128 Q320,172 200,140 Q90,108 0,130 Z" fill={project.accentText} />
        <path d="M0,210 Q110,188 240,222 Q370,258 490,200 Q558,172 600,210 L600,250 Q558,212 490,240 Q370,298 240,262 Q110,228 0,250 Z" fill={project.gold} />
        <path d="M0,330 Q130,305 280,345 Q400,378 520,318 Q572,294 600,335 L600,372 Q572,334 520,358 Q400,418 280,382 Q130,342 0,370 Z" fill={project.accent} />
        <path d="M0,450 Q95,424 210,462 Q340,502 480,438 Q556,410 600,452 L600,490 Q556,452 480,478 Q340,542 210,500 Q95,462 0,490 Z" fill={project.accentText} opacity="0.5" />
      </svg>

      {/* Ex Libris plate */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ border: '1px solid rgba(100,78,28,0.24)', padding: '24px 40px', textAlign: 'center', background: 'rgba(255,252,242,0.52)', position: 'relative' }}>
          {/* Plate corner marks */}
          {(['top-left','top-right','bottom-left','bottom-right'] as const).map((pos, i) => {
            const isTop = pos.startsWith('top');
            const isLeft = pos.endsWith('left');
            return (
              <svg key={i} width="10" height="10" viewBox="0 0 10 10" style={{ position: 'absolute', [isTop ? 'top' : 'bottom']: -1, [isLeft ? 'left' : 'right']: -1 }}>
                <path d={`M1,1 L6,1 M1,1 L1,6`} stroke="rgba(100,78,28,0.38)" strokeWidth="0.9" fill="none" transform={`rotate(${[0,90,270,180][i]} 5 5)`} />
              </svg>
            );
          })}
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 14, color: 'rgba(55,36,10,0.46)', letterSpacing: '0.24em', fontStyle: 'italic', marginBottom: 10 }}>
            Ex Libris
          </div>
          <div style={{ width: 50, height: 1, background: 'rgba(100,78,28,0.18)', margin: '0 auto 10px' }} />
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, fontStyle: 'italic', color: 'rgba(55,36,10,0.42)', marginBottom: 9, letterSpacing: '0.07em' }}>
            {project.tagline}
          </div>
          <div style={{ width: 50, height: 1, background: 'rgba(100,78,28,0.12)', margin: '0 auto 9px' }} />
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 7.5, color: 'rgba(55,36,10,0.28)', letterSpacing: '0.32em' }}>
            {project.year}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PAGE SPREAD — unified spread: draggable image + @chenglou/pretext wrapping ─
//
// @chenglou/pretext API used here:
//   prepare(text, font)  — heavy Canvas op, called once per project
//   layout(prepared, maxWidth, lineHeight) — pure math, called on resize/side change
//
// Install: npm install @chenglou/pretext
//
function PageSpread({ project, revealed, imageDraggingRef }: { project: Project; revealed: boolean; imageDraggingRef: React.MutableRefObject<boolean> }) {
  const spreadRef = useRef<HTMLDivElement>(null);
  const [spreadWidth, setSpreadWidth]         = useState(900);
  const [preparedDesc, setPreparedDesc]       = useState<unknown>(null);
  const [textMetrics, setTextMetrics]         = useState({ height: 0, lineCount: 0 });
  const [imageOffset, setImageOffset]         = useState({ x: 0, y: 0 });

  // Framer-motion value that drives the drag transform (reset to 0 after each snap)
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Layout constants
  const PAD_H    = 88;   // total left+right padding of content layer
  const GAP      = 20;   // gap between image and text
  const IMG_W    = Math.round(Math.min(spreadWidth * 0.44, 460));
  const IMG_H    = 252;
  const LINE_H   = 25;
  const DESC_FONT = `italic 300 13.5px "Cormorant Garamond", serif`;

  // ── Measure the spread container (no DOM reflow — ResizeObserver) ──────────
  useEffect(() => {
    const el = spreadRef.current;
    if (!el) return;
    const cb = () => setSpreadWidth(el.getBoundingClientRect().width);
    cb();
    const ro = new ResizeObserver(cb);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── STEP 1 — prepare() : heavy op, once per project ───────────────────────
  // Uses Canvas under the hood to pre-cache character widths.
  useEffect(() => {
    let live = true;
    import('@chenglou/pretext').then(({ prepare }: any) => {
      if (!live) return;
      setPreparedDesc(prepare(project.description, DESC_FONT));
    }).catch(() => { /* library not installed — metrics badge hidden */ });
    return () => { live = false; };
  }, [project.description]);

  // ── STEP 2 — layout() : pure math, runs on every resize / side flip ───────
  // Safe to run inside resize listeners or rAF loops (~0.0002 ms).
  useEffect(() => {
    if (!preparedDesc) return;
    let live = true;
    import('@chenglou/pretext').then(({ layout }: any) => {
      if (!live) return;
      // Available text width = full spread minus image minus padding minus gap
      const textW = spreadWidth - IMG_W - GAP - PAD_H;
      if (textW > 60) setTextMetrics(layout(preparedDesc, textW, LINE_H));
    }).catch(() => {});
    return () => { live = false; };
  }, [preparedDesc, spreadWidth, IMG_W, imageOffset.x, imageOffset.y]);

  // ── Reset drag transform when project changes ────────────────────────────
  useEffect(() => {
    setImageOffset({ x: 0, y: 0 });
    dragX.set(0);
    dragY.set(0);
  }, [project.frame, dragX, dragY]);

  // ── Drag end: keep the image where the user dropped it ────────────────────
  const handleDragEnd = useCallback((_: unknown, info: PanInfo) => {
    setImageOffset({ x: Math.round(info.offset.x), y: Math.round(info.offset.y) });
    window.setTimeout(() => { imageDraggingRef.current = false; }, 0);
  }, []);

  const firstChar = project.description[0];
  const restText  = project.description.slice(1);

  return (
    <div ref={spreadRef} style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>

      {/* ── Left-page parchment ──────────────────────────────────────────── */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${LEFT_PAGE_RATIO}%`, background: '#f1ebd3', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.011) 0px, transparent 1px, transparent 30px)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 115% 80% at 100% 0%, rgba(155,110,30,0.08) 0%, transparent 52%), radial-gradient(ellipse 80% 95% at 0% 100%, rgba(130,88,20,0.06) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', top: 30, left: 30, right: 18, height: '0.5px', background: 'rgba(100,72,22,0.13)' }} />
        <div style={{ position: 'absolute', bottom: 30, left: 30, right: 18, height: '0.5px', background: 'rgba(100,72,22,0.13)' }} />
        {/* Left gutter shadow */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to right, rgba(0,0,0,0.22), transparent)', zIndex: 2 }} />
      </div>

      {/* ── Centre gutter ────────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', left: `${LEFT_PAGE_RATIO}%`, top: 0, bottom: 0, width: 9, transform: 'translateX(-50%)', background: 'linear-gradient(to right, rgba(0,0,0,0.18), rgba(0,0,0,0.03) 45%, rgba(0,0,0,0.14))', zIndex: 5, pointerEvents: 'none' }} />

      {/* ── Right-page parchment ─────────────────────────────────────────── */}
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: `${100 - LEFT_PAGE_RATIO}%`, background: '#f5edda', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.009) 0px, transparent 1px, transparent 30px)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 85% 65% at 0% 0%, rgba(150,110,30,0.04) 0%, transparent 50%), radial-gradient(ellipse 90% 90% at 100% 100%, rgba(130,88,20,0.03) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', top: 30, left: 18, right: 30, height: '0.5px', background: 'rgba(100,72,22,0.11)' }} />
        <div style={{ position: 'absolute', bottom: 30, left: 18, right: 30, height: '0.5px', background: 'rgba(100,72,22,0.11)' }} />
        {/* Right edge shadow */}
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 24, background: 'linear-gradient(to left, rgba(0,0,0,0.13), transparent)', zIndex: 2 }} />
      </div>

      {/* ── Marginalia ───────────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', left: 5, top: 0, bottom: 0, display: 'flex', alignItems: 'center', pointerEvents: 'none', zIndex: 8 }}>
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: "'Cormorant Garamond', serif", fontSize: 7.5, fontStyle: 'italic', color: `${project.accentText}42`, letterSpacing: '0.28em', whiteSpace: 'nowrap', userSelect: 'none' }}>
          {project.marginalia}
        </span>
      </div>

      {/* ── Unified content layer (image + flowing text) ─────────────────── */}
      {/*                                                                     */}
      {/* CSS float is used for text wrapping.  The draggable image MUST     */}
      {/* appear first in the DOM so subsequent content flows around it.     */}
      {/* @chenglou/pretext gives us the line-count / height metrics for the */}
      {/* available text width without touching the DOM at all.              */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        padding: 'clamp(14px, 2.8vw, 36px)',
        paddingLeft: 'clamp(24px, 3.4vw, 48px)',
        paddingRight: 'clamp(24px, 3.4vw, 48px)',
        boxSizing: 'border-box', overflow: 'hidden',
      }}>

        {/* ── Draggable image — floats left or right ──────────────────────
            The visible image is fully draggable in x/y.
            A transparent flow box underneath keeps text wrapping stable.
        ────────────────────────────────────────────────────────────────── */}
        <div
          aria-hidden
          style={{
            float: 'left',
            width: IMG_W,
            height: IMG_H,
            marginLeft: imageOffset.x,
            marginTop: imageOffset.y,
            marginRight: GAP,
            marginBottom: 10,
            opacity: 0,
            pointerEvents: 'none',
          }}
        />

        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0.08}
          onDragStart={() => { imageDraggingRef.current = true; }}
          style={{
            x: dragX,
            y: dragY,
            position: 'absolute',
            left: 0,
            top: 0,
            width: IMG_W,
            height: IMG_H,
            cursor: 'grab',
            zIndex: 15,
            flexShrink: 0,
          }}
          onDragEnd={handleDragEnd}
          onPointerDownCapture={(event) => event.stopPropagation()}
          onClickCapture={(event) => event.stopPropagation()}
          whileDrag={{ cursor: 'grabbing', zIndex: 20 }}
        >
          {/* Image inner with reveal animation */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 1.02 }}
            transition={{ duration: 0.72, delay: 0.22, ease: 'easeOut' }}
            style={{ width: '100%', height: '100%', background: '#060b10', position: 'relative', overflow: 'hidden' }}
          >
            <img
              src={project.image}
              alt={project.title}
              draggable={false}
              style={{
                width: '100%', height: '100%',
                objectFit: 'contain', objectPosition: 'center',
                filter: 'contrast(1.12) brightness(1.08) saturate(1.1)',
                display: 'block', userSelect: 'none',
              }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
            {/* Right-edge fade so it blends into gutter */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 94%, rgba(241,235,211,0.08) 100%)', pointerEvents: 'none' }} />
          </motion.div>

          {/* Drag direction hint — fades in on hover */}
          <motion.div
            initial={{ opacity: 0.45 }}
            whileHover={{ opacity: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
              fontFamily: "'Space Mono', monospace", fontSize: 7, letterSpacing: '0.26em',
              color: 'rgba(255,246,222,0.75)', textShadow: '0 1px 4px rgba(0,0,0,0.85)',
              whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
            }}
          >
            ← drag →
          </motion.div>

          {/* Side-flip indicator dot */}
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: 8, right: 8,
              width: 5, height: 5, borderRadius: '50%',
              background: project.accent, opacity: 0.7,
              boxShadow: `0 0 8px ${project.accent}`,
            }}
          />
        </motion.div>

        {/* ── Text content — flows around the floating image ──────────────
            All block elements here participate in the same formatting
            context as the float, so CSS wraps the text automatically.
            @chenglou/pretext gives line-count/height for the side width.
        ────────────────────────────────────────────────────────────────── */}

        {/* Chapter header */}
        <motion.div
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : 14 }}
          transition={{ duration: 0.50, delay: 0.15, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 11 }}
        >
          <div style={{ flex: 1, height: '0.5px', background: `${project.accent}78` }} />
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 7.5, letterSpacing: '0.46em', color: 'rgba(22,12,3,0.58)', whiteSpace: 'nowrap' }}>
            CHAPTER {project.chapter}
          </div>
          <div style={{ height: '0.5px', width: 14, background: `${project.accent}78` }} />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
          transition={{ duration: 0.58, delay: 0.22, ease: 'easeOut' }}
          style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(15px, 2.18vw, 27px)', fontWeight: 400, color: '#0c0400', margin: '0 0 4px 0', lineHeight: 1.11, letterSpacing: '-0.025em' }}
        >
          {project.title}
        </motion.h2>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.50, delay: 0.30, ease: 'easeOut' }}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12.5, fontStyle: 'italic', color: project.accentText, marginBottom: 11, letterSpacing: '0.08em' }}
        >
          — {project.tagline}
        </motion.div>

        {/* Ornamental divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: revealed ? 1 : 0, scaleX: revealed ? 1 : 0 }}
          transition={{ duration: 0.45, delay: 0.36, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, transformOrigin: 'left center' }}
        >
          <div style={{ height: '0.5px', width: 22, background: 'rgba(40,22,6,0.24)' }} />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: 'rgba(40,22,6,0.34)' }}>✦</span>
          <div style={{ height: '0.5px', flex: 1, background: 'rgba(40,22,6,0.12)' }} />
        </motion.div>

        {/* Description with drop cap — text wraps around the float above */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ duration: 0.78, delay: 0.44, ease: 'easeOut' }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(12px, 1.25vw, 14.5px)',
            lineHeight: `${LINE_H}px`,
            color: 'rgba(16,7,1,0.80)',
            fontStyle: 'italic', fontWeight: 300,
            margin: '0 0 13px 0',
            overflow: 'hidden',
          }}
        >
          <span style={{
            float: 'left',
            fontFamily: "'DM Serif Display', serif", fontStyle: 'italic',
            fontSize: 'clamp(38px, 5.2vw, 56px)', lineHeight: 0.74,
            color: project.accentText, marginRight: 6, marginTop: 4,
            textShadow: `0 0 40px ${project.accent}20`,
            padding: '4px 2px 0 3px',
            borderTop:  `1px solid ${project.accent}52`,
            borderLeft: `1px solid ${project.accent}52`,
          }}>
            {firstChar}
          </span>
          {restText}
        </motion.p>

        {/* Tech tags — clear:both ensures they always appear below any floats */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 8 }}
          transition={{ duration: 0.5, delay: 0.54, ease: 'easeOut' }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 13, clear: 'both' }}
        >
          {project.technologies.map((tech, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.88 }}
              transition={{ duration: 0.28, delay: 0.56 + i * 0.07 }}
              style={{
                fontFamily: "'Space Mono', monospace", fontSize: 7, letterSpacing: '0.15em',
                color: project.accentText,
                border: `1px solid ${project.accent}50`,
                background: `${project.accent}10`,
                padding: '3px 9px',
                display: 'inline-block',
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 9 }}
          animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 9 }}
          transition={{ duration: 0.50, delay: 0.65, ease: 'easeOut' }}
          style={{ display: 'flex', gap: 8 }}
        >
          {project.githubLink && (
            <a
              href={project.githubLink} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 7, letterSpacing: '0.18em', color: 'rgba(14,7,1,0.68)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5, padding: '6px 14px', border: '1px solid rgba(40,22,6,0.25)', background: 'rgba(40,22,6,0.04)', transition: 'all 0.25s' }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = `${project.accent}22`; el.style.borderColor = `${project.accentText}52`; el.style.color = '#060100'; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = 'rgba(40,22,6,0.04)'; el.style.borderColor = 'rgba(40,22,6,0.25)'; el.style.color = 'rgba(14,7,1,0.68)'; }}
            >
              <Github size={9} /> SOURCE CODE
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'Space Mono', monospace", fontSize: 7, letterSpacing: '0.18em', color: '#f5edda', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5, padding: '6px 14px', background: project.accentText }}
            >
              <ExternalLink size={9} /> LIVE DEMO
            </a>
          )}
        </motion.div>

        {/* @chenglou/pretext metrics badge — subtle, bottom-right corner
            Shows the layout() output: line count + computed height for
            the text column beside the image (no DOM reflow involved).   */}
        {textMetrics.lineCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 0.48 : 0 }}
            transition={{ duration: 0.55, delay: 0.85 }}
            style={{
              position: 'absolute', bottom: 18, right: 36,
              fontFamily: "'Space Mono', monospace", fontSize: 6.5,
              letterSpacing: '0.22em', color: project.accent,
              pointerEvents: 'none',
            }}
            title="@chenglou/pretext: layout() metrics (no DOM reflow)"
          >
            {textMetrics.lineCount}L · {Math.round(textMetrics.height)}px
          </motion.div>
        )}

        {/* Page numbers */}
        <div style={{ position: 'absolute', bottom: 14, left: `${LEFT_PAGE_RATIO / 2}%`, transform: 'translateX(-50%)', fontFamily: "'Cormorant Garamond', serif", fontSize: 9.5, color: 'rgba(255,246,222,0.62)', letterSpacing: '0.19em', zIndex: 3, textShadow: '0 1px 3px rgba(0,0,0,0.72)', pointerEvents: 'none' }}>
          — {parseInt(project.frame) * 2 - 1} —
        </div>
        <div style={{ position: 'absolute', bottom: 14, right: `${(100 - LEFT_PAGE_RATIO) / 2}%`, transform: 'translateX(50%)', fontFamily: "'Cormorant Garamond', serif", fontSize: 9.5, color: 'rgba(40,24,6,0.33)', letterSpacing: '0.19em', pointerEvents: 'none' }}>
          — {parseInt(project.frame) * 2} —
        </div>
      </div>
    </div>
  );
}

// ── BOOK SPINE ────────────────────────────────────────────────────────────────
function BookSpine({ project }: { project: Project }) {
  return (
    <div style={{
      position: 'absolute', left: 0, top: 0, bottom: 0, width: 28,
      background: `linear-gradient(135deg, ${project.coverDark} 0%, ${project.coverMid} 44%, ${project.coverDark} 100%)`,
      zIndex: 20,
      boxShadow: '6px 0 26px rgba(0,0,0,0.78), inset -1px 0 0 rgba(255,255,255,0.03)',
      overflow: 'hidden',
    }}>
      {/* Four raised bands */}
      {[17, 40, 63, 82].map((pos) => (
        <div key={pos} style={{
          position: 'absolute', left: 0, right: 0, top: `${pos}%`, height: 4,
          background: `linear-gradient(90deg, transparent, ${project.gold}32, transparent)`,
          boxShadow: '0 1px 0 rgba(0,0,0,0.42), 0 -1px 0 rgba(255,255,255,0.04)',
        }} />
      ))}
      {/* Right gold line */}
      <div style={{ position: 'absolute', top: 10, bottom: 10, right: 3, width: 1, background: `linear-gradient(to bottom, transparent, ${project.gold}40, transparent)` }} />
      {/* Left highlight */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 2, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.055), transparent)' }} />
      {/* Spine title */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: "'Space Mono', monospace", fontSize: 6, letterSpacing: '0.22em', color: `${project.gold}46`, whiteSpace: 'nowrap', maxHeight: '76%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {project.title}
        </span>
      </div>
    </div>
  );
}

// ── BOOKMARK RIBBON ───────────────────────────────────────────────────────────
function BookmarkRibbon({ project }: { project: Project }) {
  return (
    <motion.div
      key={project.chapter}
      initial={{ y: -22, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.55, duration: 0.52, type: 'spring', stiffness: 115, damping: 14 }}
      style={{
        position: 'absolute', top: -36, right: '17%', width: 16, height: 68,
        background: `linear-gradient(to bottom, ${project.accent} 0%, ${project.accent}92 100%)`,
        zIndex: 30,
        clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
        boxShadow: `0 7px 22px ${project.accent}55, inset 0 1px 0 rgba(255,255,255,0.12)`,
      }}
    />
  );
}

// ── BOOK ──────────────────────────────────────────────────────────────────────
function Book({ project, isOpen, revealed, imageDraggingRef }: { project: Project; isOpen: boolean; revealed: boolean; imageDraggingRef: React.MutableRefObject<boolean> }) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Layered page-edge stack — right side, simulates book thickness */}
      <div style={{ position: 'absolute', right: -16, top: 7, bottom: 7, width: 16, background: 'linear-gradient(to right, #e0d8b3, #cdc994, #d8d09a)', borderRadius: '0 3px 3px 0', zIndex: -1 }} />
      <div style={{ position: 'absolute', right: -11, top: 5, bottom: 5, width: 10, background: '#d4cc96', borderRadius: '0 2px 2px 0', zIndex: -1 }} />
      <div style={{ position: 'absolute', right: -6,  top: 3, bottom: 3, width: 5,  background: '#cdc698', borderRadius: '0 2px 2px 0', zIndex: -1 }} />

      {/* Table surface shadow */}
      <div style={{
        position: 'absolute', bottom: -14, left: '6%', right: '6%', height: 22,
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.58) 0%, transparent 70%)',
        filter: 'blur(10px)', pointerEvents: 'none', zIndex: -2,
      }} />

      {/* Bookmark ribbon */}
      <BookmarkRibbon project={project} />

      {/* Main book */}
      <div style={{ perspective: '2400px', perspectiveOrigin: '58% 44%', width: 'min(94vw, 1120px)', height: 'min(78vh, 680px)' }}>
        <div style={{
          position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d',
          boxShadow: `0 65px 160px rgba(0,0,0,0.90), 0 30px 72px rgba(0,0,0,0.60), 8px 8px 36px rgba(0,0,0,0.38), 0 0 110px ${project.accent}14`,
          transition: 'box-shadow 1.4s ease',
        }}>
          {/* ── Open page spread (PageSpread replaces LeftPage + RightPage) ── */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <PageSpread project={project} revealed={revealed} imageDraggingRef={imageDraggingRef} />
          </div>

          {/* Cover flip — front & back */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isOpen ? -172 : 0 }}
            transition={{ duration: isOpen ? 1.28 : 0.86, ease: isOpen ? [0.12, 1.0, 0.26, 1.0] : [0.64, 0.00, 0.78, 0.00] }}
            style={{ position: 'absolute', inset: 0, transformOrigin: 'left center', transformStyle: 'preserve-3d', zIndex: 10 }}
          >
            <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
              <CoverFront project={project} />
            </div>
            <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <CoverBack project={project} />
            </div>
          </motion.div>

          <BookSpine project={project} />

          {/* Closed-book overlay */}
          <motion.div
            initial={{ opacity: 0.36 }}
            animate={{ opacity: isOpen ? 0 : 0.36 }}
            transition={{ duration: 0.62, delay: isOpen ? 0.32 : 0 }}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.30)', pointerEvents: 'none', zIndex: 8 }}
          />

          {/* Closed-state interaction cue */}
          <motion.div
            animate={{
              opacity: isOpen ? 0 : [0.16, 0.34, 0.16],
              scale: isOpen ? 1 : [0.98, 1.03, 0.98],
            }}
            transition={
              isOpen
                ? { duration: 0.25 }
                : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
            }
            style={{
              position: 'absolute',
              left: '50%',
              top: '57%',
              transform: 'translate(-50%, -50%)',
              width: 186,
              height: 186,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${project.gold}26 0%, ${project.gold}10 38%, transparent 72%)`,
              pointerEvents: 'none',
              zIndex: 12,
              filter: 'blur(0.2px)',
            }}
          />

          <motion.div
            animate={{ opacity: isOpen ? 0 : [0.22, 0.52, 0.22] }}
            transition={
              isOpen
                ? { duration: 0.2 }
                : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
            }
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 70,
              transform: 'translateX(-50%)',
              fontFamily: "'Space Mono', monospace",
              fontSize: 8,
              letterSpacing: '0.26em',
              color: `${project.gold}b0`,
              textTransform: 'uppercase',
              pointerEvents: 'none',
              zIndex: 13,
              textShadow: '0 1px 2px rgba(0,0,0,0.55)',
              whiteSpace: 'nowrap',
            }}
          >
            Click to open
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── AMBIENT PARTICLES — dust motes + wisps ────────────────────────────────────
const dustParticles = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: 8  + ((i * 19) % 84),
  y: 14 + ((i * 13) % 72),
  duration: 7 + (i % 8) * 1.2,
  delay: i * 0.62,
  driftX: ((i % 5) - 2) * 14,
  driftY: -(28 + (i % 7) * 11),
  isWisp: i % 6 === 0,
  size: i % 4 === 0 ? 3.2 : i % 3 === 0 ? 2.6 : 1.7,
}));

function AmbientParticles() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
      {dustParticles.map((p) => (
        <motion.div key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`, top: `${p.y}%`,
            width:  p.isWisp ? p.size * 4.5 : p.size,
            height: p.isWisp ? p.size * 4.5 : p.size,
            borderRadius: '50%',
            background: p.isWisp ? 'rgba(196,174,130,0.10)' : 'rgba(255,204,108,0.36)',
            filter: p.isWisp ? 'blur(5px)' : 'blur(0.5px)',
          }}
          animate={{ y: [0, p.driftY], x: [0, p.driftX], opacity: [0, p.isWisp ? 0.38 : 0.65, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ── BOOKSHELF BAR — realistic wood shelf with spine labels ────────────────────
function BookshelfBar({ navIndex, navigate }: { navIndex: number; navigate: (i: number) => void }) {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50 }}>
      {/* Wood plank texture behind the books */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 90,
        background: `
          repeating-linear-gradient(90deg,
            rgba(255,190,80,0.020) 0px, rgba(255,190,80,0.020) 1px,
            transparent 1px, transparent 24px,
            rgba(0,0,0,0.016) 24px, rgba(0,0,0,0.016) 25px,
            transparent 25px, transparent 50px),
          linear-gradient(180deg, rgba(40,24,8,0) 0%, rgba(30,18,5,0.45) 38%, rgba(20,12,4,0.70) 70%, rgba(10,6,2,0.88) 100%)`,
        borderTop: '2px solid rgba(105,68,22,0.32)',
      }} />
      {/* Shelf top-edge highlight */}
      <div style={{ position: 'absolute', bottom: 88, left: 0, right: 0, height: 1, background: 'rgba(215,185,110,0.07)' }} />

      {/* Book spines */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 3, paddingTop: 6, position: 'relative' }}>
        {projects.map((p, i) => {
          const isActive = i === navIndex;
          return (
            <motion.button
              key={i}
              onClick={() => navigate(i)}
              whileHover={{ y: -10 }}
              animate={{ y: isActive ? -16 : 0 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              title={p.title}
              style={{
                width: isActive ? 45 : 35, height: isActive ? 100 : 86,
                background: `linear-gradient(to right, ${p.coverDark} 0%, ${p.coverMid} 45%, ${p.coverDark} 100%)`,
                border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0,
                borderLeft:  `1px solid ${p.gold}24`,
                borderRight: `1px solid ${p.gold}12`,
                borderTop:   `1px solid ${p.gold}20`,
                boxShadow: isActive ? `0 -14px 38px ${p.accent}38, 4px 0 12px rgba(0,0,0,0.62)` : '4px 0 12px rgba(0,0,0,0.52)',
                padding: 0, overflow: 'hidden',
                transition: 'width 0.40s ease, box-shadow 0.40s ease',
              }}
            >
              {/* Spine raised bands */}
              {[20, 46, 72].map((pos) => (
                <div key={pos} style={{ position: 'absolute', left: 0, right: 0, top: `${pos}%`, height: 2, background: `linear-gradient(90deg, transparent, ${p.gold}20, transparent)` }} />
              ))}
              {/* Spine gold edge */}
              <div style={{ position: 'absolute', top: 5, bottom: 5, right: 3, width: 1, background: `linear-gradient(to bottom, transparent, ${p.gold}30, transparent)` }} />
              {/* Spine title */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: "'Space Mono', monospace", fontSize: isActive ? 7 : 6.5, letterSpacing: '0.15em', color: isActive ? p.gold : `${p.gold}48`, whiteSpace: 'nowrap', overflow: 'hidden', maxHeight: '78%', textOverflow: 'ellipsis', transition: 'color 0.4s ease' }}>
                  {p.title}
                </span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="shelf-active-dot"
                  style={{ position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: p.gold, boxShadow: `0 0 9px ${p.gold}80` }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ── NAV BUTTON — ornamental circle-framed arrow ───────────────────────────────
function NavButton({ direction, onClick, disabled }: { direction: 'left' | 'right'; onClick: () => void; disabled: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.14, x: direction === 'left' ? -4 : 4 } : {}}
      whileTap={!disabled ? { scale: 0.88 } : {}}
      style={{
        position: 'absolute',
        [direction === 'left' ? 'left' : 'right']: 18,
        top: '46%', transform: 'translateY(-50%)',
        zIndex: 50, background: 'none', border: 'none',
        cursor: disabled ? 'default' : 'pointer',
        color: disabled ? 'rgba(215,185,110,0.09)' : 'rgba(215,185,110,0.40)',
        padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'color 0.30s',
      }}
    >
      <svg width="32" height="50" viewBox="0 0 32 50" fill="none">
        {/* Ornamental circles */}
        <circle cx="16" cy="25" r="14.5" stroke="currentColor" strokeWidth="0.55" opacity="0.38" />
        <circle cx="16" cy="25" r="12"   stroke="currentColor" strokeWidth="0.30" opacity="0.20" />
        {/* Arrow path */}
        {direction === 'left'
          ? <path d="M20 12 L8 25 L20 38" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          : <path d="M12 12 L24 25 L12 38" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />}
        {/* Center diamond ornament */}
        <rect x="14.5" y="23.5" width="3" height="3" fill="currentColor" opacity="0.28" transform="rotate(45 16 25)" />
      </svg>
    </motion.button>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════════════════════════════════════════════
export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayIndex, setDisplayIndex]       = useState(0);
  const [navIndex,     setNavIndex]           = useState(0);
  const [isOpen,       setIsOpen]             = useState(false);
  const [revealed,     setRevealed]           = useState(false);
  const [isCarouselInView, setIsCarouselInView] = useState(false);

  const isAnimatingRef = useRef(false);
  const isOpenRef      = useRef(false);
  const navIndexRef    = useRef(0);
  const targetIndexRef = useRef(0);
  const imageDraggingRef = useRef(false);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  // Keep refs in sync for callbacks that intentionally avoid state deps.
  useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);
  useEffect(() => { navIndexRef.current = navIndex; }, [navIndex]);

  // Intersection observer for keyboard nav guard
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsCarouselInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Navigate — intentionally empty deps, all reads via refs
  const navigate = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= projects.length) return;
    if (isAnimatingRef.current) return;
    if (newIndex === navIndexRef.current) return;

    targetIndexRef.current = newIndex;
    setNavIndex(newIndex);
    setRevealed(false);

    isAnimatingRef.current = true;

    if (isOpenRef.current) {
      setIsOpen(false);
      window.setTimeout(() => {
        const dest = targetIndexRef.current;
        navIndexRef.current = dest;
        setDisplayIndex(dest);
        setNavIndex(dest);
        isAnimatingRef.current = false;
      }, 760);
      return;
    }

    const dest = targetIndexRef.current;
    navIndexRef.current = dest;
    setDisplayIndex(dest);
    setNavIndex(dest);
    isAnimatingRef.current = false;
  }, []); // ← intentionally empty

  const onBookClick = useCallback(() => {
    if (isAnimatingRef.current) return;
    if (imageDraggingRef.current) return;

    if (isOpenRef.current) {
      setIsOpen(false);
      setRevealed(false);
      return;
    }

    setIsOpen(true);
    window.setTimeout(() => setRevealed(true), 860);
  }, []);

  // Scroll → chapter
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const step = 1 / projects.length;
    const idx  = Math.min(Math.floor(latest / step), projects.length - 1);
    if (idx !== navIndexRef.current) navigate(idx);
  });

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isCarouselInView) return;
      const t = e.target as HTMLElement;
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); navigate(navIndexRef.current + 1); }
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { e.preventDefault(); navigate(navIndexRef.current - 1); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate, isCarouselInView]);

  const displayed = projects[displayIndex];
  const nav       = projects[navIndex];

  return (
    <>
      <FontInjector />
      <section
        id="projects"
        ref={containerRef}
        style={{ position: 'relative', height: `${projects.length * 100}vh`, background: '#080604' }}
      >
        <div style={{
          position: 'sticky', top: 0, width: '100%', height: '100vh', overflow: 'hidden',
          background: 'linear-gradient(162deg, #120c06 0%, #0a0705 46%, #07090d 100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* ── Environment layers ── */}
          <LibraryBackground />
          <ShelfSilhouettes />

          <AnimatePresence mode="wait">
            <motion.div
              key={`env-${displayIndex}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 1.7 }}
              style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
            >
              <CandleLight project={displayed} />
              <LightRays   project={displayed} />
            </motion.div>
          </AnimatePresence>

          <AmbientParticles />

          {/* ── Section label ── */}
          <div style={{
            position: 'absolute', top: 22, left: '50%', transform: 'translateX(-50%)',
            zIndex: 50, fontFamily: "'Space Mono', monospace", fontSize: 8,
            letterSpacing: '0.62em', color: 'rgba(215,185,110,0.17)', textTransform: 'uppercase', whiteSpace: 'nowrap',
          }}>
            ← Works &amp; Projects →
          </div>

          {/* ── Chapter counter ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={navIndex}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 0.74, y: 0 }} exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.38 }}
              style={{ position: 'absolute', top: 18, right: 34, zIndex: 50, fontFamily: "'Cormorant Garamond', serif", fontSize: 13, fontStyle: 'italic', color: nav.accent }}
            >
              Chapter {nav.chapter} of {projects.length}
            </motion.div>
          </AnimatePresence>

          {/* ── Book ── */}
          <motion.div
            whileHover={{ y: -12, transition: { duration: 0.42, ease: 'easeOut' } }}
            onClick={onBookClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onBookClick();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={isOpen ? 'Close project details' : 'Open project details'}
            style={{ position: 'relative', zIndex: 10, cursor: 'pointer' }}
          >
            <Book project={displayed} isOpen={isOpen} revealed={revealed} imageDraggingRef={imageDraggingRef} />
          </motion.div>

          {/* ── Arrow nav ── */}
          <NavButton direction="left"  onClick={() => navigate(navIndexRef.current - 1)} disabled={navIndex === 0} />
          <NavButton direction="right" onClick={() => navigate(navIndexRef.current + 1)} disabled={navIndex === projects.length - 1} />

          {/* ── Right dot indicators ── */}
          <div style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 100 }}>
            {projects.map((p, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                style={{
                  width: 7, height: i === navIndex ? 30 : 7,
                  background: i === navIndex ? nav.accent : 'rgba(215,185,110,0.14)',
                  border: 'none', cursor: 'pointer', padding: 0, borderRadius: 4,
                  transition: 'all 0.40s ease',
                  boxShadow: i === navIndex ? `0 0 12px ${nav.accent}55` : 'none',
                }}
              />
            ))}
          </div>

          {/* ── Bookshelf navigation ── */}
          <BookshelfBar navIndex={navIndex} navigate={navigate} />

          {/* ── Interaction hint on first chapter ── */}
          <AnimatePresence>
            {navIndex === 0 && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ delay: 3.2, duration: 0.9 }}
                style={{
                  position: 'absolute', bottom: 116, left: '50%', transform: 'translateX(-50%)',
                  fontFamily: "'Space Mono', monospace", fontSize: 7, letterSpacing: '0.44em',
                  color: 'rgba(215,185,110,0.12)', zIndex: 50, whiteSpace: 'nowrap', pointerEvents: 'none',
                }}
              >
                CLICK THE BOOK TO OPEN • SCROLL TO CHANGE CHAPTER
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}