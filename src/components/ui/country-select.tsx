import React, { useState } from 'react';
import { Country } from '../../../types';

interface CountrySelectProps {
  countries: Country[];
  defaultCountry?: Country;
  onChange?: (country: Country) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  countries,
  defaultCountry,
  onChange,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    defaultCountry || countries[0],
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = countries.find(
      (country) => country.countryCode === e.target.value,
    );
    if (selected) {
      setSelectedCountry(selected);
      onChange?.(selected);
    }
  };

  return (
    <select
      value={selectedCountry.countryCode || ''}
      onChange={handleChange}
      className='flex items-center justify-center rounded-full h-10 px-3 bg-white/5 border border-white/10 text-white/70 active:scale-90 transition-transform appearance-none cursor-pointer hover:bg-white/10'
    >
      {countries.map((country) => (
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
