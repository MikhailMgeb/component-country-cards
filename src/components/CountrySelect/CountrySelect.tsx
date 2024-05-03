import { ChangeEvent, FC } from 'react';

import Form from 'react-bootstrap/Form';

import { cnCountrySelect } from './CountrySelect.classname';

import './CountrySelect.css';

type CountrySelectProps = {
    countries: string[];
    onSelectCountry: (nameCounty: string) => void;
}

const CountrySelect: FC<CountrySelectProps> = ({ countries, onSelectCountry }) => {
    const handleChangeNameCountry = (event: ChangeEvent<HTMLSelectElement>) => {
        onSelectCountry(event.target.value);
    }

    return (
        <div className={cnCountrySelect()}>
            <label className={cnCountrySelect('Label')}>Выбери название страны</label>
            <Form.Select aria-label="Default select example" onChange={handleChangeNameCountry}>
                {countries.map((country: string, index: number) =>
                    <option value={country} key={index}>{country}</option>
                )}
            </Form.Select>
        </div>
    );
}

export { CountrySelect };
