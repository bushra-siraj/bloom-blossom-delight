import { motion } from 'framer-motion';
import type { Environment } from '@/types/bloom';

interface EnvironmentBgProps {
  environment: Environment;
  particleColor?: string;
  glowColor?: string;
}

const MidnightSky = ({ particleColor, glowColor }: { particleColor?: string; glowColor?: string }) => {
  // Use seeded positions to avoid re-randomizing on re-render
  const stars = Array.from({ length: 50 }, (_, i) => ({
    left: ((i * 37 + 13) % 100),
    top: ((i * 23 + 7) % 60),
    size: 1.2 + (i % 4) * 0.6,
    delay: (i % 7) * 0.6,
    dur: 2 + (i % 5) * 0.8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #060820 0%, #0c1040 25%, #141860 50%, #0a1248 75%, #060820 100%)',
      }} />
      {/* Moon with halo */}
      <motion.div className="absolute" style={{
        top: '6%', right: '12%', width: 70, height: 70, borderRadius: '50%',
        background: 'radial-gradient(circle at 40% 40%, #fffde8 0%, #f0e8c8 40%, #e0d0a0 65%, transparent 75%)',
        boxShadow: `0 0 80px ${glowColor || '#f0e8d0'}50, 0 0 160px ${glowColor || '#f0e8d0'}25, 0 0 240px ${glowColor || '#f0e8d0'}10`,
      }} animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 6, repeat: Infinity }} />
      {/* Moon craters */}
      <div className="absolute" style={{
        top: 'calc(6% + 20px)', right: 'calc(12% + 15px)', width: 10, height: 10,
        borderRadius: '50%', background: '#e8dca0', opacity: 0.3,
      }} />
      <div className="absolute" style={{
        top: 'calc(6% + 35px)', right: 'calc(12% + 30px)', width: 6, height: 6,
        borderRadius: '50%', background: '#e8dca0', opacity: 0.2,
      }} />
      {/* Twinkling stars */}
      {stars.map((s, i) => (
        <motion.div key={`star-${i}`} className="absolute" style={{
          left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size,
        }}>
          <svg viewBox="0 0 10 10" width={s.size * 3} height={s.size * 3}>
            <motion.path d="M5 0 L5.7 3.5 L10 5 L5.7 6.5 L5 10 L4.3 6.5 L0 5 L4.3 3.5Z"
              fill={particleColor || '#e8e4ff'} opacity={0.8}
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: s.dur, delay: s.delay, repeat: Infinity }}
            />
          </svg>
        </motion.div>
      ))}
      {/* Garden silhouette with bushes */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 400 140" preserveAspectRatio="none" style={{ height: '25%' }}>
        {/* Distant hills */}
        <path d="M0 70 Q50 30 100 60 Q150 20 200 50 Q250 25 300 55 Q350 35 400 60 L400 140 L0 140Z" fill="#080818" />
        {/* Foreground ground */}
        <path d="M0 90 Q40 70 80 85 Q120 60 160 80 Q200 65 240 82 Q280 68 320 80 Q360 70 400 85 L400 140 L0 140Z" fill="#0a0a20" />
        {/* Bush silhouettes */}
        <ellipse cx="60" cy="88" rx="25" ry="12" fill="#0c0c22" />
        <ellipse cx="180" cy="85" rx="30" ry="15" fill="#0c0c22" />
        <ellipse cx="320" cy="87" rx="22" ry="11" fill="#0c0c22" />
        {/* Grass tufts */}
        {Array.from({ length: 25 }).map((_, i) => (
          <path key={i} d={`M${i*16+4} 100 Q${i*16+6} ${88+(i%3)*3} ${i*16+9} 100`} stroke="#141430" strokeWidth="0.8" fill="none" />
        ))}
        {/* Small flowers in garden */}
        {[50, 130, 250, 350].map((x, i) => (
          <g key={`gf-${i}`}>
            <circle cx={x} cy={92} r={2} fill={glowColor || '#a0a0ff'} opacity="0.3" />
            <line x1={x} y1={92} x2={x} y2={98} stroke="#1a2a1a" strokeWidth="0.5" />
          </g>
        ))}
      </svg>
      {/* Floating firefly-like particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div key={`glow-${i}`} className="absolute rounded-full" style={{
          left: `${8 + (i * 9) % 84}%`, bottom: `${18 + (i * 7) % 18}%`,
          width: 3 + (i % 3), height: 3 + (i % 3),
          background: glowColor || '#a0b8ff',
          boxShadow: `0 0 10px ${glowColor || '#a0b8ff'}, 0 0 25px ${glowColor || '#a0b8ff'}50`,
        }} animate={{
          opacity: [0, 0.7, 0], y: [0, -25 - (i % 3) * 10, -50],
          x: [0, ((i % 2) ? 15 : -15), 0],
        }} transition={{ duration: 3.5 + (i % 4) * 0.5, delay: i * 0.7, repeat: Infinity }} />
      ))}
    </div>
  );
};

const SunsetField = ({ particleColor, glowColor }: { particleColor?: string; glowColor?: string }) => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0" style={{
      background: 'linear-gradient(180deg, #12082a 0%, #2a1040 10%, #5a1838 22%, #8a2a28 38%, #c85a20 52%, #e88030 65%, #f0a040 78%, #e8a848 90%, #d09038 100%)',
    }} />
    {/* Sun disk */}
    <div className="absolute" style={{
      bottom: '26%', left: '50%', transform: 'translateX(-50%)',
      width: 90, height: 90, borderRadius: '50%',
      background: `radial-gradient(circle, #fff8e0 0%, ${glowColor || '#f0c060'} 25%, ${glowColor || '#f0c060'}80 50%, transparent 72%)`,
      boxShadow: `0 0 60px ${glowColor || '#f0c060'}80, 0 0 120px ${glowColor || '#f0c060'}40, 0 0 200px ${glowColor || '#f0c060'}20`,
    }} />
    {/* Horizontal sun streak */}
    <div className="absolute w-full" style={{
      bottom: '24%', height: 6,
      background: `linear-gradient(90deg, transparent 10%, ${glowColor || '#f0c060'}30 30%, ${glowColor || '#f0c060'}50 50%, ${glowColor || '#f0c060'}30 70%, transparent 90%)`,
    }} />
    {/* Rolling hills with wildflowers */}
    <svg className="absolute bottom-0 w-full" viewBox="0 0 400 120" preserveAspectRatio="none" style={{ height: '28%' }}>
      <path d="M0 40 Q60 15 120 35 Q180 10 240 30 Q300 8 360 28 Q390 20 400 35 L400 120 L0 120Z" fill="#3a2818" />
      <path d="M0 55 Q50 35 100 50 Q150 30 200 48 Q250 32 300 46 Q350 35 400 50 L400 120 L0 120Z" fill="#2a1e12" />
      {/* Grass blades */}
      {Array.from({ length: 40 }).map((_, i) => (
        <g key={i}>
          <path d={`M${i*10+2} 58 Q${i*10+3} ${44+(i%4)*3} ${i*10+5} 58`} stroke="#4a3820" strokeWidth="0.6" fill="none" />
          <path d={`M${i*10+6} 58 Q${i*10+7} ${46+(i%3)*3} ${i*10+9} 58`} stroke="#3a2a18" strokeWidth="0.5" fill="none" />
        </g>
      ))}
      {/* Wildflower silhouettes */}
      {[30, 80, 150, 220, 300, 370].map((x, i) => (
        <g key={`wf-${i}`}>
          <line x1={x} y1={50} x2={x} y2={42 - (i % 3) * 2} stroke="#5a4028" strokeWidth="0.6" />
          <circle cx={x} cy={40 - (i % 3) * 2} r={1.5 + (i % 2)} fill={i % 2 ? '#c87830' : '#e0a040'} opacity="0.5" />
        </g>
      ))}
    </svg>
    {/* Drifting light particles */}
    {Array.from({ length: 14 }).map((_, i) => (
      <motion.div key={`p-${i}`} className="absolute rounded-full" style={{
        left: `${(i * 7 + 5) % 95}%`, bottom: `${22 + (i * 11) % 38}%`,
        width: 2.5 + (i % 3) * 1.5, height: 2.5 + (i % 3) * 1.5,
        background: particleColor || '#f0c060',
        boxShadow: `0 0 8px ${particleColor || '#f0c060'}`,
      }} animate={{ opacity: [0, 0.5, 0], y: [0, -35, -70] }}
        transition={{ duration: 4 + (i % 4), delay: i * 0.5, repeat: Infinity }} />
    ))}
    {/* Birds silhouette */}
    <svg className="absolute" style={{ top: '15%', left: '20%', width: 60, opacity: 0.15 }} viewBox="0 0 60 20">
      <path d="M5 10 Q10 5 15 10" stroke="#1a0a0a" strokeWidth="1.5" fill="none" />
      <path d="M20 8 Q25 3 30 8" stroke="#1a0a0a" strokeWidth="1.5" fill="none" />
      <path d="M35 12 Q40 7 45 12" stroke="#1a0a0a" strokeWidth="1" fill="none" />
    </svg>
  </div>
);

const ForestClearing = ({ particleColor, glowColor }: { particleColor?: string; glowColor?: string }) => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0" style={{
      background: 'linear-gradient(180deg, #050e08 0%, #0a1a0e 20%, #0e2814 45%, #0a200e 70%, #060e08 100%)',
    }} />
    {/* Moonlight beam through canopy */}
    <div className="absolute" style={{
      top: 0, left: '45%', width: 80, height: '65%',
      background: `linear-gradient(180deg, ${glowColor || '#b0d8b0'}12, ${glowColor || '#b0d8b0'}04, transparent)`,
      clipPath: 'polygon(30% 0, 70% 0, 90% 100%, 10% 100%)',
    }} />
    {/* Trees */}
    <svg className="absolute bottom-0 w-full" viewBox="0 0 400 280" preserveAspectRatio="none" style={{ height: '80%' }}>
      {/* Far background trees */}
      <g opacity="0.25">
        {[30, 70, 120, 170, 230, 280, 330, 370].map((x, i) => (
          <g key={`fb-${i}`}>
            <rect x={x-2} y={100} width={4} height={180} fill="#0a140a" />
            <polygon points={`${x},20 ${x-20},120 ${x+20},120`} fill="#081008" />
            <polygon points={`${x},0 ${x-16},80 ${x+16},80`} fill="#0a140c" />
          </g>
        ))}
      </g>
      {/* Mid trees */}
      <g opacity="0.5">
        {[10, 60, 340, 390].map((x, i) => (
          <g key={`mt-${i}`}>
            <rect x={x-3} y={80} width={6} height={200} fill="#0c100a" />
            <polygon points={`${x},10 ${x-28},120 ${x+28},120`} fill="#0c1810" />
            <polygon points={`${x},-10 ${x-22},75 ${x+22},75`} fill="#0e2014" />
            <polygon points={`${x},-25 ${x-16},40 ${x+16},40`} fill="#102818" />
          </g>
        ))}
      </g>
      {/* Foreground trees - frame edges */}
      <g opacity="0.7">
        {[-5, 395].map((x, i) => (
          <g key={`ft-${i}`}>
            <rect x={x-4} y={40} width={8} height={240} fill="#080c08" />
            <polygon points={`${x},-20 ${x-35},130 ${x+35},130`} fill="#0a1408" />
            <polygon points={`${x},-40 ${x-28},60 ${x+28},60`} fill="#0c1a0e" />
          </g>
        ))}
      </g>
      {/* Ground with moss */}
      <path d="M0 210 Q60 195 120 205 Q180 190 240 202 Q300 192 360 205 Q390 198 400 208 L400 280 L0 280Z" fill="#060c06" />
      <path d="M0 225 Q80 215 160 222 Q240 212 320 220 Q380 214 400 225 L400 280 L0 280Z" fill="#050a05" />
      {/* Moss patches */}
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse key={`m-${i}`} cx={15 + i * 32} cy={228 + (i % 3) * 4} rx={8 + (i % 4) * 3} ry={3} fill="#0c1c0c" opacity="0.5" />
      ))}
      {/* Mushrooms */}
      {[80, 300].map((x, i) => (
        <g key={`mush-${i}`}>
          <rect x={x-1} y={220} width={2} height={6} fill="#c8b090" />
          <ellipse cx={x} cy={220} rx={4} ry={2.5} fill="#c8584a" />
          <circle cx={x-1.5} cy={219.5} r={0.8} fill="white" opacity="0.6" />
          <circle cx={x+1.5} cy={220} r={0.5} fill="white" opacity="0.5" />
        </g>
      ))}
    </svg>
    {/* Fireflies */}
    {Array.from({ length: 18 }).map((_, i) => (
      <motion.div key={`ff-${i}`} className="absolute rounded-full" style={{
        left: `${8 + (i * 5) % 84}%`, top: `${25 + (i * 7) % 55}%`,
        width: 2.5 + (i % 3), height: 2.5 + (i % 3),
        background: particleColor || '#b0e8a0',
        boxShadow: `0 0 6px ${particleColor || '#b0e8a0'}, 0 0 14px ${particleColor || '#b0e8a0'}50`,
      }} animate={{
        opacity: [0, 0.9, 0],
        x: [0, (i % 2 ? 12 : -12), 0],
        y: [0, -(8 + (i % 4) * 5), 0],
      }} transition={{ duration: 2.5 + (i % 5) * 0.5, delay: i * 0.35, repeat: Infinity }} />
    ))}
    {/* Light rays */}
    {[35, 50, 65].map((left, i) => (
      <motion.div key={`ray-${i}`} className="absolute" style={{
        left: `${left}%`, top: 0, width: 1.5 + i, height: '55%',
        background: `linear-gradient(180deg, ${glowColor || '#b0d8b0'}0a, transparent)`,
        transform: `rotate(${-4 + i * 4}deg)`,
      }} animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, delay: i * 1.5, repeat: Infinity }} />
    ))}
  </div>
);

const DreamyClouds = ({ particleColor, glowColor }: { particleColor?: string; glowColor?: string }) => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Pastel sky gradient */}
    <div className="absolute inset-0" style={{
      background: 'linear-gradient(180deg, #1a1030 0%, #2a1848 15%, #3a2060 30%, #4a2870 45%, #5a3080 55%, #6a3890 65%, #7a4898 75%, #8a58a0 85%, #9a68a8 100%)',
    }} />
    {/* Soft pastel cloud layers */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="cloud-blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
        </filter>
        <filter id="cloud-blur-sm">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
      </defs>
      {/* Background large clouds */}
      <g filter="url(#cloud-blur)" opacity="0.25">
        <ellipse cx="100" cy="80" rx="80" ry="30" fill="#e8b0d0" />
        <ellipse cx="300" cy="60" rx="70" ry="25" fill="#b0c8e8" />
        <ellipse cx="200" cy="120" rx="90" ry="28" fill="#d0b8e8" />
      </g>
      {/* Mid clouds */}
      <g filter="url(#cloud-blur-sm)" opacity="0.35">
        <ellipse cx="80" cy="140" rx="60" ry="22" fill="#e8c0d8" />
        <ellipse cx="320" cy="130" rx="55" ry="20" fill="#c0d0e8" />
        <ellipse cx="200" cy="170" rx="70" ry="24" fill="#d8c0e8" />
      </g>
    </svg>
    {/* Animated floating clouds */}
    {[
      { y: '15%', size: 120, color: '#e0a8c8', dur: 30, delay: 0 },
      { y: '35%', size: 100, color: '#a8c0e0', dur: 25, delay: 5 },
      { y: '55%', size: 90, color: '#c8b0e0', dur: 28, delay: 10 },
      { y: '25%', size: 80, color: '#d0c0d8', dur: 22, delay: 15 },
    ].map((cloud, i) => (
      <motion.div key={`cloud-${i}`} className="absolute" style={{
        top: cloud.y, width: cloud.size, height: cloud.size * 0.4,
      }}
        initial={{ left: '-20%' }}
        animate={{ left: '120%' }}
        transition={{ duration: cloud.dur, delay: cloud.delay, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 120 50" width={cloud.size} height={cloud.size * 0.4}>
          <ellipse cx="60" cy="30" rx="50" ry="18" fill={cloud.color} opacity="0.2" />
          <ellipse cx="45" cy="25" rx="30" ry="14" fill={cloud.color} opacity="0.25" />
          <ellipse cx="75" cy="28" rx="28" ry="12" fill={cloud.color} opacity="0.2" />
        </svg>
      </motion.div>
    ))}
    {/* Sparkle particles */}
    {Array.from({ length: 16 }).map((_, i) => (
      <motion.div key={`sp-${i}`} className="absolute rounded-full" style={{
        left: `${(i * 6 + 3) % 96}%`, top: `${(i * 8 + 10) % 85}%`,
        width: 2 + (i % 3), height: 2 + (i % 3),
        background: particleColor || '#e8d0f0',
        boxShadow: `0 0 6px ${particleColor || '#e8d0f0'}`,
      }} animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.2, 0.5] }}
        transition={{ duration: 3 + (i % 4), delay: i * 0.5, repeat: Infinity }} />
    ))}
    {/* Ground - soft pastel meadow */}
    <svg className="absolute bottom-0 w-full" viewBox="0 0 400 80" preserveAspectRatio="none" style={{ height: '15%' }}>
      <path d="M0 30 Q100 10 200 25 Q300 8 400 28 L400 80 L0 80Z" fill="#2a1840" />
      <path d="M0 40 Q80 25 160 35 Q240 22 320 32 Q380 24 400 38 L400 80 L0 80Z" fill="#221438" />
    </svg>
  </div>
);

export const EnvironmentBg = ({ environment, particleColor, glowColor }: EnvironmentBgProps) => {
  return (
    <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
      {environment === 'midnight' && <MidnightSky particleColor={particleColor} glowColor={glowColor} />}
      {environment === 'sunset' && <SunsetField particleColor={particleColor} glowColor={glowColor} />}
      {environment === 'forest' && <ForestClearing particleColor={particleColor} glowColor={glowColor} />}
      {environment === 'clouds' && <DreamyClouds particleColor={particleColor} glowColor={glowColor} />}
    </motion.div>
  );
};
