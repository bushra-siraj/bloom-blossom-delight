import { motion } from 'framer-motion';
import type { Environment } from '@/types/bloom';

interface EnvironmentBgProps {
  environment: Environment;
  particleColor?: string;
  glowColor?: string;
}

const MidnightSky = ({ particleColor, glowColor }: { particleColor?: string; glowColor?: string }) => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Sky gradient */}
    <div className="absolute inset-0" style={{
      background: 'linear-gradient(180deg, #0a0a2e 0%, #141452 30%, #1a1a5e 60%, #0e1538 100%)',
    }} />
    {/* Moon */}
    <motion.div
      className="absolute"
      style={{
        top: '8%', right: '15%',
        width: 60, height: 60,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #f0e8d0 0%, #e8d8b0 50%, transparent 70%)',
        boxShadow: `0 0 60px ${glowColor || '#f0e8d0'}40, 0 0 120px ${glowColor || '#f0e8d0'}20`,
      }}
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    {/* Moon inner glow */}
    <div className="absolute" style={{
      top: '8%', right: '15%',
      width: 60, height: 60,
      borderRadius: '50%',
      background: 'radial-gradient(circle, transparent 40%, #f0e8d020 60%, transparent 80%)',
    }} />
    {/* Stars */}
    {Array.from({ length: 40 }).map((_, i) => (
      <motion.div
        key={`star-${i}`}
        className="absolute rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 60}%`,
          width: 1.5 + Math.random() * 2,
          height: 1.5 + Math.random() * 2,
          background: particleColor || '#e8e0f0',
          boxShadow: `0 0 ${3 + Math.random() * 4}px ${particleColor || '#e8e0f0'}`,
        }}
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2 + Math.random() * 3, delay: Math.random() * 4, repeat: Infinity }}
      />
    ))}
    {/* Ground/garden silhouette */}
    <svg className="absolute bottom-0 w-full" viewBox="0 0 400 120" preserveAspectRatio="none" style={{ height: '20%' }}>
      <path d="M0 80 Q30 40 60 70 Q90 30 120 60 Q150 20 180 50 Q210 30 240 55 Q270 25 300 60 Q330 40 360 65 Q380 50 400 70 L400 120 L0 120Z" fill="#0a0a1a" />
      <path d="M0 90 Q50 60 100 80 Q150 55 200 75 Q250 50 300 70 Q350 55 400 80 L400 120 L0 120Z" fill="#0d0d22" />
      {/* Grass tufts */}
      {Array.from({ length: 20 }).map((_, i) => (
        <path key={i} d={`M${i*20+5} 90 Q${i*20+7} ${75+Math.random()*10} ${i*20+10} 90`} stroke="#1a2a1a" strokeWidth="1" fill="none" />
      ))}
    </svg>
    {/* Firefly-like glow particles */}
    {Array.from({ length: 8 }).map((_, i) => (
      <motion.div
        key={`glow-${i}`}
        className="absolute rounded-full"
        style={{
          left: `${10 + Math.random() * 80}%`,
          bottom: `${15 + Math.random() * 20}%`,
          width: 4,
          height: 4,
          background: glowColor || '#a0c0ff',
          boxShadow: `0 0 10px ${glowColor || '#a0c0ff'}, 0 0 20px ${glowColor || '#a0c0ff'}60`,
        }}
        animate={{
          opacity: [0, 0.8, 0],
          y: [0, -20, -40],
          x: [0, Math.random() * 20 - 10, 0],
        }}
        transition={{ duration: 3 + Math.random() * 2, delay: i * 0.8, repeat: Infinity }}
      />
    ))}
  </div>
);

const SunsetField = ({ particleColor, glowColor }: { particleColor?: string; glowColor?: string }) => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Sunset gradient */}
    <div className="absolute inset-0" style={{
      background: 'linear-gradient(180deg, #1a0a2e 0%, #4a1a3e 15%, #8a3a2e 35%, #d4702a 55%, #e89040 70%, #f0a848 85%, #c87830 100%)',
    }} />
    {/* Sun glow */}
    <motion.div
      className="absolute"
      style={{
        bottom: '25%', left: '50%', transform: 'translateX(-50%)',
        width: 80, height: 80,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${glowColor || '#f0c060'} 0%, ${glowColor || '#f0c060'}80 30%, transparent 70%)`,
        boxShadow: `0 0 80px ${glowColor || '#f0c060'}60, 0 0 160px ${glowColor || '#f0c060'}30`,
      }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 5, repeat: Infinity }}
    />
    {/* Horizon */}
    <div className="absolute w-full" style={{
      bottom: '18%', height: '4px',
      background: `linear-gradient(90deg, transparent, ${glowColor || '#f0c060'}40, transparent)`,
    }} />
    {/* Ground - rolling hills */}
    <svg className="absolute bottom-0 w-full" viewBox="0 0 400 100" preserveAspectRatio="none" style={{ height: '22%' }}>
      <path d="M0 50 Q100 20 200 40 Q300 20 400 45 L400 100 L0 100Z" fill="#3a2a18" />
      <path d="M0 60 Q80 40 160 55 Q240 35 320 50 Q380 40 400 55 L400 100 L0 100Z" fill="#2a1e12" />
      {/* Grass silhouettes */}
      {Array.from({ length: 30 }).map((_, i) => (
        <path key={i} d={`M${i*13+2} 60 Q${i*13+4} ${48+Math.random()*8} ${i*13+7} 60`} stroke="#4a3a20" strokeWidth="0.8" fill="none" />
      ))}
    </svg>
    {/* Light particles */}
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={`particle-${i}`}
        className="absolute rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          bottom: `${20 + Math.random() * 40}%`,
          width: 3 + Math.random() * 3,
          height: 3 + Math.random() * 3,
          background: particleColor || '#f0c060',
          boxShadow: `0 0 8px ${particleColor || '#f0c060'}`,
        }}
        animate={{
          opacity: [0, 0.6, 0],
          y: [0, -30, -60],
        }}
        transition={{ duration: 4 + Math.random() * 3, delay: i * 0.6, repeat: Infinity }}
      />
    ))}
  </div>
);

const ForestClearing = ({ particleColor, glowColor }: { particleColor?: string; glowColor?: string }) => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Forest gradient */}
    <div className="absolute inset-0" style={{
      background: 'linear-gradient(180deg, #0a1a0e 0%, #0e2812 30%, #122e18 60%, #0a1a0e 100%)',
    }} />
    {/* Soft moonlight through canopy */}
    <div className="absolute" style={{
      top: '5%', left: '50%', transform: 'translateX(-50%)',
      width: 200, height: 200,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${glowColor || '#b0d8b0'}10 0%, transparent 60%)`,
    }} />
    {/* Trees background */}
    <svg className="absolute bottom-0 w-full" viewBox="0 0 400 200" preserveAspectRatio="none" style={{ height: '70%' }}>
      {/* Far trees */}
      <g opacity="0.3">
        {[40, 100, 160, 220, 280, 340].map((x, i) => (
          <g key={`far-${i}`}>
            <polygon points={`${x},60 ${x-18},140 ${x+18},140`} fill="#0a1a0e" />
            <polygon points={`${x},40 ${x-14},100 ${x+14},100`} fill="#0a1a0e" />
          </g>
        ))}
      </g>
      {/* Near trees */}
      <g opacity="0.6">
        {[20, 80, 320, 380].map((x, i) => (
          <g key={`near-${i}`}>
            <rect x={x-3} y="80" width="6" height="120" fill="#1a0e08" />
            <polygon points={`${x},30 ${x-25},110 ${x+25},110`} fill="#0e2010" />
            <polygon points={`${x},10 ${x-20},80 ${x+20},80`} fill="#102818" />
            <polygon points={`${x},-5 ${x-15},55 ${x+15},55`} fill="#143020" />
          </g>
        ))}
      </g>
      {/* Ground */}
      <path d="M0 150 Q100 140 200 145 Q300 138 400 148 L400 200 L0 200Z" fill="#0a120a" />
      <path d="M0 160 Q80 152 160 158 Q240 150 320 156 Q380 152 400 160 L400 200 L0 200Z" fill="#081008" />
      {/* Moss and ground detail */}
      {Array.from({ length: 15 }).map((_, i) => (
        <ellipse key={`moss-${i}`} cx={10 + i * 26} cy={165 + Math.random() * 10} rx={4 + Math.random() * 6} ry={2} fill="#1a3a1a" opacity="0.4" />
      ))}
    </svg>
    {/* Fireflies */}
    {Array.from({ length: 15 }).map((_, i) => (
      <motion.div
        key={`firefly-${i}`}
        className="absolute rounded-full"
        style={{
          left: `${10 + Math.random() * 80}%`,
          top: `${30 + Math.random() * 50}%`,
          width: 3,
          height: 3,
          background: particleColor || '#a0e8a0',
          boxShadow: `0 0 8px ${particleColor || '#a0e8a0'}, 0 0 16px ${particleColor || '#a0e8a0'}40`,
        }}
        animate={{
          opacity: [0, 1, 0],
          x: [0, Math.random() * 30 - 15, 0],
          y: [0, Math.random() * -20, 0],
        }}
        transition={{ duration: 2 + Math.random() * 3, delay: i * 0.4, repeat: Infinity }}
      />
    ))}
    {/* Light rays through canopy */}
    {Array.from({ length: 3 }).map((_, i) => (
      <motion.div
        key={`ray-${i}`}
        className="absolute"
        style={{
          left: `${25 + i * 25}%`,
          top: 0,
          width: 2,
          height: '60%',
          background: `linear-gradient(180deg, ${glowColor || '#b0d8b0'}08, transparent)`,
          transform: `rotate(${-5 + i * 5}deg)`,
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, delay: i, repeat: Infinity }}
      />
    ))}
  </div>
);

export const EnvironmentBg = ({ environment, particleColor, glowColor }: EnvironmentBgProps) => {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {environment === 'midnight' && <MidnightSky particleColor={particleColor} glowColor={glowColor} />}
      {environment === 'sunset' && <SunsetField particleColor={particleColor} glowColor={glowColor} />}
      {environment === 'forest' && <ForestClearing particleColor={particleColor} glowColor={glowColor} />}
    </motion.div>
  );
};
