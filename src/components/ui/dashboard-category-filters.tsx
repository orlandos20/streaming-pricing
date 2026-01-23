import React from 'react';

interface DashboardCategoryFiltersProps {
  categories?: string[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

const DEFAULT_CATEGORIES = ['Actives', 'All', 'Music', 'Video', 'Cloud', 'SaaS'];

const DashboardCategoryFilters: React.FC<DashboardCategoryFiltersProps> = ({
  categories = DEFAULT_CATEGORIES,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div className='px-4 mt-8'>
      <div className='flex gap-2 overflow-x-auto no-scrollbar py-2'>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
              activeCategory === cat
                ? 'bg-white/20 border-white/30 text-white'
                : 'bg-white/5 border-transparent text-white/40 hover:text-white/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardCategoryFilters;
