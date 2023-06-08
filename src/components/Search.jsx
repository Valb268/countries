import {useContext} from 'react';
import {columns} from "./constants";
import {Context} from "../utils/contexts";

const Search = () => {

    const {
        handleSelect,
        handleSearchString,
        searchString,
        userChoice,
        handleClickSearch,
        handleCleanSearch
    } = useContext(Context);


    return (
        <div className="input-group m-3 w-50 ">
            <label className="input-group-text" htmlFor="inputSearch">Search for</label>
            <select className="form-select" id="inputSearch" onChange={handleSelect} value={userChoice}>
                <option value={""}>Choose...</option>
                {columns.map((column, index) => {
                    if (column !== '#' && column !== 'Population' && column !== 'Flag') {
                        return <option key={index} value={column}>{column}</option>
                    }
                })}
            </select>
            <input type="search" id="form1" className="form-control" value={searchString}
                   onChange={handleSearchString} onKeyUp={(event) => {
                if (event.key === 'Enter') {
                    handleClickSearch();
                }
            }}/>
            <label className="form-label" htmlFor="form1"></label>
            <button type="button" className="btn btn-primary" onClick={() => {
                handleClickSearch();
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-search" viewBox="0 0 16 16">
                    <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                <i className="bi bi-search"></i>
            </button>
            <button type="button" className="btn btn-primary mx-2" onClick={() => {
                handleCleanSearch();
            }}>
                Clean
            </button>
        </div>
    );
};

export default Search;