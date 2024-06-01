import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';
import {useAppSelector} from "../../app/hooks";

type Props = {
    label: string
}

const LanguageCountriesChart = ({label}: Props) => {

    const chartRef: React.MutableRefObject<any> = useRef(null);
    const countries = useAppSelector(state => state.countries);

    useEffect(() => {
        const getLanguagesByCountries = () => {
            const languages = {} as {[key: string]: number};
            countries.forEach(country => {
                const arrLangs = Object.values(country[1].languages);
                arrLangs.forEach(language => {
                    if (!languages[language]) {
                        languages[language] = 1;
                    } else {
                        languages[language]++;
                    }
                });

            });
            return languages;
        }
        const languages = getLanguagesByCountries();
        const data = createData(languages);
        const chartConfig = {
            type: 'doughnut',
            data: {
                labels: data.map(row => row.language),
                datasets: [
                    {
                        label: label,
                        data: data.map(row => row.countries)
                    }
                ]
            },
            options: {}
        };

        const ctx = chartRef.current.getContext('2d');
        // @ts-ignore
        new Chart(ctx, chartConfig);
    }, [label, countries]);


    const createData = (languages: { [x: string]: any; }) => {
        const arr = [];
        for (let language in languages) {
            if (languages[language] > 2) {
                arr.push({language, countries: languages[language]});
            }
        }
        return arr;
    }


    return (
        <div className="position-relative m-auto" style={{height: '70vh'}}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default LanguageCountriesChart;