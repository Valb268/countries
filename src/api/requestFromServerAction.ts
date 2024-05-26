import {isUpToDate, saveToLocalStorage} from "../features/utils/utils";
import {api_key} from "../features/utils/constants";
import {setCountries} from "../slices/countrySlice";
import {setRenderTable} from "../slices/renderSlice";
import {setSearchString} from "../slices/searchSlice";
import {AppDispatch} from "../app/store";
import {setMessage} from "../slices/messageSlice";
import {CountriesType} from "../features/utils/types";

export const requestFromServer = (url: string, key: string) => {
    return async (dispatch: AppDispatch) => {
        const storedRaw = localStorage.getItem(key);
        const stored = storedRaw ? JSON.parse(storedRaw) : null;
        if (stored && isUpToDate(stored.lastUpdated, 30)) {
            dispatch(setCountries(stored.data));
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
                    const fetched: [string, any][] = Object.entries(json);
                    dispatch(setCountries(fetched));
                    dispatch(setMessage(''));
                    saveToLocalStorage(key, fetched);
                } else {
                    dispatch(setRenderTable(false));
                    dispatch(setCountries({} as Array<CountriesType>));
                    if (response.status === 404) {
                        dispatch(setMessage(`Error: requested data not found (404)`));
                    } else {
                        dispatch(setMessage(`Error: ${response.status}`));
                    }
                }
            } catch
                (error: any) {
                dispatch(setMessage(error.message));
                dispatch(setRenderTable(false));
                dispatch(setCountries([]));
            }
        }
        dispatch(setSearchString(''));
    }
}
