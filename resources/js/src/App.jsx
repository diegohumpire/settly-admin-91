import React, { Component } from "react";
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
    useRouteMatch,
    useParams
} from "react-router-dom";


// Styles
import "./App.scss";

class App extends Component {
    render() {
        return (
            <div className="App">            
                <Router>
                    <div className="GlobalActions">
                        <Link to="/">
                            <button>Logout</button>
                        </Link>
                    </div>

                    <Switch>
                        <Route exact path="/">
                            <Login />
                        </Route>
                        <Route exact path="/create-account">
                            <CreateAccount />
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
}

export default App;