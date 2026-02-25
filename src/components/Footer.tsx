"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Github, Linkedin, Youtube, Code2, Terminal,
  ArrowUp, Sparkles, ArrowUpRight, MapPin, Clock,
} from "lucide-react";

/* ══════════════════════════════════════════════════════
 *  DATA
 * ══════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { label: "Home",           href: "#home"       },
  { label: "About",          href: "#about"      },
  { label: "Experience",     href: "#experience" },
  { label: "Projects",       href: "#projects"   },
  { label: "Contact",        href: "#contact"    },
];
const VENTURE_LINKS = [
  { label: "Sagittarius",    href: "/sagittarius", desc: "AI Research Startup" },
  { label: "Sam SciTech",    href: "/youtube",     desc: "Science YouTube"     },
  { label: "Words & Worlds", href: "/writing",     desc: "Writing & Essays"    },
];
const SOCIAL_LINKS = [
  { icon: Github,   href: "https://github.com/Anbu-Malligarjun-Sri",                     label: "GitHub"     },
  { icon: Linkedin, href: "https://www.linkedin.com/in/anbu-malligarjun-sri-835a372a4/", label: "LinkedIn"   },
  { icon: Youtube,  href: "https://www.youtube.com/channel/UCXHN6dAbYjsC9eF8Dk2qTtg",   label: "YouTube"    },
  { icon: Code2,    href: "https://www.leetcode.com/Anbu_Malligarjun_Sri/",              label: "LeetCode"   },
  { icon: Terminal, href: "https://www.hackerrank.com/profile/anbumalligarjun1",         label: "HackerRank" },
];

/* ══════════════════════════════════════════════════════
 *  LETTER PAPER
 * ══════════════════════════════════════════════════════ */
function LetterPaper({ time, visible }: { time: string; visible: boolean }) {
  const year = new Date().getFullYear();
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  const fu = (i: number) => ({
    initial:    { opacity: 0, y: 14 },
    animate:    visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 0.5, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <div style={{
      width: "100%",
      background: "#1c1c1c",
      borderRadius: "3px 3px 2px 2px",
      boxShadow: "0 2px 0 rgba(0,0,0,0.6), 0 8px 48px rgba(0,0,0,0.45), 0 32px 80px rgba(0,0,0,0.35)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "Georgia,serif",
    }}>

      {/* paper line texture */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.025, pointerEvents: "none", zIndex: 0,
        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 23px,rgba(255,255,255,0.9) 23px,rgba(255,255,255,0.9) 24px)",
      }} />

      {/* top crease */}
      <div style={{ height: 1.5, background: "linear-gradient(90deg,transparent 2%,rgba(255,255,255,0.07) 20%,rgba(255,255,255,0.1) 50%,rgba(255,255,255,0.07) 80%,transparent 98%)", position: "relative", zIndex: 1 }} />
      <div style={{ height: 1,   background: "linear-gradient(90deg,transparent 2%,rgba(0,0,0,0.7) 20%,rgba(0,0,0,0.9) 50%,rgba(0,0,0,0.7) 80%,transparent 98%)", position: "relative", zIndex: 1 }} />

      {/* ── LETTERHEAD ── */}
      <motion.div {...fu(0)} style={{
        background: "linear-gradient(135deg,#064e3b 0%,#065f46 60%,#047857 100%)",
        padding: "18px 28px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "3px solid #10b981",
        position: "relative", overflow: "hidden", zIndex: 1,
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06,
          backgroundImage: "repeating-linear-gradient(45deg,#fff 0px,#fff 1px,transparent 1px,transparent 14px)" }} />

        {/* monogram + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative" }}>
          <div style={{
            width: 46, height: 46, borderRadius: "50%",
            background: "rgba(255,255,255,0.1)", border: "1.5px solid rgba(52,211,153,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, fontWeight: 900, color: "#34d399", fontFamily: "Georgia,serif",
            boxShadow: "0 0 20px rgba(52,211,153,0.2)",
          }}>A</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "0.06em", fontFamily: "Georgia,serif", lineHeight: 1.2 }}>
              ANBU MALLIGARJUN
            </div>
            <div style={{ fontSize: 9, color: "rgba(52,211,153,0.75)", letterSpacing: "0.16em", fontFamily: "monospace", marginTop: 3 }}>
              AI · ROBOTICS · COMPUTATIONAL BIOLOGY
            </div>
          </div>
        </div>

        {/* date / location */}
        <div style={{ textAlign: "right", fontFamily: "monospace", position: "relative" }}>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>{date}</div>
          <div style={{ fontSize: 9, color: "rgba(52,211,153,0.7)", marginTop: 4, display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
            <MapPin size={9} />Tamil Nadu, India
          </div>
          {time && (
            <div style={{ fontSize: 9, color: "rgba(52,211,153,0.5)", marginTop: 2, display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
              <Clock size={9} />{time} IST
            </div>
          )}
        </div>
      </motion.div>

      {/* ── BODY ── */}
      <div style={{ padding: "20px 32px 0 32px", position: "relative", zIndex: 1 }}>

        {/* salutation */}
        <motion.p {...fu(1)} style={{ fontSize: 13, color: "#e5e7eb", fontStyle: "italic", margin: "0 0 6px" }}>
          Dear Visitor,
        </motion.p>
        <motion.p {...fu(2)} style={{ fontSize: 11, color: "#9ca3af", lineHeight: 1.75, margin: "0 0 16px" }}>
          I&apos;m building at the intersection of AI, robotics, and computational biology —
          engineering a future where technology restores what nature has lost.
          If any of this resonates, I&apos;d love to hear from you.
        </motion.p>

        {/* divider */}
        <motion.div {...fu(3)} style={{ height: 1, marginBottom: 18, background: "linear-gradient(90deg,transparent,rgba(16,185,129,0.25) 25%,rgba(16,185,129,0.4) 50%,rgba(16,185,129,0.25) 75%,transparent)" }} />

        {/* ── THREE COLUMNS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 18 }}>

          {/* NAV */}
          <motion.div {...fu(4)}>
            <div style={{ fontSize: 7.5, letterSpacing: "0.2em", color: "#9ca3af", marginBottom: 10, fontFamily: "monospace", textTransform: "uppercase",
              paddingBottom: 6, borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 12, height: 1.5, background: "#10b981", borderRadius: 1, display: "inline-block" }} />
              Navigate
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 7 }}>
              {NAV_LINKS.map((l, i) => (
                <motion.li key={l.label} {...fu(5 + i)}>
                  <a href={l.href} style={{ fontSize: 12, color: "#e5e7eb", textDecoration: "none", fontFamily: "Georgia,serif",
                    display: "flex", alignItems: "center", gap: 7, transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#34d399")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#e5e7eb")}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", flexShrink: 0, opacity: 0.7 }} />
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* VENTURES */}
          <motion.div {...fu(4)}>
            <div style={{ fontSize: 7.5, letterSpacing: "0.2em", color: "#9ca3af", marginBottom: 10, fontFamily: "monospace", textTransform: "uppercase",
              paddingBottom: 6, borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 12, height: 1.5, background: "#10b981", borderRadius: 1, display: "inline-block" }} />
              Ventures
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
              {VENTURE_LINKS.map((l, i) => (
                <motion.li key={l.label} {...fu(5 + i)}>
                  <a href={l.href} style={{ textDecoration: "none", display: "block" }}
                    onMouseEnter={e => { const el = e.currentTarget.querySelector(".vt") as HTMLElement; if (el) el.style.color = "#34d399"; }}
                    onMouseLeave={e => { const el = e.currentTarget.querySelector(".vt") as HTMLElement; if (el) el.style.color = "#e5e7eb"; }}>
                    <div className="vt" style={{ fontSize: 12, color: "#e5e7eb", fontFamily: "Georgia,serif", transition: "color 0.2s", marginBottom: 2 }}>{l.label}</div>
                    <div style={{ fontSize: 9, color: "#9ca3af", fontFamily: "monospace", letterSpacing: "0.05em" }}>{l.desc}</div>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* NETWORK */}
          <motion.div {...fu(4)}>
            <div style={{ fontSize: 7.5, letterSpacing: "0.2em", color: "#9ca3af", marginBottom: 10, fontFamily: "monospace", textTransform: "uppercase",
              paddingBottom: 6, borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 12, height: 1.5, background: "#10b981", borderRadius: 1, display: "inline-block" }} />
              Network
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {SOCIAL_LINKS.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                    {...fu(5 + i)}
                    style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", color: "#d1d5db", fontSize: 11.5, fontFamily: "Georgia,serif", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#34d399")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#d1d5db")}>
                    <span style={{ width: 24, height: 24, borderRadius: 5, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(16,185,129,0.06)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={12} />
                    </span>
                    {link.label}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── EMAIL CTA ── */}
        <motion.div {...fu(12)} style={{ marginBottom: 18 }}>
          <div style={{ height: 1, marginBottom: 14, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06) 40%,rgba(255,255,255,0.06) 60%,transparent)" }} />
          <a href="mailto:anbumalligarjun@gmail.com" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 18px", borderRadius: "100px", textDecoration: "none",
            background: "linear-gradient(135deg,rgba(16,185,129,0.08),rgba(16,185,129,0.12))",
            border: "1px solid rgba(16,185,129,0.25)",
            color: "#34d399", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.05em",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg,rgba(16,185,129,0.15),rgba(16,185,129,0.2))"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(16,185,129,0.5)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg,rgba(16,185,129,0.08),rgba(16,185,129,0.12))"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(16,185,129,0.25)"; }}
          >
            <Sparkles size={12} color="#10b981" />
            anbumalligarjun@gmail.com
            <ArrowUpRight size={11} />
          </a>
        </motion.div>

        {/* ── SIGNATURE ── */}
        <motion.div {...fu(13)} style={{
          borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 14, paddingBottom: 22,
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        }}>
          <div>
            <p style={{ fontSize: 11, color: "#9ca3af", fontStyle: "italic", margin: "0 0 5px" }}>Yours sincerely,</p>
            <div style={{
              fontSize: 26, color: "#34d399",
              fontFamily: "'Brush Script MT','Segoe Script','Comic Sans MS',cursive",
              letterSpacing: "0.02em", lineHeight: 1, marginBottom: 6, userSelect: "none",
            }}>
              Anbu Malligarjun
            </div>
            <div style={{ width: 180, height: 1, background: "linear-gradient(90deg,#10b981,transparent)", marginBottom: 6 }} />
            <div style={{ fontSize: 8.5, color: "#9ca3af", fontFamily: "monospace", letterSpacing: "0.05em" }}>
              © {year} Anbu Malligarjun · Matrix initialized.
            </div>
          </div>

          {/* back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(16,185,129,0.3)",
              background: "rgba(16,185,129,0.06)", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#10b981", transition: "all 0.2s", flexShrink: 0,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.15)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.06)"; }}
          >
            <ArrowUp size={14} />
          </button>
        </motion.div>
      </div>

      {/* bottom crease */}
      <div style={{ height: 1.5, background: "linear-gradient(90deg,transparent 2%,rgba(255,255,255,0.07) 20%,rgba(255,255,255,0.1) 50%,rgba(255,255,255,0.07) 80%,transparent 98%)", position: "relative", zIndex: 1 }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
 *  MAIN EXPORT
 * ══════════════════════════════════════════════════════ */
export default function LetterFooter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, amount: 0.18 });
  const [time,    setTime]    = useState("");
  const [visible, setVisible] = useState(false);

  /* live clock */
  useEffect(() => {
    const iv = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true,
      }));
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  /* reveal on scroll into view */
  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-zinc-950"
      style={{ paddingTop: 80, paddingBottom: 0 }}
    >
      {/* subtle atmosphere */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 60% at 50% 100%,rgba(6,78,59,0.1) 0%,transparent 70%)" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.18,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px,transparent 1px)",
        backgroundSize: "36px 36px" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 120, pointerEvents: "none",
        background: "linear-gradient(180deg,rgba(18,18,18,0.9) 0%,transparent 100%)" }} />

      {/* letter */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ position: "relative", zIndex: 10, width: "100%", boxSizing: "border-box" }}
      >
        <LetterPaper time={time} visible={visible} />
      </motion.div>

      {/* fade to page bg */}
      <div style={{
        width: "100%", height: 48,
        background: "linear-gradient(180deg,rgba(18,18,18,0.0) 0%,rgba(6,7,8,1) 100%)",
        position: "relative", zIndex: 11,
      }} />
    </section>
  );
}
