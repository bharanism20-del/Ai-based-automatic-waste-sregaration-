import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Classify } from './components/Classify';
import { Sorting } from './components/Sorting';
import { Dashboard } from './components/Dashboard';
import { GenAI } from './components/GenAI';
import { Analytics } from './components/Analytics';
import { Architecture } from './components/Architecture';
import { Impact } from './components/Impact';
import { Footer } from './components/Footer';
import { Cat, ClassificationResult } from './types';

export default function App() {
  const [activeSortingCategory, setActiveSortingCategory] = useState<Cat>('Plastic');

  const handleSendToSorting = (cat: Cat) => {
    setActiveSortingCategory(cat);
  };

  const handleItemClassified = (_result: ClassificationResult) => {
    // Optionally trigger any global toast or counter update
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden bg-[#070b0f] font-sans text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-200"
      style={{ scrollBehavior: 'smooth' }}
    >
      <Navbar />

      <main>
        <Hero />
        <Problem />
        <Classify
          onSendToSorting={handleSendToSorting}
          onItemClassified={handleItemClassified}
        />
        <Sorting
          initialCategory={activeSortingCategory}
        />
        <Dashboard />
        <GenAI />
        <Analytics />
        <Architecture />
        <Impact />
      </main>

      <Footer />
    </div>
  );
}
