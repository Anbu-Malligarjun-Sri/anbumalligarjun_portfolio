"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { GraduationCap, FlaskConical, Cpu, BookOpen, X } from "lucide-react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const EVENTS = [
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
        @media (max-width: 768px) {
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