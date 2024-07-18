import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const colors = [
  "bg-[#712c4a57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#4a712c57] text-[#00ff6e] border-[1px] border-[#00ffaa]",
  "bg-[#2c4a7157] text-[#006eff] border-[1px] border-[#006effaa]",
  "bg-[#ff5733] text-[#ffffff] border-[1px] border-[#c70039]",
  "bg-[#33ff57] text-[#000000] border-[1px] border-[#28a745]",
  "bg-[#5733ff] text-[#ffffff] border-[1px] border-[#1d3c87]"
];
export const getColors = (index) => {
  if (index >= 0 && index < colors.length) {
    return colors[index];
  }
  return colors[0];
};