import { motion } from 'framer-motion';
import type { BloomCard } from '@/types/bloom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from '@/components/ui/sidebar';

const bouquetSizeToCount: Record<string, number> = {
  single: 1,
  small: 3,
  large: 5,
};

interface AppSidebarProps {
  card?: BloomCard | null;
}

export function AppSidebar({ card }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const flowerCount = card ? bouquetSizeToCount[card.bouquetSize] ?? 1 : 1;
  const flowerType = card?.flowerType ?? 'rose';

  return (
    <Sidebar side="right" collapsible="offcanvas" className="border-none">
      <div className="flex h-full w-full flex-col glass-card border-l border-border/30 overflow-y-auto">
        {/* Header - Logo */}
        <SidebarHeader className="items-center pt-6 pb-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-16 h-16 rounded-full border-2 border-primary/40 flex items-center justify-center"
            style={{
              background: 'hsl(var(--glass-bg))',
              backdropFilter: 'blur(var(--glass-blur))',
              boxShadow: '0 0 30px hsl(var(--primary) / 0.15), inset 0 0 20px hsl(var(--primary) / 0.05)',
            }}
          >
            <span className="font-display text-xl text-primary tracking-wide italic">
              B.S
            </span>
          </motion.div>
          {!collapsed && (
            <p className="text-[10px] text-muted-foreground font-body mt-1.5 tracking-widest uppercase">
              BloomForYou
            </p>
          )}
        </SidebarHeader>

        <SidebarContent className="px-1">
          {/* About Section */}
          {!collapsed && (
            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] text-primary/70 uppercase tracking-widest font-body">
                About
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-2 py-3">
                  <p className="text-[11px] leading-relaxed text-foreground/60 font-body">
                    Made by a DS & AI Student. BloomForYou is for those who love the art of giving.
                  </p>
                  <p className="text-[11px] leading-relaxed text-foreground/60 font-body mt-2">
                    It was born from a simple idea: everyone deserves a bouquet that never fades. Whether you're a flower lover or looking for that perfect 'just because' gift, I built this space to make digital gifting feel as personal as a hand-picked bunch.
                  </p>
                  <p className="text-[11px] leading-relaxed text-foreground/60 font-body mt-2">
                    Every petal, face, and leaf is a product of my journey in AI and digital design.
                  </p>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Live Stats */}
          {!collapsed && (
            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] text-primary/70 uppercase tracking-widest font-body">
                Bouquet Analytics
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="mx-2 p-3 rounded-xl" style={{
                  background: 'hsl(var(--glass-bg))',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid hsl(var(--glass-border))',
                }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">Flower Count</span>
                    <motion.span
                      key={flowerCount}
                      initial={{ scale: 1.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-lg font-display text-primary"
                    >
                      {flowerCount}
                    </motion.span>
                  </div>
                  <div className="h-px bg-border/30 mb-3" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">Flower Type</span>
                    <motion.span
                      key={flowerType}
                      initial={{ x: 10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="text-xs font-body text-foreground/80 capitalize"
                    >
                      {flowerType === 'cherry-blossom' ? 'Sakura' : flowerType}
                    </motion.span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="pb-4">
          {!collapsed && (
            <p className="text-[9px] text-muted-foreground/40 text-center font-body tracking-wider">
              © B.S | BloomForYou
            </p>
          )}
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
