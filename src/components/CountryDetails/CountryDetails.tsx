import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

import { cnCountryDetails } from './CountryDetails.classname';
import { ResponseCountries } from '../../types';
import { CountrySelect } from '../CountrySelect/CountrySelect';

import './CountryDetails.css';
import { CardCountry } from '../CardCountry/CardCountry';

const CountryDetails = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [countries, setCountries] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | undefined>(undefined);

    const handleSelectCountry = (valueSelect: string) => {
        setSelectedCountry(valueSelect);
    }

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
                setError(error)
            });

    }, []);

    if (error) {
        return <Alert key='danger' variant='danger'>
            Произошла ошибка: {error}
        </Alert>
    }

    return (
        <div className={cnCountryDetails()}>
            {isLoading ?
                <Spinner className={cnCountryDetails('Spinner')} animation="border" role="status" size={'sm'}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner> : null}
            {countries.length === 0 ? null : <CountrySelect countries={countries} onSelectCountry={handleSelectCountry} />}
            {selectedCountry ? <CardCountry selectedCountry={selectedCountry} /> : null}
        </div>
    );
}

export { CountryDetails };
