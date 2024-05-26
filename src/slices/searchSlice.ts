import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchString: '',
        userChoice: ''
    },
    reducers: {
        setSearchString(state, action) {
            state.searchString = action.payload;
        },
        setUserChoice(state, action) {
            state.userChoice = action.payload;
        }
    }
})

export const {setSearchString, setUserChoice} = searchSlice.actions;
export default searchSlice.reducer;