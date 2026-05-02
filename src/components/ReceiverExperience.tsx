import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { FlowerSVG } from './FlowerSVG';
import { CharacterSVG } from './CharacterSVG';
import { EnvironmentBg } from './EnvironmentBg';
import { FloatingPetals } from './FloatingPetals';
import { MessageCardRenderer } from './cards/MessageCardRenderer';
import { Switch } from '@/components/ui/switch';
import { playBloomChime, playPaperUnfold } from '@/lib/sounds';
import type { BloomCard } from '@/types/bloom';

type Phase = 'env' | 'intro' | 'walk' | 'pause' | 'action' | 'drop' | 'land' | 'bloom' | 'card';

interface ReceiverExperienceProps {
  card: BloomCard;
  onReset: () => void;
  shareUrl?: string;
}

const detectInAppBrowser = () => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const hasNativeWebView = typeof window !== 'undefined' && 'ReactNativeWebView' in window;
  return hasNativeWebView || /Instagram|FBAN|FBAV|FB_IAB|Messenger|Line|TikTok|Snapchat|Pinterest|LinkedInApp/i.test(ua);
};

const getExportSize = () => {
  if (typeof window === 'undefined') return { width: 360, height: 640 };
  return {
    width: Math.round(Math.max(320, Math.min(window.innerWidth || 360, 430))),
    height: Math.round(Math.max(568, Math.min(window.innerHeight || 640, 932))),
  };
};

const waitForPaint = () => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

const ExportBackdrop = ({ card }: { card: BloomCard }) => {
  const backgrounds: Record<string, string> = {
    midnight: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--secondary)) 48%, hsl(var(--background)) 100%)',
    sunset: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--primary) / 0.45) 42%, hsl(var(--accent) / 0.34) 100%)',
    forest: 'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--accent) / 0.22) 50%, hsl(var(--background)) 100%)',
    clouds: 'linear-gradient(180deg, hsl(var(--secondary)) 0%, hsl(var(--accent) / 0.3) 48%, hsl(var(--primary) / 0.24) 100%)',
  };

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: backgrounds[card.environment] }}>
      <div
        className="absolute rounded-full"
        style={{
          top: '7%',
          right: '10%',
          width: 74,
          height: 74,
          background: 'radial-gradient(circle at 38% 35%, hsl(var(--foreground)) 0%, hsl(var(--foreground) / 0.82) 52%, transparent 74%)',
          boxShadow: `0 0 80px ${card.glowColor}45`,
        }}
      />
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${(i * 19 + 8) % 92}%`,
            top: `${(i * 29 + 10) % 72}%`,
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            background: i % 4 === 0 ? card.glowColor : card.particleColor,
            opacity: i % 4 === 0 ? 0.7 : 0.45,
            boxShadow: `0 0 10px ${card.particleColor}70`,
          }}
        />
      ))}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '24%',
          background: 'linear-gradient(180deg, transparent 0%, hsl(var(--background) / 0.62) 55%, hsl(var(--background)) 100%)',
        }}
      />
    </div>
  );
};

const ExportScene = React.forwardRef<HTMLDivElement, { card: BloomCard; width: number; height: number }>(
  ({ card, width, height }, ref) => (
    <div
      ref={ref}
      data-bloom-export
      className="relative font-body text-foreground"
      style={{ width, minHeight: height, background: 'hsl(var(--background))', isolation: 'isolate' }}
    >
      <ExportBackdrop card={card} />
      <div className="relative z-10 flex min-h-full flex-col items-center justify-end gap-3 px-4 py-7" style={{ minHeight: height }}>
        <div className="flex-shrink-0" style={{ isolation: 'isolate', contain: 'layout style paint' }}>
          <FlowerSVG
            type={card.flowerType}
            color={card.flowerColor}
            leafStyle={card.leafStyle}
            bouquetSize={card.bouquetSize}
            size={card.bouquetSize === 'large' ? 72 : card.bouquetSize === 'small' ? 64 : 58}
            animate={false}
            customPetalColor={card.petalColor !== '#e8729a' ? card.petalColor : undefined}
          />
        </div>
        <div className="w-full max-w-xs">
          <MessageCardRenderer card={card} expanded />
        </div>
      </div>
    </div>
  )
);

ExportScene.displayName = 'ExportScene';

export const ReceiverExperience = ({ card, onReset, shareUrl }: ReceiverExperienceProps) => {

// Component body starts here (export moved above)
  const [phase, setPhase] = useState<Phase>('env');
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [captureMode, setCaptureMode] = useState(false);
  const [highQuality, setHighQuality] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const messageCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('intro'), 1500),
      setTimeout(() => setPhase('walk'), 4000),
      setTimeout(() => setPhase('pause'), 6000),
      setTimeout(() => setPhase('action'), 7000),
      setTimeout(() => setPhase('drop'), 8500),
      setTimeout(() => setPhase('land'), 9500),
      setTimeout(() => { setPhase('bloom'); playBloomChime(); }, 10500),
      setTimeout(() => { setPhase('card'); playPaperUnfold(); }, 14500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleSaveImage = async () => {
    if (saving) return;
    setSaving(true);
    setSaved(false);
    setSaveError(false);

    const toastId = toast.loading('Saving image…');

    // Detect in-app browsers (Instagram, Facebook, TikTok, etc.) where <a download> is blocked
    const ua = navigator.userAgent || '';
    const isInAppBrowser = /Instagram|FBAN|FBAV|FB_IAB|Messenger|Line|TikTok|Snapchat|Pinterest|LinkedInApp/i.test(ua);
    const fileName = 'bloom-for-you.png';
    let restored = false;

    // Helper that ALWAYS restores the screen smoothly — call from every exit path
    const restore = () => {
      if (restored) return;
      restored = true;
      setCaptureMode(false);
      setSaving(false);
    };

    // Switch to expanded capture mode so the message card shows full text (no scroll clipping)
    setCaptureMode(true);
    // Give React a couple frames to apply the expanded layout before snapshot
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
    await new Promise((r) => setTimeout(r, 50));

    const el = cardRef.current;
    if (!el) {
      restore();
      setSaveError(true);
      toast.error("Couldn't save image, please try again", { id: toastId, duration: 2500 });
      setTimeout(() => setSaveError(false), 3000);
      return;
    }

    try {
      const { default: html2canvas } = await import('html2canvas');
      const width = Math.ceil(el.scrollWidth || el.clientWidth || window.innerWidth);
      const height = Math.ceil(el.scrollHeight || el.clientHeight || window.innerHeight);
      const deviceScale = window.devicePixelRatio || 1;
      const desiredScale = highQuality
        ? Math.min(isInAppBrowser ? 1.75 : 2.5, Math.max(2, deviceScale))
        : Math.min(isInAppBrowser ? 1.25 : 2, Math.max(1.25, deviceScale));
      const maxPixels = highQuality ? 3_200_000 : 1_800_000;
      const safeScale = Math.max(1, Math.min(desiredScale, Math.sqrt(maxPixels / Math.max(width * height, 1))));

      const canvas = await html2canvas(el, {
        backgroundColor: '#1a1020',
        scale: safeScale,
        useCORS: true,
        logging: false,
        width,
        height,
        windowWidth: width,
        windowHeight: height,
      });

      // Restore immediately after html2canvas finishes so Instagram's webview
      // never stays stuck in the expanded capture layout while the share sheet opens.
      restore();
      await new Promise(requestAnimationFrame);

      // Convert canvas → blob
      const blob: Blob = await new Promise((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png');
      });

      const file = new File([blob], fileName, { type: 'image/png' });
      const navAny = navigator as Navigator & {
        canShare?: (data: { files: File[] }) => boolean;
        share?: (data: { files: File[]; title?: string }) => Promise<void>;
      };

      let succeeded = false;

      if (navAny.canShare && navAny.canShare({ files: [file] }) && navAny.share) {
        try {
          await navAny.share({ files: [file], title: 'Your bloom 🌸' });
          succeeded = true;
        } catch (shareErr) {
          if ((shareErr as Error)?.name === 'AbortError') {
            // User cancelled — silent exit, screen already restored
            toast.dismiss(toastId);
            return;
          }
          // fall through to fallback
        }
      }

      if (!succeeded) {
        const blobUrl = URL.createObjectURL(blob);

        if (isInAppBrowser) {
          // In Instagram/FB webview, programmatic downloads are blocked.
          // Open the image in a new tab so the user can long-press → "Save image".
          const win = window.open(blobUrl, '_blank');
          if (!win) {
            // Popup blocked → navigate same-tab as last resort
            window.location.href = blobUrl;
          }
          setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
        } else {
          const link = document.createElement('a');
          link.download = fileName;
          link.href = blobUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(blobUrl), 10_000);
        }
        succeeded = true;
      }

      if (succeeded) {
        setSaved(true);
        toast.success('Image saved ✨', { id: toastId, duration: 2500 });
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (err) {
      console.error('Save image failed:', err);
      restore();
      setSaveError(true);
      toast.error("Couldn't save image, please try again", { id: toastId, duration: 2500 });
      setTimeout(() => setSaveError(false), 3000);
    }
  };

  const handleCopyLink = () => {
    const url = shareUrl || window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  const phaseIndex = ['env', 'intro', 'walk', 'pause', 'action', 'drop', 'land', 'bloom', 'card'].indexOf(phase);

  return (
    <div className="fixed inset-0 overflow-hidden" ref={cardRef}>
      <EnvironmentBg environment={card.environment} particleColor={card.particleColor} glowColor={card.glowColor} />
      {phaseIndex >= 7 && <FloatingPetals count={12} color={card.petalColor} />}

      <div className="relative z-10 flex flex-col items-center justify-end h-full px-4 pb-6 safe-area-inset overflow-hidden">
        {/* "Someone sent you a flower" text */}
        <AnimatePresence>
          {phase === 'intro' && (
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8 }} className="text-center absolute top-1/2 -translate-y-1/2">
              <motion.p className="text-2xl md:text-3xl font-display text-glow text-foreground leading-relaxed"
                animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity }}>
                Someone sent you a flower
              </motion.p>
              <motion.div className="mt-4 flex justify-center gap-2"
                animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
                {[0, 1, 2].map(i => (
                  <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/60"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, delay: i * 0.3, repeat: Infinity }} />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Character */}
        <AnimatePresence>
          {phaseIndex >= 2 && phaseIndex <= 7 && (
            <motion.div
              initial={{ x: '-50vw', opacity: 0 }}
              animate={{
                x: phaseIndex >= 3 ? 0 : '-20vw',
                opacity: phaseIndex >= 7 ? 0 : 1,
                scale: phaseIndex >= 7 ? 0.7 : 1,
              }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute bottom-[24%]"
            >
              <CharacterSVG character={card.character}
                action={phaseIndex >= 4 ? card.animation : undefined}
                size={130} animate={phaseIndex >= 4 && phaseIndex <= 6}
                walking={phaseIndex <= 3} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flower drops + blooms — isolated, scaled to fit */}
        <AnimatePresence>
          {phaseIndex >= 5 && phase !== 'card' && (
            <motion.div
              initial={{ y: -100, opacity: 0, scale: 0 }}
              animate={{
                y: phaseIndex >= 6 ? 0 : -50,
                opacity: 1,
                scale: phaseIndex >= 7 ? 1 : 0.5,
              }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
              className="absolute bottom-[20%]"
              style={{ isolation: 'isolate', contain: 'layout style paint', willChange: 'transform' }}
            >
              <FlowerSVG type={card.flowerType} color={card.flowerColor}
                leafStyle={card.leafStyle} bouquetSize={card.bouquetSize}
                size={phaseIndex >= 7 ? 100 : 60} animate={phaseIndex === 7}
                customPetalColor={card.petalColor !== '#e8729a' ? card.petalColor : undefined} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card phase: bouquet + card + buttons stacked vertically */}
        <AnimatePresence>
          {phase === 'card' && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full flex flex-col items-center z-20 gap-3 max-w-xs mx-auto"
            >
              {/* Compact bouquet above card */}
              <div className="flex-shrink-0" style={{ isolation: 'isolate', contain: 'layout style paint' }}>
                <FlowerSVG type={card.flowerType} color={card.flowerColor}
                  leafStyle={card.leafStyle} bouquetSize={card.bouquetSize}
                  size={card.bouquetSize === 'large' ? 55 : card.bouquetSize === 'small' ? 50 : 45}
                  customPetalColor={card.petalColor !== '#e8729a' ? card.petalColor : undefined} />
              </div>

              {/* Message card — animates layout smoothly when expanding/collapsing for capture */}
              <motion.div
                ref={messageCardRef}
                layout
                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full"
              >
                <MessageCardRenderer card={card} expanded={captureMode} />
              </motion.div>

              {/* Buttons (hidden in saved image) */}
              <AnimatePresence>
                {!captureMode && (
                  <motion.div
                    key="actions"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-full flex flex-col items-center gap-3"
                  >
                    <label className="glass-card px-4 py-2.5 min-h-[44px] flex items-center gap-3 text-xs font-body text-foreground/70 select-none">
                      <Switch
                        checked={highQuality}
                        onCheckedChange={setHighQuality}
                        disabled={saving}
                        aria-label="High quality export"
                        className="scale-90"
                      />
                      High quality
                    </label>

                    <div className="flex gap-2.5 flex-wrap justify-center">
                      <button onClick={handleCopyLink}
                        className="glass-card px-5 py-3 min-h-[44px] text-xs font-body text-foreground/70 hover:text-foreground transition-all flex items-center gap-2 hover:shadow-[0_0_15px_hsl(330_60%_65%/0.15)] active:scale-95">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                        </svg>
                        {copied ? 'Copied!' : 'Copy Link'}
                      </button>
                      <button onClick={handleSaveImage} disabled={saving}
                        className={`glass-card px-5 py-3 min-h-[44px] text-xs font-body transition-all flex items-center gap-2 active:scale-95 ${saving ? 'text-foreground/50 cursor-wait' : saved ? 'text-primary' : saveError ? 'text-red-400' : 'text-foreground/70 hover:text-foreground hover:shadow-[0_0_15px_hsl(330_60%_65%/0.15)]'}`}>
                        {saving ? (
                          <>
                            <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                            Saving...
                          </>
                        ) : saved ? (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Image saved ✨
                          </>
                        ) : saveError ? (
                          "Couldn't save, try again"
                        ) : (
                          <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Save Image
                          </>
                        )}
                      </button>
                    </div>

                    <button onClick={onReset}
                      className="glass-card px-6 py-3 min-h-[44px] text-sm font-body text-primary transition-all glow-border hover:shadow-[0_0_25px_hsl(330_60%_65%/0.3)] active:scale-95">
                      🌸 Create your own bloom
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
