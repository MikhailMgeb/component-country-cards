import { FC, useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

import { cnCardCountry } from './CardCountry.classname';

import type { CountryInfo, ResponseCountryInfo } from '../../types';

import './CardCountry.css';

type CardCountryProps = {
    selectedCountry: string;
}

const CardCountry: FC<CardCountryProps> = ({ selectedCountry }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [country, setCountry] = useState<CountryInfo>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://restcountries.com/v3.1/name/${selectedCountry}`)
            .then(response => response.json())
            .then((dataCountry: ResponseCountryInfo[]) => {
                setCountry(dataCountry[0]);
            })
            .finally(() => setIsLoading(true))
            .catch(error => setError(error))
    }, [selectedCountry]);

    if (error) {
        return <div>Произошла ошибка: {error}</div>;
    }

    return (
        <div className={cnCardCountry()}>
            {error ? <p></p> : null}
            {isLoading ?
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={country?.flags.png} />
                    <Card.Body>
                        <Card.Title>{country?.name.common}</Card.Title>
                        <Card.Text>
                            {country?.capital}
                        </Card.Text>
                    </Card.Body>
                </Card> :
                <Spinner className={cnCardCountry('Spinner')} />
            }
        </div>
    );
}
export { CardCountry };
