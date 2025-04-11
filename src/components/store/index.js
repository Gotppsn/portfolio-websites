import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectReducer from './slices/projectSlice';
import codeSnippetReducer from './slices/codeSnippetSlice';
import taskReducer from './slices/taskSlice';
import calendarReducer from './slices/calendarSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    codeSnippets: codeSnippetReducer,
    tasks: taskReducer,
    calendar: calendarReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/login/fulfilled', 'auth/login/rejected'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user', 'calendar.events'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;