import { motion } from 'framer-motion';

interface BloomLoaderProps {
  message?: string;
}

export const BloomLoader = ({ message = 'Loading...' }: BloomLoaderProps) => (
  <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
    <div className="text-center">
      <motion.div
        className="text-5xl mb-4"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌸
      </motion.div>
      <motion.p
        className="text-foreground/50 text-sm font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {message}
      </motion.p>
    </div>
  </div>
);
