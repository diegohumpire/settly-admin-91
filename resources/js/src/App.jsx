import React, { useState } from "react";
import CreateAccount from "./Auth/CreateAccount";
import Login from "./Auth/Login";
import { 
    List as ClientList,
} from "./Clients/List";
import { ClientForm } from "./Clients/Form";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import useToken from './useToken';


// Styles
import "./App.scss";

// TODO
// function setToken(userToken) {
//     localStorage.setItem('token', JSON.stringify(userToken));
// }

// TODO
// function getToken() {
//     const tokenString = localStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);

//     return userToken?.access_token
// }

// TODO
function logout() {
    localStorage.removeItem('token'); 
    // setToken();
}

function App() {
    
    // TODO
    // const [ token, setToken] = useState();
    const { token, setToken } = useToken();
    // const token = getToken();

    console.log(token);

    if (!token) {
        return (
            <div className="App">            
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Login setToken={setToken} />
                        </Route>
                        <Route exact path="/create-account">
                            <CreateAccount />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }

    return (
        <div className="App">            
            <Router>
                <div className="GlobalActions">
                    <button onClick={ logout }>Logout</button>
                </div>

                <Switch>
                    <Route exact path="/">
                        <ClientList />
                    </Route>
                    <Route exact path="/client-list">
                        <ClientList />
                    </Route>
                    <Route exact path="/client-form">
                        <ClientForm />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;