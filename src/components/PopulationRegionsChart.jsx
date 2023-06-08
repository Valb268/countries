import {useContext, useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';
import {Context} from "../utils/contexts";
const PopulationRegionsChart = ({label}) => {

    const chartRef = useRef(null);
    const {countries} = useContext(Context);

    useEffect(() => {

        const regions = getRegions();
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

        const ctx = chartRef.current.getContext('2d');
        new Chart(ctx, chartConfig);
    }, []);


    const getRegions = () => {
        const set = new Set();
        countries.forEach(country => set.add(country[1].region));
        const arr = [];
        for (let region of set) {
            arr.push(region);
        }
        return arr;
    }

    const populationCount = (region) => {
        return countries.reduce((sum, country) => {
            if (country[1].region === region) {
                sum += country[1].population;
            }
            return sum;
        }, 0)
    }

    const createData = (regions) => {
        const arr = [];
        for (let i = 0; i < regions.length; i++) {
            arr.push({region: regions[i], population: `${populationCount(regions[i])}`})
        }
        return arr;
    };


    return (
        <div className="position-relative m-auto" style={{height: '70vh'}}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default PopulationRegionsChart;