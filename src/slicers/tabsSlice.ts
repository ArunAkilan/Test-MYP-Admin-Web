// src/features/tabs/tabSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { TabStatus } from '../components/Common/HorizondalTab/Dashboardtab.model';

interface TabState {
  currentTab: 0;
}

const initialState: TabState = {
  currentTab: TabStatus.Pending,
};
const tabSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<any>) => {
      state.currentTab  = action.payload;
    },
  },
});

export const { setActiveTab } = tabSlice.actions;
export default tabSlice.reducer;
