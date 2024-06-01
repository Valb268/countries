import {createSlice} from "@reduxjs/toolkit";
import {countryType} from "../features/utils/types";
import {fetchCountries} from "../api/fetchCountries";

const countrySlice = createSlice({
    name: 'countries',
    initialState: [] as [string, countryType][],
    reducers: {
        setCountries(state, action) {
            return action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCountries.fulfilled, (state, action) => action.payload)
            .addCase(fetchCountries.rejected, () => [])
    }
})

export const {setCountries} = countrySlice.actions;
export default countrySlice.reducer;