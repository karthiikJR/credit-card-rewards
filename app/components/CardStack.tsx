'use client';

import React, { useState } from 'react';
import { CreditCard } from '../types/card';
import CreditCardComponent from './CreditCard';
import styles from './CardStack.module.css';

interface CardStackProps {
  cards: CreditCard[];
  onCardClick?: (card: CreditCard) => void;
}

export default function CardStack({ cards, onCardClick }: CardStackProps) {
  // Stack state: simple array order. 
  // Clicking top card moves it to back (cycle).
  const [activeCards, setActiveCards] = useState(cards);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleTopCardClick = () => {
    if (isAnimating) return;

    // Start animation
    setIsAnimating(true);
    
    // Wait for animation to finish before rotating state
    setTimeout(() => {
      const [first, ...rest] = activeCards;
      setActiveCards([...rest, first]);
      setIsAnimating(false);
    }, 730); // Match CSS animation (0.75s) closely
  };
  
  const handleDetailClick = (e: React.MouseEvent, card: CreditCard) => {
    e.stopPropagation(); // Prevent stack rotation
    onCardClick?.(card);
  };

  return (
    <div className={styles.stackContainer}>
       {activeCards.map((card, index) => {
         // Render the stack. Index 0 is top.
         // We only render top 3-4 cards for performance/visuals, others hidden.
         if (index > 3) return null;
         
          return (
           <div 
            key={card.id}
            className={`${styles.stackItem} ${index === 0 && isAnimating ? styles.flyOut : ''}`}
            onClick={index === 0 ? handleTopCardClick : undefined}
           >

             <CreditCardComponent card={card} />
             
             {index === 0 && (
               <button 
                 className={styles.detailsButton} 
                 onClick={(e) => handleDetailClick(e, card)}
               >
                 View Rewards
               </button>
             )}
           </div>
         );
       })}
       
       <div className={styles.stackInstructions}>
         Tap stack to cycle • Click button for details
       </div>
    </div>
  );
}
