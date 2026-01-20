'use client';

import { useMemo, useState } from 'react';
import { Subscription, Screen } from '../../types';
import Dashboard from '@/components/ui/dashboard';
import ManagePlanModal from '@/components/ui/manage-plan-modal';
import Navigation from '@/components/ui/navigation';

const SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    price: 15.49,
    renewalDate: 'March 15, 2024',
    daysLeft: 3,
    category: 'Video',
    iconType: 'letter',
    iconValue: 'N',
    color: 'bg-red-600',
  },
  {
    id: '2',
    name: 'Spotify',
    price: 16.99,
    renewalDate: 'March 24, 2024',
    daysLeft: 12,
    category: 'Music',
    iconType: 'symbol',
    iconValue: 'headphones',
    color: 'bg-green-500',
  },
  {
    id: '3',
    name: 'Disney+',
    price: 10.99,
    renewalDate: 'April 02, 2024',
    daysLeft: 22,
    category: 'Video',
    iconType: 'symbol',
    iconValue: 'movie_filter',
    color: 'bg-blue-500',
  },
  {
    id: '4',
    name: 'YouTube Premium',
    price: 13.99,
    renewalDate: 'April 12, 2024',
    daysLeft: 31,
    category: 'Video',
    iconType: 'symbol',
    iconValue: 'play_circle',
    color: 'bg-red-700',
  },
  {
    id: '5',
    name: 'Storage Pro',
    price: 9.99,
    renewalDate: 'March 18, 2024',
    daysLeft: 6,
    category: 'Cloud',
    iconType: 'symbol',
    iconValue: 'cloud_done',
    color: 'bg-sky-500',
  },
];

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);

  const filteredSubs = useMemo(() => {
    if (activeCategory === 'All') return SUBSCRIPTIONS;
    return SUBSCRIPTIONS.filter((sub) => sub.category === activeCategory);
  }, [activeCategory]);

  const totalMonthly = useMemo(() => {
    return SUBSCRIPTIONS.reduce((acc, sub) => acc + sub.price, 0).toFixed(2);
  }, []);

  const selectedSub = useMemo(() => {
    return SUBSCRIPTIONS.find((s) => s.id === selectedSubId);
  }, [selectedSubId]);

  return (
    <main className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <div className='min-h-screen w-full items-center justify-between md:py-10 xs:py-6 px-6 bg-white dark:bg-black'>
        <div className='relative min-h-screen w-full flex flex-col overflow-x-hidden'>
          {/* Background Blobs */}
          <div className='liquid-blob w-125 h-125 bg-purple-900/60 -top-40 -left-20 animate-pulse-slow'></div>
          <div className='liquid-blob w-100 h-100 bg-blue-900/40 top-1/2 -right-20 opacity-40'></div>
          <div className='liquid-blob w-75 h-75 bg-indigo-900/30 bottom-0 left-1/4 opacity-30'></div>

          {/* Main Content Area */}
          <div className='relative z-10 flex flex-col w-full max-w-107.5 mx-auto min-h-screen bg-black/20 backdrop-blur-[2px] shadow-2xl'>
            <Dashboard
              subscriptions={filteredSubs}
              totalMonthly={totalMonthly}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onSelectSub={setSelectedSubId}
            />

            <Navigation
              currentScreen={currentScreen}
              onScreenChange={setCurrentScreen}
            />
          </div>

          {/* Manage Plan Modal Overlay */}
          {selectedSub && (
            <ManagePlanModal
              subscription={selectedSub}
              onClose={() => setSelectedSubId(null)}
            />
          )}
        </div>
      </div>
    </main>
  );
}
