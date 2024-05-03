import { useEffect, useState } from 'react';
import { cnApp } from './App.classname';
import { ResponseCountries } from './types';
import { CountrySelect } from './components/CountrySelect/CountrySelect';

import './App.css';

const App = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>();

  useEffect(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then((dataCountries: ResponseCountries[]) => {
        const countryNames: string[] = [];

        for (const country of dataCountries) {
          countryNames.push(country.name.common)
        }
        setCountries(countryNames);
      })
  }, []);

  return (
    <div className={cnApp()}>
      {countries.length === 0 ? null : <CountrySelect countries={countries} onSelectCountry={setSelectedCountry} />}
      {selectedCountry}
    </div>
  );
}

export { App };
