'use client';

import React from 'react';
import { useStreaming } from '@/app/application/contexts/streaming-context';
import { useUser } from '@/app/application/contexts/user-context';

const CountrySelect = ({}) => {
  const {
    state: { supportedCountries },
  } = useStreaming();

  const {
    state: { country: userCountry },
    setState: updateUserState,
  } = useUser();

  const defaultCountry = userCountry || supportedCountries?.[0];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = supportedCountries.find(
      (country) => country.countryCode === e.target.value,
    );
    if (selected) {
      updateUserState((prevState) => ({
        ...prevState,
        country: selected,
      }));
    }
  };

  return (
    <select
      value={userCountry?.countryCode || defaultCountry?.countryCode}
      onChange={handleChange}
      className='flex items-center justify-center rounded-full h-10 px-3 bg-white/5 border border-white/10 text-white/70 active:scale-90 transition-transform appearance-none cursor-pointer hover:bg-white/10'
    >
      {supportedCountries.map((country) => (
        <option
          key={country.countryCode || country.countryName}
          value={country.countryCode || ''}
        >
          {country.countryIcon} {country.countryName}
        </option>
      ))}
    </select>
  );
};

export default CountrySelect;
