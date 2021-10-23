import React, { useState } from "react";
import CreateAccount from "./Auth/CreateAccount";
import Login from "./Auth/Login";
import { 
        List as ClientList,
    } from "./Clients/List";
import Dashboard from "./Dashboard";
import { ClientForm } from "./Clients/Form";
import {
        BrowserRouter as Router,
        Switch,
        Route,
        Link,
        useLocation,
        useHistory,
        Redirect
    } from "react-router-dom";
import useToken from './useToken';


// Styles
import "./App.scss";

function PrivateRoute({ children, ...rest }) {
    let { token } = useToken();
    console.log(token);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                        pathname: "/login",
                        state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default function App() {
    
    // TODO
    const { token, setToken } = useToken();

    return (
        <div className="App">            
            <Router>
                <Switch>
                    <Route exact path="/login">
                        <Login setToken={setToken} />
                    </Route>
                    <Route exact path="/create-account">
                        <CreateAccount />
                    </Route>
                    <PrivateRoute exact path="/">
                        <Dashboard />
                    </PrivateRoute>
                    <PrivateRoute exact path="/client-list">
                        <Dashboard />
                    </PrivateRoute>
                    <PrivateRoute exact path="/client-form">
                        <ClientForm />
                    </PrivateRoute>
                </Switch>
            </Router>
        </div>
    )
}