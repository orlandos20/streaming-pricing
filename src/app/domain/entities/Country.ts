export interface Currency {
  name: string;
  icon?: string;
  code: string;
  symbol: string;
}

export interface Country {
  countryName: string;
  countryIcon: string;
  countryCode?: string;
  currency?: Currency;
  currencySymbol?: string;
}
