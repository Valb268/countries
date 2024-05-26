
export type CountriesType = {
    [key: string]: {
        name: string,
        capital: string,
        region: string,
        population: number,
        languages: {
            [key: string]: string
        },
        currencies: {
            [key: string]: {
                name: string,
                symbol: string
            }
        },
        flag: {
            small: string,
            medium: string,
            large: string
        }
    }
}

export type currenciesType = {
    [key: string]: {
        name: string,
        symbol: string
    }
}

export type countryType = {
    name: string,
    capital: string,
    region: string,
    population: number,
    languages: {
        [key: string]: string
    },
    currencies: currenciesType,
    flag: {
        small: string,
        medium: string,
        large: string
    }
}

export type chartProps = {
    show: boolean,
    onHide: () => void,
    chart: ReactNode,
    title: string
}

export type populationByCurrenciesType = {
    [key: string]: number
}


export type dataCountPopulationType = {
    currency: string,
    population: number
}

export type chartConfigType = {
    type: string,
    data: {
        labels: Array<string>,
        datasets: [
            {
                label: string,
                data: Array<number>
            }
        ]
    },
    options: {
        [key: string]: any
    }
}


export type langType = { language: string, population: string }
