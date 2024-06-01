import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';
import {useAppSelector} from "../../app/hooks";
import {
    countryType,
    populationByCurrenciesType,
    dataCountPopulationType,
    chartConfigType
} from "../../features/utils/types";

type Props = {
    label: string
}

const CurrenciesPopulationChart = ({label}: Props) => {

    const chartRef: React.MutableRefObject<any> = useRef(null);
    const countries = useAppSelector(state => state.countries);
    const overallPopulation = useAppSelector(state => state.overallPopulation);

    useEffect(() => {
        const countPopulationByCurrency = () => {
            const populationByCurrencies: populationByCurrenciesType = {};
            countries.forEach(item => {
                const country: countryType = item[1];
                const countryCurrencies = country.currencies;
                const currencyCodes = Object.keys(countryCurrencies);
                for (let i = 0; i < currencyCodes.length; i++) {
                    const showCurrency: string = `${countryCurrencies[currencyCodes[i]].name} (${currencyCodes[i]})`;
                    if (populationByCurrencies[showCurrency]) {
                        populationByCurrencies[showCurrency] += country.population;
                    } else {
                        populationByCurrencies[showCurrency] = country.population;
                    }
                }
            });
            const data = [];
            for (let currency in populationByCurrencies) {
                const howManyPeople = populationByCurrencies[currency];
                if (howManyPeople > overallPopulation / 100) {
                    data.push({currency, population: howManyPeople});
                }
            }
            return data;
        }

        const data: Array<dataCountPopulationType> = countPopulationByCurrency();

        const chartConfig: chartConfigType = {
            type: 'doughnut',
            data: {
                labels: data.map(row => row.currency),
                datasets: [
                    {
                        label,
                        data: data.map(row => row.population)
                    }
                ]
            },
            options: {}
        };

        const ctx = chartRef.current.getContext('2d');
        // @ts-ignore
        new Chart(ctx, chartConfig);
    }, [label, countries, overallPopulation]);

    return (
        <div className="position-relative m-auto" style={{height: '70vh'}}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default CurrenciesPopulationChart;