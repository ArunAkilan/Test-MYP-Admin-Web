// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer  from './slicers/commonSlicers';
import tabReducer from './slicers/tabsSlice';
import SidebarTab from './slicers/sideBarTab';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tabs: tabReducer,
    SidebarTab: SidebarTab,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
