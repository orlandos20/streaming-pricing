import React from 'react';
import { Country } from '@/app/domain/entities/Country';

interface DashboardSummaryCardProps {
  totalMonthly: number;
  nextRenewalDate: string;
  country?: Country;
}

const DashboardSummaryCard: React.FC<DashboardSummaryCardProps> = ({
  totalMonthly,
  nextRenewalDate,
  country,
}) => {
  return (
    <div className='px-6 mt-4'>
      <div className='glass-morphism rounded-[2.5rem] p-8 relative overflow-hidden group'>
        <div className='absolute -top-20 -right-20 w-48 h-48 bg-blue-500/10 blur-[80px] group-hover:bg-blue-500/20 transition-all'></div>

        <p className='text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-2'>
          Total Monthly Spend
        </p>
        <div className='flex items-baseline gap-2 mb-6'>
          <span className='text-white/40 text-2xl font-light'>
            {country?.currency?.symbol}
          </span>

          <h1 className='glass-text text-5xl font-extrabold tracking-tight'>
            {totalMonthly}
          </h1>
          <span className='text-white/30 text-xs font-bold uppercase tracking-widest ml-1'>
            {country?.currency?.code}
          </span>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <p className='text-white/30 text-[10px] uppercase font-bold tracking-wider mb-1'>
              Next Renewal
            </p>
            <p className='text-white/90 text-sm font-semibold tracking-wide'>
              {nextRenewalDate}
            </p>
          </div>
          <button className='h-10 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] text-white/80 font-bold uppercase tracking-widest transition-all backdrop-blur-md'>
            Analytics
          </button>
        </div>

        <div className='mt-8 h-1.5 w-full bg-white/5 rounded-full overflow-hidden'>
          <div className='h-full bg-linear-to-r from-blue-400 via-indigo-500 to-purple-600 w-[68%] shadow-[0_0_20px_rgba(96,165,250,0.5)]'></div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummaryCard;
