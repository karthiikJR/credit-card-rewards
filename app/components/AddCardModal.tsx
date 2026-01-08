'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { NeoPopButton, NeoPopInput, NeoPopSelect, NeoPopRange } from './custom';

import { CreditCard } from '../types/card';

interface AddCardModalProps {
  onClose: () => void;
  onAdd: (cardData: CreditCard) => void;
}

export default function AddCardModal({ onClose, onAdd }: AddCardModalProps) {
  // Manual Form State
  const [cardName, setCardName] = useState('');
  const [network, setNetwork] = useState('');
  const [color, setColor] = useState('#EF5050');
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  // Custom Color Picker State
  const [hue, setHue] = useState(0);
  const [lightness, setLightness] = useState(60);
  
  // Presets as [hue, lightness, hex]
  const colorPresets = [
    { h: 0, l: 60, hex: '#EF5050' }, // Red
    { h: 210, l: 60, hex: '#42A5F5' }, // Blue
    { h: 150, l: 45, hex: '#2E7D32' }, // Green
    { h: 270, l: 65, hex: '#AB47BC' }, // Purple
    { h: 45, l: 60, hex: '#FFB300' }, // Gold/Orange
    { h: 0, l: 20, hex: '#333333' }, // Black
  ];

  // Convert HSL to HEX
  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  };

  const handleColorChange = (h: number, l: number) => {
    setHue(h);
    setLightness(l);
    const hexColor = hslToHex(h, 85, l);
    setColor(hexColor);
  };

  const handleHexInput = (hex: string) => {
    // Validate hex format
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      setColor(hex.toUpperCase());
      // You could also reverse calculate HSL here if needed
    }
  };

  const handlePresetClick = (preset: { h: number, l: number, hex: string }) => {
    setHue(preset.h);
    setLightness(preset.l);
    setColor(preset.hex);
  };

  const handleSubmit = () => {
    const newCard: CreditCard = {
      id: Date.now().toString(),
      name: cardName || 'New Card',
      network: (network || 'Visa') as CreditCard['network'],
      color: color,
      rewards: [],
    };
    onAdd(newCard);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-5 animate-fadeIn" onClick={onClose}>
      <div 
        className="bg-[var(--cred-surface)] w-full max-w-[600px] relative animate-slideUp border border-[var(--cred-border)] shadow-[12px_12px_0px_rgba(0,0,0,0.5)] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <NeoPopButton
          variant="icon"
          className="absolute top-5 right-5 z-10"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </NeoPopButton>

        <div className="p-8 pb-5 border-b border-[var(--cred-border)] bg-[var(--cred-black)]">
          <h2 className="text-2xl font-[800] text-white uppercase tracking-wider mb-2">Add New Card</h2>
        </div>

        <div className="p-8 bg-[#151515] overflow-y-auto">
          <div className="flex flex-col gap-6">
            {/* Card Name - Full Width */}
            <div className="flex flex-col gap-2">
              <label className="text-white text-sm font-bold uppercase tracking-[1px] ml-1">Card Name</label>
              <NeoPopInput
                type="text" 
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="e.g. HDFC Regalia"
              />
            </div>

            {/* Network and Color Picker on Same Row */}
            <div className="flex gap-4">
              {/* Network Select */}
              <div className="flex flex-col gap-2 flex-1">
                <label className="text-white text-sm font-bold uppercase tracking-[1px] ml-1">Network</label>
                <NeoPopSelect 
                  options={['Visa', 'Mastercard', 'RuPay', 'Amex']}
                  value={network}
                  onChange={setNetwork}
                  placeholder="Select Network"
                />
              </div>

              {/* Color Picker */}
              <div className="flex flex-col gap-2 flex-1 relative">
                <label className="text-white text-sm font-bold uppercase tracking-[1px] ml-1">Card Color</label>
                <button
                  type="button"
                  className={cn(
                    "flex items-center justify-between gap-3 px-5 py-4 bg-[var(--cred-surface)] border border-[var(--cred-border)] w-full cursor-pointer",
                    "shadow-[4px_4px_0px_rgba(0,0,0,0.5)] transition-all duration-200 text-base",
                    "hover:bg-[#1a1a1a] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[5px_5px_0px_rgba(0,0,0,0.6)]",
                    showColorPicker && "border-[var(--neopop-white)] bg-[var(--cred-dark)] shadow-[6px_6px_0px_rgba(0,0,0,0.7)] -translate-x-0.5 -translate-y-0.5"
                  )}
                  onClick={() => setShowColorPicker(!showColorPicker)}
                >
                  <span className="text-white font-medium">{color}</span>
                  <div 
                    className="w-6 h-6 rounded border border-white/20"
                    style={{ background: color }}
                  />
                </button>

                {/* Color Picker Popup */}
                {showColorPicker && (
                  <div className="absolute top-[calc(100%_+_8px)] left-0 right-0 z-50 bg-[var(--cred-black)] border border-[var(--cred-border)] p-5 shadow-[8px_8px_0px_rgba(0,0,0,0.8)] animate-slideDown">
                    <div className="flex flex-col gap-4">
                      {/* Preset Colors */}
                      <div className="flex gap-2 pb-4 border-b border-[var(--cred-border)]">
                        {colorPresets.map((preset, i) => (
                          <div 
                            key={i}
                            className={cn(
                              "w-8 h-8 rounded border border-white/20 cursor-pointer transition-transform hover:scale-110",
                              color === preset.hex && "border-2 border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                            )}
                            style={{ background: preset.hex }}
                            onClick={() => handlePresetClick(preset)}
                          />
                        ))}
                      </div>

                      {/* Hex Input */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[#888] text-xs uppercase tracking-[1px]">Hex Code</label>
                        <NeoPopInput
                          type="text"
                          value={color}
                          onChange={(e) => handleHexInput(e.target.value)}
                          placeholder="#000000"
                          className="font-mono uppercase"
                        />
                      </div>

                      {/* Color Sliders */}
                      <div className="flex flex-col gap-3 pt-3 border-t border-[var(--cred-border)]">
                        <NeoPopRange
                          label="Hue"
                          min={0}
                          max={360}
                          value={hue}
                          onChange={(e) => handleColorChange(parseInt(e.target.value), lightness)}
                          gradient="linear-gradient(to right, hsl(0,100%,50%), hsl(120,100%,50%), hsl(360,100%,50%))"
                        />
                        <NeoPopRange
                          label="Light"
                          min={10}
                          max={90}
                          value={lightness}
                          onChange={(e) => handleColorChange(hue, parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* OR Separator */}
            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-[1px] bg-[#333]"></div>
              <span className="text-[#666] text-xs font-bold uppercase tracking-[2px]">OR</span>
              <div className="flex-1 h-[1px] bg-[#333]"></div>
            </div>

            {/* Import from Link */}
            <div className="flex flex-col gap-3 p-5 border border-[var(--cred-border)] bg-[var(--cred-surface)] hover:bg-[#1a1a1a] transition-colors">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🔗</div>
                <div className="flex-1">
                  <div className="text-white font-bold text-sm uppercase tracking-[1px]">Import from Link</div>
                  <div className="text-[#666] text-xs mt-1">Paste a link to your card's product page</div>
                </div>
              </div>
              <NeoPopInput
                type="text" 
                placeholder="https://www.bank.com/cards/..."
              />
            </div>

            {/* OR Separator */}
            <div className="flex items-center gap-4 my-2">
              <div className="flex-1 h-[1px] bg-[#333]"></div>
              <span className="text-[#666] text-xs font-bold uppercase tracking-[2px]">OR</span>
              <div className="flex-1 h-[1px] bg-[#333]"></div>
            </div>

            {/* Upload PDF */}
            <div className="border-2 border-dashed border-[#333] rounded bg-[var(--cred-surface)] flex flex-col items-center justify-center py-8 px-5 text-center transition-colors hover:border-[#555] hover:bg-[#1a1a1a] cursor-pointer">
               <div className="text-4xl mb-3 opacity-50">📄</div>
               <div className="text-white font-bold mb-2 text-sm uppercase tracking-[1px]">Upload Statement PDF</div>
               <div className="text-xs text-[#666]">We'll analyze your statement to find your card</div>
            </div>

            {/* Add Card Button at the End */}
            <NeoPopButton
              variant="primary"
              className="mt-2 w-full"
              onClick={handleSubmit}
            >
              Add Card
            </NeoPopButton>
          </div>
        </div>
      </div>
    </div>
  );
}
