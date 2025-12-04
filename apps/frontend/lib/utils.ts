import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function countCharacters(str: string) {
  const segmenter = new Intl.Segmenter("my", { granularity: "grapheme" });
  return [...segmenter.segment(str)].length;
}

const emojies = [
  "🥰",
  "😘",
  "😚",
  "😁",
  "🫶",
  "🫣🤭",
  "😳",
  "🍓🍓🍓🍓🍓",
  "❤️",
];

export function randomEmoji() {
  const randomValue = Math.floor(Math.random() * emojies.length);
  return emojies[randomValue];
}
