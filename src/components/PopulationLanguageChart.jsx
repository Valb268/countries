import {useContext, useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';
import {Context} from "../utils/contexts";
import {TableContext} from "../utils/contexts";
const PopulationLanguageChart = ({label}) => {

    const chartRef = useRef(null);
    const {countries} = useContext(Context);
    const overallPopulation = useContext(TableContext);

    useEffect(() => {

        const languages = getLanguages();
        const data = createData(languages);

        const chartConfig = {
            type: 'doughnut',
            data: {
                labels: data.map(row => row.language),
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


    const getLanguages = () => {
        const set = new Set();
        countries.forEach(country => {
            const arrLangs = Object.values(country[1].languages);
            arrLangs.forEach(language => set.add(language));
        });
        const arr = [];
        for (let language of set) {
            arr.push(language);
        }
        return arr;
    }

    const populationCount = (language) => {
        return countries.reduce((sum, country) => {
            const arrLangs = Object.values(country[1].languages);
            if (arrLangs.includes(language)) {
                sum += country[1].population;
            }
            return sum;
        }, 0)
    }

    const createData = (languages) => {
        const arr = [];
        for (let i = 0; i < languages.length; i++) {
            const howManyPeople = populationCount(languages[i]);
            if (howManyPeople > overallPopulation / 100) {
                arr.push({language: languages[i], population: `${howManyPeople}`});
            }
        }
        return arr;
    };


    return (
        <div className="position-relative m-auto" style={{height: '70vh'}}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default PopulationLanguageChart;