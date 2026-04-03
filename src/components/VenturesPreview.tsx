'use client';

import Link from 'next/link';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Noto+Serif+JP:wght@300;400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');

  @keyframes vc-float-a { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
  @keyframes vc-float-b { 0%,100%{transform:translateY(-4px)} 50%{transform:translateY(-14px)} }
  @keyframes vc-float-c { 0%,100%{transform:translateY(-7px)} 50%{transform:translateY(-17px)} }
  @keyframes vc-wave    { 0%,100%{transform:translateX(0)} 50%{transform:translateX(-6px)} }
  @keyframes vc-sakura  { 0%{transform:translate(0,0) rotate(0deg);opacity:.85} 100%{transform:translate(-8px,22px) rotate(60deg);opacity:0} }
  @keyframes vc-ink     { 0%,100%{opacity:.75;transform:scale(1)} 50%{opacity:1;transform:scale(1.02)} }
  @keyframes vc-twinkle { 0%,100%{opacity:.2} 50%{opacity:.85} }
  @keyframes vc-nebula  { 0%,100%{opacity:.2} 50%{opacity:.5} }
  @keyframes vc-constell{ 0%,100%{opacity:.28} 50%{opacity:.65} }
  @keyframes vc-lamp    { 0%,100%{opacity:.85} 45%{opacity:1} 50%{opacity:.6} 55%{opacity:1} }
  @keyframes vc-psi-glow{
    0%,100%{ filter:drop-shadow(0 0 8px rgba(180,140,255,.65)) drop-shadow(0 0 28px rgba(130,80,240,.35)); }
    50%    { filter:drop-shadow(0 0 24px rgba(220,180,255,1))  drop-shadow(0 0 55px rgba(170,100,255,.75)); }
  }
  @keyframes vc-ring-cw  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes vc-ring-ccw { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }

  .vc-wrap {
    min-height:100vh; background:#080808;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    gap:28px; padding:60px 20px; font-family:'Cinzel',serif;
  }
  .vc-eyebrow {
    font-family:'Cormorant Garamond',serif; font-style:italic;
    font-size:12px; letter-spacing:.55em; color:rgba(200,146,42,.4);
    text-transform:uppercase; text-align:center;
  }
  .vc-row { display:flex; gap:52px; align-items:center; justify-content:center; flex-wrap:wrap; }
  .vc-link { text-decoration:none; display:block; flex-shrink:0; }
  .vc-card { width:252px; height:358px; position:relative; cursor:pointer; border-radius:14px; will-change:transform; }
  .vc-card svg { display:block; border-radius:14px; }
  .vc-card:not(:hover) { transition:transform .6s cubic-bezier(.16,1,.3,1), box-shadow .5s ease; }

  .vc-card-sag {
    animation:vc-float-a 6s ease-in-out infinite;
    box-shadow:0 24px 70px rgba(0,0,0,.9),0 0 0 1px rgba(200,146,42,.4),0 0 50px rgba(80,40,200,.15);
  }
  .vc-card-sag:hover {
    animation-play-state:paused;
    transform:translateY(-16px) scale(1.03)!important;
    box-shadow:0 40px 90px rgba(0,0,0,.95),0 0 0 1px rgba(245,208,122,.65),0 0 100px rgba(160,100,255,.6);
  }
  .vc-card-sci {
    animation:vc-float-b 6s ease-in-out infinite;
    box-shadow:0 24px 70px rgba(0,0,0,.9),0 0 0 1px rgba(200,146,42,.4),0 0 50px rgba(180,40,40,.12);
  }
  .vc-card-sci:hover {
    animation-play-state:paused;
    transform:translateY(-16px) scale(1.03)!important;
    box-shadow:0 40px 90px rgba(0,0,0,.95),0 0 0 1px rgba(245,208,122,.65),0 0 80px rgba(220,50,50,.35);
  }
  .vc-card-ww {
    animation:vc-float-c 6s ease-in-out infinite;
    box-shadow:0 24px 70px rgba(0,0,0,.9),0 0 0 1px rgba(200,146,42,.4),0 0 50px rgba(80,30,160,.12);
  }
  .vc-card-ww:hover {
    animation-play-state:paused;
    transform:translateY(-16px) scale(1.03)!important;
    box-shadow:0 40px 90px rgba(0,0,0,.95),0 0 0 1px rgba(245,208,122,.65),0 0 80px rgba(120,60,200,.35);
  }
  .vc-footer {
    font-family:'Cormorant Garamond',serif; font-style:italic;
    font-size:11px; color:rgba(255,255,255,.13); letter-spacing:.4em; text-align:center;
  }

  /* Rotating rings - CSS only, uses transform-box for safe origin */
  .vc-ring-outer { transform-box:fill-box; transform-origin:center; animation:vc-ring-cw 22s linear infinite; }
  .vc-ring-mid   { transform-box:fill-box; transform-origin:center; animation:vc-ring-ccw 14s linear infinite; }
`;

/* ── Shared gold gradient ── */
const GoldDef = ({ id }: { id: string }) => (
  <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%"   stopColor="#f5d07a" />
    <stop offset="50%"  stopColor="#c8922a" />
    <stop offset="100%" stopColor="#f5d07a" />
  </linearGradient>
);

/* ── Corner L-brackets ── */
const Brackets = ({ g }: { g: string }) => (
  <>
    <path d="M18,18 L44,18 L44,20 L20,20 L20,44 L18,44 Z"       fill={`url(#${g})`} />
    <path d="M234,18 L208,18 L208,20 L232,20 L232,44 L234,44 Z" fill={`url(#${g})`} />
    <path d="M18,340 L44,340 L44,338 L20,338 L20,314 L18,314 Z" fill={`url(#${g})`} />
    <path d="M234,340 L208,340 L208,338 L232,338 L232,314 L234,314 Z" fill={`url(#${g})`} />
  </>
);

/* ── Top / bottom gem medallion ── */
const Gem = ({ g, y, bg }: { g: string; y: number; bg: string }) => (
  <>
    <circle cx="126" cy={y} r="8" fill={bg} stroke={`url(#${g})`} strokeWidth="1.5" />
    <text x="126" y={y + 4} fontFamily="'Cinzel',serif" fontSize="8"
      fill={`url(#${g})`} textAnchor="middle" fontWeight="700">✦</text>
  </>
);

/* ══════════════════════════════════════════════════════
   CARD 1 · SAGITTARIUS
   Theme: The Sacred Ψ (Psi) — cosmic trident of the archer-god.
   Deep violet nebula, concentric geometric rings, star field,
   subtle constellation, golden Psi as the hero centrepiece.
══════════════════════════════════════════════════════ */
function CardSagittarius() {
  /* Every value is a literal — zero Math.random() */
  const STARS: [number, number, number, number, number][] = [
    [30,42,.8,3.2,.45],[48,28,1.0,4.8,.55],[68,38,.7,3.6,.40],[90,25,1.1,5.2,.60],
    [112,35,.8,2.9,.45],[138,28,1.0,4.1,.55],[160,38,.7,3.5,.40],[182,25,1.2,4.9,.65],
    [205,40,.9,3.8,.50],[222,30,.7,5.5,.40],[28,65,.6,4.2,.35],[218,68,.8,3.1,.45],
    [35,95,.7,4.6,.40],[220,92,.6,5.0,.35],[30,125,.8,3.3,.45],[224,120,.7,4.4,.40],
    [28,158,.6,5.1,.35],[222,155,.8,3.7,.45],[33,190,.7,4.0,.40],[220,188,.6,5.3,.35],
    [38,222,.8,3.5,.45],[215,220,.7,4.7,.40],[55,248,.6,3.9,.35],[205,245,.8,5.0,.45],
    [72,55,.6,4.8,.35],[148,30,.9,3.2,.50],[185,60,.7,5.4,.40],[96,58,.5,4.1,.30],
    [118,44,.8,3.8,.45],[175,42,.6,5.1,.35],[58,82,.6,3.4,.35],[168,80,.7,3.0,.40],
    [50,112,.5,4.3,.30],[210,108,.6,3.7,.35],[45,145,.6,5.0,.35],[215,142,.5,4.2,.30],
  ];

  /* Sagittarius teapot constellation */
  const CN: [number,number,number][] = [
    [76,205,2.8],[90,188,2.0],[103,172,2.5],[116,158,2.0],
    [130,168,1.8],[148,152,3.0],[162,170,1.8],[170,188,1.8],
    [165,208,2.2],[148,218,1.8],[130,225,1.8],[115,220,1.8],
    [98,225,1.8],[82,215,1.8],[103,162,1.5],
  ];
  const CL = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],
    [8,9],[9,10],[10,11],[11,12],[12,13],[13,0],
    [5,14],[2,14],
  ];

  /* 12 dots on outer ring — angles pre-computed */
  const outerDots = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    return { 
      x: Number((126 + 90 * Math.cos(a)).toFixed(3)), 
      y: Number((148 + 90 * Math.sin(a)).toFixed(3)) 
    };
  });
  /* 8 triangles on mid ring */
  const midDots = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    return { 
      x: Number((126 + 68 * Math.cos(a)).toFixed(3)), 
      y: Number((148 + 68 * Math.sin(a)).toFixed(3)), 
      rot: i * 45 
    };
  });

  return (
    <svg width="252" height="358" viewBox="0 0 252 358" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sg-parch" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ddd5f5" />
          <stop offset="50%"  stopColor="#cec5e8" />
          <stop offset="100%" stopColor="#bdb0dc" />
        </linearGradient>
        <linearGradient id="sg-field" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%"   stopColor="#07041c" />
          <stop offset="30%"  stopColor="#0e0828" />
          <stop offset="60%"  stopColor="#130a38" />
          <stop offset="100%" stopColor="#08041a" />
        </linearGradient>
        <GoldDef id="sg-gold" />
        <radialGradient id="sg-neb-a" cx="30%" cy="38%" r="50%">
          <stop offset="0%"   stopColor="#7040e0" stopOpacity=".30" />
          <stop offset="100%" stopColor="#000"    stopOpacity="0"   />
        </radialGradient>
        <radialGradient id="sg-neb-b" cx="72%" cy="65%" r="50%">
          <stop offset="0%"   stopColor="#204080" stopOpacity=".30" />
          <stop offset="100%" stopColor="#000"    stopOpacity="0"   />
        </radialGradient>
        <radialGradient id="sg-neb-c" cx="50%" cy="48%" r="42%">
          <stop offset="0%"   stopColor="#9030c0" stopOpacity=".14" />
          <stop offset="100%" stopColor="#000"    stopOpacity="0"   />
        </radialGradient>
        <radialGradient id="sg-halo" cx="50%" cy="41%" r="38%">
          <stop offset="0%"   stopColor="rgba(210,170,255,0.18)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)"          />
        </radialGradient>
        <filter id="sg-starglow">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="sg-psif">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="sg-clip">
          <rect x="14" y="14" width="224" height="330" rx="8" />
        </clipPath>
      </defs>

      {/* Parchment outer card */}
      <rect width="252" height="358" rx="14" fill="url(#sg-parch)" />
      <rect x="2" y="2" width="248" height="354" rx="13" fill="none" stroke="url(#sg-gold)" strokeWidth="3" />
      <rect x="5" y="5" width="242" height="348" rx="11" fill="none" stroke="rgba(200,146,42,.3)" strokeWidth=".8" />

      {/* Inner cosmos */}
      <rect x="14" y="14" width="224" height="330" rx="8" fill="url(#sg-field)" />
      <rect x="14" y="14" width="224" height="330" rx="8" fill="none" stroke="#20106a" strokeWidth="3" />
      <rect x="18" y="18" width="216" height="322" rx="6" fill="none" stroke="rgba(140,100,255,.28)" strokeWidth=".8" />

      {/* Gold corner brackets + 8-point stars */}
      <g opacity=".95">
        <Brackets g="sg-gold" />
        {([[24,24],[228,24],[24,334],[228,334]] as [number,number][]).map(([cx,cy],i) => (
          <polygon key={i} fill="url(#sg-gold)" opacity=".85"
            points={`${cx},${cy-4} ${cx+1.6},${cy-1.6} ${cx+4},${cy} ${cx+1.6},${cy+1.6} ${cx},${cy+4} ${cx-1.6},${cy+1.6} ${cx-4},${cy} ${cx-1.6},${cy-1.6}`}
          />
        ))}
      </g>

      {/* Dot bands top & bottom */}
      <g fill="none" stroke="url(#sg-gold)" strokeWidth=".7" opacity=".38">
        <line x1="50" y1="24" x2="202" y2="24" />
        {[58,78,98,118,134,154,174,194].map((x, i) => (
          <circle key={i} cx={x} cy={24} r={i % 2 === 0 ? 2 : 1.4} fill="rgba(200,146,42,.5)" />
        ))}
        <line x1="50" y1="334" x2="202" y2="334" />
        {[58,78,98,118,134,154,174,194].map((x, i) => (
          <circle key={i} cx={x} cy={334} r={i % 2 === 0 ? 2 : 1.4} fill="rgba(200,146,42,.5)" />
        ))}
      </g>

      {/* ── SCENE ── */}
      <g clipPath="url(#sg-clip)">

        {/* Nebula washes */}
        <ellipse cx="90"  cy="130" rx="120" ry="100" fill="url(#sg-neb-a)"
          style={{ animation: 'vc-nebula 7s ease-in-out infinite' }} />
        <ellipse cx="175" cy="190" rx="110" ry="90"  fill="url(#sg-neb-b)"
          style={{ animation: 'vc-nebula 9s ease-in-out infinite 2s' }} />
        <ellipse cx="126" cy="148" rx="80"  ry="80"  fill="url(#sg-neb-c)"
          style={{ animation: 'vc-nebula 5s ease-in-out infinite 1s' }} />

        {/* Stars — all literal values */}
        {STARS.map(([x, y, r, dur, op], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="white" opacity={op}
            style={{ animation: `vc-twinkle ${dur}s ease-in-out infinite ${(i * 0.37).toFixed(2)}s` }} />
        ))}

        {/* Psi halo background glow */}
        <ellipse cx="126" cy="148" rx="78" ry="78" fill="url(#sg-halo)" />

        {/* ── SACRED RINGS ── */}
        {/* Outer ring — slow clockwise */}
        <g className="vc-ring-outer">
          <circle cx="126" cy="148" r="90"
            fill="none" stroke="rgba(160,120,255,.16)" strokeWidth="1" strokeDasharray="5 7" />
          {outerDots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r="2.2" fill="rgba(200,146,42,.5)" />
          ))}
        </g>

        {/* Mid ring — counter-clockwise */}
        <g className="vc-ring-mid">
          <circle cx="126" cy="148" r="68"
            fill="none" stroke="rgba(200,146,42,.2)" strokeWidth=".8" strokeDasharray="3 5" />
          {midDots.map((d, i) => (
            <polygon key={i} fill="rgba(200,146,42,.55)"
              transform={`translate(${d.x},${d.y}) rotate(${d.rot})`}
              points="0,-3.5 2,1.5 -2,1.5"
            />
          ))}
        </g>

        {/* Inner static ring */}
        <circle cx="126" cy="148" r="48"
          fill="none" stroke="rgba(180,140,255,.18)" strokeWidth=".7" strokeDasharray="2 4" />

        {/* Four cardinal diamonds */}
        {([[126,54],[126,242],[32,148],[220,148]] as [number,number][]).map(([px, py], i) => (
          <polygon key={i} fill="url(#sg-gold)" opacity=".45"
            points={`${px},${py-5.5} ${px+3},${py} ${px},${py+5.5} ${px-3},${py}`} />
        ))}

        {/* ══ THE Ψ (PSI) ══
            Three text layers: deep blur glow → mid glow → crisp gold face
            Using font-rendered Ψ from Cinzel for max elegance.
        */}
        <g style={{ animation: 'vc-psi-glow 3.2s ease-in-out infinite' }}>
          {/* Deep purple bloom */}
          <text x="126" y="190"
            fontFamily="'Cinzel',serif" fontWeight="700" fontSize="118"
            textAnchor="middle" fill="rgba(160,100,255,0.09)"
            filter="url(#sg-psif)">Ψ</text>
          {/* Soft white glow ring */}
          <text x="126" y="190"
            fontFamily="'Cinzel',serif" fontWeight="700" fontSize="118"
            textAnchor="middle" fill="rgba(230,210,255,0.13)"
            filter="url(#sg-psif)">Ψ</text>
          {/* Gold face */}
          <text x="126" y="190"
            fontFamily="'Cinzel',serif" fontWeight="700" fontSize="118"
            textAnchor="middle" fill="url(#sg-gold)" opacity=".95">Ψ</text>
          {/* Crisp highlight stroke */}
          <text x="126" y="190"
            fontFamily="'Cinzel',serif" fontWeight="700" fontSize="118"
            textAnchor="middle" fill="none"
            stroke="rgba(250,235,150,0.28)" strokeWidth=".6">Ψ</text>
        </g>

        {/* Accent jewels at Psi arm-tips */}
        <circle cx="73"  cy="104" r="4" fill="url(#sg-gold)" opacity=".7" filter="url(#sg-starglow)" />
        <circle cx="179" cy="104" r="4" fill="url(#sg-gold)" opacity=".7" filter="url(#sg-starglow)" />
        <circle cx="126" cy="88"  r="4" fill="url(#sg-gold)" opacity=".7" filter="url(#sg-starglow)" />

        {/* Constellation — subtle, lower portion */}
        <g style={{ animation: 'vc-constell 5s ease-in-out infinite' }} opacity=".55">
          <g fill="none" stroke="rgba(160,190,255,.28)" strokeWidth=".9" strokeLinecap="round">
            {CL.map(([a, b], i) => (
              <line key={i}
                x1={CN[a][0]} y1={CN[a][1]}
                x2={CN[b][0]} y2={CN[b][1]} />
            ))}
          </g>
          {CN.map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r}
              fill={r > 2.5 ? '#c8d8ff' : 'rgba(180,210,255,.7)'}
              filter={r > 2.5 ? 'url(#sg-starglow)' : undefined} />
          ))}
        </g>

        {/* Zodiac glyph — small elegant watermark below psi */}
        <text x="126" y="245"
          fontFamily="'Cinzel',serif" fontSize="13"
          fill="rgba(200,146,42,.45)" textAnchor="middle" letterSpacing="8">♐</text>

      </g>{/* /clip */}

      {/* Bottom divider */}
      <line x1="22" y1="270" x2="230" y2="270" stroke="#20106a" strokeWidth="2" />
      <line x1="22" y1="273" x2="230" y2="273" stroke="rgba(200,146,42,.35)" strokeWidth=".7" />

      {/* Text area */}
      <rect x="22" y="272" width="208" height="52" fill="#06040e" />
      <text x="126" y="295" fontFamily="'Cinzel',serif" fontWeight="700" fontSize="16"
        fill="url(#sg-gold)" textAnchor="middle" letterSpacing="4">SAGITTARIUS</text>
      <text x="126" y="311" fontFamily="'Cormorant Garamond',serif" fontStyle="italic" fontSize="9.5"
        fill="rgba(200,146,42,.65)" textAnchor="middle" letterSpacing="1.5">The Celestial Archer</text>
      <text x="126" y="322" fontFamily="'Cinzel',serif" fontSize="7"
        fill="rgba(200,146,42,.38)" textAnchor="middle" letterSpacing="2.5">DE-EXTINCTION · BIOTECHNOLOGY</text>

      <Gem g="sg-gold" y={14}  bg="#06040e" />
      <Gem g="sg-gold" y={344} bg="#06040e" />

      {/* Corner pips */}
      <text x="24"  y="36" fontFamily="'Cinzel',serif" fontSize="11" fill="url(#sg-gold)" fontWeight="700">A</text>
      <text x="24"  y="47" fontFamily="'Cinzel',serif" fontSize="10" fill="rgba(200,146,42,.6)" textAnchor="middle">Ψ</text>
      <text x="228" y="336" fontFamily="'Cinzel',serif" fontSize="11" fill="url(#sg-gold)" fontWeight="700"
        textAnchor="end" transform="rotate(180,228,331)">A</text>
      <text x="228" y="323" fontFamily="'Cinzel',serif" fontSize="10" fill="rgba(200,146,42,.6)"
        textAnchor="middle" transform="rotate(180,228,319)">Ψ</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   CARD 2 · SAM SCITECH — Japanese Ukiyo-e
   Unchanged design. All random values replaced with literals.
══════════════════════════════════════════════════════ */
function CardSciTech() {
  const STARS: [number,number,number,number,number][] = [
    [40,50,1.0,4.2,.60],[68,40,.8,3.0,.50],[200,55,1.2,3.5,.50],
    [215,42,.8,5.0,.40],[55,80,.7,4.5,.40],[195,90,.9,3.2,.50],
  ];
  return (
    <svg width="252" height="358" viewBox="0 0 252 358" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sc-parch" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"  stopColor="#e0e8f0" /><stop offset="50%" stopColor="#d0d8e8" />
          <stop offset="100%" stopColor="#c0ccdc" />
        </linearGradient>
        <linearGradient id="sc-field" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#0a0d18" /><stop offset="40%" stopColor="#0f1828" />
          <stop offset="70%" stopColor="#1a0818" /><stop offset="100%" stopColor="#0a0510" />
        </linearGradient>
        <GoldDef id="sc-gold" />
        <linearGradient id="sc-torii" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"  stopColor="#9b2020" /><stop offset="50%" stopColor="#c0392b" />
          <stop offset="100%" stopColor="#9b2020" />
        </linearGradient>
        <radialGradient id="sc-moon" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#f0ead8" stopOpacity=".95" />
          <stop offset="70%" stopColor="#d8d0b8" stopOpacity=".6" />
          <stop offset="100%" stopColor="#b8b0a0" stopOpacity="0" />
        </radialGradient>
        <clipPath id="sc-clip"><rect x="14" y="14" width="224" height="330" rx="8" /></clipPath>
      </defs>

      <rect width="252" height="358" rx="14" fill="url(#sc-parch)" />
      <rect x="2" y="2" width="248" height="354" rx="13" fill="none" stroke="url(#sc-gold)" strokeWidth="3" />
      <rect x="5" y="5" width="242" height="348" rx="11" fill="none" stroke="rgba(200,146,42,.3)" strokeWidth=".8" />
      <rect x="14" y="14" width="224" height="330" rx="8" fill="url(#sc-field)" />
      <rect x="14" y="14" width="224" height="330" rx="8" fill="none" stroke="#1a1a3a" strokeWidth="3" />
      <rect x="18" y="18" width="216" height="322" rx="6" fill="none" stroke="rgba(100,100,180,.3)" strokeWidth=".8" />

      <g opacity=".95">
        <Brackets g="sc-gold" />
        {([[24,24],[228,24],[24,334],[228,334]] as [number,number][]).map(([cx,cy],i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="4" fill="none" stroke="url(#sc-gold)" strokeWidth="1.2" />
            <circle cx={cx} cy={cy} r="1.5" fill="url(#sc-gold)" />
          </g>
        ))}
      </g>

      {/* Seigaiha scale border */}
      <g clipPath="url(#sc-clip)" opacity=".4">
        <g fill="none" stroke="url(#sc-gold)" strokeWidth=".7">
          {[30,50,70,90,110,130,150,170,190,210].map((x, i) => (
            <path key={i} d={`M${x},38 Q${x+10},30 ${x+20},38`} />
          ))}
        </g>
      </g>

      <circle cx="126" cy="110" r="55" fill="url(#sc-moon)" clipPath="url(#sc-clip)" opacity=".85" />
      <circle cx="126" cy="110" r="55" fill="none" stroke="rgba(220,200,160,.25)" strokeWidth="1" clipPath="url(#sc-clip)" />

      <g clipPath="url(#sc-clip)">
        {STARS.map(([x,y,r,dur,op],i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="white" opacity={op}
            style={{ animation:`vc-twinkle ${dur}s ease-in-out infinite ${(i*0.6).toFixed(1)}s` }} />
        ))}
      </g>

      {/* Torii gate */}
      <g clipPath="url(#sc-clip)">
        <rect x="83" y="110" width="11" height="115" fill="url(#sc-torii)" rx="3" />
        <rect x="158" y="110" width="11" height="115" fill="url(#sc-torii)" rx="3" />
        <rect x="80" y="215" width="17" height="8" fill="#7a1515" rx="2" />
        <rect x="155" y="215" width="17" height="8" fill="#7a1515" rx="2" />
        <rect x="68" y="88" width="116" height="12" fill="url(#sc-torii)" rx="5" />
        <ellipse cx="68"  cy="90" rx="7" ry="5" fill="#c0392b" />
        <ellipse cx="184" cy="90" rx="7" ry="5" fill="#c0392b" />
        <rect x="75" y="104" width="102" height="8" fill="#9b2020" rx="3" />
        <rect x="68" y="88" width="116" height="3" rx="2" fill="rgba(255,160,140,.35)" />
        <path d="M83,120 Q126,114 169,120" fill="none" stroke="#d4b840" strokeWidth="2.5" opacity=".7" strokeLinecap="round" />
        <path d="M100,120 L96,132 L102,128 L98,140" fill="none" stroke="#f0e8d0" strokeWidth="1" opacity=".7" />
        <path d="M126,116 L122,128 L128,124 L124,136" fill="none" stroke="#f0e8d0" strokeWidth="1" opacity=".7" />
        <path d="M152,120 L148,132 L154,128 L150,140" fill="none" stroke="#f0e8d0" strokeWidth="1" opacity=".7" />
      </g>

      {/* Waves */}
      <g clipPath="url(#sc-clip)" style={{ animation:'vc-wave 5s ease-in-out infinite' }}>
        <path d="M22,215 Q50,200 80,215 Q110,230 140,215 Q170,200 200,215 Q220,223 230,220 L230,280 L22,280Z" fill="#1a3a6a" opacity=".9" />
        <path d="M22,228 Q55,212 88,228 Q121,244 154,228 Q187,212 230,228 L230,280 L22,280Z" fill="#0f2550" opacity=".9" />
        <path d="M22,240 Q60,226 96,240 Q132,254 168,240 Q204,226 230,240 L230,280 L22,280Z" fill="#0a1a3a" opacity=".9" />
        <path d="M38,215 Q52,207 66,215" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity=".5" />
        <path d="M52,208 L56,202 Q60,198 64,202" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity=".4" />
        <path d="M108,215 Q122,207 136,215" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity=".5" />
        <path d="M122,208 L126,202 Q130,198 134,202" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity=".4" />
        <path d="M178,215 Q192,207 206,215" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity=".45" />
        <path d="M55,228 Q68,221 80,228" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M140,228 Q153,221 166,228" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Sakura tree */}
      <g clipPath="url(#sc-clip)">
        <line x1="205" y1="230" x2="205" y2="55" stroke="#3d1a10" strokeWidth="3.5" opacity=".9" />
        <line x1="205" y1="105" x2="225" y2="72" stroke="#3d1a10" strokeWidth="2" opacity=".8" />
        <line x1="205" y1="85"  x2="188" y2="58" stroke="#3d1a10" strokeWidth="1.5" opacity=".8" />
        <circle cx="224" cy="68"  r="16" fill="rgba(255,170,195,.45)" />
        <circle cx="214" cy="58"  r="12" fill="rgba(255,155,185,.5)" />
        <circle cx="230" cy="55"  r="10" fill="rgba(255,180,200,.4)" />
        <circle cx="218" cy="48"  r="9"  fill="rgba(255,160,190,.45)" />
        <circle cx="186" cy="55"  r="14" fill="rgba(255,170,195,.45)" />
        <circle cx="196" cy="44"  r="10" fill="rgba(255,155,185,.5)" />
        <circle cx="210" cy="38"  r="8"  fill="rgba(255,175,198,.4)" />
        <circle cx="230" cy="46"  r="4"  fill="rgba(255,220,230,.8)" />
        <circle cx="220" cy="40"  r="3.5" fill="rgba(255,215,228,.85)" />
        <circle cx="200" cy="50"  r="3"  fill="rgba(255,210,228,.8)" />
        <circle cx="188" cy="46"  r="3.5" fill="rgba(255,220,235,.8)" />
        <ellipse cx="80"  cy="62" rx="4" ry="2.5" fill="rgba(255,185,205,.7)"
          transform="rotate(-20,80,62)" style={{ animation:'vc-sakura 3.5s ease-in-out infinite .5s' }} />
        <ellipse cx="55"  cy="90" rx="3" ry="2"   fill="rgba(255,175,200,.65)"
          transform="rotate(30,55,90)"  style={{ animation:'vc-sakura 4.2s ease-in-out infinite 1.5s' }} />
        <ellipse cx="148" cy="70" rx="3.5" ry="2.2" fill="rgba(255,185,208,.6)"
          transform="rotate(-10,148,70)" style={{ animation:'vc-sakura 3.8s ease-in-out infinite .8s' }} />
        <ellipse cx="100" cy="48" rx="3" ry="2"   fill="rgba(255,180,205,.6)"
          transform="rotate(15,100,48)" style={{ animation:'vc-sakura 5s ease-in-out infinite 2s' }} />
      </g>

      <line x1="22" y1="270" x2="230" y2="270" stroke="#1a1a3a" strokeWidth="2" />
      <line x1="22" y1="273" x2="230" y2="273" stroke="rgba(200,146,42,.3)" strokeWidth=".6" />
      <rect x="22" y="272" width="208" height="52" fill="#080810" />
      <text x="126" y="295" fontFamily="'Cinzel',serif" fontWeight="700" fontSize="16"
        fill="url(#sc-gold)" textAnchor="middle" letterSpacing="3">Sam SciTech</text>
      <text x="126" y="310" fontFamily="'Noto Serif JP',serif" fontSize="9"
        fill="rgba(200,146,42,.55)" textAnchor="middle">科学教育</text>
      <text x="126" y="322" fontFamily="'Cinzel',serif" fontSize="7"
        fill="rgba(200,146,42,.45)" textAnchor="middle" letterSpacing="2.5">SCIENCE · EDUCATION</text>

      <Gem g="sc-gold" y={14}  bg="#080810" />
      <Gem g="sc-gold" y={344} bg="#080810" />
      <text x="24"  y="36" fontFamily="'Cinzel',serif" fontSize="11" fill="url(#sc-gold)" fontWeight="700">A</text>
      <text x="24"  y="47" fontFamily="'Noto Serif JP',serif" fontSize="8" fill="rgba(200,146,42,.65)" textAnchor="middle">科</text>
      <text x="228" y="336" fontFamily="'Cinzel',serif" fontSize="11" fill="url(#sc-gold)" fontWeight="700"
        textAnchor="end" transform="rotate(180,228,331)">A</text>
      <text x="228" y="323" fontFamily="'Noto Serif JP',serif" fontSize="8" fill="rgba(200,146,42,.65)"
        textAnchor="middle" transform="rotate(180,228,319)">科</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   CARD 3 · WORDS & WORLDS — Persian Illuminated
   Unchanged design. All random values replaced with literals.
══════════════════════════════════════════════════════ */
function CardWordsWorlds() {
  const STARS: [number,number,number,boolean,number,number][] = [
    [40,75,1.0,false,4.0,.60],[72,68,.8,false,3.0,.50],[105,72,1.2,true,5.0,.90],
    [160,65,1.0,false,3.5,.50],[200,78,.9,false,4.5,.50],[218,68,1.1,true,3.2,1.0],
    [35,100,.7,false,4.2,.40],[215,100,.8,false,5.0,.50],
  ];
  return (
    <svg width="252" height="358" viewBox="0 0 252 358" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ww-parch" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"  stopColor="#e8e0d0" /><stop offset="50%" stopColor="#ddd4c0" />
          <stop offset="100%" stopColor="#d0c8b0" />
        </linearGradient>
        <linearGradient id="ww-field" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"  stopColor="#0d0820" /><stop offset="35%" stopColor="#180a30" />
          <stop offset="65%" stopColor="#1a0510" /><stop offset="100%" stopColor="#0a1020" />
        </linearGradient>
        <GoldDef id="ww-gold" />
        <radialGradient id="ww-lamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="#ffcc50" stopOpacity=".9" />
          <stop offset="50%" stopColor="#ff8820" stopOpacity=".5" />
          <stop offset="100%" stopColor="#ff4400" stopOpacity="0" />
        </radialGradient>
        <clipPath id="ww-clip"><rect x="14" y="14" width="224" height="330" rx="8" /></clipPath>
      </defs>

      <rect width="252" height="358" rx="14" fill="url(#ww-parch)" />
      <rect x="2" y="2" width="248" height="354" rx="13" fill="none" stroke="url(#ww-gold)" strokeWidth="3" />
      <rect x="5" y="5" width="242" height="348" rx="11" fill="none" stroke="rgba(200,146,42,.3)" strokeWidth=".8" />
      <rect x="14" y="14" width="224" height="330" rx="8" fill="url(#ww-field)" />
      <rect x="14" y="14" width="224" height="330" rx="8" fill="none" stroke="#2a1040" strokeWidth="3" />
      <rect x="18" y="18" width="216" height="322" rx="6" fill="none" stroke="rgba(140,80,200,.25)" strokeWidth=".8" />

      <g opacity=".95">
        <Brackets g="ww-gold" />
        {([[24,24],[228,24],[24,334],[228,334]] as [number,number][]).map(([cx,cy],i) => (
          <polygon key={i} fill="url(#ww-gold)" opacity=".9"
            points={`${cx},${cy-4} ${cx+1.6},${cy-1.6} ${cx+4},${cy} ${cx+1.6},${cy+1.6} ${cx},${cy+4} ${cx-1.6},${cy+1.6} ${cx-4},${cy} ${cx-1.6},${cy-1.6}`} />
        ))}
      </g>

      <g fill="none" stroke="rgba(200,146,42,.4)" strokeWidth=".7">
        <rect x="22" y="22" width="208" height="312" rx="5" />
        <path d="M60,22 Q126,36 192,22" /><path d="M60,334 Q126,320 192,334" />
        <line x1="22" y1="55" x2="230" y2="55" stroke="rgba(200,146,42,.3)" />
        <line x1="22" y1="58" x2="230" y2="58" stroke="rgba(200,146,42,.15)" />
        <line x1="22" y1="268" x2="230" y2="268" stroke="rgba(200,146,42,.3)" />
        <line x1="22" y1="271" x2="230" y2="271" stroke="rgba(200,146,42,.15)" />
      </g>
      <g fill="rgba(200,146,42,.4)" stroke="rgba(200,146,42,.6)" strokeWidth=".5">
        {[55,72,89,157,174,191].map((x,i) => (
          <path key={i} d={`M${x},22 Q${x+3},16 ${x+6},22 Q${x+3},28 ${x},22Z`} />
        ))}
      </g>

      <g clipPath="url(#ww-clip)">
        <rect x="22" y="60" width="208" height="205" fill="rgba(5,3,15,.7)" />
        {STARS.map(([x,y,r,isW,dur,op],i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={isW ? 'white' : '#fbbf24'} opacity={op}
            style={{ animation:`vc-twinkle ${dur}s ease-in-out infinite ${(i*0.5).toFixed(1)}s` }} />
        ))}
        <circle cx="198" cy="85" r="18" fill="rgba(245,232,192,.12)" />
        <circle cx="204" cy="82" r="15" fill="#0d0820" />
        <path d="M188,80 Q195,72 205,78" fill="none" stroke="rgba(245,232,192,.35)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Lamp */}
      <g clipPath="url(#ww-clip)">
        <circle cx="126" cy="150" r="50" fill="url(#ww-lamp)" opacity=".6"
          style={{ animation:'vc-lamp 3s ease-in-out infinite' }} />
        <path d="M118,115 L108,155 Q108,170 126,172 Q144,170 144,155 L134,115 Z"
          fill="#4a3010" stroke="url(#ww-gold)" strokeWidth="1.2" />
        <rect x="122" y="108" width="8" height="10" fill="#3a2808" rx="2" stroke="url(#ww-gold)" strokeWidth=".8" />
        <ellipse cx="126" cy="108" rx="14" ry="5" fill="#5a3a10" stroke="url(#ww-gold)" strokeWidth="1" />
        <path d="M112,108 Q126,100 140,108" fill="#4a3010" stroke="url(#ww-gold)" strokeWidth=".8" />
        <path d="M126,100 L126,80" stroke="url(#ww-gold)" strokeWidth="1.5" strokeDasharray="2,2" opacity=".7" />
        <circle cx="126" cy="78" r="4" fill="url(#ww-gold)" opacity=".8" />
        <path d="M122,74 Q126,65 130,74" fill="none" stroke="url(#ww-gold)" strokeWidth="1.2" opacity=".7" />
        <path d="M112,130 Q126,125 140,130" fill="none" stroke="rgba(200,146,42,.5)" strokeWidth=".8" />
        <path d="M110,145 Q126,140 142,145" fill="none" stroke="rgba(200,146,42,.5)" strokeWidth=".8" />
        <path d="M126,114 Q122,105 126,98 Q130,105 126,114Z" fill="#ffcc40" opacity=".9" />
        <path d="M126,114 Q123,107 126,102 Q129,107 126,114Z" fill="white" opacity=".6" />
        <path d="M108,168 Q118,178 126,180 Q134,178 144,168" fill="#3a2808" stroke="url(#ww-gold)" strokeWidth="1" />
        <line x1="105" y1="168" x2="147" y2="168" stroke="url(#ww-gold)" strokeWidth="1.5" />
        {([[112,185,187],[126,193,195],[140,185,187]] as [number,number,number][]).map(([x,y1,y2],i) => (
          <g key={i}>
            <line x1={x} y1={170} x2={x} y2={y1} stroke="url(#ww-gold)" strokeWidth="1" opacity=".7" />
            <circle cx={x} cy={y2} r="2" fill="url(#ww-gold)" opacity=".7" />
          </g>
        ))}
      </g>

      {/* Mandala */}
      <g clipPath="url(#ww-clip)" style={{ animation:'vc-ink 5s ease-in-out infinite' }}>
        <circle cx="126" cy="150" r="72" fill="none" stroke="rgba(200,146,42,.2)" strokeWidth=".8" strokeDasharray="4,5" />
        <g fill="none" stroke="rgba(160,100,220,.25)" strokeWidth=".7">
          {[0,45,90,135,180,225,270,315].map((deg,i) => (
            <ellipse key={i} cx="126" cy="88" rx="10" ry="20" transform={`rotate(${deg},126,150)`} />
          ))}
        </g>
        <polygon points="126,110 129,122 141,122 132,130 135,142 126,135 117,142 120,130 111,122 123,122"
          fill="rgba(200,146,42,.12)" stroke="rgba(200,146,42,.35)" strokeWidth=".7" />
        <text x="55"  y="225" fontFamily="'Cormorant Garamond',serif" fontStyle="italic" fontSize="9"
          fill="rgba(200,146,42,.4)" transform="rotate(-8,55,225)">شعر</text>
        <text x="178" y="215" fontFamily="'Cormorant Garamond',serif" fontStyle="italic" fontSize="8"
          fill="rgba(200,146,42,.35)" transform="rotate(6,178,215)">ποίηση</text>
        <text x="42"  y="175" fontFamily="'Cormorant Garamond',serif" fontStyle="italic" fontSize="8"
          fill="rgba(200,146,42,.3)">كلمات</text>
        <text x="185" y="185" fontFamily="'Cormorant Garamond',serif" fontStyle="italic" fontSize="8"
          fill="rgba(200,146,42,.3)">வார்த்தை</text>
      </g>

      <line x1="22" y1="270" x2="230" y2="270" stroke="#2a1040" strokeWidth="2" />
      <line x1="22" y1="273" x2="230" y2="273" stroke="rgba(200,146,42,.3)" strokeWidth=".6" />
      <rect x="22" y="272" width="208" height="52" fill="#080510" />
      <text x="126" y="293" fontFamily="'Cormorant Garamond',serif" fontStyle="italic" fontWeight="600"
        fontSize="17" fill="url(#ww-gold)" textAnchor="middle" letterSpacing="1">Words &amp; Worlds</text>
      <text x="126" y="310" fontFamily="'Cormorant Garamond',serif" fontStyle="italic" fontSize="9.5"
        fill="rgba(200,146,42,.6)" textAnchor="middle" letterSpacing="1">Poetry · Philosophy · Language</text>
      <text x="126" y="322" fontFamily="'Cinzel',serif" fontSize="7"
        fill="rgba(200,146,42,.4)" textAnchor="middle" letterSpacing="2.5">MULTILINGUAL LITERARY ARTS</text>

      <Gem g="ww-gold" y={14}  bg="#080510" />
      <Gem g="ww-gold" y={344} bg="#080510" />
      <text x="24"  y="36" fontFamily="'Cinzel',serif" fontSize="11" fill="url(#ww-gold)" fontWeight="700">A</text>
      <text x="24"  y="47" fontFamily="'Cormorant Garamond',serif" fontStyle="italic" fontSize="9"
        fill="rgba(200,146,42,.65)" textAnchor="middle">✦</text>
      <text x="228" y="336" fontFamily="'Cinzel',serif" fontSize="11" fill="url(#ww-gold)" fontWeight="700"
        textAnchor="end" transform="rotate(180,228,331)">A</text>
      <text x="228" y="323" fontFamily="'Cormorant Garamond',serif" fontStyle="italic" fontSize="9"
        fill="rgba(200,146,42,.65)" textAnchor="middle" transform="rotate(180,228,319)">✦</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════════════════ */
export default function VenturesPreview() {
  return (
    <>
      <style>{CSS}</style>
      <section id="sagittarius" className="vc-wrap">
        <p className="vc-eyebrow">✦ &nbsp; Portfolio Arcana &nbsp; ✦</p>
        <div className="vc-row">
          <Link href="/sagittarius" className="vc-link">
            <div className="vc-card vc-card-sag"><CardSagittarius /></div>
          </Link>
          <Link href="/youtube" className="vc-link">
            <div className="vc-card vc-card-sci"><CardSciTech /></div>
          </Link>
          <Link href="/writing" className="vc-link">
            <div className="vc-card vc-card-ww"><CardWordsWorlds /></div>
          </Link>
        </div>
        <p className="vc-footer">✦ &nbsp; Click a card to enter &nbsp; ✦</p>
      </section>
    </>
  );
}
