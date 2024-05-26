import {useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import ModalChart from "./charts/ModalChart";
import PopulationRegionsChart from "./charts/PopulationRegionsChart";
import PopulationLanguageChart from "./charts/PopulationLanguageChart";
import LanguageCountriesChart from "./charts/LanguageCountriesChart";
import CurrenciesPopulationChart from "./charts/CurrenciesPopulationChart";



const DropdownBtn = () => {
    const [showPopulationRegionsChart, setShowPopulationRegionsChart] = useState(false);
    const [showPopulationLanguageChart, setShowPopulationLanguageChart] = useState(false);
    const [showLanguageCountriesChart, setShowLanguageCountriesChart] = useState(false);
    const [showCurrenciesChart, setShowCurrenciesChart] = useState(false);


    return (
        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Show charts
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => setShowPopulationRegionsChart(true)}>Population by regions</Dropdown.Item>
                <ModalChart show={showPopulationRegionsChart}
                            onHide={() => setShowPopulationRegionsChart(false)}
                            title={"Population by regions"}
                            chart={<PopulationRegionsChart label={'Population in region'}/>}

                />
                <Dropdown.Item onClick={() => setShowPopulationLanguageChart(true)}>Language by population</Dropdown.Item>
                <ModalChart show={showPopulationLanguageChart}
                            onHide={() => setShowPopulationLanguageChart(false)}
                            chart={<PopulationLanguageChart label={"Spoken by "}/>}
                            title={'Languages by population'}

                />
                <Dropdown.Item onClick={() => setShowLanguageCountriesChart(true)}>Language by countries</Dropdown.Item>
                <ModalChart show={showLanguageCountriesChart}
                            onHide={() => setShowLanguageCountriesChart(false)}
                            title={'Languages by the amount of countries'}
                            chart={<LanguageCountriesChart label={"Spoken in countries "}/>}

                />
                <Dropdown.Item onClick={() => setShowCurrenciesChart(true)}>Currencies by population</Dropdown.Item>
                <ModalChart show={showCurrenciesChart}
                            onHide={() => setShowCurrenciesChart(false)}
                            title={'Currencies by population'}
                            chart={<CurrenciesPopulationChart label={"Currency used by "}/>}
                />
            </Dropdown.Menu>
        </Dropdown>

    );
};

export default DropdownBtn;