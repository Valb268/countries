import React from 'react';
import {numberWithCommas} from "../utils/utils";


const Country = ({country, index}) => {


    const name = country.name;
    const capital = country.capital;
    const region = country.region
    const population = numberWithCommas(country.population);
    const languages = Object.values(country.languages).join('; ');
    const printCurrencies = (obj) => {
        const arr = [];
        for (let currency in obj) {
            let res = `${obj[currency].name} (${currency})`
            arr.push(res);
        }
        return arr.join('; ');
    }
    const currencies = printCurrencies(country.currencies);
    const flag = (size) => {
        return <img src={country.flag[size]} alt={''}/>
    }

    return (
        <tr>
            <th scope="row">{index}</th>
            <td>{name}</td>
            <td>{capital}</td>
            <td>{region}</td>
            <td>{population}</td>
            <td>{languages}</td>
            <td>{currencies}</td>
            <td>{flag('small')}</td>
        </tr>
    );
};

export default Country;