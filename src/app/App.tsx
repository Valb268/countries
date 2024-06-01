import {useEffect} from "react";
import {base_url} from "../features/utils/constants";
import Table from "../components/Table";
import Search from "../components/Search";
import Loading from "../components/Loading";
import {requestFromServer} from "../api/requestFromServer";
import {useAppDispatch, useAppSelector} from "./hooks";
import {setRenderTable} from "../slices/renderSlice";
import './App.css';

function App() {

    const renderTable = useAppSelector(state => state.renderTable);
    const countries = useAppSelector(state => state.countries);
    const search = useAppSelector(state => state.search);
    const dispatch = useAppDispatch();

    useEffect(() => {
        requestFromServer(`${base_url}all`, 'country', dispatch);
        dispatch(setRenderTable(true));
    }, [dispatch]);

    useEffect(() => {
        if (countries.length && !renderTable) {
            dispatch(setRenderTable(true));
        }
        if (!countries.length && search.searchString && search.userChoice) {
            let userChoiceUrl;
            if (search.userChoice === 'Country') {
                userChoiceUrl = 'name';
            } else {
                userChoiceUrl = search.userChoice.toLowerCase();
            }
            if (search.searchString) {
                requestFromServer(
                    `${base_url}${userChoiceUrl}/${search.searchString}`,
                    search.searchString,
                    dispatch);
            }

        }
    }, [renderTable, countries, dispatch, search]);

    return (
        <>
            <Search/>
            {renderTable ? <Table/> : <Loading/>}
        </>)
}

export default App;
