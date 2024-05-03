import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import { cnCountryDetails } from './CountryDetails.classname';
import { ResponseCountries } from '../../types';
import { CountrySelect } from '../CountrySelect/CountrySelect';

import './CountryDetails.css';
import { CardCountry } from '../CardCountry/CardCountry';

const CountryDetails = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [countries, setCountries] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>();

    useEffect(() => {
        setIsLoading(true)
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then((dataCountries: ResponseCountries[]) => {
                const countryNames: string[] = [];

                for (const country of dataCountries) {
                    countryNames.push(country.name.common)
                }
                setCountries(countryNames);

            })
            .finally(() => {
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error)
            });

    }, []);

    if (isLoading) {
        return (
            <Spinner className={cnCountryDetails('Spinner')} animation="border" role="status" size={'sm'}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    return (
        <div className={cnCountryDetails()}>
            {countries.length === 0 ? null : <CountrySelect countries={countries} onSelectCountry={setSelectedCountry} />}
            {selectedCountry? <CardCountry selectedCountry={selectedCountry} /> : null}
        </div>
    );
}

export { CountryDetails };
