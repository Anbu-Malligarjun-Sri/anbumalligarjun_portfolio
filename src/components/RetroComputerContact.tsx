"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
 *  CONSTANTS
 * ══════════════════════════════════════════════════════════════ */
const COUNTRY_CODES = [
  { code:"US",dial:"+1" },{ code:"GB",dial:"+44" },{ code:"IN",dial:"+91" },
  { code:"AU",dial:"+61" },{ code:"CA",dial:"+1" },{ code:"DE",dial:"+49" },
  { code:"FR",dial:"+33" },{ code:"JP",dial:"+81" },{ code:"CN",dial:"+86" },
  { code:"BR",dial:"+55" },{ code:"SG",dial:"+65" },{ code:"AE",dial:"+971" },
  { code:"NL",dial:"+31" },{ code:"SE",dial:"+46" },
];

const BOOT_SEQUENCE = [
  { text:"Award Modular BIOS v6.00PG, An Energy Star Ally", color:"#c8c8c8", delay:0 },
  { text:"Copyright (C) 1984-98, Award Software, Inc.",      color:"#b0b0b0", delay:220 },
  { text:"",                                                   color:"",        delay:400 },
  { text:"RS-486DX2/66  Memory Test :  65536K OK",            color:"#c0c0c0", delay:560 },
  { text:"",                                                   color:"",        delay:700 },
  { text:"Detecting IDE Primary Master ...  WDC WD540AA",     color:"#b8b8b8", delay:840 },
  { text:"Detecting IDE Secondary ...  NEC CD-ROM CDR-1400",  color:"#b8b8b8", delay:980 },
  { text:"",                                                   color:"",        delay:1100 },
  { text:"Award Plug and Play BIOS Extension v1.0A",          color:"#a8a8a8", delay:1200 },
  { text:"Initialize Plug and Play Cards ...  Done.",         color:"#a8a8a8", delay:1380 },
  { text:"",                                                   color:"",        delay:1520 },
  { text:"SECURE.EXE v2.4.1 ...  Loading",                   color:"#88ccff", delay:1680 },
  { text:"Encrypted channel ...  Established",                color:"#44ff88", delay:1950 },
  { text:"CONTACT TERMINAL READY",                            color:"#44ff88", delay:2200 },
];

/* ══════════════════════════════════════════════════════════════
 *  KEY CAP — realistic 90s depressible keycap
 * ══════════════════════════════════════════════════════════════ */
function KeyCap({ label = "", width = 28, height = 26, isSpecial = false, isPressed = false }) {
  const isBlank = label === "";
  return (
    <div style={{ width, height, flexShrink: 0, position: "relative", userSelect: "none" }}>
      {/* key bottom/shadow layer */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 3,
        background: isSpecial
          ? "linear-gradient(180deg,#949088 0%,#7e7870 100%)"
          : "linear-gradient(180deg,#9a948c 0%,#848078 100%)",
        boxShadow: "0 0 0 0.5px rgba(0,0,0,0.35)",
      }}/>
      {/* key top cap */}
      <div style={{
        position: "absolute",
        inset: 0,
        bottom: isPressed ? 0 : 3,
        top: isPressed ? 3 : 0,
        borderRadius: 3,
        background: isPressed
          ? (isSpecial ? "#b4b0a8" : "#c4c0b8")
          : (isSpecial
            ? "linear-gradient(155deg,#d0ccbe 0%,#c0bcb4 60%,#b8b4ac 100%)"
            : "linear-gradient(155deg,#e0dcd2 0%,#d0ccbf 55%,#c4c0b8 100%)"),
        boxShadow: isPressed
          ? "inset 0 1px 2px rgba(0,0,0,0.22), inset 0 0 4px rgba(0,0,0,0.1)"
          : "inset 0 1px 0 rgba(255,255,255,0.72), inset 1px 0 0 rgba(255,255,255,0.3), inset -1px 0 0 rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "bottom 0.06s ease, top 0.06s ease, background 0.05s",
      }}>
        {!isBlank && (
          <span style={{
            fontSize: label.length > 4 ? 5 : label.length > 2 ? 6.5 : 8,
            color: isPressed ? "#2a2820" : "#383430",
            fontFamily: "'Courier New',monospace",
            fontWeight: 700,
            letterSpacing: "0em",
            textShadow: isPressed ? "none" : "0 0.5px 0 rgba(255,255,255,0.5)",
            lineHeight: 1,
            pointerEvents: "none",
          }}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
 *  MAIN COMPONENT
 * ══════════════════════════════════════════════════════════════ */
export default function RetroComputerContact() {
  const [bootPhase,    setBootPhase]    = useState(0);
  const [bootLines,    setBootLines]    = useState<{text:string;color:string;delay:number}[]>([]);
  const [bootPct,      setBootPct]      = useState(0);
  const [formData,     setFormData]     = useState({ name:"",email:"",phone:"",message:"" });
  const [focused,      setFocused]      = useState<string|null>(null);
  const [pressedKeys,  setPressedKeys]  = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitOk,     setSubmitOk]     = useState(false);
  const [charCount,    setCharCount]    = useState(0);
  const [countryCode,  setCountryCode]  = useState("IN");
  const [flicker,      setFlicker]      = useState(false);
  const [hddBlink,     setHddBlink]     = useState(false);
  const [capsOn,       setCapsOn]       = useState(false);

  const keyTimers    = useRef(new Map());
  const successTimer = useRef<ReturnType<typeof setTimeout>|null>(null);

  /* boot sequence */
  useEffect(() => {
    BOOT_SEQUENCE.forEach((msg, i) => {
      setTimeout(() => {
        setBootLines(p => [...p, msg]);
        setBootPct(Math.round(((i + 1) / BOOT_SEQUENCE.length) * 100));
      }, msg.delay);
    });
    setTimeout(() => setBootPhase(1), 2700);
  }, []);

  /* CRT flicker */
  useEffect(() => {
    const iv = setInterval(() => {
      if (Math.random() < 0.04) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 70 + Math.random() * 60);
      }
    }, 3800);
    return () => clearInterval(iv);
  }, []);

  /* HDD activity LED */
  useEffect(() => {
    const fast = () => setInterval(() => setHddBlink(p => !p), 160);
    const slow = () => setInterval(() => {
      if (Math.random() < 0.12) {
        setHddBlink(true);
        setTimeout(() => setHddBlink(false), 60 + Math.random() * 90);
      }
    }, 500);
    let iv = bootPhase === 0 ? fast() : slow();
    return () => clearInterval(iv);
  }, [bootPhase]);

  useEffect(() => () => {
    keyTimers.current.forEach(t => clearTimeout(t));
    if (successTimer.current) clearTimeout(successTimer.current);
  }, []);

  const handleKeyPress = useCallback((rawKey: string) => {
    const k = rawKey.toLowerCase();
    if (rawKey === "CapsLock") setCapsOn(p => !p);
    setPressedKeys(prev => new Set([...prev, k]));
    const ex = keyTimers.current.get(k);
    if (ex) clearTimeout(ex);
    const t = setTimeout(() => {
      setPressedKeys(prev => { const n = new Set(prev); n.delete(k); return n; });
      keyTimers.current.delete(k);
    }, 160);
    keyTimers.current.set(k, t);
  }, []);

  const dialCode = COUNTRY_CODES.find(c => c.code === countryCode)?.dial ?? "+1";
  const kp = (k: string) => pressedKeys.has(k.toLowerCase());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setIsSubmitting(true);
    const fullPhone = formData.phone ? `${dialCode} ${formData.phone}` : "";
    try {
      const sid = process.env?.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const tid = process.env?.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const pk  = process.env?.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (sid && tid && pk) {
        const ejs = await import("@emailjs/browser");
        await ejs.send(sid, tid, { from_name:formData.name, from_email:formData.email, phone:fullPhone, message:formData.message }, pk);
      } else {
        const body = `${formData.message}\n\nFrom: ${formData.email}${fullPhone ? `\nPhone: ${fullPhone}` : ""}`;
        window.location.href = `mailto:anbumalligarjun1@gmail.com?subject=${encodeURIComponent("Contact from "+formData.name)}&body=${encodeURIComponent(body)}`;
      }
    } catch {
      const body = `${formData.message}\n\nFrom: ${formData.email}${fullPhone ? `\nPhone: ${fullPhone}` : ""}`;
      window.location.href = `mailto:anbumalligarjun1@gmail.com?subject=${encodeURIComponent("Contact from "+formData.name)}&body=${encodeURIComponent(body)}`;
    }
    setIsSubmitting(false);
    setSubmitOk(true);
    successTimer.current = setTimeout(() => {
      setSubmitOk(false);
      setFormData({ name:"",email:"",phone:"",message:"" });
      setCharCount(0);
    }, 3500);
  };

  const inp = (field: string): React.CSSProperties => ({
    width:"100%", height:22, padding:"0 7px", boxSizing:"border-box",
    background: focused===field ? "rgba(4,14,40,0.98)" : "rgba(2,8,26,0.92)",
    border: `1px solid ${focused===field ? "rgba(96,165,250,0.7)" : "rgba(60,140,200,0.22)"}`,
    borderRadius: 2, color:"#d8eeff", fontSize:10,
    fontFamily:"'Courier New',monospace", outline:"none",
    boxShadow: focused===field
      ? "0 0 0 2px rgba(96,165,250,0.1), inset 0 1px 4px rgba(0,0,0,0.55)"
      : "inset 0 1px 4px rgba(0,0,0,0.5)",
    transition:"border-color 0.18s, background 0.18s",
  });

  const lbl = {
    display:"flex", alignItems:"center", gap:4, fontSize:7,
    letterSpacing:"0.14em", color:"#5b9de8", marginBottom:2,
    fontFamily:"'Courier New',monospace", fontWeight:700, textTransform:"uppercase",
  };

  /* ─── plastic bevel helper ─── */
  const plasticBox = (extra = {}) => ({
    background:"linear-gradient(155deg,#ddd8c4 0%,#cac4b0 35%,#bcb8a4 68%,#b4ae9e 100%)",
    boxShadow:`
      inset 0 1px 0 rgba(255,255,255,0.55),
      inset 1px 0 0 rgba(255,255,255,0.28),
      inset -1px 0 0 rgba(0,0,0,0.14),
      inset 0 -1px 0 rgba(0,0,0,0.18),
      0 0 0 1px rgba(0,0,0,0.22)
    `,
    ...extra,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        @keyframes crt-scan   { from{top:-3px} to{top:102%} }
        @keyframes blink-cur  { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes pwr-glow   { 0%,100%{box-shadow:0 0 4px 1px rgba(34,220,68,.5)} 50%{box-shadow:0 0 9px 3px rgba(34,220,68,.9)} }
        @keyframes fade-up    { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin        { to{transform:rotate(360deg)} }
        @keyframes screen-on  { 0%{opacity:0;filter:brightness(4)} 15%{opacity:1;filter:brightness(1.4)} 30%{opacity:.6;filter:brightness(0.8)} 55%{opacity:.95;filter:brightness(1.1)} 100%{opacity:1;filter:brightness(1)} }
        @keyframes dot-blink  { 0%,100%{opacity:.15} 50%{opacity:1} }
        @keyframes float-desk { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        @keyframes contact-title-pulse { 0%{opacity:0;letter-spacing:0.55em} 18%{opacity:1;letter-spacing:0.45em} 72%{opacity:0.85;letter-spacing:0.45em} 88%{opacity:0.05;letter-spacing:0.5em} 100%{opacity:0;letter-spacing:0.55em} }
        ::placeholder { color:rgba(120,150,190,0.25)!important; }
        .ri { outline:none!important; }
        .ri:focus { outline:none!important; }
        .rb { transition:filter .15s,transform .1s,box-shadow .15s; }
        .rb:hover:not(:disabled){ filter:brightness(1.14); transform:translateY(-1px); box-shadow:0 5px 18px rgba(80,80,220,.5)!important; }
        .rb:active:not(:disabled){ transform:translateY(1px); }
      `}</style>

      {/* ── OUTER SCENE ───────────────────────────────────────── */}
      <div style={{
        width:"100%", minHeight:820, position:"relative", overflow:"hidden",
        background:"radial-gradient(ellipse at 50% 30%, #1e1c18 0%, #14120e 55%, #0c0a08 100%)",
        display:"flex", flexDirection:"column", alignItems:"center",
        justifyContent:"center", padding:"60px 16px 20px",
        fontFamily:"'Courier New',monospace",
      }}>

        {/* ── CONTACT ME TITLE ───────────────────────────────── */}
        <div style={{
          position:"absolute", top:28, left:0, right:0,
          display:"flex", flexDirection:"column", alignItems:"center", gap:6,
          pointerEvents:"none", zIndex:10,
        }}>
          <span style={{
            fontSize:"clamp(18px, 3vw, 32px)",
            fontFamily:"'VT323', 'Courier New', monospace",
            fontWeight:400,
            letterSpacing:"0.45em",
            color:"rgba(68,255,136,0.9)",
            textTransform:"uppercase",
            animation:"contact-title-pulse 5s ease-in-out infinite",
            textShadow:"0 0 18px rgba(68,255,136,0.55), 0 0 40px rgba(68,255,136,0.25)",
          }}>CONTACT ME</span>
          <div style={{
            width:"clamp(60px, 8vw, 120px)", height:1,
            background:"linear-gradient(90deg, transparent, rgba(68,255,136,0.4), transparent)",
            animation:"contact-title-pulse 5s ease-in-out infinite",
          }}/>
        </div>

        {/* room wall — subtle warm gradient */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,rgba(40,36,28,.55) 0%,rgba(22,20,16,.55) 48%,rgba(14,12,8,.8) 100%)", pointerEvents:"none" }}/>

        {/* desk surface */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"36%",
          background:"linear-gradient(180deg,#2a2418 0%,#221e14 40%,#1a1610 100%)",
          boxShadow:"inset 0 1px 0 rgba(255,255,255,0.04)", pointerEvents:"none" }}/>
        {/* desk edge */}
        <div style={{ position:"absolute", bottom:"36%", left:0, right:0, height:2,
          background:"linear-gradient(90deg,transparent,rgba(255,255,255,.05) 20%,rgba(255,255,255,.09) 50%,rgba(255,255,255,.05) 80%,transparent)",
          pointerEvents:"none" }}/>
        {/* desk grain texture */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"36%", opacity:.18,
          backgroundImage:"repeating-linear-gradient(90deg,transparent,transparent 3px,rgba(255,255,255,.015) 3px,rgba(255,255,255,.015) 4px)",
          pointerEvents:"none" }}/>
        {/* ambient floor glow */}
        <div style={{ position:"absolute", bottom:0, left:"30%", right:"30%", height:80,
          background:"radial-gradient(ellipse,rgba(200,185,150,.04) 0%,transparent 70%)", pointerEvents:"none" }}/>

        {/* ══════════════════════════════════════════════════════
         *  SETUP ROW: Tower + Monitor
         * ════════════════════════════════════════════════════ */}
        <div style={{ display:"flex", alignItems:"flex-end", gap:14, marginBottom:12, animation:"float-desk 9s ease-in-out infinite" }}>

          {/* ── DESKTOP TOWER CASE ─────────────────────────── */}
          <div style={{ width:100, height:252, flexShrink:0, position:"relative", borderRadius:"5px 5px 3px 3px",
            ...plasticBox({ background:"linear-gradient(170deg,#d8d2be 0%,#c8c2ae 28%,#bcb6a2 60%,#b2ac9c 100%)" }),
            boxShadow:`
              inset 0 1px 0 rgba(255,255,255,0.55), inset 1px 0 0 rgba(255,255,255,0.28),
              inset -2px 0 0 rgba(0,0,0,0.22), inset 0 -1px 0 rgba(0,0,0,0.25),
              3px 3px 0 rgba(0,0,0,0.25), 5px 5px 14px rgba(0,0,0,.65),
              0 12px 36px rgba(0,0,0,.75)
            `,
          }}>
            {/* top bevel highlight */}
            <div style={{ position:"absolute", top:0, left:3, right:3, height:7, borderRadius:"5px 5px 0 0",
              background:"linear-gradient(180deg,rgba(255,255,255,0.35) 0%,transparent 100%)", pointerEvents:"none" }}/>

            {/* brand strip */}
            <div style={{ position:"absolute", top:10, left:0, right:0, padding:"0 8px", display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
              <span style={{ fontSize:7, fontWeight:700, letterSpacing:"0.2em", color:"rgba(50,45,35,.55)", fontFamily:"'Courier New',monospace", textTransform:"uppercase" }}>RETRO SYS</span>
              <span style={{ fontSize:5, color:"rgba(50,45,35,.3)", letterSpacing:"0.12em" }}>RS-PC486</span>
            </div>

            {/* power button panel */}
            <div style={{ position:"absolute", top:36, left:8, right:8, display:"flex", flexDirection:"column", gap:5, alignItems:"center" }}>
              {/* large power button */}
              <div style={{ width:44, height:14, borderRadius:2, position:"relative",
                background:"linear-gradient(180deg,#a8a49a 0%,#949088 100%)",
                boxShadow:"0 2.5px 0 rgba(0,0,0,.35), 0 0 0 0.5px rgba(0,0,0,.3), inset 0 1px rgba(255,255,255,.3)",
                display:"flex", alignItems:"center", justifyContent:"center", cursor:"default" }}>
                <span style={{ fontSize:5.5, color:"rgba(255,255,255,.3)", letterSpacing:"0.1em", fontFamily:"'Courier New',monospace" }}>POWER</span>
              </div>
              {/* reset button */}
              <div style={{ width:24, height:7, borderRadius:1.5,
                background:"linear-gradient(180deg,#b0aca2 0%,#9e9a90 100%)",
                boxShadow:"0 1.5px 0 rgba(0,0,0,.3), inset 0 1px rgba(255,255,255,.25)",
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:4.5, color:"rgba(255,255,255,.22)", letterSpacing:"0.08em" }}>RESET</span>
              </div>
              {/* LED indicators */}
              <div style={{ display:"flex", gap:6, alignItems:"center", marginTop:1 }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                  <div style={{ width:7, height:7, borderRadius:"50%",
                    background: bootPhase===1 ? "#22dd44" : "#cc8800",
                    boxShadow: bootPhase===1 ? "0 0 7px 2px rgba(34,220,68,.7)" : "0 0 5px rgba(200,130,0,.4)",
                    animation: bootPhase===1 ? "pwr-glow 2.8s ease-in-out infinite" : "none",
                    border: "0.5px solid rgba(0,0,0,0.25)"
                  }}/>
                  <span style={{ fontSize:4.5, color:"rgba(50,45,35,.4)", letterSpacing:"0.08em" }}>PWR</span>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                  <div style={{ width:7, height:7, borderRadius:"50%",
                    background: hddBlink ? "#e8a000" : "#1a1812",
                    boxShadow: hddBlink ? "0 0 6px rgba(232,160,0,.8)" : "none",
                    border: "0.5px solid rgba(0,0,0,0.25)",
                    transition:"background .05s, box-shadow .05s"
                  }}/>
                  <span style={{ fontSize:4.5, color:"rgba(50,45,35,.4)", letterSpacing:"0.08em" }}>HDD</span>
                </div>
              </div>
            </div>

            {/* drive bays area */}
            <div style={{ position:"absolute", top:124, left:7, right:7, display:"flex", flexDirection:"column", gap:5 }}>
              {/* 3.5" floppy */}
              <div style={{ height:20, borderRadius:2, position:"relative", overflow:"hidden",
                background:"linear-gradient(180deg,#aaa49a 0%,#98928a 100%)",
                boxShadow:"inset 0 1.5px rgba(255,255,255,.15), inset 0 -1px rgba(0,0,0,.25), 0 0 0 0.5px rgba(0,0,0,.3)" }}>
                {/* disk slot */}
                <div style={{ position:"absolute", top:"50%", left:5, right:14, height:2, transform:"translateY(-50%)",
                  background:"rgba(0,0,0,.35)", borderRadius:1 }}/>
                {/* eject button */}
                <div style={{ position:"absolute", right:4, top:"50%", transform:"translateY(-50%)",
                  width:8, height:8, borderRadius:1,
                  background:"linear-gradient(180deg,#b0aa9e 0%,#9e9890 100%)",
                  boxShadow:"0 1px 0 rgba(0,0,0,.3), inset 0 1px rgba(255,255,255,.2)" }}/>
                {/* floppy LED */}
                <div style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)",
                  width:4, height:4, borderRadius:"50%",
                  background: hddBlink && bootPhase===0 ? "#22cc44" : "#1a1812",
                  border:"0.5px solid rgba(0,0,0,.3)" }}/>
              </div>
              {/* CD-ROM */}
              <div style={{ height:24, borderRadius:2, position:"relative", overflow:"hidden",
                background:"linear-gradient(180deg,#b4aea2 0%,#a09a8e 100%)",
                boxShadow:"inset 0 1.5px rgba(255,255,255,.12), inset 0 -1px rgba(0,0,0,.2), 0 0 0 0.5px rgba(0,0,0,.28)" }}>
                <div style={{ position:"absolute", top:"50%", left:5, right:20, height:1, transform:"translateY(-50%)", background:"rgba(0,0,0,.18)" }}/>
                {/* tray line */}
                <div style={{ position:"absolute", top:"50%", left:5, right:20, height:4, transform:"translateY(-50%)",
                  border:"0.5px solid rgba(0,0,0,.12)", borderRadius:1 }}/>
                {/* play button */}
                <div style={{ position:"absolute", right:5, top:"50%", transform:"translateY(-50%)",
                  width:13, height:9, borderRadius:1,
                  background:"linear-gradient(180deg,#a8a29a 0%,#959088 100%)",
                  boxShadow:"0 1px 0 rgba(0,0,0,.28), inset 0 1px rgba(255,255,255,.18)",
                  display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:5, color:"rgba(255,255,255,.3)" }}>▶</span>
                </div>
              </div>
              {/* 2 blank bay covers */}
              {[0,1].map(i => (
                <div key={i} style={{ height:16, borderRadius:2,
                  background:"linear-gradient(180deg,#c8c4b4 0%,#b8b4a4 100%)",
                  boxShadow:"inset 0 1px rgba(255,255,255,.22), inset 0 -0.5px rgba(0,0,0,.15), 0 0 0 0.5px rgba(0,0,0,.2)" }}>
                  <div style={{ marginLeft:6, marginTop:6, width:40, height:1, background:"rgba(0,0,0,.1)" }}/>
                </div>
              ))}
            </div>

            {/* ventilation slots — right side */}
            <div style={{ position:"absolute", right:4, top:36, width:5, bottom:28,
              display:"flex", flexDirection:"column", justifyContent:"space-around" }}>
              {[...Array(16)].map((_,i) => (
                <div key={i} style={{ height:1, background:"rgba(0,0,0,0.22)", borderRadius:1 }}/>
              ))}
            </div>
            {/* ventilation slots — left */}
            <div style={{ position:"absolute", left:4, top:36, width:4, bottom:28,
              display:"flex", flexDirection:"column", justifyContent:"space-around" }}>
              {[...Array(16)].map((_,i) => (
                <div key={i} style={{ height:1, background:"rgba(0,0,0,0.14)", borderRadius:1 }}/>
              ))}
            </div>

            {/* bottom model sticker */}
            <div style={{ position:"absolute", bottom:8, left:"50%", transform:"translateX(-50%)", textAlign:"center" }}>
              <div style={{ fontSize:4.5, color:"rgba(50,45,35,.38)", letterSpacing:"0.1em" }}>486DX2-66MHz</div>
            </div>
          </div>

          {/* ── CRT MONITOR ───────────────────────────────────── */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
            {/* MONITOR HOUSING */}
            <div style={{ width:476, height:390, position:"relative", borderRadius:"9px 9px 14px 14px",
              background:"linear-gradient(160deg,#dddaca 0%,#ccc8b4 25%,#c0bcaa 58%,#b4b09e 100%)",
              boxShadow:`
                inset 0 2px 0 rgba(255,255,255,0.55),
                inset 2px 0 0 rgba(255,255,255,0.28),
                inset -3px 0 0 rgba(0,0,0,0.2),
                inset 0 -2px 0 rgba(0,0,0,0.22),
                0 0 0 1px rgba(0,0,0,0.28),
                6px 6px 0 rgba(0,0,0,0.18),
                8px 8px 22px rgba(0,0,0,.65),
                0 22px 70px rgba(0,0,0,.85)
              `,
              zIndex:2,
            }}>
              {/* top-left plastic sheen */}
              <div style={{ position:"absolute", top:0, left:0, width:"44%", height:"42%",
                background:"linear-gradient(145deg,rgba(255,255,255,.22) 0%,transparent 52%)",
                borderRadius:"9px 0 0 0", pointerEvents:"none" }}/>
              {/* CRT depth illusion — right side dark panel */}
              <div style={{ position:"absolute", top:6, right:-10, width:14, bottom:14, borderRadius:"0 4px 4px 0",
                background:"linear-gradient(90deg,#a8a498 0%,#72706a 100%)",
                boxShadow:"2px 0 10px rgba(0,0,0,.5)", zIndex:0 }}/>
              {/* CRT depth illusion — left side */}
              <div style={{ position:"absolute", top:6, left:-10, width:14, bottom:14, borderRadius:"4px 0 0 4px",
                background:"linear-gradient(270deg,#b4b0a4 0%,#7e7c76 100%)", zIndex:0 }}/>
              {/* bottom depth */}
              <div style={{ position:"absolute", bottom:-8, left:8, right:8, height:14, borderRadius:"0 0 8px 8px",
                background:"linear-gradient(180deg,#9e9a8e 0%,#6e6c66 100%)", zIndex:0,
                boxShadow:"0 4px 10px rgba(0,0,0,.5)" }}/>

              {/* ── SCREEN RECESS ── */}
              <div style={{ position:"absolute", top:18, left:24, right:24, bottom:70, borderRadius:5,
                background:"#08080a",
                boxShadow:"inset 0 0 0 1.5px #060608, inset 0 0 50px rgba(0,0,0,.95), inset 0 4px 12px rgba(0,0,0,.8)",
                overflow:"hidden", zIndex:1 }}>

                {/* ── CRT GLASS SURFACE ── */}
                {/* convex specular highlight */}
                <div style={{ position:"absolute", inset:0, zIndex:12, pointerEvents:"none",
                  background:"radial-gradient(ellipse at 38% 32%, rgba(255,255,255,.085) 0%, rgba(255,255,255,.03) 32%, transparent 58%)" }}/>
                {/* edge darkening */}
                <div style={{ position:"absolute", inset:0, zIndex:11, pointerEvents:"none",
                  background:"radial-gradient(ellipse at 50% 50%, transparent 52%, rgba(0,0,0,.62) 100%)" }}/>
                {/* scanlines */}
                <div style={{ position:"absolute", inset:0, zIndex:10, pointerEvents:"none",
                  backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.065) 2px,rgba(0,0,0,.065) 3px)" }}/>
                {/* moving scan line */}
                <div style={{ position:"absolute", left:0, right:0, height:2, zIndex:10, pointerEvents:"none",
                  background:"linear-gradient(90deg,transparent,rgba(79,184,232,.042) 50%,transparent)",
                  animation:"crt-scan 14s linear infinite" }}/>

                {/* flicker overlay */}
                {flicker && <div style={{ position:"absolute", inset:0, zIndex:13, pointerEvents:"none",
                  background:"rgba(255,255,255,.032)" }}/>}

                {/* ── SCREEN CONTENT ── */}
                <div style={{ position:"relative", height:"100%", zIndex:5, opacity:flicker?.88:1 }}>

                  {/* BOOT SCREEN */}
                  {bootPhase === 0 && (
                    <div style={{ height:"100%", background:"#000", padding:"16px 18px 24px",
                      display:"flex", flexDirection:"column", gap:0,
                      animation:"screen-on .55s ease-out both" }}>
                      {bootLines.map((line,i) => (
                        <div key={i} style={{ fontSize:9.5, color:line.color||"#aaa",
                          fontFamily:"'Courier New',monospace", lineHeight:1.52,
                          animation:"fade-up .18s ease-out both", animationDelay:`${i*15}ms` }}>
                          {line.text || "\u00a0"}
                          {i===bootLines.length-1 && line.text &&
                            <span style={{ animation:"blink-cur .65s infinite" }}>█</span>}
                        </div>
                      ))}
                      {/* BIOS progress bar */}
                      <div style={{ position:"absolute", bottom:12, left:18, right:18 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                          <span style={{ fontSize:7.5, color:"rgba(255,255,255,.3)", fontFamily:"'Courier New',monospace" }}>Loading system...</span>
                          <span style={{ fontSize:7.5, color:"rgba(255,255,255,.3)", fontFamily:"'Courier New',monospace" }}>{bootPct}%</span>
                        </div>
                        <div style={{ height:3, background:"rgba(255,255,255,.07)", borderRadius:2 }}>
                          <div style={{ height:"100%", width:`${bootPct}%`, borderRadius:2,
                            background:"linear-gradient(90deg,#1a7acc,#22dd88)", transition:"width .3s ease" }}/>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUCCESS SCREEN */}
                  {bootPhase===1 && submitOk && (
                    <div style={{ height:"100%", background:"linear-gradient(145deg,#020a18,#080f20 55%,#04091a)",
                      display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                      animation:"fade-up .4s ease-out both" }}>
                      <div style={{ fontSize:44, color:"#44ff88", marginBottom:12, lineHeight:1 }}>✦</div>
                      <div style={{ fontSize:14, fontWeight:800, color:"#4ade80", letterSpacing:"0.18em",
                        fontFamily:"'Courier New',monospace", marginBottom:6 }}>TRANSMITTED</div>
                      <div style={{ fontSize:9, color:"rgba(255,255,255,.35)", fontFamily:"'Courier New',monospace",
                        letterSpacing:"0.1em" }}>Message received · Will respond shortly</div>
                      <div style={{ display:"flex", gap:8, marginTop:20 }}>
                        {[0,1,2].map(i => (
                          <div key={i} style={{ width:8, height:8, borderRadius:"50%", background:"#4ade80",
                            animation:`dot-blink 1.2s ${i*.38}s infinite` }}/>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CONTACT FORM */}
                  {bootPhase===1 && !submitOk && (
                    <div style={{ height:"100%", display:"flex", flexDirection:"column",
                      background:"linear-gradient(148deg,#020a18 0%,#060e1e 55%,#040910 100%)",
                      animation:"screen-on .6s ease-out both" }}>

                      {/* top accent */}
                      <div style={{ height:2, flexShrink:0,
                        background:"linear-gradient(90deg,transparent,#2563eb 25%,#7c3aed 75%,transparent)" }}/>

                      {/* header bar */}
                      <div style={{ padding:"5px 14px 4px", flexShrink:0, display:"flex",
                        alignItems:"center", justifyContent:"space-between",
                        borderBottom:"1px solid rgba(59,130,246,.1)" }}>
                        <div style={{ display:"flex", gap:5 }}>
                          {["#ff5f57","#febc2e","#28c840"].map((c,i) => (
                            <div key={i} style={{ width:7,height:7,borderRadius:"50%",background:c,
                              boxShadow:`0 0 6px ${c}99` }}/>
                          ))}
                        </div>
                        <span style={{ fontSize:7, letterSpacing:"0.2em",
                          color:"rgba(148,163,184,.5)", fontFamily:"'Courier New',monospace" }}>
                          SECURE CHANNEL
                        </span>
                        <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                          <div style={{ width:6,height:6,borderRadius:"50%",background:"#4ade80",
                            boxShadow:"0 0 7px rgba(74,222,128,.8)" }}/>
                          <span style={{ fontSize:7,color:"rgba(74,222,128,.85)",
                            fontFamily:"'Courier New',monospace",letterSpacing:"0.1em" }}>LIVE</span>
                        </div>
                      </div>

                      {/* title */}
                      <div style={{ textAlign:"center", padding:"5px 14px 3px", flexShrink:0 }}>
                        <div style={{ fontSize:13.5, fontWeight:800, letterSpacing:"0.05em", lineHeight:1.2,
                          background:"linear-gradient(90deg,#60a5fa,#818cf8,#a78bfa)",
                          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                          CONTACT TERMINAL
                          <span style={{ animation:"blink-cur 1s infinite",
                            WebkitTextFillColor:"#60a5fa", fontWeight:300 }}>▌</span>
                        </div>
                        <div style={{ fontSize:6.5, color:"rgba(100,116,139,.55)",
                          letterSpacing:"0.18em", marginTop:1, fontFamily:"'Courier New',monospace" }}>
                          v2.4.1 — ENCRYPTED
                        </div>
                      </div>

                      {/* form */}
                      <form onSubmit={handleSubmit} style={{ flex:1, display:"flex", flexDirection:"column",
                        padding:"4px 14px 8px", gap:4, minHeight:0 }}>

                        {/* name + email */}
                        <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                          <div style={{ flex:1 }}>
                            <div style={lbl}>◈ IDENTIFIER</div>
                            <input className="ri" type="text" required value={formData.name}
                              onChange={e=>setFormData(p=>({...p,name:e.target.value}))}
                              onKeyDown={e=>{e.stopPropagation();handleKeyPress(e.key);}}
                              onFocus={()=>setFocused("name")} onBlur={()=>setFocused(null)}
                              placeholder="Full name" style={inp("name")}/>
                          </div>
                          <div style={{ flex:1 }}>
                            <div style={lbl}>◈ COMM CHANNEL</div>
                            <input className="ri" type="email" required value={formData.email}
                              onChange={e=>setFormData(p=>({...p,email:e.target.value}))}
                              onKeyDown={e=>{e.stopPropagation();handleKeyPress(e.key);}}
                              onFocus={()=>setFocused("email")} onBlur={()=>setFocused(null)}
                              placeholder="your@email.com" style={inp("email")}/>
                          </div>
                        </div>

                        {/* phone */}
                        <div style={{ flexShrink:0 }}>
                          <div style={lbl}>◈ SIGNAL LINE</div>
                          <div style={{ display:"flex", gap:4 }}>
                            <select className="ri" value={countryCode}
                              onChange={e=>setCountryCode(e.target.value)}
                              onFocus={()=>setFocused("cc")} onBlur={()=>setFocused(null)}
                              style={{ height:22, background:focused==="cc"?"rgba(4,14,40,.98)":"rgba(2,8,26,.92)",
                                border:`1px solid ${focused==="cc"?"rgba(96,165,250,.7)":"rgba(60,140,200,.22)"}`,
                                borderRadius:2, color:"#88bbee", fontSize:8.5,
                                fontFamily:"'Courier New',monospace", fontWeight:700,
                                padding:"0 3px", outline:"none", appearance:"none",
                                width:62, textAlign:"center", cursor:"pointer", boxSizing:"border-box",
                              }}>
                              {COUNTRY_CODES.map(c=>(
                                <option key={c.code} value={c.code}
                                  style={{ background:"#040c1e",color:"#e2edff" }}>
                                  {c.code} {c.dial}
                                </option>
                              ))}
                            </select>
                            <div style={{ height:22,display:"flex",alignItems:"center",padding:"0 6px",
                              background:"rgba(80,140,200,.09)",border:"1px solid rgba(60,140,200,.22)",
                              borderRadius:2,color:"#5b9de8",fontSize:8.5,
                              fontFamily:"'Courier New',monospace",fontWeight:700,
                              flexShrink:0,minWidth:30,justifyContent:"center" }}>{dialCode}</div>
                            <input className="ri" type="tel" value={formData.phone}
                              onChange={e=>setFormData(p=>({...p,phone:e.target.value.replace(/[^\d\s\-().+]/g,"")}))}
                              onKeyDown={e=>{e.stopPropagation();handleKeyPress(e.key);}}
                              onFocus={()=>setFocused("phone")} onBlur={()=>setFocused(null)}
                              placeholder="(555) 000-0000" style={{...inp("phone"),flex:1}}/>
                          </div>
                        </div>

                        {/* message */}
                        <div style={{ flex:1,display:"flex",flexDirection:"column",minHeight:0 }}>
                          <div style={{ ...lbl,justifyContent:"space-between" }}>
                            <span>◈ MESSAGE</span>
                            <span style={{ color:charCount>180?"#f87171":"rgba(100,116,139,.5)" }}>
                              {charCount}/200
                            </span>
                          </div>
                          <textarea className="ri" required value={formData.message}
                            onChange={e=>{const v=e.target.value.slice(0,200);setFormData(p=>({...p,message:v}));setCharCount(v.length);}}
                            onKeyDown={e=>{e.stopPropagation();handleKeyPress(e.key);}}
                            onFocus={()=>setFocused("msg")} onBlur={()=>setFocused(null)}
                            placeholder="Write your message here..."
                            style={{...inp("msg"),height:"auto",flex:1,minHeight:44,
                              padding:"5px 7px",resize:"none",lineHeight:1.58}}/>
                        </div>

                        {/* submit */}
                        <button className="rb" type="submit" disabled={isSubmitting} style={{
                          flexShrink:0,height:26,width:"100%",cursor:isSubmitting?"not-allowed":"pointer",
                          background:isSubmitting?"rgba(37,60,160,.2)":"linear-gradient(90deg,#1e40af 0%,#5b21b6 100%)",
                          border:"1px solid rgba(99,102,241,.5)",borderRadius:3,
                          color:"#dde8ff",fontSize:9.5,fontWeight:700,
                          fontFamily:"'Courier New',monospace",letterSpacing:"0.14em",
                          display:"flex",alignItems:"center",justifyContent:"center",gap:6,
                          boxShadow:"0 2px 16px -2px rgba(99,102,241,.45)",
                        }}>
                          {isSubmitting ? (
                            <>
                              <span style={{ width:8,height:8,border:"1.5px solid rgba(255,255,255,.25)",
                                borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",
                                animation:"spin .75s linear infinite" }}/>
                              TRANSMITTING...
                            </>
                          ) : "→ SEND MESSAGE"}
                        </button>
                      </form>

                      <div style={{ height:1.5,flexShrink:0,
                        background:"linear-gradient(90deg,transparent,rgba(99,102,241,.28) 30%,rgba(139,92,246,.28) 70%,transparent)" }}/>
                    </div>
                  )}
                </div>
              </div>{/* /screen recess */}

              {/* ── BOTTOM BEZEL PANEL ── */}
              <div style={{ position:"absolute", bottom:0, left:24, right:24, height:66,
                display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 10px" }}>

                {/* brand */}
                <div>
                  <div style={{ fontSize:8, fontWeight:700, letterSpacing:"0.14em",
                    color:"rgba(55,50,40,.52)", fontFamily:"'Courier New',monospace", textTransform:"uppercase" }}>
                    RETRO SYSTEMS
                  </div>
                  <div style={{ fontSize:5.5, color:"rgba(55,50,40,.32)", letterSpacing:"0.08em", marginTop:1 }}>
                    CRT-1542S  ·  15"  ·  0.28mm
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:4 }}>
                    <div style={{ width:14, height:10, border:"0.5px solid rgba(55,50,40,.2)",
                      borderRadius:1, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ fontSize:4, color:"rgba(55,50,40,.28)", letterSpacing:"-0.01em" }}>★ ENERGY<br/>STAR</span>
                    </div>
                  </div>
                </div>

                {/* OSD controls */}
                <div style={{ display:"flex", flexDirection:"column", gap:4, alignItems:"center" }}>
                  <div style={{ display:"flex", gap:3 }}>
                    {["◀","▶","▲","▼"].map((b,i) => (
                      <div key={i} style={{ width:15,height:9,borderRadius:1.5,cursor:"default",
                        background:"linear-gradient(180deg,#b8b4a8 0%,#a8a49a 100%)",
                        border:"0.5px solid rgba(0,0,0,.22)",
                        boxShadow:"0 2px 0 rgba(0,0,0,.28), inset 0 1px rgba(255,255,255,.28)",
                        display:"flex",alignItems:"center",justifyContent:"center" }}>
                        <span style={{ fontSize:5.5, color:"rgba(50,45,38,.45)" }}>{b}</span>
                      </div>
                    ))}
                    <div style={{ width:20,height:9,borderRadius:1.5,cursor:"default",
                      background:"linear-gradient(180deg,#b8b4a8 0%,#a8a49a 100%)",
                      border:"0.5px solid rgba(0,0,0,.22)",
                      boxShadow:"0 2px 0 rgba(0,0,0,.28), inset 0 1px rgba(255,255,255,.28)",
                      display:"flex",alignItems:"center",justifyContent:"center" }}>
                      <span style={{ fontSize:5.5, color:"rgba(50,45,38,.45)" }}>MENU</span>
                    </div>
                  </div>
                </div>

                {/* power area */}
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                    <div style={{ width:6,height:6,borderRadius:"50%",
                      background:bootPhase===1?"#22dd44":"#cc8800",
                      boxShadow:bootPhase===1?"0 0 6px rgba(34,220,68,.7)":"0 0 4px rgba(200,130,0,.4)",
                      border:"0.5px solid rgba(0,0,0,.2)" }}/>
                  </div>
                  <div style={{ width:28,height:13,borderRadius:2,cursor:"default",
                    background:"linear-gradient(180deg,#a8a49a 0%,#98948c 100%)",
                    border:"0.5px solid rgba(0,0,0,.25)",
                    boxShadow:"0 2.5px 0 rgba(0,0,0,.35), inset 0 1px rgba(255,255,255,.28)",
                    display:"flex",alignItems:"center",justifyContent:"center" }}>
                    <span style={{ fontSize:7, color:"rgba(255,255,255,.3)" }}>⏻</span>
                  </div>
                </div>
              </div>

              {/* top label strip */}
              <div style={{ position:"absolute", top:6, left:"50%", transform:"translateX(-50%)",
                fontSize:5.5, color:"rgba(55,50,40,.3)", letterSpacing:"0.15em",
                fontFamily:"'Courier New',monospace" }}>RS-MULTISYNC</div>
            </div>{/* /monitor housing */}

            {/* ── TILT-SWIVEL NECK ── */}
            <div style={{ width:130, height:28, position:"relative", zIndex:1 }}>
              <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)",
                width:62, height:"100%",
                background:"linear-gradient(180deg,#b8b2a0 0%,#a0988a 55%,#908a7c 100%)",
                clipPath:"polygon(15% 0,85% 0,100% 100%,0 100%)",
                boxShadow:"inset 0 1px rgba(255,255,255,.25)" }}/>
              {/* tilt adjustment nub */}
              <div style={{ position:"absolute", top:6, left:"50%", transform:"translateX(-50%)",
                width:44, height:5, borderRadius:3,
                background:"rgba(0,0,0,.12)", boxShadow:"inset 0 1px rgba(0,0,0,.2)" }}/>
              {/* pivot dots */}
              {[-10,10].map((x,i) => (
                <div key={i} style={{ position:"absolute", top:4, left:`calc(50% + ${x}px)`,
                  width:4, height:4, borderRadius:"50%",
                  background:"rgba(0,0,0,.2)", boxShadow:"inset 0 1px rgba(0,0,0,.3)" }}/>
              ))}
            </div>

            {/* ── STAND BASE (D-shaped) ── */}
            <div style={{ position:"relative", width:240, height:20, zIndex:1,
              background:"linear-gradient(180deg,#c4be9c 0%,#a8a28a 55%,#928c78 100%)",
              borderRadius:"50% 50% 4px 4px / 100% 100% 4px 4px",
              boxShadow:"0 6px 24px rgba(0,0,0,.75), inset 0 1px rgba(255,255,255,.3), 0 0 0 0.5px rgba(0,0,0,.3)" }}>
              {/* anti-slip rubbers */}
              {[-70,-20,30].map((x,i) => (
                <div key={i} style={{ position:"absolute", bottom:2, left:`calc(50% + ${x}px)`,
                  width:16, height:3.5, borderRadius:2,
                  background:"rgba(0,0,0,.28)", boxShadow:"inset 0 1px rgba(0,0,0,.2)" }}/>
              ))}
            </div>

            {/* desk shadow glow */}
            <div style={{ width:340, height:18, marginTop:4,
              background:"radial-gradient(ellipse,rgba(200,185,155,.07) 0%,transparent 65%)",
              borderRadius:"50%" }}/>
          </div>
        </div>{/* /setup row */}

        {/* ══════════════════════════════════════════════════════
         *  KEYBOARD
         * ════════════════════════════════════════════════════ */}
        <div style={{ width:578, position:"relative", borderRadius:"5px 5px 4px 4px",
          background:"linear-gradient(160deg,#dddaca 0%,#ccc8b8 40%,#c0bc9c 70%,#b8b4a2 100%)",
          boxShadow:`
            inset 0 1.5px 0 rgba(255,255,255,0.55),
            inset 1px 0 0 rgba(255,255,255,0.24),
            inset -1px 0 0 rgba(0,0,0,0.14),
            inset 0 -1px 0 rgba(0,0,0,0.22),
            0 0 0 1px rgba(0,0,0,0.25),
            0 3px 0 rgba(0,0,0,0.22),
            0 12px 36px rgba(0,0,0,.72)
          `,
          padding:"8px 10px 11px 10px",
          boxSizing:"border-box",
        }}>
          {/* top-left sheen */}
          <div style={{ position:"absolute", top:0, left:3, right:3, height:5, borderRadius:"5px 5px 0 0",
            background:"linear-gradient(180deg,rgba(255,255,255,.38) 0%,transparent 100%)", pointerEvents:"none" }}/>

          {/* indicator LEDs + brand — top right */}
          <div style={{ position:"absolute", top:7, right:12, display:"flex", gap:8, alignItems:"flex-start" }}>
            <div style={{ fontSize:5.5, letterSpacing:"0.18em", color:"rgba(50,45,35,.38)",
              fontFamily:"'Courier New',monospace", fontWeight:700, marginRight:4, marginTop:1 }}>
              RETRO SYS
            </div>
            {[{l:"NUM",on:true},{l:"CAPS",on:capsOn},{l:"SCROLL",on:false}].map(({l,on},i) => (
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                <div style={{ width:8,height:5,borderRadius:1.5,
                  background:on?"#22dd44":"#1a1812",
                  boxShadow:on?"0 0 6px rgba(34,220,68,.7)":"inset 0 0 2px rgba(0,0,0,.5)",
                  border:"0.5px solid rgba(0,0,0,.3)" }}/>
                <span style={{ fontSize:4, color:"rgba(50,45,35,.4)", letterSpacing:"0.05em",
                  fontFamily:"'Courier New',monospace" }}>{l}</span>
              </div>
            ))}
          </div>

          {/* ── FUNCTION ROW ── */}
          <div style={{ display:"flex", gap:2.5, marginBottom:4 }}>
            <KeyCap label="Esc" width={34} isSpecial isPressed={kp("escape")}/>
            <div style={{ width:12 }}/>
            {["F1","F2","F3","F4"].map(k => <KeyCap key={k} label={k} width={30} isSpecial isPressed={kp(k.toLowerCase())}/>)}
            <div style={{ width:8 }}/>
            {["F5","F6","F7","F8"].map(k => <KeyCap key={k} label={k} width={30} isSpecial isPressed={kp(k.toLowerCase())}/>)}
            <div style={{ width:8 }}/>
            {["F9","F10","F11","F12"].map(k => <KeyCap key={k} label={k} width={30} isSpecial isPressed={kp(k.toLowerCase())}/>)}
          </div>

          {/* divider */}
          <div style={{ height:1, background:"rgba(0,0,0,.1)", marginBottom:4 }}/>

          {/* ── ALPHANUMERIC ROWS ── */}
          {[
            { keys:[["~",28,"~"],["1",28,"1"],["2",28,"2"],["3",28,"3"],["4",28,"4"],["5",28,"5"],["6",28,"6"],["7",28,"7"],["8",28,"8"],["9",28,"9"],["0",28,"0"],["-",28,"-"],["=",28,"="],["⌫",54,"backspace"]], stagger:0 },
            { keys:[["Tab",44,"tab"],["Q",28,"q"],["W",28,"w"],["E",28,"e"],["R",28,"r"],["T",28,"t"],["Y",28,"y"],["U",28,"u"],["I",28,"i"],["O",28,"o"],["P",28,"p"],["[",28,"["],["\\",28,"\\"],["]",34,"]"]], stagger:0 },
            { keys:[["Caps",52,"capslock"],["A",28,"a"],["S",28,"s"],["D",28,"d"],["F",28,"f"],["G",28,"g"],["H",28,"h"],["J",28,"j"],["K",28,"k"],["L",28,"l"],[";",28,";"],[`'`,28,"'"],["Enter",60,"enter"]], stagger:0 },
            { keys:[["Shift",70,"shift"],["Z",28,"z"],["X",28,"x"],["C",28,"c"],["V",28,"v"],["B",28,"b"],["N",28,"n"],["M",28,"m"],[",",28,","],[". ",28,"."],["/ ",28,"/"],["Shift",80,"shift"]], stagger:0 },
            { keys:[["Ctrl",48,"control"],["Alt",40,"alt"],["",190," "],["Alt",40,"alt"],["Ctrl",48,"control"]], stagger:0 },
          ].map((row, ri) => (
            <div key={ri} style={{ display:"flex", gap:2.5, marginBottom:2.5 }}>
              {row.keys.map(([label, w, mk], ki) => {
                const lbl = String(label);
                const alnum = "qwertyuiopasdfghjklzxcvbnm1234567890".includes(lbl.toLowerCase());
                return (
                  <KeyCap key={`${ri}-${ki}`}
                    label={lbl} width={Number(w)}
                    isSpecial={!alnum}
                    isPressed={kp(String(mk))}/>
                );
              })}
            </div>
          ))}

          {/* bottom rubber feet */}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:7,
            display:"flex", alignItems:"flex-end", justifyContent:"space-between", padding:"0 18px",
            pointerEvents:"none" }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ width:20, height:5, borderRadius:"1px 1px 3px 3px",
                background:"rgba(0,0,0,.22)", boxShadow:"inset 0 1px rgba(0,0,0,.15)" }}/>
            ))}
          </div>
        </div>{/* /keyboard */}

        {/* ══════════════════════════════════════════════════════
         *  BALL MOUSE
         * ════════════════════════════════════════════════════ */}
        <div style={{ position:"absolute", right:"calc(50% - 450px)", top:"50%", transform:"translateY(48px)" }}>
          {/* mousepad */}
          <div style={{ position:"absolute", top:-12, left:-20, width:104, height:116, borderRadius:8,
            background:"linear-gradient(148deg,#1e1c18 0%,#161410 100%)",
            boxShadow:"0 4px 18px rgba(0,0,0,.6), 0 0 0 0.5px rgba(255,255,255,.03)" }}/>
          {/* mouse body */}
          <div style={{ position:"relative", zIndex:1, width:60, height:92 }}>
            <div style={{ position:"absolute", inset:0,
              background:"linear-gradient(148deg,#e0dcd4 0%,#ccc8c0 50%,#beb8b0 100%)",
              borderRadius:"32px 32px 24px 24px",
              boxShadow:`
                inset 0 2px 0 rgba(255,255,255,.75),
                inset 1px 0 0 rgba(255,255,255,.35),
                inset -1px 0 0 rgba(0,0,0,.1),
                0 0 0 0.5px rgba(0,0,0,.18),
                0 8px 24px rgba(0,0,0,.55)
              ` }}>
              {/* button split seam */}
              <div style={{ position:"absolute", top:26, left:0, right:0, height:0.5,
                background:"rgba(0,0,0,.2)" }}/>
              {/* left/right divider */}
              <div style={{ position:"absolute", top:8, bottom:32, left:"50%",
                width:0.5, background:"rgba(0,0,0,.14)" }}/>
              {/* scroll ball */}
              <div style={{ position:"absolute", top:10, left:"50%", transform:"translateX(-50%)",
                width:13, height:13, borderRadius:"50%",
                background:"linear-gradient(135deg,#b0aca4 0%,#8a8680 100%)",
                boxShadow:"inset 0 1px rgba(255,255,255,.32), 0 1px 3px rgba(0,0,0,.35)",
                border:"0.5px solid rgba(0,0,0,.22)" }}>
                {/* ball groove lines */}
                <div style={{ position:"absolute", top:"50%", left:1, right:1, height:0.5,
                  background:"rgba(0,0,0,.22)", transform:"translateY(-50%)" }}/>
                <div style={{ position:"absolute", left:"50%", top:1, bottom:1, width:0.5,
                  background:"rgba(0,0,0,.22)", transform:"translateX(-50%)" }}/>
              </div>
              {/* cord hole top */}
              <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
                width:10, height:4, borderRadius:"0 0 5px 5px",
                background:"rgba(0,0,0,.15)" }}/>
              {/* ball tracking port bottom */}
              <div style={{ position:"absolute", bottom:8, left:"50%", transform:"translateX(-50%)",
                width:16, height:16, borderRadius:"50%",
                background:"rgba(0,0,0,.18)", border:"0.5px solid rgba(0,0,0,.25)" }}>
                <div style={{ position:"absolute", inset:3, borderRadius:"50%",
                  background:"rgba(0,0,0,.22)" }}/>
              </div>
              {/* brand text */}
              <div style={{ position:"absolute", bottom:28, left:0, right:0, textAlign:"center",
                fontSize:5, color:"rgba(50,45,38,.3)", letterSpacing:"0.12em",
                fontFamily:"'Courier New',monospace" }}>RS-M200</div>
            </div>
          </div>
          {/* mouse cable */}
          <svg width="44" height="60" style={{ position:"absolute", top:-60, left:9, zIndex:2, overflow:"visible" }}>
            <path d="M 16 60 Q 10 36 6 18 Q 3 4 18 0" stroke="rgba(148,140,130,.55)" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* ══════════════════════════════════════════════════════
         *  DESK ACCESSORIES
         * ════════════════════════════════════════════════════ */}
        {/* pen cup */}
        <div style={{ position:"absolute", left:"calc(50% - 420px)", top:"calc(50% + 55px)" }}>
          <div style={{ width:32, height:46, borderRadius:"4px 4px 3px 3px",
            background:"linear-gradient(180deg,#28262c 0%,#1c1a20 100%)",
            border:"0.5px solid rgba(255,255,255,.06)",
            boxShadow:"0 4px 14px rgba(0,0,0,.55)",
            position:"relative", overflow:"visible" }}>
            {/* pens */}
            {[{ x:6, h:22, r:-6, bg:"#555" }, { x:13, h:19, r:8, bg:"#7a3f10" }, { x:20, h:24, r:-3, bg:"#2a4ea0" }].map(({x,h,r,bg},i) => (
              <div key={i} style={{ position:"absolute", bottom:"100%", left:x, width:4, height:h,
                background:`linear-gradient(180deg,${bg} 0%,${bg}cc 100%)`,
                borderRadius:"1px 1px 0 0", transform:`rotate(${r}deg)`, transformOrigin:"bottom center",
                boxShadow:"0 1px 2px rgba(0,0,0,.3)" }}/>
            ))}
          </div>
        </div>
        {/* coffee coaster */}
        <div style={{ position:"absolute", left:"calc(50% - 376px)", top:"calc(50% + 100px)" }}>
          <div style={{ width:56, height:11, borderRadius:"50%",
            background:"linear-gradient(180deg,#2e2c2a 0%,#201e1c 100%)",
            boxShadow:"0 3px 8px rgba(0,0,0,.5), 0 0 0 0.5px rgba(255,255,255,.04)" }}>
            {/* ring stain */}
            <div style={{ position:"absolute", top:1, left:4, width:20, height:8, borderRadius:"50%",
              border:"0.5px solid rgba(255,255,255,.04)", opacity:.4 }}/>
          </div>
        </div>
        {/* sticky note */}
        <div style={{ position:"absolute", right:"calc(50% - 430px)", top:"calc(50% - 50px)",
          width:48, height:48, padding:4,
          background:"linear-gradient(148deg,#f5dd6a 0%,#eece48 100%)",
          boxShadow:"2px 2px 6px rgba(0,0,0,.4), inset 0 1px rgba(255,255,255,.4)",
          transform:"rotate(3deg)" }}>
          {[...Array(5)].map((_,i) => (
            <div key={i} style={{ height:1, background:"rgba(0,0,0,.12)", marginBottom:4.5, borderRadius:.5 }}/>
          ))}
        </div>

        {/* ── HUD badges ─────────────────────────────────────── */}
        <div style={{ position:"absolute", bottom:12, right:12, display:"flex", alignItems:"center", gap:5,
          background:"rgba(10,9,7,.9)", border:"0.5px solid rgba(255,255,255,.06)",
          borderRadius:5, padding:"4px 9px" }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:"#22dd44",
            boxShadow:"0 0 5px rgba(34,220,68,.5)" }}/>
          <span style={{ fontSize:8, letterSpacing:"0.18em", color:"rgba(255,255,255,.2)",
            textTransform:"uppercase", fontFamily:"'Courier New',monospace" }}>CSS · No WebGL</span>
        </div>
        <div style={{ position:"absolute", bottom:12, left:"50%", transform:"translateX(-50%)",
          background:"rgba(10,9,7,.9)", border:"0.5px solid rgba(255,255,255,.06)",
          borderRadius:16, padding:"5px 16px" }}>
          <p style={{ margin:0, fontSize:9, color:"rgba(255,255,255,.2)",
            fontFamily:"'Courier New',monospace", letterSpacing:"0.06em" }}>
            Click a field to type · Keys light up as you type
          </p>
        </div>
      </div>
    </>
  );
}
