import {useEffect} from "react";
import {base_url} from "../features/utils/constants";
import Table from "../components/Table";
import Search from "../components/Search";
import Loading from "../components/Loading";
import {requestFromServer} from "../api/requestFromServerAction";
import {useAppDispatch, useAppSelector} from "./hooks";
import {setRenderTable} from "../slices/renderSlice";
import './App.css';

function App() {

  const {renderTable, countries, search} = useAppSelector(state => state);
  const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(requestFromServer(`${base_url}all`, 'countries'));
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
                dispatch(
                    requestFromServer(
                        `${base_url}${userChoiceUrl}/${search.searchString}`,
                        search.searchString));
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
