import type { FlowerColor } from '@/types/bloom';

export const colorMap: Record<FlowerColor, { petal: string; center: string; petalDark: string; petalLight: string; outline: string }> = {
  rose:     { petal: '#F4A7C1', center: '#3A2A2A', petalDark: '#D47A9A', petalLight: '#FBDAE8', outline: '#B8607A' },
  lavender: { petal: '#C9A0DC', center: '#4A3060', petalDark: '#9B6EBB', petalLight: '#E4D0F0', outline: '#8A5AAA' },
  mint:     { petal: '#7ED4A8', center: '#2A4A3A', petalDark: '#4AAE7A', petalLight: '#B8F0D4', outline: '#3A8A5A' },
  peach:    { petal: '#FFBD9E', center: '#5A3020', petalDark: '#E89570', petalLight: '#FFE0CC', outline: '#CC7A55' },
  sky:      { petal: '#8AC8F0', center: '#2A3A5A', petalDark: '#5AA0D0', petalLight: '#C4E4FF', outline: '#4A80B0' },
  gold:     { petal: '#FFD866', center: '#5A4020', petalDark: '#DDAA30', petalLight: '#FFF0AA', outline: '#BB8820' },
};

export function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, ((num >> 16) & 0xFF) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xFF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xFF) + amount));
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}
