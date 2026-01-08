'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface NeoPopRangeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  gradient?: string; // Custom gradient for the slider track
}

export default function NeoPopRange({ 
  label,
  gradient,
  className,
  ...props 
}: NeoPopRangeProps) {
  const gradientStyle = gradient 
    ? { background: gradient }
    : {};

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-[10px] text-[#888] w-8 uppercase">{label}</span>
      <input
        type="range"
        className="flex-1 h-1 rounded-lg appearance-none bg-gradient-to-r from-black via-[#888] to-white [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
        style={gradientStyle}
        {...props}
      />
    </div>
  );
}
