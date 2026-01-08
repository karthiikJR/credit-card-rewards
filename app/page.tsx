'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from './components/SearchBar';
import CardStack from './components/CardStack';
import RewardsModal from './components/RewardsModal';
import AddCardModal from './components/AddCardModal';
import { dummyCards } from './data/dummyCards';
import { CreditCard } from './types/card';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<CreditCard | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleCardClick = (card: CreditCard) => {
    setSelectedCard(card);
  };

  return (
    <main className={`${styles.main} gradient-bg`}>
      <div className="container">
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>
            <span className="text-gradient">CARD</span> Rewards
          </h1>
          <p className={styles.subtitle}>
            experience the power of stack
          </p>
        </header>

        {/* Search Bar */}
        <div className={styles.searchSection}>
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Card Stack */}
        <div className={styles.stackSection}>
          <CardStack cards={dummyCards} onCardClick={handleCardClick} />
        </div>

        {/* Add Button FAB */}
        <button 
          className={styles.fab} 
          onClick={() => setIsAddModalOpen(true)}
          aria-label="Add Card"
        >
          <span className={styles.fabIcon}>+</span>
        </button>

        {/* Rewards Modal */}
        {selectedCard && (
          <RewardsModal 
            card={selectedCard} 
            onClose={() => setSelectedCard(null)} 
          />
        )}

        {/* Add Card Modal */}
        {isAddModalOpen && (
          <AddCardModal 
            onClose={() => setIsAddModalOpen(false)} 
            onAdd={(card) => console.log('New card added:', card)}
          />
        )}
      </div>
    </main>
  );
}
