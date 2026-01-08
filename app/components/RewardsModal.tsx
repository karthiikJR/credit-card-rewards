'use client';

import React from 'react';
import { CreditCard, Reward } from '../types/card';
import { NeoPopButton } from './custom';

interface RewardsModalProps {
  card: CreditCard;
  onClose: () => void;
}


const getRewardIcon = (type: Reward['type']) => {
  const iconProps = { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" as "round", strokeLinejoin: "round" as "round" };
  
  switch (type) {
    case 'cashback': // Rupee/Bill symbol
      return (
        <svg {...iconProps}>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="12" y1="12" x2="12" y2="12.01" strokeWidth="4" />
        </svg>
      );
    case 'lounge': // Armchair/Sofa
      return (
        <svg {...iconProps}>
          <path d="M7 13v-8q0-2 4-2h2q4 0 4 2v8M4 13h16c1.1 0 2 .9 2 2v3H2v-3c0-1.1.9-2 2-2z" />
        </svg>
      );
    case 'fuel_waiver': // Gas Pump
      return (
        <svg {...iconProps}>
          <path d="M3 22v-8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8M18 10h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2m-5-8V3h7v13" />
        </svg>
      );
    case 'points': // Star badge
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7l1.5 3.5h3.5l-2.5 2 1 3.5-3.5-2.5-3.5 2.5 1-3.5-2.5-2h3.5z" />
        </svg>
      );
    case 'milestone': // Target/Flag
      return (
        <svg {...iconProps}>
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      );
    default: // Gift Box
      return (
        <svg {...iconProps}>
          <rect x="3" y="8" width="18" height="4" rx="1" />
          <path d="M12 8v13" />
          <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
          <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
        </svg>
      );
  }
};

export default function RewardsModal({ card, onClose }: RewardsModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-[8px] z-[1000] flex items-center justify-center p-5 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="
          bg-[var(--cred-surface)] w-full max-w-[500px] rounded-none border border-[var(--cred-border)] overflow-hidden
          shadow-[12px_12px_0px_rgba(0,0,0,0.5)] animate-slideUp relative max-h-[85vh] flex flex-col
        " 
        onClick={(e) => e.stopPropagation()}
        style={{ '--card-color': card.color } as React.CSSProperties}
      >
        <NeoPopButton
          variant="icon"
          className="absolute top-5 right-5 z-10 text-[var(--text-secondary)]"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </NeoPopButton>
        
        <div className="p-[32px_32px_24px_32px] bg-[var(--cred-black)] border-b border-[var(--cred-border)] relative">
          <div className="hidden">
             {/* Retaining structure if needed, but simplified based on visual cues in module.css */}
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-extrabold text-white m-0 uppercase tracking-[1px]">{card.name}</h2>
            <div className="text-[var(--text-secondary)] text-[13px] mt-2 uppercase tracking-[1px] font-semibold">All Benefits & Rewards</div>
          </div>
        </div>

        <div className="p-0 overflow-y-auto flex-1 flex flex-col">
          {card.rewards.map((reward, index) => (
            <div 
              key={index} 
              className="
                flex gap-5 p-[24px_32px] bg-[var(--cred-surface)] border-b border-[var(--cred-border)]
                transition-all duration-200 animate-fadeInRight last:border-b-0
                hover:bg-[#1a1a1a] hover:pl-9
              "
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="
                text-2xl bg-[var(--cred-black)] w-12 h-12 flex items-center justify-center
                border border-[var(--cred-border)] rounded-none shadow-[4px_4px_0px_rgba(0,0,0,0.3)]
                text-white
              ">
                {getRewardIcon(reward.type)}
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-xl font-extrabold text-white mb-1">{reward.value}</div>
                <div className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-[1.5px] mb-1">{reward.category}</div>
                <div className="text-sm text-[var(--text-muted)] leading-[1.5]">{reward.description}</div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
