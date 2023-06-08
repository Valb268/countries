import {useEffect, useState} from "react";
import {api_key, base_url} from "./components/constants";
import Table from "./components/Table";
import Search from "./components/Search";
import Loading from "./components/Loading";
import {isUpToDate, saveToLocalStorage} from "./utils/utils";
import {Context} from "./utils/contexts";

function App() {
    const [countries, setCountries] = useState([]);
    const [userChoice, setUserChoice] = useState('');
    const [searchString, setSearchString] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isRenderTable, setRenderTable] = useState(false);
    const [isTableUnmount, setTableUnmount] = useState(true);


    useEffect(() => {
        requestFromServer(`${base_url}all`, 'countries');
        // handleCountryList();
        setRenderTable(true);
    }, []);

    useEffect(() => {
        if (countries.length && isTableUnmount) {
            setRenderTable(true);
        }
        if (!countries.length && searchString && userChoice) {
            let userChoiceUrl;
            if (userChoice === 'Country') {
                userChoiceUrl = 'name';
            } else {
                userChoiceUrl = userChoice.toLowerCase();
            }
            requestFromServer(`${base_url}${userChoiceUrl}/${searchString}`, searchString);
        }

    }, [isTableUnmount, countries]);

    const requestFromServer = async (url, key) => {
        const stored = JSON.parse(localStorage.getItem(key));
        if (stored && isUpToDate(stored.lastUpdated, 30)) {
            setCountries(stored.data);
        } else {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    redirect: 'follow',
                    headers: {
                        'Authorization': `Bearer ${api_key}`,
                    }
                });
                if (response.ok) {
                    const json = await response.json();
                    const fetched = Object.entries(json);
                    setCountries(fetched);
                    setErrorMessage('');
                    saveToLocalStorage(key, fetched);
                } else {
                    setRenderTable(false);
                    setCountries([]);
                    if (response.status === 404) {
                        setErrorMessage(`Error: requested data not found (404)`);
                    } else {
                        setErrorMessage(`Error: ${response.status}`);
                    }
                }
            } catch (error) {
                setErrorMessage(error.message);
                setRenderTable(false);
                setCountries([]);
            }
        }
        setSearchString('');
    }

    const handleSelect = (e) => {
        setUserChoice(e.target.value);
    }

    const handleSearchString = (e) => {
        setSearchString(e.target.value);
    }

    const cancelTable = () => {
        setRenderTable(false);
        setCountries([]);
        setErrorMessage('');
    }
    const handleClickSearch = () => {
        if (userChoice && searchString) {
            cancelTable();
        }
    }

    const handleCleanSearch = () => {
        cancelTable();
        setUserChoice('');
        setSearchString('');
        requestFromServer(`${base_url}all`, 'countries');
    }

    const values = {
        countries,
        setCountries,
        // getSearchResult,
        handleSelect,
        searchString,
        handleSearchString,
        userChoice,
        setTableUnmount,
        handleCleanSearch,
        handleClickSearch
    }

    return (
        <Context.Provider value={values}>
            <Search/>
            {isRenderTable ? <Table/> : <Loading errorMsg={errorMessage}/>}
        </Context.Provider>
    );
}

export default App;
