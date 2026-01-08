'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { dummyCards } from '../data/dummyCards';
import CreditCardComponent from '../components/CreditCard';
import BackButton from '../components/BackButton';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const router = useRouter();

  // Filter Logic logic similar to previous implementation
  const results = dummyCards
      .map(card => {
        const matchedRewards = card.rewards.filter(reward =>
          reward.category.toLowerCase().includes(query.toLowerCase()) ||
          reward.description?.toLowerCase().includes(query.toLowerCase())
        );

        return { card, matchedRewards };
      })
      .filter(result => result.matchedRewards.length > 0)
      .sort((a, b) => b.matchedRewards.length - a.matchedRewards.length);

  return (
    <div className="min-h-screen p-5 bg-[var(--cred-black)] w-full flex flex-col items-center">
      <div className="w-full max-w-[800px]">
      <header className="flex items-center gap-5 mb-[30px] pb-5 border-b border-[var(--cred-border)]">
        <BackButton />
        <div className="flex-1">
          <input 
            type="text" 
            className="w-full bg-[var(--cred-surface)] border border-[var(--cred-border)] p-[12px_20px] text-white text-base outline-none"
            defaultValue={query}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                router.push(`/search?q=${e.currentTarget.value}`);
              }
            }}
          />
        </div>
      </header>

      <div className="text-[var(--text-muted)] mb-5 text-sm">
        Found {results.length} cards matching "{query}"
      </div>

      <div className="flex flex-col gap-[30px]">
        {results.map(({ card, matchedRewards }) => (
          <div 
            key={card.id} 
            className="
              grid grid-cols-[180px_1fr] gap-[30px] bg-[var(--cred-surface)] p-6 border border-[var(--cred-border)]
              shadow-[var(--shadow-md)] items-start overflow-hidden rounded-none
              max-[600px]:grid-cols-1
            "
          >
              <div className="
                w-[450px] scale-[0.4] origin-top-left -mb-[160px] -mr-[270px] pointer-events-none ml-0 max-w-none
              ">
                <CreditCardComponent card={card} />
              </div>
            
            <div className="flex flex-col gap-4 border-t-0 pt-0 w-auto">
              <h3 className="text-lg text-white m-[0_0_8px_0] uppercase text-left tracking-normal">{card.name}</h3>
              {matchedRewards.map((reward, i) => (
                <div 
                  key={i} 
                  className="
                    flex gap-4 p-3 bg-[var(--cred-black)] border-l-[3px] border-[var(--neopop-white)] rounded-none items-start
                  "
                >
                  <div className="text-2xl font-bold text-[var(--neopop-white)] min-w-[80px]">{reward.value}</div>
                  <div className="flex flex-col">
                    <div className="uppercase text-xs font-bold text-[var(--text-secondary)] mb-1">{reward.category}</div>
                    <div className="text-sm text-[var(--text-muted)]">{reward.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {results.length === 0 && (
          <div className="text-[var(--text-muted)]">
            No matching rewards found. Try "Fuel", "Amazon", or "Dining".
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
