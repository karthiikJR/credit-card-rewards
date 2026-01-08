'use client';

import React from 'react';
import { CreditCard } from '../types/card';

interface CreditCardProps {
  card: CreditCard;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function CreditCardComponent({ card, onClick, style }: CreditCardProps) {
  // Generate a random card number for the visual (consistent per card based on ID)
  const last4 = (parseInt(card.id) * 1234).toString().padStart(4, '0');
  
  return (
    <div 
      className="perspective-[1000px] w-full max-w-[450px] aspect-[1.7] relative" 
      onClick={onClick} 
      style={style}
    >
      <div 
        className="
          w-full h-full rounded-[20px] relative overflow-hidden transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform-style-3d
          hover:-translate-y-[5px] hover:rotate-x-2
          shadow-[0_20px_40px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.3)]
          after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.1)_45%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.1)_55%,transparent_60%)] after:pointer-events-none after:mix-blend-overlay
        "
        style={{
          background: `radial-gradient(circle at 100% 0%, rgba(255,255,255,0.2) 0%, transparent 50%), linear-gradient(135deg, ${card.color} 0%, #1a1a1a 80%)`,
        }}
      >
        
        {/* Physical Elements */}
        {/* Chip */}
        <div className="
          absolute top-[45px] left-[35px] w-[55px] h-[42px] rounded border border-[#997b19] z-[2] overflow-hidden
          bg-[linear-gradient(135deg,#d4af37_0%,#c5a028_20%,#e6cfa5_40%,#c5a028_100%)]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.2)]
          before:content-[''] before:absolute before:inset-0 before:rounded-[6px] before:shadow-[inset_0_0_10px_rgba(0,0,0,0.1)]
          before:bg-[linear-gradient(to_bottom,transparent_48%,rgba(0,0,0,0.15)_48%,rgba(0,0,0,0.15)_52%,transparent_52%),linear-gradient(to_right,transparent_30%,rgba(0,0,0,0.15)_30%,rgba(0,0,0,0.15)_33%,transparent_33%),linear-gradient(to_right,transparent_66%,rgba(0,0,0,0.15)_66%,rgba(0,0,0,0.15)_69%,transparent_69%)]
        "></div>
        
        {/* Bank Logo */}
        <div className="
          absolute top-[35px] right-[35px] font-['Segoe_UI','Roboto','Helvetica_Neue',sans-serif] font-extrabold text-2xl uppercase tracking-[2px] z-[2] italic
          text-transparent bg-clip-text bg-[linear-gradient(to_bottom,#f0f0f0_0%,#d9d9d9_30%,#a1a1a1_50%,#d9d9d9_70%,#ffffff_100%)]
          drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]
          max-[480px]:text-[20px]
        ">
          {card.name.split(' ')[0]}
        </div>

        {/* Embossed Card Number */}
        <div className="
          absolute top-[55%] left-[35px] font-['Courier_Prime','Courier_New',monospace] text-[26px] text-white tracking-[4px]
          drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] z-[2] flex gap-[18px] w-full
          max-[480px]:text-[20px] max-[480px]:tracking-[2px]
        ">
          <span>••••</span>
          <span>••••</span>
          <span>••••</span>
          <span>{last4}</span>
        </div>

        {/* Card Holder */}
        <div className="
          absolute bottom-[35px] left-[35px] font-['Courier_Prime','Courier_New',monospace] text-base text-white/90 uppercase tracking-[2px]
          drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] z-[2] font-semibold
        ">
          RICK ASTLEY
        </div>

        {/* Network Logo */}
        <div className="absolute bottom-[35px] right-[35px] z-[2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          {card.network === 'Mastercard' && (
            <svg width="40" height="24" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#eb001b" fillOpacity="0.8"/>
              <circle cx="24" cy="12" r="12" fill="#f79e1b" fillOpacity="0.8"/>
            </svg>
          )}
          {card.network === 'Visa' && (
             <svg width="40" height="24" viewBox="0 0 40 12" xmlns="http://www.w3.org/2000/svg">
               <path fill="#fff" d="M15.4 0l-1.8 12h-2.9L8.3 2.5 5 12H2L6.1 0h3.2l3.4 9.1L15.4 0zm10.7 0l2 8.3L30 0h2.7L29.6 12h-3.4L23.4 1.7 20.8 12h-2.8l-4.5-12h3.3l2.8 9.3L22.9 0h3.2z"/>
             </svg>
          )}
          {card.network === 'RuPay' && (
            <div className="text-white font-extrabold text-[18px] italic drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">RuPay</div>
          )}
          {card.network === 'Amex' && (
            <div className="text-white font-extrabold text-base border border-white px-1 py-0.5">AMEX</div>
          )}
        </div>

      </div>
    </div>
  );
}
