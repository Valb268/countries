import {useContext, useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';
import {Context} from "../utils/contexts";
import {TableContext} from "../utils/contexts";

const CurrenciesPopulationChart = ({label}) => {

    const chartRef = useRef(null);
    const {countries} = useContext(Context);
    const overallPopulation = useContext(TableContext);

    useEffect(() => {
        const data = countPopulationByCurrency();

        const chartConfig = {
            type: 'doughnut',
            data: {
                labels: data.map(row => row.currency),
                datasets: [
                    {
                        label: label,
                        data: data.map(row => row.population)
                    }
                ]
            },
            options: {}
        };

        const ctx = chartRef.current.getContext('2d');
        new Chart(ctx, chartConfig);
    }, []);


    const countPopulationByCurrency = () => {
        const tmp = {};
        countries.forEach(item => {
            const country = item[1];
            const countryCurrencies = country.currencies;
            const currencyCodes = Object.keys(countryCurrencies);
            for (let i = 0; i < currencyCodes.length; i++) {
                const showCurrency = `${countryCurrencies[currencyCodes[i]].name} (${currencyCodes[i]})`;
                if (tmp[showCurrency]) {
                    tmp[showCurrency] += country.population;
                } else {
                    tmp[showCurrency] = country.population;
                }
            }
        });
        const data = [];
        for (let obj in tmp) {
            const howManyPeople = tmp[obj];
            if (howManyPeople > overallPopulation / 100) {
                data.push({currency: obj, population: howManyPeople});
            }
        }
        return data;
    }

    return (
        <div className="position-relative m-auto" style={{height: '70vh'}}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}

export default CurrenciesPopulationChart;