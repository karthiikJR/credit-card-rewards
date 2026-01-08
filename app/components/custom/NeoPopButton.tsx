'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface NeoPopButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'icon' | 'tab' | 'ghost';
  active?: boolean;
  children: React.ReactNode;
}

export default function NeoPopButton({ 
  variant = 'primary', 
  active = false,
  className,
  children,
  ...props 
}: NeoPopButtonProps) {
  const baseStyles = "transition-all duration-200 cursor-pointer";
  
  const variantStyles = {
    primary: "bg-white text-black text-sm font-[800] uppercase tracking-[1px] py-4 px-8 border border-transparent shadow-[4px_4px_0px_#444] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#444] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#444]",
    icon: "w-8 h-8 border border-transparent bg-transparent text-[#666] flex items-center justify-center text-xl hover:bg-[#333] hover:border-[var(--cred-border)] hover:text-white hover:shadow-[2px_2px_0px_rgba(0,0,0,0.5)]",
    tab: cn(
      "bg-transparent border-none text-[var(--text-muted)] text-[13px] font-bold uppercase tracking-[1px]",
      "pb-2 relative transition-colors duration-200",
      active && "text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[var(--neopop-white)]"
    ),
    ghost: "w-full text-left bg-transparent border-none border-b border-[#1a1a1a] text-[#cccccc] py-[14px] px-4 text-sm font-['Inter'] block tracking-[0.3px] last:border-b-0 hover:bg-[#1C1C1C] hover:text-white hover:pl-5",
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
