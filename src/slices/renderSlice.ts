import {createSlice} from "@reduxjs/toolkit";

const renderSlice = createSlice({
    name: 'renderTable',
    initialState: false,
    reducers: {
        setRenderTable(state, action) {
            return action.payload;
        },
    }
})

export const {setRenderTable} = renderSlice.actions;
export default renderSlice.reducer;