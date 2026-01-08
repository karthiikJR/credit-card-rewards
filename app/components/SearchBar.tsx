'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { NeoPopButton } from './custom';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const suggestions = ['Amazon', 'Fuel', 'Lounge Access', 'Dining', 'Flight Booking', 'Groceries'];

  return (
    <div className="relative w-full max-w-[600px] mx-auto z-10">
      <div 
        className={cn(
          "relative flex items-center bg-[var(--cred-surface)] border border-[var(--cred-border)]",
          "px-5 py-4 transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          "shadow-[4px_4px_0px_rgba(0,0,0,0.5)] translate-x-0 translate-y-0",
          isFocused && "border-[var(--neopop-white)] shadow-[6px_6px_0px_rgba(0,0,0,0.7)] -translate-x-0.5 -translate-y-0.5 bg-[var(--cred-dark)]"
        )}
      >
        <svg
          className={cn(
            "mr-3 transition-colors duration-300 ease-in-out shrink-0",
            isFocused ? 'text-[var(--neopop-white)]' : 'text-[#555555]'
          )}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18.5 18.5l-4-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          className="flex-1 bg-transparent border-none outline-none text-white text-base font-['Inter'] font-medium tracking-[0.5px] placeholder:text-[#444444] placeholder:uppercase placeholder:text-[13px] placeholder:tracking-[1px]"
          placeholder="Search for rewards (e.g., Amazon, Fuel, Lounge)..."
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        {query && (
          <NeoPopButton
            variant="icon"
            className="bg-transparent border border-[#333333] w-6 h-6 text-[#666666] text-xs shrink-0 ml-2 hover:bg-[#333333] hover:text-white hover:border-[#555555]"
            onClick={() => {
              setQuery('');
              onSearch('');
            }}
          >
            ✕
          </NeoPopButton>
        )}
      </div>
      
      {isFocused && !query && (
        <div className="absolute top-[calc(100%_+_12px)] left-0 right-0 bg-[var(--cred-black)] border border-[var(--cred-border)] p-0 shadow-[8px_8px_0px_rgba(0,0,0,0.8)] z-[100] animate-slideDown">
          <div className="text-[10px] text-[#B3B3B3] uppercase tracking-[1.5px] font-bold py-3 px-4 border-b border-[#222222] bg-[#111111]">
            Popular searches
          </div>
          {suggestions.map((suggestion, index) => (
            <NeoPopButton
              key={index}
              variant="ghost"
              onClick={() => {
                setQuery(suggestion);
                onSearch(suggestion);
              }}
            >
              {suggestion}
            </NeoPopButton>
          ))}
        </div>
      )}
    </div>
  );
}
