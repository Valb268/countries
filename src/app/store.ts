import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import renderTable from '../slices/renderSlice';
import countries from '../slices/countrySlice';
import search from '../slices/searchSlice';
import message from '../slices/messageSlice';
import overallPopulation from '../slices/populationSlice';

export const store = configureStore({
    reducer: {
        renderTable, countries, search, message, overallPopulation
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
