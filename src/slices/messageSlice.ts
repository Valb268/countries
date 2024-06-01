import {createSlice} from "@reduxjs/toolkit";
import {fetchCountries} from "../api/fetchCountries";

const messageSlice = createSlice({
    name: 'message',
    initialState: '',
    reducers: {
        setMessage(state, action) {
            return action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCountries.fulfilled, () => '')
            .addCase(fetchCountries.rejected, (state, action) => {
                return action.payload === 404 ?
                    'Error: requested data not found (404)' : `Error: ${action.payload}`;
            })
    }
})

export const {setMessage} = messageSlice.actions;
export default messageSlice.reducer;