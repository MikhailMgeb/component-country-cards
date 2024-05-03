export type ResponseCountries = {
    name: {
        common: string;
    }
}

export type ResponseCountryInfo = {
    name: {
        common: string;
        official: string;
        nativeName: {
            eng: {
                official: string;
                common: string;
            }
        }
    },
    currencies: { USD: { name: string; symbol: string; } },
    region: string;
    languages: { eng: string; },
    translations: {
        rus: {
            official: string;
            common: string;
        },
    },
    capital: [string];
    population: number;
    flags: {
        png: string;
        svg: string;
    }
}

export type CountryInfo = ResponseCountryInfo;
