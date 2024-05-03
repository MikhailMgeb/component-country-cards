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
    const [countries, setCountries] = useState<CountryInfo>();

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://restcountries.com/v3.1/name/${selectedCountry}`)
            .then(response => response.json())
            .then((dataCountry: ResponseCountryInfo[]) => {
                setCountries(dataCountry[0]);
                setIsLoading(true);
            })
            .finally()
            .catch(error => console.log(error))
    }, [selectedCountry]);

    return (
        <div className={cnCardCountry()}>
            {isLoading ?
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={countries?.flags.png} />
                    <Card.Body>
                        <Card.Title>{countries?.name.common}</Card.Title>
                        <Card.Text>
                            {countries?.capital}
                        </Card.Text>
                    </Card.Body>
                </Card> :
                <Spinner className={cnCardCountry('Spinner')} />
            }
        </div>
    );
}
export { CardCountry };
