import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, BarChart3, Mail, Linkedin, Globe } from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import type { BloomCard } from '@/types/bloom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { SidebarFooter } from '@/components/ui/sidebar';
import { fetchGlobalBlooms, fetchMyBlooms } from '@/lib/bloomService';

const bouquetSizeToCount: Record<string, number> = {
  single: 1,
  small: 3,
  large: 5,
};

const bouquetSizeToStyle: Record<string, string> = {
  single: 'Single',
  small: 'Ribbon Tie',
  large: 'Full Wrap',
};

interface AppSidebarProps {
  card?: BloomCard | null;
  bloomVersion?: number;
}

type OverlayType = 'vision' | 'analytics' | null;

export function AppSidebar({ card, bloomVersion = 0 }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const [overlay, setOverlay] = useState<OverlayType>(null);

  const flowerCount = card ? bouquetSizeToCount[card.bouquetSize] ?? 1 : 1;
  const flowerType = card?.flowerType ?? 'rose';
  const bouquetStyle = card ? bouquetSizeToStyle[card.bouquetSize] ?? 'Single' : 'Single';

  return (
    <>
      <Sidebar side="left" collapsible="icon" className="border-none">
        <div className="flex h-full w-full flex-col glass-card border-r border-border/30">
          {/* Header - Logo */}
          <SidebarHeader className="items-center pt-6 pb-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-12 h-12 rounded-full border-2 border-primary/40 flex items-center justify-center"
              style={{
                background: 'hsl(var(--glass-bg))',
                backdropFilter: 'blur(var(--glass-blur))',
                boxShadow: '0 0 30px hsl(var(--primary) / 0.15), inset 0 0 20px hsl(var(--primary) / 0.05)',
              }}
            >
              <span className="font-display text-base text-primary tracking-wide italic">
                B.S
              </span>
            </motion.div>
            <p className={cn(
              "text-[10px] text-muted-foreground font-sans mt-1.5 tracking-widest uppercase",
              collapsed ? "md:hidden" : ""
            )}>
              BloomForYou
            </p>
          </SidebarHeader>

          <SidebarContent className="px-1 pt-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Our Vision"
                  onClick={() => setOverlay('vision')}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground/60 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                >
                  <Eye className="h-4 w-4 shrink-0" />
                  <span className="text-xs font-body tracking-wide">About Us</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Bouquet Analytics"
                  onClick={() => setOverlay('analytics')}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground/60 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
                >
                  <BarChart3 className="h-4 w-4 shrink-0" />
                  <span className="text-xs font-body tracking-wide">Stats</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          {/* Contact Section */}
          <div className="mt-auto px-2 pb-2 pt-4 border-t border-border/20 flex flex-col items-center gap-2 w-full">
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-sans mb-1">Connect</p>
            <p className={cn(
              "text-[10px] text-muted-foreground/80 font-sans text-center leading-relaxed mb-2 px-2",
              collapsed && "md:hidden"
            )}>
              For feedback, custom collaborations, or business queries, contact me at:
            </p>
            <div className={cn(
              "flex items-center justify-center gap-3",
              collapsed && "md:flex-col md:gap-2"
            )}>
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.target}
                  rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-foreground/40 transition-all duration-300 hover:text-[hsl(var(--accent-leaf))] hover:shadow-[0_0_12px_hsl(var(--accent-leaf)/0.4)]"
                  title={link.label}
                >
                  <link.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Live Global Blooms Counter */}
          <LiveBloomCounter bloomVersion={bloomVersion} collapsed={collapsed} />
        </div>
      </Sidebar>

      {/* Overlay System */}
      <AnimatePresence>
        {overlay && (
          <motion.div
            key="overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-4 p-0"
            style={{ backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)', background: 'hsl(var(--background) / 0.6)' }}
            onClick={() => setOverlay(null)}
          >
            <motion.div
              key="overlay-content"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg h-full md:h-auto md:max-h-[85vh] rounded-none md:rounded-2xl border border-border/30 flex flex-col"
              style={{
                background: 'hsl(var(--glass-bg))',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 60px hsl(var(--background) / 0.5), 0 0 40px hsl(var(--primary) / 0.08)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setOverlay(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors hover:bg-foreground/5"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="overflow-y-auto flex-1 p-6 md:p-8">
                {overlay === 'vision' && <VisionContent />}
                {overlay === 'analytics' && (
                  <AnalyticsContent
                    flowerCount={flowerCount}
                    flowerType={flowerType}
                    bouquetStyle={bouquetStyle}
                    bloomVersion={bloomVersion}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const contactLinks = [
  { label: 'Email', icon: Mail, href: 'mailto:BushraSiraj586@gmail.com', target: '_self' as const },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/bushrasiraj/', target: '_blank' as const },
  { label: 'Portfolio', icon: Globe, href: 'https://bushrasiraj-portfolio.lovable.app/', target: '_blank' as const },
];

function VisionContent() {
  return (
    <div className="pr-6">
      <h2 className="font-display text-xl text-primary mb-1">Our Vision</h2>
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-6 font-body">About BloomForYou</p>

      <div className="space-y-3">
        {[
          'Made by a DS & AI Student. BloomForYou is for those who love the art of giving.',
          "It was born from a simple idea: everyone deserves a bouquet that never fades. Whether you're a flower lover or looking for that perfect 'just because' gift, I built this space to make digital gifting feel as personal as a hand-picked bunch.",
          'Every petal, face, and leaf is a product of my journey in AI and digital design.',
        ].map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="p-4 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(200, 100, 150, 0.2)',
            }}
          >
            <p className="text-sm leading-relaxed text-foreground/70 font-body">{text}</p>
          </motion.div>
        ))}
      </div>

      {/* Let's Connect Footer */}
      <div className="mt-8 pt-5 border-t border-border/20">
        <p className="font-display text-sm text-primary mb-3 italic">Let's Connect</p>
        <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.target}
              rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/20 text-foreground/50 text-xs font-display transition-all duration-300 hover:text-[hsl(var(--accent-leaf))] hover:border-[hsl(var(--accent-leaf)/0.3)] hover:shadow-[0_0_12px_hsl(var(--accent-leaf)/0.3)]"
            >
              <link.icon className="h-3 w-3" />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsContent({
  flowerCount,
  flowerType,
  bouquetStyle,
  bloomVersion,
}: {
  flowerCount: number;
  flowerType: string;
  bouquetStyle: string;
  bloomVersion: number;
}) {
  const [globalBlooms, setGlobalBlooms] = useState(0);
  const [myBlooms, setMyBlooms] = useState(0);

  // Fetch on mount and when bloomVersion changes
  useEffect(() => {
    fetchGlobalBlooms().then(setGlobalBlooms);
    fetchMyBlooms().then(setMyBlooms);
  }, [bloomVersion]);

  // Real-time subscription for personal blooms
  useEffect(() => {
    const channel = supabase
      .channel('my-blooms-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'user_flower_history' },
        () => {
          // Re-fetch personal count on any insert (RLS filters to own rows)
          fetchMyBlooms().then(setMyBlooms);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  // Real-time subscription for global blooms
  useEffect(() => {
    const channel = supabase
      .channel('analytics-global-realtime')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'global_stats', filter: 'id=eq.1' },
        (payload) => {
          const newCount = Number(payload.new?.total_blooms ?? 0);
          if (newCount > 0) setGlobalBlooms(newCount);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const stats = [
    { label: 'Total Blooms Worldwide', value: globalBlooms.toLocaleString(), animated: true, rawValue: globalBlooms },
    { label: 'My Total Blooms', value: myBlooms.toLocaleString(), animated: true, rawValue: myBlooms },
    { label: 'Flowers in This Bouquet', value: String(flowerCount), animated: false, rawValue: 0 },
    { label: 'Flower Type', value: flowerType === 'cherry-blossom' ? 'Sakura' : flowerType, animated: false, rawValue: 0 },
    { label: 'Style', value: bouquetStyle, animated: false, rawValue: 0 },
  ];

  return (
    <div className="pr-6">
      <h2 className="font-display text-xl text-primary mb-1">Bouquet Analytics</h2>
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-6 font-body">Live Dashboard</p>

      <div className="space-y-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="flex items-center justify-between p-4 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(200, 100, 150, 0.2)',
            }}
          >
            <span className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">{stat.label}</span>
            {stat.animated ? (
              <AnimatedNumber value={Number(stat.rawValue)} className="text-sm font-display text-primary tabular-nums" />
            ) : (
              <span className="text-sm font-display text-primary capitalize">{stat.value}</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LiveBloomCounter({ bloomVersion, collapsed }: { bloomVersion: number; collapsed: boolean }) {
  const [globalBlooms, setGlobalBlooms] = useState(0);

  // Fetch on mount and when bloomVersion changes
  useEffect(() => {
    fetchGlobalBlooms().then(setGlobalBlooms);
  }, [bloomVersion]);

  // Real-time subscription to global_stats
  useEffect(() => {
    const channel = supabase
      .channel('global-blooms-realtime')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'global_stats', filter: 'id=eq.1' },
        (payload) => {
          const newCount = Number(payload.new?.total_blooms ?? 0);
          if (newCount > 0) setGlobalBlooms(newCount);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="px-4 pb-8 pt-4 flex flex-col items-center justify-center gap-1.5 w-full border-t border-border/20">
      <p className="text-[9px] text-muted-foreground font-sans tracking-[0.2em] uppercase">
        Global Blooms
      </p>
      <div className="flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.6)]" />
        </span>
        <AnimatedNumber value={globalBlooms} className="text-base font-display text-primary tabular-nums" />
      </div>
      <span className="text-[8px] text-muted-foreground/50 font-sans tracking-[0.15em] uppercase">
        Total Blooms Worldwide
      </span>
    </div>
  );
}
