'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function BackButton() {
  return (
    <Link 
      href="/" 
      className={cn(
        "flex items-center justify-center w-12 h-12 rounded-full border border-[var(--cred-border)]",
        "bg-[var(--cred-surface)] text-white transition-all duration-[250ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
        "shadow-[4px_4px_0px_rgba(0,0,0,0.5)]",
        "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.6)] hover:bg-[#1a1a1a] hover:text-[var(--neopop-white)]",
        "active:translate-x-0 active:translate-y-0 active:shadow-none"
      )}
      aria-label="Back"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  );
}
