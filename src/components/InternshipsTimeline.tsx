"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { GraduationCap, FlaskConical, Cpu, BookOpen, X, BriefcaseBusiness, CalendarDays, MapPin, Sparkles, ChevronRight } from "lucide-react";
import Image from "next/image";
import { InfiniteEventCard as RedesignedInfiniteEventCard } from "./InfiniteCS_Redesign";

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const EVENTS = [
  {
    id: "infinite-computer-solutions",
    year: "2026",
    date: "2026 – 2027",
    title: "Infinite Computer Solutions – SDE Intern",
    org: "Vizag Branch, India",
    type: "Internship",
    bullets: [
      "Joined Infinite Computer Solutions as a one-year Software Development Engineer intern.",
      "Working in a professional engineering environment across software development workflows, code quality, and delivery practices.",
    ],
    photo: "/Images/ICS ID card.jpeg",
    Icon: BriefcaseBusiness,
    accent: "#06b6d4",
    rgb: "6,182,212",
    featuredId: true,
  },
  {
    id: "bits-pilani",
    year: "2025",
    date: "June – July 2025",
    title: "BITS Pilani – AI/ML Internship",
    org: "BITS Pilani, Hyderabad",
    type: "Internship",
    bullets: [
      "Completed a 7-week intensive internship focused on developing and applying machine learning models for real-world problem-solving.",
      "Gained hands-on experience in data preprocessing, model training, and performance evaluation using Python-based ML frameworks.",
    ],
    photo: "/Images/Bits pilani.jpg",
    Icon: GraduationCap,
    accent: "#10b981",
    rgb: "16,185,129",
  },
  {
    id: "iisc",
    year: "2024",
    date: "2024",
    title: "AI & Machine Learning Workshop",
    org: "Indian Institute of Science (IISc), Bangalore",
    type: "Workshop",
    bullets: [
      "Gained foundational insights into Artificial Intelligence and Machine Learning.",
      "Participated in hands-on sessions on model training and real-world applications.",
    ],
    photo: "/Images/IISC bangaluru.jpg",
    Icon: FlaskConical,
    accent: "#3b82f6",
    rgb: "59,130,246",
  },
  {
    id: "psg",
    year: "2024",
    date: "2024",
    title: "LabVIEW with Arduino Workshop",
    org: "PSG College of Technology, Coimbatore",
    type: "Workshop",
    bullets: [
      "Learned to integrate LabVIEW with Arduino for real-time system control.",
      "Built simple embedded automation projects during guided sessions.",
    ],
    photo: null,
    Icon: Cpu,
    accent: "#f59e0b",
    rgb: "245,158,11",
  },
  {
    id: "micro-dots",
    year: "2023",
    date: "May – August 2023",
    title: "Diploma in Python Programming",
    org: "Micro Dots Computer Education, Erode",
    type: "Diploma",
    bullets: [
      "Completed a diploma course covering Python fundamentals, control structures, functions, file handling, and basic projects.",
      "Strengthened programming logic and practical coding skills.",
    ],
    photo: null,
    Icon: BookOpen,
    accent: "#a855f7",
    rgb: "168,85,247",
  },
] as const;

type Event = (typeof EVENTS)[number];

const SANS =
  "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const MONO = "'SF Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace";
const clamp = (value: number, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

/* ═══════════════════════════════════════════════════════════════════════════
   LIGHTBOX
   ═══════════════════════════════════════════════════════════════════════════ */

function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-9999 flex cursor-zoom-out items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-8"
        style={{ maxWidth: "900px", width: "100%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={1400}
          height={900}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "85vh",
            objectFit: "contain",
            borderRadius: "16px",
          }}
          priority
        />
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          <X size={16} />
        </button>
      </motion.div>
    </motion.div>
  );
}

export const ICS_CSS = `
  /* ── ID-card shell ────────────────────────────────────────────────── */
  .ics-card {
    --card-r: 18px;
    --px: 50%;
    --py: 44%;
    --rx: 0deg;
    --ry: 0deg;
    --ox: 0px;
    --oy: 0px;
    --glow: 0.55;
    --behind: rgba(6, 182, 212, 0.7);
    position: relative;
    aspect-ratio: 0.66;
    transform-style: preserve-3d;
    perspective: 820px;
    touch-action: none;
    border-radius: var(--card-r);
  }

  /* ambient glow behind card */
  .ics-card__behind {
    position: absolute;
    inset: -22px;
    border-radius: 32px;
    background: radial-gradient(
      circle at var(--px) var(--py),
      var(--behind) 0%,
      rgba(0, 245, 212, 0.18) 32%,
      transparent 68%
    );
    opacity: var(--glow);
    filter: blur(38px) saturate(1.2);
    transition: opacity 200ms ease;
    pointer-events: none;
    z-index: 0;
  }

  /* the physical card frame */
  .ics-card__shell {
    position: relative;
    z-index: 1;
    height: 100%;
    border-radius: var(--card-r);
    transform: rotateX(var(--rx)) rotateY(var(--ry)) translateZ(0);
    transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
    transform-style: preserve-3d;
    overflow: hidden;
  }
  .ics-card.is-active .ics-card__shell {
    transition-duration: 75ms;
  }

  /* card face */
  .ics-card__face {
    position: absolute;
    inset: 0;
    border-radius: var(--card-r);
    overflow: hidden;
    background:
      linear-gradient(145deg, rgba(12,38,44,0.96) 0%, rgba(18,80,92,0.62) 42%, rgba(200,248,255,0.15) 100%),
      linear-gradient(145deg, rgba(210,248,252,0.98), rgba(90,138,148,0.94));
    border: 1px solid rgba(210,252,255,0.72);
    box-shadow:
      0 38px 90px rgba(0,0,0,0.68),
      0 0 0 1px rgba(6,182,212,0.3),
      0 0 50px rgba(6,182,212,0.22),
      inset 0 1px 0 rgba(255,255,255,0.82);
    isolation: isolate;
  }

  /* fine diagonal weave texture */
  .ics-card__face::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: calc(var(--card-r) - 2px);
    background: repeating-linear-gradient(
      115deg,
      rgba(255,255,255,0.1) 0px,
      rgba(255,255,255,0.1) 1px,
      transparent 1px,
      transparent 10px
    );
    opacity: 0.18;
    pointer-events: none;
    z-index: 3;
  }

  /* lanyard clip slot at top */
  .ics-card__slot {
    position: absolute;
    top: 7px;
    left: 50%;
    z-index: 5;
    width: 56px;
    height: 8px;
    transform: translateX(-50%);
    border-radius: 0 0 10px 10px;
    background: rgba(3,18,22,0.3);
    box-shadow: inset 0 1px 5px rgba(3,18,22,0.36);
    pointer-events: none;
  }

  /* photo area */
  .ics-card__photo {
    position: absolute;
    inset: 7px;
    border-radius: 13px;
    overflow: hidden;
    background: #d8f4f8;
    z-index: 1;
    transform: translateZ(14px);
  }
  .ics-card__photo img {
    transform: translate3d(var(--ox), var(--oy), 0) scale(1.02);
    transition: transform 140ms ease-out;
  }

  /* holographic shimmer */
  .ics-card__shine,
  .ics-card__glare {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
  }
  .ics-card__shine {
    z-index: 4;
    opacity: 0.46;
    mix-blend-mode: color-dodge;
    background:
      repeating-linear-gradient(
        -42deg,
        rgba(255,132,132,0.00) 0%,   rgba(255,132,132,0.26) 7%,
        rgba(255,225,115,0.26) 14%,  rgba(117,255,169,0.22) 21%,
        rgba(113,196,255,0.28) 29%,  rgba(214,137,255,0.22) 37%,
        rgba(255,132,132,0.00) 44%
      ),
      radial-gradient(
        circle at var(--px) var(--py),
        rgba(255,255,255,0.8) 0%,
        rgba(171,246,255,0.24) 18%,
        transparent 44%
      );
    background-size: 180% 180%, 100% 100%;
    background-position:
      calc(var(--px) * 0.45) calc(var(--py) * 0.45),
      center;
    filter: brightness(0.95) contrast(1.3) saturate(1.28);
  }
  .ics-card__glare {
    z-index: 6;
    opacity: 0.5;
    mix-blend-mode: screen;
    background:
      radial-gradient(
        circle at var(--px) var(--py),
        rgba(244,255,255,0.6) 0%,
        rgba(72,221,255,0.18) 17%,
        transparent 40%
      ),
      linear-gradient(115deg, transparent 17%, rgba(255,255,255,0.26) 40%, transparent 57%);
  }

  @media (prefers-reduced-motion: reduce) {
    .ics-card__shell, .ics-card__photo img {
      transition-duration: 0.01ms !important;
      transform: none !important;
    }
    .ics-card__shine, .ics-card__glare { opacity: 0.15; }
  }

  /* ── Reveal modal ─────────────────────────────────────────────────── */
  .ics-reveal {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    height: 100%;
  }

  /* ── Timeline trigger card ────────────────────────────────────────── */
  .ics-trigger {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    background: linear-gradient(
      135deg,
      rgba(2,18,22,0.98) 0%,
      rgba(4,36,44,0.96) 60%,
      rgba(2,22,28,0.98) 100%
    );
    border: 1px solid rgba(6,182,212,0.22);
    box-shadow:
      0 20px 60px rgba(0,0,0,0.5),
      0 0 0 1px rgba(6,182,212,0.06),
      inset 0 1px 0 rgba(255,255,255,0.05);
    cursor: pointer;
    transition: border-color 0.35s ease, box-shadow 0.35s ease;
  }
  .ics-trigger:hover {
    border-color: rgba(6,182,212,0.5);
    box-shadow:
      0 28px 80px rgba(0,0,0,0.6),
      0 0 0 1px rgba(6,182,212,0.12),
      0 0 60px rgba(6,182,212,0.12),
      inset 0 1px 0 rgba(255,255,255,0.07);
  }
  .ics-trigger__scan {
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(6,182,212,0.8), transparent);
    pointer-events: none;
    animation: icsScan 3.2s ease-in-out infinite;
    opacity: 0;
  }
  .ics-trigger:hover .ics-trigger__scan {
    opacity: 1;
  }
  @keyframes icsScan {
    0%   { top: 0%;    opacity: 0; }
    8%   { opacity: 1; }
    92%  { opacity: 1; }
    100% { top: 100%;  opacity: 0; }
  }

  @media (max-width: 768px) {
    .ics-reveal {
      grid-template-columns: 1fr !important;
    }
    .ics-reveal__info {
      padding: 28px 24px !important;
    }
  }
`;


/* ═══════════════════════════════════════════════════════════════════════════
   1. InfiniteProfileBadge — 3D tilt + holographic ID card
   ═══════════════════════════════════════════════════════════════════════════ */
function InfiniteProfileBadge({
  event,
  large,
  reduceMotion,
}: {
  event: Event;
  large: boolean;
  reduceMotion: boolean;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const setVars = useCallback(
    (x: number, y: number) => {
      const el = shellRef.current;
      if (!el) return;
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      const px = clamp((x / w) * 100);
      const py = clamp((y / h) * 100);
      const cx = px - 50;
      const cy = py - 50;
      el.style.setProperty("--px", `${px}%`);
      el.style.setProperty("--py", `${py}%`);
      el.style.setProperty("--rx", `${(-(cy / 7)).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(cx / 7).toFixed(2)}deg`);
      el.style.setProperty("--ox", `${(-cx * 0.055).toFixed(2)}px`);
      el.style.setProperty("--oy", `${(-cy * 0.045).toFixed(2)}px`);
      el.style.setProperty(
        "--glow",
        `${(0.45 + clamp(Math.hypot(cx, cy) / 75, 0, 0.45)).toFixed(3)}`
      );
    },
    []
  );

  const onMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const r = e.currentTarget.getBoundingClientRect();
      setVars(e.clientX - r.left, e.clientY - r.top);
    },
    [reduceMotion, setVars]
  );
  const onEnter = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      setActive(true);
      const r = e.currentTarget.getBoundingClientRect();
      setVars(e.clientX - r.left, e.clientY - r.top);
    },
    [reduceMotion, setVars]
  );
  const onLeave = useCallback(() => {
    if (reduceMotion) return;
    setActive(false);
    const el = shellRef.current;
    if (!el) return;
    el.style.setProperty("--px", "50%");
    el.style.setProperty("--py", "44%");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--ox", "0px");
    el.style.setProperty("--oy", "0px");
    el.style.setProperty("--glow", "0.52");
  }, [reduceMotion]);

  return (
    <div
      ref={shellRef}
      className={`ics-card${active ? " is-active" : ""}`}
      style={{
        width: large ? "min(260px, 74vw)" : "min(224px, 72vw)",
      } as CSSProperties}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="ics-card__behind" />
      <div className="ics-card__shell">
        <div className="ics-card__face">
          <div className="ics-card__shine" />
          <div className="ics-card__glare" />
          <div className="ics-card__slot" />
          <div className="ics-card__photo">
            {event.photo && (
              <Image
                src={event.photo}
                alt="Anbu Malligarjun Sri — Infinite Computer Solutions ID"
                width={large ? 260 : 224}
                height={large ? 390 : 336}
                sizes={large ? "260px" : "224px"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "center center",
                }}
                priority={false}
              />
            )}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 13,
                border: "1px solid rgba(255,255,255,0.38)",
                boxShadow:
                  "inset 0 0 0 1px rgba(6,182,212,0.08), inset 0 -18px 28px rgba(6,182,212,0.06)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   2. HangingIdCard — lanyard + draggable card
   ═══════════════════════════════════════════════════════════════════════════ */
function HangingIdCard({
  event,
  large = false,
}: {
  event: Event;
  large?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-10, 10]);
  const rotateX = useTransform(y, [-36, 130], [7, -5]);
  const cordRotate = useTransform(x, [-150, 150], [-8, 8]);
  const cordScaleY = useTransform(y, [-28, 132], [0.93, 1.26]);
  const cordOpacity = useTransform(y, [-20, 120], [0.58, 0.92]);

  const settle = () => {
    if (reduceMotion) { x.set(0); y.set(0); return; }
    animate(x, 0, { type: "spring", stiffness: 540, damping: 30, mass: 0.72 });
    animate(y, 0, { type: "spring", stiffness: 460, damping: 26, mass: 0.82 });
  };

  const S = large; // size shorthand

  return (
    <div
      aria-label="Interactive Infinite Computer Solutions ID card — drag to swing"
      style={{
        position: "relative",
        minHeight: S ? "510px" : "420px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: S ? "10px" : "16px",
        touchAction: "none",
        perspective: "1200px",
      }}
    >
      {/* ── Ceiling mount ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: S ? "100px" : "78px",
          height: S ? "30px" : "18px",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 20%, rgba(230,252,255,0.5), rgba(68,110,120,0.22) 44%, rgba(3,14,17,0.94) 76%)",
          border: "1px solid rgba(172,242,252,0.26)",
          boxShadow:
            "0 14px 28px rgba(0,0,0,0.58), inset 0 1px 10px rgba(255,255,255,0.28), 0 0 36px rgba(6,182,212,0.16)",
          zIndex: 4,
        }}
      />

      {/* ── Neck tube ── */}
      <div
        style={{
          position: "absolute",
          top: S ? "26px" : "15px",
          left: "50%",
          width: S ? "36px" : "28px",
          height: S ? "96px" : "78px",
          transform: "translateX(-50%)",
          borderRadius: "20px",
          background:
            "linear-gradient(180deg, rgba(222,250,255,0.24), rgba(4,20,25,0.9) 62%, rgba(2,8,10,0.96))",
          border: "1px solid rgba(172,242,252,0.2)",
          boxShadow: "inset 0 1px 9px rgba(255,255,255,0.2), 0 12px 26px rgba(0,0,0,0.46)",
          zIndex: 3,
        }}
      />

      {/* ── Lanyard loop ── */}
      <motion.div
        style={{
          position: "absolute",
          top: S ? "25px" : "15px",
          left: "50%",
          width: S ? "180px" : "136px",
          height: S ? "172px" : "122px",
          borderRadius: "999px",
          transformOrigin: "top center",
          x: "-50%",
          rotate: cordRotate,
          scaleY: cordScaleY,
          opacity: cordOpacity,
          borderLeft: "1px solid rgba(160,242,252,0.22)",
          borderRight: "1px solid rgba(160,242,252,0.18)",
          borderBottom: "1px solid rgba(160,242,252,0.24)",
          background:
            "linear-gradient(90deg, rgba(7,28,34,0.08), transparent 30%, transparent 70%, rgba(7,28,34,0.08))",
          filter: "drop-shadow(0 0 11px rgba(6,182,212,0.2))",
          zIndex: 1,
        }}
      />

      {/* ── Clip housing ── */}
      <motion.div
        style={{
          position: "absolute",
          top: S ? "92px" : "78px",
          left: "50%",
          width: S ? "56px" : "44px",
          height: S ? "76px" : "60px",
          x: "-50%",
          rotate: cordRotate,
          borderRadius: "26px",
          border: "2px solid rgba(208,250,255,0.44)",
          borderTopColor: "rgba(208,250,255,0.7)",
          background: "rgba(2,10,12,0.44)",
          boxShadow:
            "inset 0 0 14px rgba(255,255,255,0.18), 0 14px 26px rgba(0,0,0,0.52)",
          zIndex: 4,
        }}
      />

      {/* ── Clip pin ── */}
      <motion.div
        style={{
          position: "absolute",
          top: S ? "132px" : "116px",
          left: "50%",
          width: S ? "19px" : "15px",
          height: S ? "19px" : "15px",
          x: "-50%",
          rotate: cordRotate,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 27%, rgba(255,255,255,0.74), rgba(50,80,88,0.58) 44%, rgba(3,14,18,0.96))",
          border: "1px solid rgba(216,250,255,0.4)",
          zIndex: 5,
        }}
      />

      {/* ── Draggable card ── */}
      <motion.div
        drag={!reduceMotion}
        dragConstraints={{ left: -120, right: 120, top: -20, bottom: 100 }}
        dragElastic={0.17}
        onDragEnd={settle}
        whileDrag={{ scale: 1.016, cursor: "grabbing" }}
        style={{
          x,
          y,
          rotate,
          rotateX,
          marginTop: S ? "170px" : "146px",
          cursor: reduceMotion ? "default" : "grab",
          transformStyle: "preserve-3d",
          zIndex: 3,
        }}
      >
        <InfiniteProfileBadge
          event={event}
          large={large}
          reduceMotion={Boolean(reduceMotion)}
        />

        {/* Drag hint */}
        <div
          style={{
            marginTop: "14px",
            textAlign: "center",
            fontFamily: MONO,
            fontSize: "10px",
            letterSpacing: "0.06em",
            color: "rgba(180,248,255,0.38)",
            userSelect: "none",
          }}
        >
          drag to swing
        </div>
      </motion.div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   3. InfiniteExperienceReveal — cinematic full-screen modal
      LEFT:  Dramatic card stage with spotlight + scan line
      RIGHT: Elegant role info panel with staggered reveals
   ═══════════════════════════════════════════════════════════════════════════ */
function InfiniteExperienceReveal({
  event,
  onClose,
}: {
  event: Event;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const skills = [
    "Software Development",
    "Engineering Workflows",
    "Code Quality",
    "Professional Team Collaboration",
    "Software Delivery Practices",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      className="fixed inset-0 z-9999 flex items-center justify-center p-4"
      style={{
        background:
          "radial-gradient(ellipse 60% 70% at 18% 55%, rgba(6,182,212,0.22), transparent 52%), rgba(0,3,5,0.88)",
        backdropFilter: "blur(22px)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 22 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "min(1020px, 100%)",
          maxHeight: "min(700px, 94vh)",
          borderRadius: "22px",
          overflow: "hidden",
          border: "1px solid rgba(6,182,212,0.28)",
          boxShadow:
            "0 50px 130px rgba(0,0,0,0.76), 0 0 80px rgba(6,182,212,0.18), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
      >
        {/* ── Close button ── */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "1px solid rgba(220,252,255,0.3)",
            background: "rgba(1,12,15,0.74)",
            backdropFilter: "blur(8px)",
            color: "rgba(230,252,255,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 20,
            transition: "border-color 0.25s, background 0.25s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "rgba(6,182,212,0.7)";
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(3,28,34,0.9)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "rgba(220,252,255,0.3)";
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(1,12,15,0.74)";
          }}
        >
          <X size={17} strokeWidth={2} />
        </button>

        {/* ── Two-column layout ── */}
        <div className="ics-reveal">

          {/* ════════════════════════════════════
              LEFT PANEL — Card Stage
          ════════════════════════════════════ */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "radial-gradient(ellipse 80% 60% at 50% 38%, rgba(6,182,212,0.14), transparent 64%), #020c0f",
              borderRight: "1px solid rgba(6,182,212,0.14)",
              overflow: "hidden",
              minHeight: "560px",
            }}
          >
            {/* Stage floor reflection */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "10%",
                right: "10%",
                height: "120px",
                background:
                  "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(6,182,212,0.22), transparent 72%)",
                filter: "blur(16px)",
                pointerEvents: "none",
              }}
            />

            {/* Spotlight cone from above */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                width: "320px",
                height: "100%",
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(180deg, rgba(6,200,220,0.12) 0%, rgba(6,182,212,0.06) 30%, transparent 68%)",
                clipPath: "polygon(36% 0%, 64% 0%, 100% 100%, 0% 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Scan line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent 5%, rgba(6,182,212,0.6) 30%, rgba(6,182,212,0.6) 70%, transparent 95%)",
                boxShadow: "0 0 12px rgba(6,182,212,0.5)",
                animation: "icsRevealScan 4s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />

            {/* Watermark ghost image */}
            {event.photo && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.06,
                  filter: "blur(3px) saturate(0)",
                  transform: "scale(1.12) rotate(-8deg)",
                  pointerEvents: "none",
                }}
              >
                <Image
                  src={event.photo}
                  alt=""
                  fill
                  sizes="500px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}

            {/* Corner brackets (scanner frame) */}
            {(["tl","tr","bl","br"] as const).map((pos) => (
              <div
                key={pos}
                style={{
                  position: "absolute",
                  [pos.includes("t") ? "top" : "bottom"]: "20px",
                  [pos.includes("l") ? "left" : "right"]: "20px",
                  width: "28px",
                  height: "28px",
                  borderTop: pos.includes("t") ? "1.5px solid rgba(6,182,212,0.5)" : "none",
                  borderBottom: pos.includes("b") ? "1.5px solid rgba(6,182,212,0.5)" : "none",
                  borderLeft: pos.includes("l") ? "1.5px solid rgba(6,182,212,0.5)" : "none",
                  borderRight: pos.includes("r") ? "1.5px solid rgba(6,182,212,0.5)" : "none",
                  borderRadius: pos === "tl" ? "4px 0 0 0" : pos === "tr" ? "0 4px 0 0" : pos === "bl" ? "0 0 0 4px" : "0 0 4px 0",
                  pointerEvents: "none",
                }}
              />
            ))}

            {/* The actual hanging ID card */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.62, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "300px" }}
            >
              <HangingIdCard event={event} large />
            </motion.div>
          </div>


          {/* ════════════════════════════════════
              RIGHT PANEL — Role Info
          ════════════════════════════════════ */}
          <div
            className="ics-reveal__info"
            style={{
              background:
                "linear-gradient(160deg, rgba(2,14,18,0.99) 0%, rgba(3,26,32,0.97) 55%, rgba(2,18,22,0.99) 100%)",
              padding: "48px 44px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "auto",
            }}
          >
            {/* ── Status pill ── */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "24px",
                padding: "5px 12px 5px 8px",
                borderRadius: "999px",
                background: "rgba(0,245,184,0.08)",
                border: "1px solid rgba(0,245,184,0.22)",
                width: "fit-content",
              }}
            >
              {/* Animated pulse dot */}
              <span style={{ position: "relative", display: "inline-flex" }}>
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "#00f5b8",
                    animation: "icsPing 1.6s cubic-bezier(0,0,0.2,1) infinite",
                    opacity: 0.5,
                  }}
                />
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#00f5b8",
                    boxShadow: "0 0 12px rgba(0,245,184,0.7)",
                    display: "block",
                  }}
                />
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(94,252,210,0.9)",
                }}
              >
                Current Role
              </span>
            </motion.div>

            {/* ── Company name ── */}
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                margin: "0 0 6px",
                fontFamily: SANS,
                fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)",
                fontWeight: 800,
                letterSpacing: "-0.048em",
                lineHeight: 1.04,
                color: "#f0fafa",
              }}
            >
              Infinite
              <br />
              Computer Solutions
            </motion.h3>

            {/* ── Role ── */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.33 }}
              style={{
                margin: "0 0 24px",
                fontFamily: SANS,
                fontSize: "15px",
                fontWeight: 560,
                color: "#00f5d4",
                letterSpacing: "-0.01em",
              }}
            >
              Software Development Engineer Intern
            </motion.p>

            {/* ── Divider ── */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.55, delay: 0.38, ease: "easeOut" }}
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, rgba(6,182,212,0.6), rgba(6,182,212,0.08) 70%, transparent)",
                marginBottom: "24px",
                transformOrigin: "left",
              }}
            />

            {/* ── Meta items ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              style={{ display: "grid", gap: "14px", marginBottom: "28px" }}
            >
              {[
                { Icon: MapPin, label: "Location", value: "Vizag, India" },
                { Icon: CalendarDays, label: "Duration", value: "2026 – 2027" },
              ].map(({ Icon: MetaIcon, label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "34px 1fr",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "9px",
                      background: "rgba(6,182,212,0.08)",
                      border: "1px solid rgba(6,182,212,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(6,182,212,0.85)",
                    }}
                  >
                    <MetaIcon size={15} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: MONO,
                        fontSize: "9px",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "rgba(180,240,255,0.36)",
                        marginBottom: "3px",
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontFamily: SANS,
                        fontSize: "13px",
                        color: "rgba(230,250,255,0.82)",
                      }}
                    >
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* ── Skills header ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.5 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "14px",
              }}
            >
              <Sparkles
                size={13}
                strokeWidth={1.7}
                style={{ color: "rgba(6,182,212,0.6)" }}
              />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(6,182,212,0.55)",
                }}
              >
                Key Experience
              </span>
            </motion.div>

            {/* ── Skill tags ── */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.88, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.38,
                    delay: 0.55 + i * 0.07,
                    ease: [0.34, 1.4, 0.64, 1],
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 12px",
                    borderRadius: "6px",
                    fontFamily: SANS,
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "rgba(200,248,255,0.75)",
                    background: "rgba(6,182,212,0.07)",
                    border: "1px solid rgba(6,182,212,0.18)",
                    letterSpacing: "0.01em",
                    transition: "border-color 0.25s, background 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLSpanElement).style.background =
                      "rgba(6,182,212,0.14)";
                    (e.currentTarget as HTMLSpanElement).style.borderColor =
                      "rgba(6,182,212,0.38)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLSpanElement).style.background =
                      "rgba(6,182,212,0.07)";
                    (e.currentTarget as HTMLSpanElement).style.borderColor =
                      "rgba(6,182,212,0.18)";
                  }}
                >
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#00f5b8",
                      boxShadow: "0 0 8px rgba(0,245,184,0.7)",
                      flexShrink: 0,
                    }}
                  />
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Keyframes injected once ── */}
        <style>{`
          @keyframes icsRevealScan {
            0%   { top: -2px;  opacity: 0; }
            6%   { opacity: 1; }
            94%  { opacity: 1; }
            100% { top: 100%;  opacity: 0; }
          }
          @keyframes icsPing {
            75%, 100% { transform: scale(2.2); opacity: 0; }
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   4. InfiniteEventCard — timeline trigger card (premium holographic ticker)
   ═══════════════════════════════════════════════════════════════════════════ */
export function InfiniteEventCard({
  event,
  inView,
  side,
}: {
  event: Event;
  inView: boolean;
  side: "left" | "right";
}) {
  const [expanded, setExpanded] = useState(false);
  const open = useCallback(() => setExpanded(true), []);
  const close = useCallback(() => setExpanded(false), []);
  const initX = side === "left" ? -40 : 40;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: initX }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          onClick={open}
          aria-haspopup="dialog"
          aria-expanded={expanded}
          className="ics-trigger"
          style={{ width: "100%", border: 0, padding: 0, textAlign: "left" }}
        >
          {/* Scan line (appears on hover via CSS) */}
          <div className="ics-trigger__scan" />

          {/* Top accent bar */}
          <div
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg, rgba(6,182,212,0.9) 0%, rgba(0,245,184,0.5) 60%, transparent 100%)",
            }}
          />

          <div style={{ padding: "20px 22px 22px" }}>
            {/* Header row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "14px",
              }}
            >
              {/* Icon badge */}
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  flexShrink: 0,
                  background:
                    "radial-gradient(circle at 35% 30%, rgba(6,182,212,0.2), rgba(6,182,212,0.06) 70%)",
                  border: "1px solid rgba(6,182,212,0.3)",
                  boxShadow: "0 0 20px rgba(6,182,212,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#06b6d4",
                }}
              >
                <BriefcaseBusiness size={20} strokeWidth={1.7} />
              </div>

              <div style={{ minWidth: 0, flex: 1 }}>
                {/* Meta line */}
                <p
                  style={{
                    fontFamily: MONO,
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(6,182,212,0.7)",
                    margin: "0 0 5px",
                  }}
                >
                  2026 · Current Role · SDE Intern
                </p>

                {/* Company name */}
                <h3
                  style={{
                    fontFamily: SANS,
                    fontSize: "16px",
                    fontWeight: 750,
                    lineHeight: 1.25,
                    letterSpacing: "-0.015em",
                    color: "#f0fafa",
                    margin: 0,
                  }}
                >
                  Infinite Computer Solutions
                </h3>
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, rgba(6,182,212,0.2), rgba(255,255,255,0.04) 60%, transparent)",
                marginBottom: "14px",
              }}
            />

            {/* Location + date row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                marginBottom: "14px",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  fontFamily: SANS,
                  fontSize: "11px",
                  color: "rgba(180,240,255,0.48)",
                }}
              >
                <MapPin size={11} strokeWidth={1.8} />
                Vizag, India
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "10px",
                  color: "rgba(6,182,212,0.45)",
                  letterSpacing: "0.06em",
                }}
              >
                2026 – 2027
              </span>
            </div>

            {/* CTA row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "9px 12px",
                borderRadius: "9px",
                background: "rgba(6,182,212,0.07)",
                border: "1px solid rgba(6,182,212,0.14)",
              }}
            >
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: "11px",
                  color: "rgba(6,182,212,0.75)",
                  fontWeight: 500,
                }}
              >
                View role details & ID card
              </span>
              <ChevronRight
                size={14}
                strokeWidth={2}
                style={{ color: "rgba(6,182,212,0.6)", flexShrink: 0 }}
              />
            </div>
          </div>
        </button>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <InfiniteExperienceReveal event={event} onClose={close} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EVENT CARD
   ═══════════════════════════════════════════════════════════════════════════ */

function EventCard({
  event,
  inView,
  side,
}: {
  event: Event;
  inView: boolean;
  side: "left" | "right";
}) {
  const { accent, rgb, Icon } = event;
  const [lightbox, setLightbox] = useState(false);
  const [hover, setHover] = useState(false);

  const initX = side === "left" ? -40 : 40;

  if ("featuredId" in event && event.featuredId) {
    return <RedesignedInfiniteEventCard event={event} inView={inView} side={side} />;
  }

  return (
    <>
      <motion.article
        initial={{ opacity: 0, x: initX }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: "relative",
          fontFamily: SANS,
          borderRadius: "16px",
          overflow: "hidden",
          background: "#0c0c0f",
          border: `1px solid ${hover ? `rgba(${rgb},0.3)` : "rgba(255,255,255,0.06)"}`,
          boxShadow: hover
            ? `0 20px 60px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(${rgb},0.08)`
            : "0 4px 24px -4px rgba(0,0,0,0.5)",
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
      >
        {/* ─ Accent top edge ─ */}
        <div
          style={{
            height: "2px",
            background: `linear-gradient(90deg, ${accent}, rgba(${rgb},0.15) 80%, transparent)`,
          }}
        />

        {/* ─ Photo banner ─ */}
        {event.photo && (
          <div
            onClick={() => setLightbox(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setLightbox(true)}
            aria-label={`View ${event.title} photo`}
            style={{
              position: "relative",
              height: "160px",
              overflow: "hidden",
              cursor: "zoom-in",
            }}
          >
            <Image
              src={event.photo}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              style={{
                objectFit: "cover",
                transition: "transform 0.6s ease",
                transform: hover ? "scale(1.03)" : "scale(1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, transparent 30%, rgba(12,12,15,0.92) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                left: "16px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: accent,
                  background: `rgba(${rgb},0.15)`,
                  border: `1px solid rgba(${rgb},0.3)`,
                  borderRadius: "4px",
                  padding: "3px 8px",
                }}
              >
                {event.type}
              </span>
            </div>
          </div>
        )}

        {/* ─ Card body ─ */}
        <div style={{ padding: event.photo ? "20px 24px 24px" : "24px" }}>
          {/* Type badge (only if no photo) */}
          {!event.photo && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: `rgba(${rgb},0.1)`,
                  border: `1px solid rgba(${rgb},0.2)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: accent,
                }}
              >
                <Icon size={16} strokeWidth={1.75} />
              </div>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: accent,
                }}
              >
                {event.type}
              </span>
            </div>
          )}

          {/* Title */}
          <h3
            style={{
              fontFamily: SANS,
              fontSize: "17px",
              fontWeight: 700,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              color: "#f0f0f0",
              margin: 0,
              marginBottom: "6px",
            }}
          >
            {event.title}
          </h3>

          {/* Org */}
          <p
            style={{
              fontFamily: SANS,
              fontSize: "13px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.45)",
              margin: 0,
              marginBottom: "4px",
            }}
          >
            {event.org}
          </p>

          {/* Date */}
          <p
            style={{
              fontFamily: MONO,
              fontSize: "11px",
              color: "rgba(255,255,255,0.3)",
              margin: 0,
              marginBottom: "16px",
            }}
          >
            {event.date}
          </p>

          {/* Separator */}
          <div
            style={{
              height: "1px",
              background: `linear-gradient(90deg, rgba(${rgb},0.2), rgba(255,255,255,0.04) 60%, transparent)`,
              marginBottom: "14px",
            }}
          />

          {/* Bullets */}
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {event.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.5 }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  marginBottom: i < event.bullets.length - 1 ? "10px" : 0,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={accent}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0, marginTop: "3px", opacity: 0.8 }}
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: "13px",
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  {b}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Hover glow at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent, rgba(${rgb},${hover ? 0.5 : 0}), transparent)`,
            transition: "background 0.4s",
          }}
        />
      </motion.article>

      <AnimatePresence>
        {lightbox && event.photo && (
          <Lightbox
            src={event.photo}
            alt={event.title}
            onClose={() => setLightbox(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   YEAR LABEL (shown on the opposite side of the card)
   ═══════════════════════════════════════════════════════════════════════════ */

function YearLabel({
  event,
  side,
  inView,
}: {
  event: Event;
  side: "left" | "right";
  inView: boolean;
}) {
  const { year, accent, rgb, date, Icon } = event;

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: side === "left" ? "flex-end" : "flex-start",
        justifyContent: "center",
        paddingTop: "18px",
        height: "100%",
      }}
    >
      {/* Large year number */}
      <span
        style={{
          fontFamily: SANS,
          fontSize: "52px",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: "transparent",
          WebkitTextStroke: `1.5px rgba(${rgb},0.2)`,
          userSelect: "none",
        }}
      >
        {year}
      </span>

      {/* Date beneath year */}
      <span
        style={{
          fontFamily: MONO,
          fontSize: "10px",
          letterSpacing: "0.08em",
          color: `rgba(${rgb},0.4)`,
          marginTop: "8px",
        }}
      >
        {date}
      </span>

      {/* Small icon */}
      <div
        style={{
          marginTop: "12px",
          color: `rgba(${rgb},0.25)`,
        }}
      >
        <Icon size={18} strokeWidth={1.5} />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TIMELINE NODE (center spine)
   ═══════════════════════════════════════════════════════════════════════════ */

function SpineNode({
  event,
  inView,
}: {
  event: Event;
  inView: boolean;
}) {
  const { accent, rgb } = event;

  return (
    <div style={{ position: "relative" }}>
      {/* Outer glow ring */}
      {inView && (
        <motion.div
          animate={{ scale: [1, 2], opacity: [0.35, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: "-4px",
            borderRadius: "50%",
            border: `1px solid rgba(${rgb},0.35)`,
          }}
        />
      )}

      {/* Node circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.34, 1.4, 0.64, 1], delay: 0.08 }}
        style={{
          position: "relative",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 30%, rgba(${rgb},0.25), rgba(${rgb},0.04) 70%), #0a0a0d`,
          border: `1.5px solid rgba(${rgb},0.45)`,
          boxShadow: `0 0 0 4px rgba(${rgb},0.05), 0 0 28px rgba(${rgb},0.2)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: accent,
          zIndex: 2,
        }}
      >
        <event.Icon size={20} strokeWidth={1.75} />
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONNECTOR LINE (card → node)
   ═══════════════════════════════════════════════════════════════════════════ */

function Connector({
  side,
  rgb,
  inView,
}: {
  side: "left" | "right";
  rgb: string;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
      style={{
        position: "absolute",
        top: "42px",
        [side === "left" ? "right" : "left"]: "50%",
        width: "100%",
        height: "1px",
        background: `linear-gradient(${side === "left" ? "to left" : "to right"}, rgba(${rgb},0.4), rgba(${rgb},0.08))`,
        transformOrigin: side === "left" ? "right center" : "left center",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TIMELINE ROW
   ═══════════════════════════════════════════════════════════════════════════ */

function TimelineRow({ event, index }: { event: Event; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const isLeft = index % 2 === 0;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15, rootMargin: "-32px 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="timeline-row" data-side={isLeft ? "left" : "right"}>
      {/* ── Left column ── */}
      <div style={{ paddingRight: "24px" }}>
        {isLeft ? (
          <EventCard event={event} inView={inView} side="left" />
        ) : (
          <YearLabel event={event} side="left" inView={inView} />
        )}
      </div>

      {/* ── Center column ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          paddingTop: "18px",
        }}
      >
        <SpineNode event={event} inView={inView} />

        {/* Connector */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "100%",
          }}
        >
          <Connector
            side={isLeft ? "left" : "right"}
            rgb={event.rgb}
            inView={inView}
          />
        </div>
      </div>

      {/* ── Right column ── */}
      <div style={{ paddingLeft: "24px" }}>
        {!isLeft ? (
          <EventCard event={event} inView={inView} side="right" />
        ) : (
          <YearLabel event={event} side="right" inView={inView} />
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function InternshipsTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 10%", "end 90%"],
  });

  const rawFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const spineFill = useSpring(rawFill, { stiffness: 50, damping: 20 });

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#07070a",
        fontFamily: SANS,
      }}
    >
      {/* ── INLINE STYLES for responsive grid ── */}
      <style>{`
        .timeline-row {
          display: grid;
          grid-template-columns: 1fr 72px 1fr;
          align-items: start;
          margin-bottom: 64px;
        }
        .ics-profile-card {
          --ics-card-radius: 18px;
          position: relative;
          aspect-ratio: 0.66;
          transform-style: preserve-3d;
          perspective: 740px;
          touch-action: none;
        }
        .ics-profile-behind {
          position: absolute;
          inset: -18px;
          border-radius: 28px;
          background: radial-gradient(
            circle at var(--ics-pointer-x) var(--ics-pointer-y),
            var(--ics-behind-glow) 0%,
            rgba(0, 245, 212, 0.2) 28%,
            transparent 66%
          );
          opacity: var(--ics-glow-opacity);
          filter: blur(36px) saturate(1.18);
          transition: opacity 220ms ease;
          pointer-events: none;
        }
        .ics-profile-shell {
          position: relative;
          z-index: 1;
          height: 100%;
          border-radius: var(--ics-card-radius);
          transform: rotateX(var(--ics-rotate-x)) rotateY(var(--ics-rotate-y)) translateZ(0);
          transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }
        .ics-profile-card.is-active .ics-profile-shell {
          transition-duration: 80ms;
        }
        .ics-profile-inner {
          position: absolute;
          inset: 0;
          padding: 8px;
          border-radius: var(--ics-card-radius);
          overflow: hidden;
          background:
            var(--ics-inner-gradient),
            linear-gradient(145deg, rgba(203,244,247,0.98), rgba(86,134,143,0.92));
          border: 1px solid rgba(221,255,255,0.68);
          box-shadow:
            0 34px 80px rgba(0,0,0,0.66),
            0 0 0 1px rgba(6,182,212,0.28),
            0 0 42px rgba(6,182,212,0.18),
            inset 0 1px 0 rgba(255,255,255,0.78);
          isolation: isolate;
        }
        .ics-profile-inner::before {
          content: "";
          position: absolute;
          inset: 1px;
          border-radius: calc(var(--ics-card-radius) - 2px);
          background:
            repeating-linear-gradient(
              115deg,
              rgba(255,255,255,0.12) 0px,
              rgba(255,255,255,0.12) 1px,
              transparent 1px,
              transparent 10px
            );
          opacity: 0.16;
          pointer-events: none;
          z-index: 3;
        }
        .ics-profile-slot {
          position: absolute;
          top: 8px;
          left: 50%;
          z-index: 5;
          width: 58px;
          height: 8px;
          transform: translateX(-50%);
          border-radius: 0 0 12px 12px;
          background: rgba(3,17,20,0.28);
          box-shadow: inset 0 1px 5px rgba(3,17,20,0.35);
          pointer-events: none;
        }
        .ics-profile-photo {
          position: absolute;
          inset: 8px;
          border-radius: 14px;
          overflow: hidden;
          background: #dff7f9;
          z-index: 1;
          transform: translateZ(12px);
        }
        .ics-profile-photo img {
          transform: translate3d(var(--ics-photo-x), var(--ics-photo-y), 0) scale(1.018);
          transition: transform 160ms ease-out;
        }
        .ics-profile-shine,
        .ics-profile-glare {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
        }
        .ics-profile-shine {
          z-index: 4;
          opacity: 0.48;
          mix-blend-mode: color-dodge;
          background:
            repeating-linear-gradient(
              -42deg,
              rgba(255,132,132,0.0) 0%,
              rgba(255,132,132,0.28) 8%,
              rgba(255,225,115,0.28) 15%,
              rgba(117,255,169,0.22) 22%,
              rgba(113,196,255,0.3) 30%,
              rgba(214,137,255,0.24) 38%,
              rgba(255,132,132,0.0) 46%
            ),
            radial-gradient(
              circle at var(--ics-pointer-x) var(--ics-pointer-y),
              rgba(255,255,255,0.82) 0%,
              rgba(171,246,255,0.26) 20%,
              transparent 46%
            );
          background-size: 180% 180%, 100% 100%;
          background-position:
            calc(var(--ics-pointer-x) * 0.45) calc(var(--ics-pointer-y) * 0.45),
            center;
          filter: brightness(0.96) contrast(1.28) saturate(1.26);
        }
        .ics-profile-glare {
          z-index: 6;
          opacity: 0.52;
          mix-blend-mode: screen;
          background:
            radial-gradient(
              circle at var(--ics-pointer-x) var(--ics-pointer-y),
              rgba(244,255,255,0.62) 0%,
              rgba(72,221,255,0.2) 18%,
              transparent 42%
            ),
            linear-gradient(115deg, transparent 18%, rgba(255,255,255,0.28) 42%, transparent 58%);
        }
        @media (prefers-reduced-motion: reduce) {
          .ics-profile-shell,
          .ics-profile-photo img {
            transition-duration: 0.01ms !important;
            transform: none !important;
          }
          .ics-profile-shine,
          .ics-profile-glare {
            opacity: 0.18;
          }
        }
        @media (max-width: 768px) {
          .infinite-reveal-grid {
            grid-template-columns: 1fr !important;
          }
          .infinite-reveal-panel {
            padding: 20px !important;
          }
          .timeline-row {
            grid-template-columns: 48px 1fr;
            margin-bottom: 40px;
          }
          .timeline-row > div:first-child {
            display: none;
          }
          .timeline-row[data-side="left"] > div:first-child {
            display: block;
          }
          .timeline-row[data-side="left"] > div:last-child {
            display: none;
          }
          .timeline-row > div:nth-child(2) {
            order: -1;
          }
        }
      `}</style>

      {/* ── Ambient background glows ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "12%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(16,185,129,0.03)",
            filter: "blur(120px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "8%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(59,130,246,0.025)",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(168,85,247,0.018)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* ── Content wrapper ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "100px 24px 80px",
        }}
      >
        {/* ────── Section Header ────── */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              marginBottom: "18px",
            }}
          >
            <span
              style={{
                width: "28px",
                height: "1px",
                background: "rgba(16,185,129,0.6)",
                display: "block",
              }}
            />
            <span
              style={{
                fontFamily: MONO,
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#10b981",
              }}
            >
              Experience
            </span>
            <span
              style={{
                width: "28px",
                height: "1px",
                background: "rgba(16,185,129,0.6)",
                display: "block",
              }}
            />
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontFamily: SANS,
              fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
              color: "#ffffff",
              margin: 0,
              marginBottom: "16px",
            }}
          >
            Workshops &amp;{" "}
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1.2px rgba(255,255,255,0.15)",
              }}
            >
              Internships
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            style={{
              fontFamily: SANS,
              fontSize: "14px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.35)",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            A timeline of hands-on experience and professional development
            across premier institutions.
          </motion.p>
        </div>

        {/* ────── Timeline ────── */}
        <div style={{ position: "relative" }}>
          {/* Spine background track */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              transform: "translateX(-50%)",
              background: "rgba(255,255,255,0.05)",
              pointerEvents: "none",
            }}
          />

          {/* Spine animated fill */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              width: "1px",
              height: "100%",
              transform: "translateX(-50%)",
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <motion.div
              style={{
                width: "1px",
                height: spineFill,
                transformOrigin: "top",
                background:
                  "linear-gradient(180deg, #10b981 0%, rgba(59,130,246,0.5) 50%, rgba(168,85,247,0.3) 100%)",
                boxShadow: "0 0 10px rgba(16,185,129,0.4)",
              }}
            />
          </div>

          {/* Timeline items */}
          {EVENTS.map((event, i) => (
            <TimelineRow key={event.id} event={event} index={i} />
          ))}

          {/* ── End cap ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              marginTop: "-16px",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1.5px dashed rgba(16,185,129,0.35)",
                background: "#07070a",
                boxShadow: "0 0 20px rgba(16,185,129,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <span
                className="animate-ping"
                style={{
                  position: "absolute",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#10b981",
                  opacity: 0.5,
                }}
              />
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#10b981",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: MONO,
                fontSize: "9px",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "rgba(16,185,129,0.4)",
              }}
            >
              Continuing Journey
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
