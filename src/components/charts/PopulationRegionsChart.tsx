import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';
import {useAppSelector} from "../../app/hooks";

type Props = {
    label: string
}

const PopulationRegionsChart = ({label}: Props) => {

    const chartRef: React.MutableRefObject<any> = useRef(null);
    const {countries} = useAppSelector(state => state);

    useEffect(() => {
        const getRegions = () => {
            const set = new Set<string>();
            countries.forEach(country => set.add(country[1].region));
            return [...set];
        }
        const regions = getRegions();

        const createData = (regions: string[]) => {
            return regions.map(region => ({
                region,
                population: `${populationCount(region)}`
            }));
        };
        const data = createData(regions);

        const chartConfig = {
            type: 'doughnut',
            data: {
                labels: data.map(row => row.region),
                datasets: [
                    {
                        label: label,
                        data: data.map(row => row.population)
                    }
                ]
            },
            options: {}
        };
        const populationCount = (region: string) => {
            return countries.reduce((sum, country) => {
                if (country[1].region === region) {
                    sum += country[1].population;
                }
                return sum;
            }, 0)
        }
        const ctx = chartRef.current.getContext('2d');
        // @ts-ignore
        new Chart(ctx, chartConfig);
    }, [label, countries]);

    return (
        <div className="position-relative m-auto" style={{height: '70vh'}}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default PopulationRegionsChart;