import { motion, AnimatePresence } from 'framer-motion';
import type { CharacterType, AnimationAction } from '@/types/bloom';

interface CharacterSVGProps {
  character: CharacterType;
  action?: AnimationAction;
  size?: number;
  animate?: boolean;
  walking?: boolean;
}

/*  ────────────────────────────────────────────────
    Animated chibi SVG characters with per-limb motion.
    States: idle, walking, wink, wave, drop-flower, present-flower
    ──────────────────────────────────────────────── */

/* ── shared animated wrappers ── */
const Bobbing = ({ children, active }: { children: React.ReactNode; active: boolean }) =>
  active ? (
    <motion.g animate={{ translateY: [0, -3, 0] }} transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}>
      {children}
    </motion.g>
  ) : <g>{children}</g>;

const WalkingLegs = ({ left, right }: { left: { x: number; y: number; w: number; h: number; fill: string }; right: typeof left & {} }) => (
  <>
    <motion.rect x={left.x} y={left.y} width={left.w} height={left.h} rx={left.w / 2} fill={left.fill}
      animate={{ rotate: [8, -8, 8] }} transition={{ duration: 0.35, repeat: Infinity }} style={{ transformOrigin: `${left.x + left.w / 2}px ${left.y}px` }} />
    <motion.rect x={right.x} y={right.y} width={right.w} height={right.h} rx={right.w / 2} fill={right.fill}
      animate={{ rotate: [-8, 8, -8] }} transition={{ duration: 0.35, repeat: Infinity }} style={{ transformOrigin: `${right.x + right.w / 2}px ${right.y}px` }} />
  </>
);

/* helper: winking eye – one eye closes */
const WinkEye = ({ cx, cy, rx, ry, fill, wink }: { cx: number; cy: number; rx: number; ry: number; fill: string; wink: boolean }) =>
  wink ? (
    <motion.line x1={cx - rx} y1={cy} x2={cx + rx} y2={cy} stroke={fill} strokeWidth={1.5} strokeLinecap="round"
      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.2 }} />
  ) : (
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} />
  );

/* helper: waving arm */
const WavingArm = ({ d, stroke, active }: { d: string; stroke: string; active: boolean }) =>
  active ? (
    <motion.path d={d} stroke={stroke} strokeWidth={5} fill="none" strokeLinecap="round"
      animate={{ rotate: [0, -25, 15, -25, 15, 0] }}
      transition={{ duration: 1.2, repeat: 2, ease: 'easeInOut' }}
      style={{ transformOrigin: d.includes('64') || d.includes('70') ? '64px 54px' : '36px 54px' }} />
  ) : (
    <path d={d} stroke={stroke} strokeWidth={5} fill="none" strokeLinecap="round" />
  );

/* helper: arm reaching up to present/drop flower */
const PresentArm = ({ side, stroke, active }: { side: 'left' | 'right'; stroke: string; active: boolean }) => {
  const restD = side === 'right' ? 'M64 54 Q72 60 74 68' : 'M36 54 Q28 60 26 68';
  const upD = side === 'right' ? 'M64 54 Q72 44 68 34' : 'M36 54 Q28 44 32 34';
  return active ? (
    <motion.path stroke={stroke} strokeWidth={5} fill="none" strokeLinecap="round"
      initial={{ d: restD }} animate={{ d: upD }}
      transition={{ duration: 0.6, ease: 'easeOut' }} />
  ) : (
    <path d={restD} stroke={stroke} strokeWidth={5} fill="none" strokeLinecap="round" />
  );
};

/* ══════════════════════════════════════════════════
   GIRL character
   ══════════════════════════════════════════════════ */
const Girl = ({ s, walking, action, animate: anim }: InnerProps) => {
  const isWink = anim && action === 'wink';
  const isWave = anim && action === 'wave';
  const isDrop = anim && action === 'drop-flower';
  const isPresent = anim && action === 'present-flower';

  return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <Bobbing active={walking}>
        {/* Hair */}
        <ellipse cx="50" cy="32" rx="24" ry="22" fill="#5C3D2E" />
        <ellipse cx="30" cy="40" rx="8" ry="14" fill="#5C3D2E" />
        <ellipse cx="70" cy="40" rx="8" ry="14" fill="#5C3D2E" />
        {/* Face */}
        <ellipse cx="50" cy="36" rx="18" ry="17" fill="#FFE0BD" />
        {/* Blush */}
        <ellipse cx="38" cy="40" rx="4" ry="2.5" fill="#FFB6C1" opacity="0.6" />
        <ellipse cx="62" cy="40" rx="4" ry="2.5" fill="#FFB6C1" opacity="0.6" />
        {/* Eyes – left normal, right winks */}
        <WinkEye cx={43} cy={35} rx={2.5} ry={3} fill="#2D1B14" wink={false} />
        <WinkEye cx={57} cy={35} rx={2.5} ry={3} fill="#2D1B14" wink={!!isWink} />
        <circle cx="44" cy="34" r="1" fill="white" opacity={isWink ? 0 : 0.8} />
        <circle cx="58" cy="34" r="1" fill="white" opacity={isWink ? 0 : 0.8} />
        {/* Mouth */}
        <path d="M46 42 Q50 46 54 42" stroke="#D4756B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* Hair bang + bow */}
        <path d="M32 28 Q40 18 50 22 Q55 18 68 28" fill="#5C3D2E" />
        <path d="M66 24 Q72 18 74 24 Q72 28 66 24Z" fill="#FF6B8A" />
        <path d="M66 24 Q60 18 58 24 Q60 28 66 24Z" fill="#FF6B8A" />
        <circle cx="66" cy="24" r="2" fill="#FF4571" />
        {/* Dress */}
        <path d="M36 52 Q50 48 64 52 L68 80 Q50 84 32 80Z" fill="#FF8FAB" />
        <path d="M40 52 Q50 50 60 52 L58 60 Q50 58 42 60Z" fill="#FF6B8A" />
        {/* Left arm */}
        <WavingArm d="M36 54 Q28 60 26 68" stroke="#FFE0BD" active={!!isWave} />
        {/* Right arm – used for present/drop */}
        {isDrop || isPresent ? (
          <PresentArm side="right" stroke="#FFE0BD" active />
        ) : (
          <path d="M64 54 Q72 60 74 68" stroke="#FFE0BD" strokeWidth={5} fill="none" strokeLinecap="round" />
        )}
        {/* Legs */}
        {walking ? (
          <WalkingLegs
            left={{ x: 40, y: 78, w: 6, h: 14, fill: '#FFE0BD' }}
            right={{ x: 54, y: 78, w: 6, h: 14, fill: '#FFE0BD' }}
          />
        ) : (
          <>
            <rect x="40" y="78" width="6" height="14" rx="3" fill="#FFE0BD" />
            <rect x="54" y="78" width="6" height="14" rx="3" fill="#FFE0BD" />
          </>
        )}
        {/* Shoes */}
        <ellipse cx="43" cy="93" rx="5" ry="3" fill="#FF6B8A" />
        <ellipse cx="57" cy="93" rx="5" ry="3" fill="#FF6B8A" />
      </Bobbing>
    </svg>
  );
};

/* ══════════════════════════════════════════════════
   BOY character
   ══════════════════════════════════════════════════ */
const Boy = ({ s, walking, action, animate: anim }: InnerProps) => {
  const isWink = anim && action === 'wink';
  const isWave = anim && action === 'wave';
  const isDrop = anim && action === 'drop-flower';
  const isPresent = anim && action === 'present-flower';

  return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <Bobbing active={walking}>
        <ellipse cx="50" cy="30" rx="22" ry="18" fill="#4A3728" />
        <path d="M30 30 Q35 16 50 18 Q65 16 70 30" fill="#4A3728" />
        <ellipse cx="50" cy="36" rx="18" ry="17" fill="#FFE0BD" />
        <WinkEye cx={43} cy={35} rx={2.5} ry={3} fill="#2D1B14" wink={false} />
        <WinkEye cx={57} cy={35} rx={2.5} ry={3} fill="#2D1B14" wink={!!isWink} />
        <circle cx="44" cy="34" r="1" fill="white" opacity={isWink ? 0 : 0.8} />
        <circle cx="58" cy="34" r="1" fill="white" opacity={isWink ? 0 : 0.8} />
        <path d="M45 42 Q50 46 55 42" stroke="#D4756B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M36 52 Q50 48 64 52 L66 80 Q50 84 34 80Z" fill="#6BA3D6" />
        <rect x="47" y="52" width="6" height="12" rx="1" fill="#5A8FC2" />
        <WavingArm d="M36 54 Q28 60 26 68" stroke="#FFE0BD" active={!!isWave} />
        {isDrop || isPresent ? (
          <PresentArm side="right" stroke="#FFE0BD" active />
        ) : (
          <path d="M64 54 Q72 60 74 68" stroke="#FFE0BD" strokeWidth={5} fill="none" strokeLinecap="round" />
        )}
        {walking ? (
          <WalkingLegs
            left={{ x: 39, y: 78, w: 8, h: 14, fill: '#4A6FA5' }}
            right={{ x: 53, y: 78, w: 8, h: 14, fill: '#4A6FA5' }}
          />
        ) : (
          <>
            <rect x="39" y="78" width="8" height="14" rx="3" fill="#4A6FA5" />
            <rect x="53" y="78" width="8" height="14" rx="3" fill="#4A6FA5" />
          </>
        )}
        <ellipse cx="43" cy="93" rx="5" ry="3" fill="#3D3D3D" />
        <ellipse cx="57" cy="93" rx="5" ry="3" fill="#3D3D3D" />
      </Bobbing>
    </svg>
  );
};

/* ══════════════════════════════════════════════════
   CAT character
   ══════════════════════════════════════════════════ */
const Cat = ({ s, walking, action, animate: anim }: InnerProps) => {
  const isWink = anim && action === 'wink';
  const isWave = anim && action === 'wave';

  return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <Bobbing active={walking}>
        <ellipse cx="50" cy="68" rx="20" ry="22" fill="#F5C77E" />
        <ellipse cx="50" cy="38" rx="22" ry="20" fill="#F5C77E" />
        <polygon points="32,22 28,6 40,18" fill="#F5C77E" />
        <polygon points="68,22 72,6 60,18" fill="#F5C77E" />
        <polygon points="34,20 30,10 40,18" fill="#FFB6C1" />
        <polygon points="66,20 70,10 60,18" fill="#FFB6C1" />
        <WinkEye cx={42} cy={36} rx={4} ry={4.5} fill="#2D1B14" wink={false} />
        <WinkEye cx={58} cy={36} rx={4} ry={4.5} fill="#2D1B14" wink={!!isWink} />
        <circle cx="43" cy="35" r="1.5" fill="white" opacity={isWink ? 0 : 0.8} />
        <circle cx="59" cy="35" r="1.5" fill="white" opacity={isWink ? 0 : 0.8} />
        <ellipse cx="50" cy="42" rx="2" ry="1.5" fill="#FFB6C1" />
        <path d="M47 44 Q50 47 53 44" stroke="#D4756B" strokeWidth="1" fill="none" />
        <line x1="50" y1="42" x2="50" y2="44" stroke="#D4756B" strokeWidth="0.8" />
        {/* Whiskers */}
        <line x1="28" y1="38" x2="40" y2="40" stroke="#C8A86E" strokeWidth="0.7" />
        <line x1="28" y1="42" x2="40" y2="42" stroke="#C8A86E" strokeWidth="0.7" />
        <line x1="60" y1="40" x2="72" y2="38" stroke="#C8A86E" strokeWidth="0.7" />
        <line x1="60" y1="42" x2="72" y2="42" stroke="#C8A86E" strokeWidth="0.7" />
        <ellipse cx="38" cy="42" rx="3" ry="2" fill="#FFB6C1" opacity="0.4" />
        <ellipse cx="62" cy="42" rx="3" ry="2" fill="#FFB6C1" opacity="0.4" />
        {/* Paws – wave */}
        {isWave ? (
          <motion.ellipse cx="38" cy="88" rx="6" ry="4" fill="#F5C77E"
            animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 0.4, repeat: 4 }}
            style={{ transformOrigin: '38px 80px' }} />
        ) : (
          <ellipse cx="38" cy="88" rx="6" ry="4" fill="#F5C77E" />
        )}
        <ellipse cx="62" cy="88" rx="6" ry="4" fill="#F5C77E" />
        {/* Tail */}
        <motion.path d="M68 70 Q82 60 78 48" stroke="#F5C77E" strokeWidth={5} fill="none" strokeLinecap="round"
          animate={walking ? { d: ['M68 70 Q82 60 78 48', 'M68 70 Q85 55 82 44', 'M68 70 Q82 60 78 48'] } : {}}
          transition={{ duration: 0.6, repeat: Infinity }} />
      </Bobbing>
    </svg>
  );
};

/* ══════════════════════════════════════════════════
   ROBOT character
   ══════════════════════════════════════════════════ */
const Robot = ({ s, walking, action, animate: anim }: InnerProps) => {
  const isWink = anim && action === 'wink';
  const isWave = anim && action === 'wave';
  const isDrop = anim && action === 'drop-flower';
  const isPresent = anim && action === 'present-flower';

  return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <Bobbing active={walking}>
        {/* Antenna */}
        <line x1="50" y1="12" x2="50" y2="22" stroke="#A0A0B0" strokeWidth="2" />
        <motion.circle cx="50" cy="10" r="4" fill="#6BE0F0"
          animate={anim ? { opacity: [1, 0.4, 1] } : {}} transition={{ duration: 0.8, repeat: Infinity }} />
        {/* Head */}
        <rect x="30" y="22" width="40" height="32" rx="8" fill="#C0C0D0" />
        <rect x="32" y="24" width="36" height="28" rx="6" fill="#D8D8E8" />
        {/* Eyes */}
        {isWink ? (
          <>
            <rect x="38" y="32" width="8" height="8" rx="2" fill="#1A1A2E" />
            <rect x="40" y="33" width="3" height="3" rx="1" fill="#6BE0F0" />
            <motion.line x1="54" y1="36" x2="62" y2="36" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.15 }} />
          </>
        ) : (
          <>
            <rect x="38" y="32" width="8" height="8" rx="2" fill="#1A1A2E" />
            <rect x="54" y="32" width="8" height="8" rx="2" fill="#1A1A2E" />
            <rect x="40" y="33" width="3" height="3" rx="1" fill="#6BE0F0" />
            <rect x="56" y="33" width="3" height="3" rx="1" fill="#6BE0F0" />
          </>
        )}
        <rect x="42" y="44" width="16" height="3" rx="1.5" fill="#1A1A2E" />
        <circle cx="36" cy="42" r="2" fill="#FF6B8A" opacity="0.5" />
        <circle cx="64" cy="42" r="2" fill="#FF6B8A" opacity="0.5" />
        {/* Body */}
        <rect x="32" y="56" width="36" height="28" rx="6" fill="#C0C0D0" />
        <rect x="34" y="58" width="32" height="24" rx="4" fill="#D8D8E8" />
        <rect x="42" y="62" width="16" height="10" rx="3" fill="#1A1A2E" />
        <motion.circle cx="46" cy="67" r="2" fill="#6BE0F0"
          animate={anim ? { opacity: [1, 0.3, 1] } : {}} transition={{ duration: 1.2, repeat: Infinity }} />
        <circle cx="54" cy="67" r="2" fill="#FF6B8A" />
        {/* Arms */}
        {isWave ? (
          <>
            <rect x="22" y="58" width="8" height="20" rx="4" fill="#C0C0D0" />
            <circle cx="26" cy="80" r="4" fill="#D8D8E8" />
            <motion.g animate={{ rotate: [0, -30, 20, -30, 0] }} transition={{ duration: 1.2, repeat: 2 }}
              style={{ transformOrigin: '74px 58px' }}>
              <rect x="70" y="42" width="8" height="20" rx="4" fill="#C0C0D0" />
              <circle cx="74" cy="40" r="4" fill="#D8D8E8" />
            </motion.g>
          </>
        ) : isDrop || isPresent ? (
          <>
            <rect x="22" y="58" width="8" height="20" rx="4" fill="#C0C0D0" />
            <circle cx="26" cy="80" r="4" fill="#D8D8E8" />
            <motion.g initial={{ rotate: 0 }} animate={{ rotate: -50 }}
              transition={{ duration: 0.5 }} style={{ transformOrigin: '74px 58px' }}>
              <rect x="70" y="48" width="8" height="20" rx="4" fill="#C0C0D0" />
              <circle cx="74" cy="46" r="4" fill="#D8D8E8" />
            </motion.g>
          </>
        ) : (
          <>
            <rect x="22" y="58" width="8" height="20" rx="4" fill="#C0C0D0" />
            <rect x="70" y="58" width="8" height="20" rx="4" fill="#C0C0D0" />
            <circle cx="26" cy="80" r="4" fill="#D8D8E8" />
            <circle cx="74" cy="80" r="4" fill="#D8D8E8" />
          </>
        )}
        {/* Legs */}
        {walking ? (
          <WalkingLegs
            left={{ x: 38, y: 84, w: 8, h: 10, fill: '#A0A0B0' }}
            right={{ x: 54, y: 84, w: 8, h: 10, fill: '#A0A0B0' }}
          />
        ) : (
          <>
            <rect x="38" y="84" width="8" height="10" rx="3" fill="#A0A0B0" />
            <rect x="54" y="84" width="8" height="10" rx="3" fill="#A0A0B0" />
          </>
        )}
        <rect x="36" y="92" width="12" height="4" rx="2" fill="#C0C0D0" />
        <rect x="52" y="92" width="12" height="4" rx="2" fill="#C0C0D0" />
      </Bobbing>
    </svg>
  );
};

/* ══════════════════════════════════════════════════
   GHOST character
   ══════════════════════════════════════════════════ */
const Ghost = ({ s, walking, action, animate: anim }: InnerProps) => {
  const isWink = anim && action === 'wink';

  return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <motion.g
        animate={walking
          ? { y: [0, -6, 0], x: [0, 2, -2, 0] }
          : { y: [0, -4, 0] }}
        transition={{ duration: walking ? 0.7 : 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M28 55 Q28 18 50 18 Q72 18 72 55 L72 80 Q66 74 60 80 Q54 86 48 80 Q42 74 36 80 Q30 86 28 80Z" fill="white" opacity="0.9" />
        <path d="M30 55 Q30 20 50 20 Q70 20 70 55 L70 78 Q65 73 60 78 Q55 83 48 78 Q42 73 37 78 Q32 83 30 78Z" fill="#F0F0FF" />
        <WinkEye cx={42} cy={42} rx={5} ry={6} fill="#1A1A2E" wink={false} />
        <WinkEye cx={58} cy={42} rx={5} ry={6} fill="#1A1A2E" wink={!!isWink} />
        <circle cx="43" cy="40" r="2" fill="white" opacity={isWink ? 0 : 0.8} />
        <circle cx="59" cy="40" r="2" fill="white" opacity={isWink ? 0 : 0.8} />
        <ellipse cx="36" cy="50" rx="4" ry="2.5" fill="#FFB6C1" opacity="0.4" />
        <ellipse cx="64" cy="50" rx="4" ry="2.5" fill="#FFB6C1" opacity="0.4" />
        <ellipse cx="50" cy="54" rx="3" ry="2" fill="#1A1A2E" opacity="0.3" />
        <ellipse cx="50" cy="50" rx="26" ry="35" fill="white" opacity="0.05" />
      </motion.g>
    </svg>
  );
};

/* ══════════════════════════════════════════════════
   BUTTERFLY character
   ══════════════════════════════════════════════════ */
const Butterfly = ({ s, walking, action, animate: anim }: InnerProps) => {
  const isWink = anim && action === 'wink';
  const flap = walking || (anim && (action === 'wave' || action === 'present-flower'));

  return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <motion.g animate={walking ? { y: [0, -8, 0], x: [0, 3, -3, 0] } : { y: [0, -3, 0] }}
        transition={{ duration: walking ? 0.8 : 2, repeat: Infinity, ease: 'easeInOut' }}>
        {/* Wings */}
        <motion.ellipse cx="30" cy="42" rx="20" ry="24" fill="#B07ED6" opacity="0.8"
          animate={flap ? { rx: [20, 8, 20] } : {}} transition={{ duration: 0.4, repeat: Infinity }} />
        <motion.ellipse cx="70" cy="42" rx="20" ry="24" fill="#B07ED6" opacity="0.8"
          animate={flap ? { rx: [20, 8, 20] } : {}} transition={{ duration: 0.4, repeat: Infinity }} />
        <motion.ellipse cx="34" cy="68" rx="14" ry="16" fill="#D4A0E8" opacity="0.7"
          animate={flap ? { rx: [14, 5, 14] } : {}} transition={{ duration: 0.4, repeat: Infinity }} />
        <motion.ellipse cx="66" cy="68" rx="14" ry="16" fill="#D4A0E8" opacity="0.7"
          animate={flap ? { rx: [14, 5, 14] } : {}} transition={{ duration: 0.4, repeat: Infinity }} />
        <ellipse cx="28" cy="38" rx="8" ry="10" fill="#E0B0F0" opacity="0.6" />
        <ellipse cx="72" cy="38" rx="8" ry="10" fill="#E0B0F0" opacity="0.6" />
        <circle cx="30" cy="40" r="4" fill="#FF8FAB" opacity="0.5" />
        <circle cx="70" cy="40" r="4" fill="#FF8FAB" opacity="0.5" />
        {/* Body */}
        <ellipse cx="50" cy="50" rx="4" ry="22" fill="#3D2B50" />
        <circle cx="50" cy="28" r="6" fill="#3D2B50" />
        <WinkEye cx={48} cy={27} rx={1.5} ry={1.5} fill="white" wink={false} />
        <WinkEye cx={52} cy={27} rx={1.5} ry={1.5} fill="white" wink={!!isWink} />
        <circle cx="48" cy="27" r="0.8" fill="#1A1A2E" />
        {!isWink && <circle cx="52" cy="27" r="0.8" fill="#1A1A2E" />}
        <path d="M48 24 Q42 14 38 12" stroke="#3D2B50" strokeWidth="1" fill="none" />
        <path d="M52 24 Q58 14 62 12" stroke="#3D2B50" strokeWidth="1" fill="none" />
        <circle cx="38" cy="12" r="2" fill="#B07ED6" />
        <circle cx="62" cy="12" r="2" fill="#B07ED6" />
      </motion.g>
    </svg>
  );
};

/* ── inner props type ── */
interface InnerProps {
  s: number;
  walking: boolean;
  action?: AnimationAction;
  animate: boolean;
}

/* ── Character map ── */
const characterMap: Record<CharacterType, React.FC<InnerProps>> = {
  girl: Girl,
  boy: Boy,
  cat: Cat,
  robot: Robot,
  ghost: Ghost,
  butterfly: Butterfly,
};

/* ── Public component ── */
export const CharacterSVG = ({ character, action, size = 80, animate = false, walking = false }: CharacterSVGProps) => {
  const Char = characterMap[character];
  return (
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      <Char s={size} walking={walking} action={action} animate={animate} />
    </div>
  );
};
