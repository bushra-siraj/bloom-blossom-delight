import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, BarChart3, Mail, Linkedin, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
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
}

type OverlayType = 'vision' | 'analytics' | null;

export function AppSidebar({ card }: AppSidebarProps) {
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
            {!collapsed && (
              <p className="text-[10px] text-muted-foreground font-body mt-1.5 tracking-widest uppercase">
                BloomForYou
              </p>
            )}
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
          <div className="mt-auto px-2 pb-6 pt-4 border-t border-border/20 flex flex-col items-center gap-2 w-full">
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-sans mb-0.5">Connect</p>
            {!collapsed && (
              <p className="text-[8px] text-muted-foreground/70 font-sans text-center leading-relaxed mb-1.5 px-1">
                For feedback, custom collaborations, or business queries, contact me at:
              </p>
            )}
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

      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-foreground/70 font-body">
          Made by a DS & AI Student. BloomForYou is for those who love the art of giving.
        </p>
        <p className="text-sm leading-relaxed text-foreground/70 font-body">
          It was born from a simple idea: everyone deserves a bouquet that never fades. Whether you're a flower lover or looking for that perfect 'just because' gift, I built this space to make digital gifting feel as personal as a hand-picked bunch.
        </p>
        <p className="text-sm leading-relaxed text-foreground/70 font-body">
          Every petal, face, and leaf is a product of my journey in AI and digital design.
        </p>
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
}: {
  flowerCount: number;
  flowerType: string;
  bouquetStyle: string;
}) {
  const stats = [
    { label: 'Total Flowers', value: flowerCount },
    { label: 'Flower Type', value: flowerType === 'cherry-blossom' ? 'Sakura' : flowerType },
    { label: 'Style', value: bouquetStyle },
  ];

  return (
    <div className="pr-6">
      <h2 className="font-display text-xl text-primary mb-1">Bouquet Analytics</h2>
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-6 font-body">Live Dashboard</p>

      <div className="space-y-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between p-4 rounded-xl border border-border/20"
            style={{
              background: 'hsl(var(--glass-bg))',
            }}
          >
            <span className="text-xs text-muted-foreground font-body uppercase tracking-wider">{stat.label}</span>
            <span className="text-sm font-display text-primary capitalize">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
