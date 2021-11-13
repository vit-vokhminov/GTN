import React, { Suspense } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import "./assets/css/resetNormalize.min.css";
import "./index.css";
import "./i18n";

import {store} from "./redux/store";
import App from "./App";

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
