"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const RetroComputerContact = dynamic(
  () => import("./RetroComputerContact"),
  {
    ssr: false,
    loading: () => (
      <div className="h-150 w-full animate-pulse rounded-2xl bg-white/2 lg:h-175" />
    ),
  },
);

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="relative bg-void">
      {/* ── Top border ── */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Atmospheric glow — emanates from the left where the text panel lives ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 18% 50%, rgba(0,255,148,0.055) 0%, transparent 100%)",
        }}
      />

      {/* ── Layout: left text panel + right terminal ── */}
      <div
        ref={ref}
        className="relative flex flex-col lg:flex-row lg:items-stretch"
      >
        {/* ─────────── LEFT — Stylish Text Panel ─────────── */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center px-8 py-20 lg:w-[30%] lg:shrink-0 lg:py-28 lg:pl-16 lg:pr-8"
        >
          {/* Card with subtle tinted background */}
          <div
            className="relative w-full max-w-sm rounded-3xl px-12 py-14"
            style={{
              background:
                "linear-gradient(145deg, rgba(0,255,148,0.055) 0%, rgba(255,255,255,0.025) 55%, rgba(0,0,0,0) 100%)",
              border: "1px solid rgba(0,255,148,0.13)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 64px rgba(0,0,0,0.45)",
            }}
          >
            {/* Thin neon top-left corner accent */}
            <div
              className="absolute left-0 top-0 h-16 w-px rounded-tl-3xl"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,255,148,0.6), transparent)",
              }}
            />
            <div
              className="absolute left-0 top-0 h-px w-16 rounded-tl-3xl"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,255,148,0.6), transparent)",
              }}
            />

            {/* Headline — italic editorial style */}
            <h2
              className="mb-5 leading-[1.06] text-white"
              style={{
                fontFamily: "'GaltinoItalic', 'Georgia', 'Times New Roman', serif",
                fontStyle: "italic",
                fontSize: "clamp(1.85rem, 3.2vw, 2.9rem)",
              }}
            >
              Let&rsquo;s build{" "}
              <br />
              something{" "}
              <span
                style={{
                  color: "#00FF94",
                  textShadow: "0 0 36px rgba(0,255,148,0.5)",
                  fontStyle: "italic",
                }}
              >
                meaningful.
              </span>
            </h2>

            {/* Thin separator */}
            <div
              className="mb-5 h-px w-10"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,255,148,0.4), transparent)",
              }}
            />

            {/* Description — light serif weight */}
            <p
              className="leading-[1.8] text-white/40"
              style={{
                fontFamily: "'Eloquia', 'Georgia', serif",
                fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
              }}
            >
              Open for collaborations, research projects,
              or a conversation about AI and biology.
              Send a message through the terminal.
            </p>
          </div>
        </motion.div>

        {/* ─────────── RIGHT — Retro Terminal ─────────── */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 min-w-0"
        >
          <RetroComputerContact />
        </motion.div>
      </div>

      {/* ── Bottom border ── */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
