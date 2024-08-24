import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
const COLORS = [
  "#FF5733",
  "#105c40",
  "#5733FF",
  "#FF33A1",
  "#6b381a",
  "#33A1FF",
  "#FF3366",
  "#00387d",
  "#3366FF",
  "#FFAA33",
];
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toColor(seed: number) {
  return COLORS[seed % COLORS.length];
};


// Generate a cursor color based on dark or light mode
const toHex = (value: number) => (value.toString(16).padStart(2, "0"));
export const generateCursorColor = (isDarkMode: boolean) => {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  if (isDarkMode) {
    r = Math.min(255, r + 50);
    g = Math.min(255, g + 50);
    b = Math.min(255, b + 50);
  } else {
    r = Math.max(0, r - 50);
    g = Math.max(0, g - 50);
    b = Math.max(0, b - 50);
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const hashCode = (str: string) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

const intToRGB = (i: number) => {
  var c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}

export const stringToColor = (str: string) => "#" + intToRGB(hashCode(str));