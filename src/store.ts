// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer  from './slicers/commonSlicers';
import tabReducer from './slicers/tabsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tabs: tabReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
