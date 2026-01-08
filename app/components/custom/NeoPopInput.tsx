'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface NeoPopInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // All standard input props are inherited
}

export default function NeoPopInput({ 
  className,
  ...props 
}: NeoPopInputProps) {
  return (
    <input
      className={cn(
        "bg-[var(--cred-surface)] border border-[var(--cred-border)] p-4 text-white text-base w-full shadow-[4px_4px_0px_rgba(0,0,0,0.5)] transition-all duration-200 outline-none hover:bg-[#1a1a1a] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.6)] focus:border-[var(--neopop-white)] focus:bg-[var(--cred-dark)] focus:shadow-[6px_6px_0px_rgba(0,0,0,0.7)] focus:-translate-x-0.5 focus:-translate-y-0.5",
        className
      )}
      {...props}
    />
  );
}
