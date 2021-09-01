import React, { Suspense } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import "./assets/css/resetNormalize.min.css";
import "./index.css";
import "./i18n";

import {store} from "./redux/store";
import App from "./App";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Router>
        <Suspense fallback={null}>
            <Provider store={store}>
                <App />
            </Provider>
        </Suspense>
    </Router>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
