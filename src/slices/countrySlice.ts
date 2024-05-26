import {createSlice} from "@reduxjs/toolkit";
import {CountriesType} from "../features/utils/types";

const countrySlice = createSlice({
    name: 'countries',
    initialState: {} as Array<CountriesType>,
    reducers: {
        setCountries(state, action) {
            return action.payload;
        }
    }
})

export const {setCountries} = countrySlice.actions;
export default countrySlice.reducer;