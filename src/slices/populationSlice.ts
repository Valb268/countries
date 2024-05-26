import {createSlice} from "@reduxjs/toolkit";

const populationSlice = createSlice({
    name: 'population',
    initialState: 0,
    reducers: {
        setOverallPopulation(state, action) {
            return action.payload;
        }
    }
})

export const {setOverallPopulation} = populationSlice.actions;
export default populationSlice.reducer;