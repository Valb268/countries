import {isUpToDate} from "../features/utils/utils";
import {setCountries} from "../slices/countrySlice";
import {setSearchString} from "../slices/searchSlice";
import {AppDispatch} from "../app/store";
import {fetchCountries} from "./fetchCountries";

export const requestFromServer = (url: string, key: string, dispatch: AppDispatch) => {

    const storedRaw = localStorage.getItem(key);
    const stored = storedRaw ? JSON.parse(storedRaw) : null;
    if (stored && isUpToDate(stored.lastUpdated, 30)) {
        dispatch(setCountries(stored.data));
    } else {
        dispatch(fetchCountries({url, key}));
    }
    dispatch(setSearchString(''));

}
