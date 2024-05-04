import { ChangeEvent, FC, useState } from 'react';

import Form from 'react-bootstrap/Form';

import { cnCountrySelect } from './CountrySelect.classname';

import './CountrySelect.css';

type CountrySelectProps = {
    countries: string[];
    onSelectCountry: (nameCounty: string) => void;
}

const CountrySelect: FC<CountrySelectProps> = ({ countries, onSelectCountry }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const handleChangeNameCountry = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
        onSelectCountry(event.target.value);
    }

    return (
        <div className={cnCountrySelect()}>
            <label className={cnCountrySelect('Label')}>Выбери название страны</label>
            <Form.Select aria-label="Default select example" onChange={handleChangeNameCountry} value={selectedOption}>
                {countries.map((country: string, index: number) =>
                    <option value={country} key={index}>{country}</option>
                )}
            </Form.Select>
        </div>
    );
}

export { CountrySelect };
