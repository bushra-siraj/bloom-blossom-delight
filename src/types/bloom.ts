export type FlowerType = 'rose' | 'tulip' | 'daisy' | 'lily' | 'sunflower' | 'cherry-blossom';
export type FlowerColor = 'rose' | 'lavender' | 'mint' | 'peach' | 'sky' | 'gold';
export type LeafStyle = 'classic' | 'round' | 'pointed' | 'none';
export type CardBg = 'midnight' | 'aurora' | 'sunset' | 'ocean' | 'forest';
export type FontStyle = 'elegant' | 'playful' | 'modern' | 'handwritten';
export type Decoration = 'bow' | 'hearts' | 'sparkles' | 'stars' | 'none';
export type CharacterType = 'girl' | 'boy' | 'cat' | 'robot' | 'ghost' | 'butterfly';
export type AnimationAction = 'wink' | 'wave' | 'drop-flower' | 'present-flower';

export interface BloomCard {
  flowerType: FlowerType;
  flowerColor: FlowerColor;
  leafStyle: LeafStyle;
  cardBg: CardBg;
  fontStyle: FontStyle;
  decoration: Decoration;
  message: string;
  senderName: string;
  character: CharacterType;
  animation: AnimationAction;
}

export const defaultCard: BloomCard = {
  flowerType: 'rose',
  flowerColor: 'rose',
  leafStyle: 'classic',
  cardBg: 'midnight',
  fontStyle: 'elegant',
  decoration: 'sparkles',
  message: 'You are blooming wonderful! 🌸',
  senderName: '',
  character: 'girl',
  animation: 'present-flower',
};
