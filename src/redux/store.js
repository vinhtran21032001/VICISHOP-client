import { configureStore } from "@reduxjs/toolkit";
import {combineReducers}from 'redux'
import cartReducer from '../redux/cartSlice'
import userReducer from '../redux/userSlice'
import registerReducer from '../redux/registor'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const persistedReducer = persistReducer(persistConfig, userReducer)
const rootReducer = combineReducers({
    cart: cartReducer,
    user: persistedReducer,
    registor : registerReducer,
})
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
export default store;
