import React from 'react';

// we define contexts separately to avoid circular imports (e.g. settings->store->settings)
export const SettingsContext = React.createContext();
export const RouterContext = React.createContext();
export const StoreContext = React.createContext();
