'use client';
import React, { useState, useRef, useEffect } from 'react';

interface NeoPopSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function NeoPopSelect({ options, value, onChange, placeholder, className }: NeoPopSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative w-full ${className || ''}`} ref={dropdownRef}>
      <div 
        className={`
          flex justify-between items-center px-5 py-4 w-full cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          bg-[var(--cred-surface)] border border-[var(--cred-border)] text-white text-base outline-none
          shadow-[4px_4px_0px_rgba(0,0,0,0.5)]
          hover:bg-[#1a1a1a] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[5px_5px_0px_rgba(0,0,0,0.6)]
          ${isOpen ? 'border-[var(--neopop-white)] bg-[var(--cred-dark)] shadow-[6px_6px_0px_rgba(0,0,0,0.7)] -translate-x-0.5 -translate-y-0.5' : ''}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || placeholder}</span>
        <span className={`text-[10px] transition-transform duration-200 text-[#666] ${isOpen ? 'rotate-180 text-[var(--neopop-white)]' : ''}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </span>
      </div>
      
      {isOpen && (
        <div className="
          absolute top-[calc(100%_+_8px)] left-0 right-0 z-[100] max-h-[200px] overflow-y-auto
          bg-[var(--cred-black)] border border-[var(--cred-border)] shadow-[8px_8px_0px_rgba(0,0,0,0.8)]
          animate-slideDown
        ">
          {options.map((option) => (
            <div 
              key={option}
              className="
                w-full text-left bg-transparent border-none border-b border-[#1a1a1a] text-[#cccccc]
                p-4 px-5 cursor-pointer transition-all duration-100 ease-linear text-sm block
                hover:bg-[#1C1C1C] hover:text-white hover:pl-6
              "
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
