import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MainReducer from './app/MainReducer';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import AuthReducer from './app/AuthReducer';
import { CookiesProvider } from 'react-cookie';
import TokenReducer from './app/TokenReducer';
import UserInfoReducer from './app/UserInfoReducer';
import ChatInfoReducer from './app/ChatInfoReducer';
import ChatBtnReducer from './app/ChatBtnReducer';
import OpponentReducer from './app/OpponentReducer';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from "redux-persist/lib/storage";
import "./language/i18n";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["ChatBtnReducer"]
}

const rootReducer = combineReducers({
    MainReducer,
    AuthReducer,
    TokenReducer,
    UserInfoReducer,
    ChatInfoReducer,
    ChatBtnReducer,
    OpponentReducer,
});


let persistrootReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistrootReducer)

let persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <CookiesProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <App />
      </ PersistGate>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
