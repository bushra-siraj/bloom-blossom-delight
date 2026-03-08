import { useState } from 'react';
import { motion } from 'framer-motion';
import { FloatingPetals } from '@/components/FloatingPetals';
import { FlowerCreator } from '@/components/FlowerCreator';
import { ReceiverExperience } from '@/components/ReceiverExperience';
import type { BloomCard } from '@/types/bloom';

const Index = () => {
  const [mode, setMode] = useState<'create' | 'preview'>('create');
  const [card, setCard] = useState<BloomCard | null>(null);

  const handleComplete = (c: BloomCard) => {
    setCard(c);
    setMode('preview');
  };

  const handleReset = () => {
    setCard(null);
    setMode('create');
  };

  if (mode === 'preview' && card) {
    return <ReceiverExperience card={card} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 relative overflow-hidden">
      <FloatingPetals count={12} />
      
      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 px-4"
        >
          <h1 className="text-3xl md:text-4xl font-display text-glow text-foreground tracking-tight">
            BloomForYou
          </h1>
          <p className="text-foreground/50 text-sm font-body mt-2">
            Design a digital flower & send it to someone special
          </p>
        </motion.div>

        <FlowerCreator onComplete={handleComplete} />
      </div>
    </div>
  );
};

export default Index;
