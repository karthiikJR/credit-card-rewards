'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import NeoPopButton from './NeoPopButton';

interface NeoPopModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  maxWidth?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  headerContent?: React.ReactNode; // For custom header content like tabs
  contentClassName?: string; // Custom className for content wrapper
  modalClassName?: string; // Custom className for modal container
}

export default function NeoPopModal({
  isOpen,
  onClose,
  title,
  subtitle,
  maxWidth = '550px',
  children,
  showCloseButton = true,
  headerContent,
  contentClassName,
  modalClassName,
}: NeoPopModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-5 animate-fadeIn" 
      onClick={onClose}
    >
      <div 
        className={cn(
          "bg-[var(--cred-surface)] w-full relative animate-slideUp",
          "border border-[var(--cred-border)] shadow-[12px_12px_0px_rgba(0,0,0,0.5)]",
          modalClassName
        )}
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <NeoPopButton
            variant="icon"
            className="absolute top-5 right-5 z-10"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </NeoPopButton>
        )}

        <div className="p-8 pb-5 border-b border-[var(--cred-border)] bg-[var(--cred-black)]">
          <h2 className="text-2xl font-[800] text-white uppercase tracking-wider mb-2">{title}</h2>
          {subtitle && (
            <div className="text-[var(--text-secondary)] text-[13px] mt-2 uppercase tracking-[1px] font-semibold">
              {subtitle}
            </div>
          )}
          {headerContent}
        </div>

        <div className={cn("p-8 bg-[#151515]", contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}

