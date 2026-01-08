'use client';

import React from 'react';
import { CreditCard, Reward } from '../types/card';
import { cn } from '@/lib/utils';

interface SearchResultsProps {
  results: Array<{ card: CreditCard; matchedRewards: Reward[] }>;
  onClose: () => void;
}

export default function SearchResults({ results, onClose }: SearchResultsProps) {
  if (!results || results.length === 0) return null;

  return (
    <div 
      className={cn("fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-5 animate-fadeIn")} 
      onClick={onClose}
    >
      <div 
        className={cn("bg-[var(--cred-surface)] w-full max-w-[600px] max-h-[80vh] flex flex-col rounded-none shadow-lg animate-slideUp")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cn("p-5 border-b border-[var(--cred-border)] flex justify-between items-center bg-[var(--cred-black)]")}>
          <h2 className={cn("text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#999]")}>
            Matching Rewards
          </h2>
          <button 
            onClick={onClose}
            className={cn("w-8 h-8 flex items-center justify-center rounded-full border border-transparent hover:bg-[#333] hover:border-[#444] text-[#888] hover:text-white transition-all")}
          >
            ✕
          </button>
        </div>
        
        <div className={cn("p-4 text-[13px] text-[#888] uppercase tracking-wider font-semibold border-b border-[var(--cred-border)]")}>
          Found {results.length} cards with relevant rewards
        </div>

        <div className={cn("flex-1 overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent")}>
          {results.map(({ card, matchedRewards }, index) => (
            <div 
              key={card.id} 
              className={cn("p-5 border-b border-[var(--cred-border)] animate-slideIn opacity-0")}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                className={cn("flex items-center gap-3 mb-4")}
                style={{ '--card-color': card.color } as React.CSSProperties}
              >
                <div className={cn("w-1.5 h-8 rounded-full bg-[var(--card-color)] shadow-[0_0_8px_var(--card-color)]")} />
                <h3 className={cn("text-lg font-bold text-white tracking-wide uppercase")}>{card.name}</h3>
              </div>
              
              <div className={cn("flex flex-col gap-3 pl-4")}>
                {matchedRewards.map((reward, i) => (
                  <div key={i} className={cn("bg-[#1a1a1a] p-3 border-l-2 border-[#444] hover:bg-[#222] transition-colors")}>
                    <div className={cn("text-[#eee] font-bold text-base mb-1")}>{reward.value}</div>
                    <div className={cn("text-[11px] text-[#888] uppercase font-bold mb-1")}>{reward.category}</div>
                    <div className={cn("text-[13px] text-[#aaa] leading-relaxed")}>{reward.description}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
