import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';
import {useAppSelector} from "../../app/hooks";
import {langType} from "../../features/utils/types";

type Props = {
    label: string
}


const PopulationLanguageChart = ({label}: Props) => {

    const chartRef: React.MutableRefObject<any> = useRef(null);
    const countries = useAppSelector(state => state.countries);
    const overallPopulation = useAppSelector(state => state.overallPopulation);

    useEffect(() => {
        const getLanguages = () => {
            const languageSet = new Set<string>();
            countries.forEach(country => {
                const arrLangs = Object.values(country[1].languages);
                arrLangs.forEach(language => languageSet.add(language));
            });
            return [...languageSet];
        }
        const languages = getLanguages();
        const populationCount = (language: string) => {
            return countries.reduce((sum, country) => {
                const arrLangs = Object.values(country[1].languages);
                if (arrLangs.includes(language)) {
                    sum += country[1].population;
                }
                return sum;
            }, 0)
        }
        const createData = (languages: string | string[]) => {
            const arr = [] as langType[];
            for (let i = 0; i < languages.length; i++) {
                const howManyPeople = populationCount(languages[i]);
                if (howManyPeople > overallPopulation / 100) {
                    arr.push({language: languages[i], population: `${howManyPeople}`});
                }
            }
            return arr;
        };
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
        // @ts-ignore
        new Chart(ctx, chartConfig);
    }, [label, countries, overallPopulation]);

    return (
        <div className="position-relative m-auto" style={{height: '70vh'}}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default PopulationLanguageChart;