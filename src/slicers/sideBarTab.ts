import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface TabState {
    value: number;
}

const initialState: TabState = {
    value: 0, // default tab index
};

const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers: {
        setTabValue(state, action: PayloadAction<number>) {
            state.value = action.payload;
        },
    },
});

export const { setTabValue } = tabSlice.actions;
export default tabSlice.reducer;
