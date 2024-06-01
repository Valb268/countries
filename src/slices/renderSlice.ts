import {createSlice} from "@reduxjs/toolkit";
import {fetchCountries} from "../api/fetchCountries";

const renderSlice = createSlice({
    name: 'renderTable',
    initialState: false,
    reducers: {
        setRenderTable(state, action) {
            return action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCountries.rejected, () => false)
    }
})

export const {setRenderTable} = renderSlice.actions;
export default renderSlice.reducer;