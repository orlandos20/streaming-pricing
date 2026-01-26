import React from 'react';
import CountrySelect from './country-select';

interface DashboardHeaderProps {
  backgroundImage: string;
  userName: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  backgroundImage,
  userName,
}) => {
  return (
    <div className='sticky top-0 z-40 bg-transparent backdrop-blur-md p-6 pt-12 flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <div
          className='w-10 h-10 rounded-full border border-white/20 bg-center bg-cover shadow-lg'
          style={{
            backgroundImage: `url("${backgroundImage}")`,
          }}
        ></div>
        <div>
          <p className='text-[10px] uppercase tracking-widest text-white/40 font-bold'>
            Welcome back
          </p>
          <p className='text-sm font-semibold text-white/90'>{userName}</p>
        </div>
      </div>
      <CountrySelect />
    </div>
  );
};

export default DashboardHeader;
