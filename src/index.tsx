import React from "react";
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from "./pages/home";
import Opos from "./pages/opos";


import './assets/stylesheets/reset.css';


ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/opos">
                <Opos/>
            </Route>
        </Switch>
    </Router>,
    document.querySelector("#root")
)
