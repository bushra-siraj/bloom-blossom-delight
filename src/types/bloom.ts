export type FlowerType = 'rose' | 'tulip' | 'daisy' | 'lily' | 'sunflower' | 'cherry-blossom';
export type FlowerColor = 'rose' | 'lavender' | 'mint' | 'peach' | 'sky' | 'gold';
export type LeafStyle = 'classic' | 'round' | 'pointed' | 'none';
export type BouquetSize = 'single' | 'small' | 'large';
export type Environment = 'midnight' | 'sunset' | 'forest' | 'clouds';
export type CardStyle = 'classic' | 'polaroid' | 'envelope' | 'glass';
export type FontStyle = 'romantic' | 'handwritten' | 'modern';
export type Decoration = 'bow' | 'sparkles' | 'hearts' | 'butterflies' | 'vines' | 'none';
export type CharacterType = 'girl' | 'boy' | 'cat' | 'robot' | 'ghost' | 'butterfly';
export type AnimationAction = 'wink' | 'wave' | 'drop-flower' | 'present-flower';

export interface BloomCard {
  flowerType: FlowerType;
  flowerColor: FlowerColor;
  leafStyle: LeafStyle;
  bouquetSize: BouquetSize;
  environment: Environment;
  cardStyle: CardStyle;
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
  cardStyle: 'glass',
  fontStyle: 'romantic',
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
