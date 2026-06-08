"use client";

import {
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import type { Transition } from "framer-motion";
import {
  X,
  User,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

export type InfiniteCSRedesignEvent = {
  id: string;
  year: string;
  date: string;
  title: string;
  org: string;
  type: string;
  bullets?: readonly string[];
  photo: string | null;
  featuredId?: boolean;
};

// ─── Design tokens ────────────────────────────────────────────────────────────

const T = {
  // Obsidian base palette
  bg0:    "#080a0b",   // deepest void
  bg1:    "#0d1214",   // modal base
  bg2:    "#111618",   // card surface
  bg3:    "#161c1f",   // elevated surface
  bgLeft: "#0a0f11",   // lanyard panel
  // Bone white typography
  text0:  "#f2ede8",   // display
  text1:  "#c9c2bb",   // body
  text2:  "#7a7068",   // muted / label
  text3:  "#3d3830",   // disabled
  // Single accent — electric emerald
  em:     "#39e09b",   // emerald primary
  emDim:  "#1a6b48",   // emerald mid
  emGhost:"#0e3325",   // emerald ghost bg
  // Neutral borders
  b0:     "rgba(242,237,232,0.04)",   // hairline
  b1:     "rgba(242,237,232,0.08)",   // subtle
  b2:     "rgba(242,237,232,0.14)",   // default
  b3:     "rgba(242,237,232,0.22)",   // strong
  // Typography
  fontDisplay: "'DM Sans', system-ui, -apple-system, sans-serif",
  fontMono:    "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  fontBody:    "'DM Sans', system-ui, -apple-system, sans-serif",
};

// ─── Shared motion config ──────────────────────────────────────────────────────

const SPRING_SNAP: Transition = { type: "spring", stiffness: 500, damping: 34, mass: 0.8 };
const EASE_EXPO: any = [0.16, 1, 0.3, 1];

// ─── Lanyard Badge Card ────────────────────────────────────────────────────────

function LanyardBadgeCard({ event }: { event: InfiniteCSRedesignEvent }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateZ = useTransform(x, [-180, 180], [-10, 10]);
  const rotateX = useTransform(y, [-180, 180], [12, -12]);
  const rotateY = useTransform(x, [-180, 180], [8, -8]);
  const cableX  = useTransform(x, (v) => `calc(50% + ${v * 0.7}px)`);
  const cableY  = useTransform(y, (v) => `calc(128px + ${v * 0.7}px)`);
  // Subtle holographic sheen tied to drag
  const sheenX  = useTransform(x, [-180, 180], ["0%", "100%"]);
  const sheenY  = useTransform(y, [-180, 180], ["0%", "100%"]);

  const settle = useCallback(() => {
    if (reduceMotion) { x.set(0); y.set(0); return; }
    animate<number>(x, 0, SPRING_SNAP);
    animate<number>(y, 0, { type: "spring", stiffness: 420, damping: 28, mass: 0.85 });
  }, [reduceMotion, x, y]);

  return (
    <div className="absolute inset-0 flex flex-col items-center pointer-events-auto select-none">
      {/* Clip at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          width: 52,
          height: 14,
          background: `linear-gradient(180deg, ${T.bg0} 0%, ${T.bg3} 100%)`,
          borderRadius: "0 0 6px 6px",
          border: `1px solid ${T.b1}`,
          borderTop: "none",
          zIndex: 30,
        }}
      />

      {/* Cable / lanyard */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none", zIndex: 10 }}
      >
        <defs>
          <linearGradient id="cableGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor={T.bg0} />
            <stop offset="40%"  stopColor={T.em}  stopOpacity="0.22" />
            <stop offset="100%" stopColor={T.bgLeft} />
          </linearGradient>
        </defs>
        <motion.line x1="48.5%" y1="0" x2={cableX} y2={cableY} stroke="url(#cableGrad)" strokeWidth="5" strokeLinecap="round" />
        <motion.line x1="51.5%" y1="0" x2={cableX} y2={cableY} stroke="url(#cableGrad)" strokeWidth="5" strokeLinecap="round" />
      </svg>

      {/* Draggable card assembly */}
      <motion.div
        drag={!reduceMotion}
        dragSnapToOrigin
        dragElastic={0.18}
        dragConstraints={{ top: -48, bottom: 90, left: -120, right: 120 }}
        onDragEnd={settle}
        style={{
          x, y, rotateZ, rotateX, rotateY,
          marginTop: 100,
          transformStyle: "preserve-3d",
          touchAction: "none",
          userSelect: "none",
          zIndex: 20,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        whileDrag={{ cursor: "grabbing", scale: 1.03 }}
        className="touch-none cursor-grab"
      >
        {/* Badge clip assembly */}
        <div style={{ width: 28, height: 36, marginBottom: -20, background: `linear-gradient(180deg, ${T.bg3} 0%, ${T.bg1} 100%)`, borderRadius: "8px 8px 0 0", border: `1px solid ${T.b2}`, borderBottom: "none", display: "flex", alignItems: "flex-start", justifyContent: "center", zIndex: 21 }}>
          <div style={{ width: 8, height: 8, marginTop: 8, borderRadius: "50%", background: T.bg0, border: `1px solid ${T.b2}` }} />
        </div>
        <div style={{ width: 44, height: 10, marginBottom: -4, background: T.bg0, border: `1px solid ${T.b2}`, borderRadius: 4, zIndex: 22, boxShadow: `0 2px 12px rgba(0,0,0,0.6)` }} />

        {/* The card */}
        <div
          style={{
            width: 208,
            height: 300,
            borderRadius: 16,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            background: `linear-gradient(145deg, ${T.bg2} 0%, #0c2019 100%)`,
            border: `1px solid ${T.b3}`,
            boxShadow: `0 28px 56px rgba(0,0,0,0.75), 0 0 0 0.5px ${T.b1} inset, 0 1px 0 ${T.b2} inset`,
          }}
        >
          {/* Holographic shimmer overlay */}
          <motion.div
            style={{
              position: "absolute", inset: 0, zIndex: 20,
              pointerEvents: "none",
              mixBlendMode: "overlay",
              background: `radial-gradient(ellipse at ${sheenX} ${sheenY}, rgba(57,224,155,0.2) 0%, rgba(255,255,255,0.08) 35%, transparent 65%)`,
              opacity: 0.7,
            }}
          />
          {/* Subtle scanline texture */}
          <div style={{ position: "absolute", inset: 0, zIndex: 18, pointerEvents: "none", opacity: 0.03, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)", backgroundSize: "100% 3px" }} />

          {/* ICS Wordmark */}
          <div style={{ padding: "18px 18px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: T.fontMono, fontSize: 8, letterSpacing: "0.38em", color: T.em, fontWeight: 600, textTransform: "uppercase" }}>INFINITE</span>
            <div style={{ width: 18, height: 18, borderRadius: 4, border: `1px solid ${T.emDim}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: 1, background: T.em, opacity: 0.8 }} />
            </div>
          </div>

          {/* Photo zone */}
          <div style={{ flex: 1, margin: "0 14px", borderRadius: 10, overflow: "hidden", border: `1px solid ${T.b2}`, background: T.bg0, position: "relative" }}>
            {event.photo ? (
              <Image src={event.photo} alt="ID photo" fill className="object-cover" draggable={false} priority />
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                <User size={36} color={T.emDim} strokeWidth={1} />
              </div>
            )}
            {/* bottom tint fade */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 48, background: "linear-gradient(transparent, rgba(0,0,0,0.45))", pointerEvents: "none" }} />
          </div>


        </div>
      </motion.div>
    </div>
  );
}

// ─── Experience Reveal Modal ───────────────────────────────────────────────────

export function InfiniteExperienceReveal({
  event,
  onClose,
}: {
  event: InfiniteCSRedesignEvent;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  const domains = ["Software Dev", "Eng Workflows", "Code Quality", "Team Collab", "Delivery"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", background: "rgba(2,4,5,0.88)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.48, ease: EASE_EXPO }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1180,
          maxHeight: "90vh",
          minHeight: 680,
          height: "80vh",
          borderRadius: 24,
          overflow: "hidden",
          display: "flex",
          flexDirection: "row",
          background: T.bg1,
          border: `1px solid ${T.b1}`,
          boxShadow: `0 48px 96px rgba(0,0,0,0.8), 0 0 0 1px ${T.b0}`,
        }}
      >
        {/* ─── Close ─────────────────────────────────────────────────────────── */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 20, right: 20, zIndex: 50,
            width: 36, height: 36, borderRadius: "50%",
            border: `1px solid ${T.b2}`,
            background: "rgba(8,10,11,0.5)",
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: T.text1,
            transition: "background 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = T.bg3; e.currentTarget.style.borderColor = T.b3; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(8,10,11,0.5)"; e.currentTarget.style.borderColor = T.b2; }}
        >
          <X size={16} strokeWidth={1.5} />
        </button>

        {/* ─── LEFT — Lanyard Panel ──────────────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            width: "36%",
            flexShrink: 0,
            background: T.bgLeft,
            borderRight: `1px solid ${T.b1}`,
            overflow: "hidden",
          }}
        >
          {/* Ambient emerald glow from top */}
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 280, height: 300, background: `radial-gradient(ellipse, ${T.emGhost} 0%, transparent 70%)`, pointerEvents: "none" }} />
          {/* Fine dot grid */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.12, backgroundImage: "radial-gradient(circle, rgba(242,237,232,0.3) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

          <motion.div
            initial={{ y: -480 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 58, mass: 1, delay: 0.08 }}
            style={{ width: "100%", height: "100%" }}
          >
            <LanyardBadgeCard event={event} />
          </motion.div>


        </div>

        {/* ─── RIGHT — Editorial Panel ───────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "64px 72px",
            position: "relative",
            background: T.bg1,
          }}
        >
          {/* Subtle top-right light leak */}
          <div style={{ position: "absolute", top: 0, right: 0, width: 320, height: 240, background: `radial-gradient(ellipse at 100% 0%, ${T.emGhost} 0%, transparent 65%)`, pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 10, maxWidth: 720 }}>

            {/* ── Status pill ── */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: T.emGhost, border: `1px solid ${T.emDim}`, marginBottom: 32 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.em, boxShadow: `0 0 8px ${T.em}` }} />
                <span style={{ fontFamily: T.fontMono, fontSize: 10, letterSpacing: "0.18em", color: T.em, textTransform: "uppercase", fontWeight: 600 }}>Active Role</span>
              </div>
            </motion.div>

            {/* ── Organisation name — editorial display ── */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}>
              {/* Overline */}
              <p style={{ fontFamily: T.fontMono, fontSize: 10, letterSpacing: "0.22em", color: T.text2, textTransform: "uppercase", margin: "0 0 10px", fontWeight: 500 }}>
                Infinite Computer Solutions
              </p>
              {/* Display heading */}
              <h2 style={{
                fontFamily: T.fontDisplay,
                fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: "-0.05em",
                color: T.text0,
                margin: "0 0 6px",
              }}>
                Software
              </h2>
              <h2 style={{
                fontFamily: T.fontDisplay,
                fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: "-0.05em",
                color: T.em,
                margin: "0 0 32px",
              }}>
                Dev Intern
              </h2>
            </motion.div>

            {/* ── Divider ── */}
            <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.44, duration: 0.5 }} style={{ transformOrigin: "left" }}>
              <div style={{ height: 1, background: `linear-gradient(90deg, ${T.b3} 0%, transparent 100%)`, marginBottom: 32 }} />
            </motion.div>

            {/* ── Meta row ── */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <div style={{ display: "flex", gap: 40, marginBottom: 40 }}>
                {[
                  { label: "Location", value: "Vizag Branch, India" },
                  { label: "Duration",  value: "2026 – 2027" },
                  { label: "Type",      value: "Full-time Intern" },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <span style={{ fontFamily: T.fontMono, fontSize: 9, letterSpacing: "0.22em", color: T.text2, textTransform: "uppercase" }}>{label}</span>
                    <span style={{ fontFamily: T.fontDisplay, fontSize: "1.05rem", color: T.text1, fontWeight: 500, letterSpacing: "-0.015em" }}>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Body copy ── */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.56 }}
              style={{ fontFamily: T.fontBody, fontSize: "1rem", lineHeight: 1.85, color: T.text1, fontWeight: 400, marginBottom: 40, maxWidth: 520 }}
            >
              Embedded within a professional engineering team at Infinite Computer Solutions, contributing across the full software delivery lifecycle — from feature development and code review to CI/CD tooling and internal workflow automation.
            </motion.p>

            {/* ── Domain tags ── */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.64 }}>
              <p style={{ fontFamily: T.fontMono, fontSize: 9, letterSpacing: "0.22em", color: T.text2, textTransform: "uppercase", marginBottom: 14 }}>
                Key Domains
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {domains.map((d, i) => (
                  <motion.span
                    key={d}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.68 + i * 0.045 }}
                    style={{
                      fontFamily: T.fontDisplay,
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      color: T.text1,
                      padding: "6px 16px",
                      borderRadius: 100,
                      background: T.bg3,
                      border: `1px solid ${T.b2}`,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {d}
                  </motion.span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Timeline Entry Card ───────────────────────────────────────────────────────

export function InfiniteEventCard({
  event,
  inView,
  side,
}: {
  event: InfiniteCSRedesignEvent;
  inView: boolean;
  side: "left" | "right";
}) {
  const { useState, useCallback } = require("react");
  const [expanded, setExpanded] = useState(false);
  const open  = useCallback(() => setExpanded(true),  []);
  const close = useCallback(() => setExpanded(false), []);
  const initX = side === "left" ? -32 : 32;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: initX }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.68, ease: EASE_EXPO }}
      >
        <button
          type="button"
          onClick={open}
          aria-haspopup="dialog"
          aria-expanded={expanded}
          style={{
            display: "block",
            width: "100%",
            border: `1px solid ${T.b2}`,
            borderRadius: 14,
            padding: 0,
            textAlign: "left",
            background: T.bg2,
            cursor: "pointer",
            overflow: "hidden",
            transition: "border-color 0.22s, background 0.22s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.b3; e.currentTarget.style.background = T.bg3; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.b2; e.currentTarget.style.background = T.bg2; }}
        >
          {/* Top accent line */}
          <div style={{ height: 2, background: `linear-gradient(90deg, ${T.em} 0%, ${T.emDim} 50%, transparent 100%)` }} />

          <div style={{ padding: "20px 22px 22px" }}>
            {/* Row 1 — icon + title block */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 18 }}>
              {/* Icon */}
              <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: T.emGhost, border: `1px solid ${T.emDim}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.em} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="12.01" />
                </svg>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: T.fontMono, fontSize: 9, letterSpacing: "0.2em", color: T.emDim, textTransform: "uppercase", margin: "0 0 5px", fontWeight: 600 }}>
                  {event.year} · SDE Intern
                </p>
                <h3 style={{ fontFamily: T.fontDisplay, fontSize: "1rem", fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.02em", color: T.text0, margin: 0 }}>
                  {event.title.split("–")[0]?.trim() ?? event.title}
                </h3>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: `linear-gradient(90deg, ${T.b2} 0%, transparent 100%)`, marginBottom: 14 }} />

            {/* Row 2 — meta */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontFamily: T.fontDisplay, fontSize: "0.82rem", color: T.text2, fontWeight: 400 }}>
                  {event.org}
                </span>
                <span style={{ width: 1, height: 12, background: T.b2 }} />
                <span style={{ fontFamily: T.fontMono, fontSize: "0.72rem", color: T.text2, letterSpacing: "0.04em" }}>
                  {event.date}
                </span>
              </div>
            </div>

            {/* CTA row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
                borderRadius: 8,
                background: T.bg0,
                border: `1px solid ${T.b1}`,
              }}
            >
              <span style={{ fontFamily: T.fontDisplay, fontSize: "0.82rem", color: T.text2, fontWeight: 400 }}>
                View ID card &amp; role details
              </span>
              <ArrowUpRight size={14} color={T.em} strokeWidth={2} />
            </div>
          </div>
        </button>
      </motion.div>

      <AnimatePresence>
        {expanded && <InfiniteExperienceReveal event={event} onClose={close} />}
      </AnimatePresence>
    </>
  );
}