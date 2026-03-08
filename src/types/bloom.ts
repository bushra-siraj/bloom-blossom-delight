export type FlowerType = 'rose' | 'tulip' | 'daisy' | 'lily' | 'sunflower' | 'cherry-blossom';
export type FlowerColor = 'rose' | 'lavender' | 'mint' | 'peach' | 'sky' | 'gold';
export type LeafStyle = 'classic' | 'round' | 'pointed' | 'none';
export type BouquetSize = 'single' | 'small' | 'large';
export type Environment = 'midnight' | 'sunset' | 'forest';
export type CardBg = 'midnight' | 'aurora' | 'sunset' | 'ocean' | 'forest';
export type FontStyle = 'elegant' | 'playful' | 'modern' | 'handwritten';
export type Decoration = 'bow' | 'hearts' | 'sparkles' | 'stars' | 'none';
export type CharacterType = 'girl' | 'boy' | 'cat' | 'robot' | 'ghost' | 'butterfly';
export type AnimationAction = 'wink' | 'wave' | 'drop-flower' | 'present-flower';

export interface BloomCard {
  flowerType: FlowerType;
  flowerColor: FlowerColor;
  leafStyle: LeafStyle;
  bouquetSize: BouquetSize;
  environment: Environment;
  cardBg: CardBg;
  fontStyle: FontStyle;
  decoration: Decoration;
  message: string;
  senderName: string;
  character: CharacterType;
  animation: AnimationAction;
  petalColor: string;
  glowColor: string;
  particleColor: string;
  cardColor: string;
}

export const defaultCard: BloomCard = {
  flowerType: 'rose',
  flowerColor: 'rose',
  leafStyle: 'classic',
  bouquetSize: 'single',
  environment: 'midnight',
  cardBg: 'midnight',
  fontStyle: 'elegant',
  decoration: 'sparkles',
  message: 'You are blooming wonderful!',
  senderName: '',
  character: 'girl',
  animation: 'present-flower',
  petalColor: '#e8729a',
  glowColor: '#e8729a',
  particleColor: '#f5e066',
  cardColor: '#1a1025',
};
