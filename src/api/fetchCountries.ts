import {createAsyncThunk} from "@reduxjs/toolkit";
import {saveToLocalStorage} from "../features/utils/utils";
import {api_key} from "../features/utils/constants";
import {countryType} from "../features/utils/types";

interface FetchCountriesParams {
    url: string;
    key: string;
}

export const fetchCountries = createAsyncThunk(
    'countries/fetchCountries',
    async ({url, key}: FetchCountriesParams, {rejectWithValue}) => {

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
                const fetched: [string, countryType][] = Object.entries(json);
                saveToLocalStorage(key, fetched);
                return fetched;
            } else {
                return rejectWithValue(response.status);
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
)