import React, { Component } from "react";
import { Link } from "react-router-dom";
import { BaseForm } from "../BaseForm";
import Wrapper from "../Wrapper";

import "./Login.scss";


class CreateAccount extends Component {
    render() {
        return (
            <Wrapper title="Login">
                <div className="Login">
                    <BaseForm>
                        <input type="email" autoComplete="off" autoCorrect="off" placeholder="Email Address"/>
                        <input type="password" placeholder="Password"/>
                        <div className="Buttons">
                            <Link to="/client-list">
                                <button className="Button">Join</button>
                            </Link>
                        </div>
                        <div className="tiny">
                            <span>No account yet? <Link to="/create-account">Create one here</Link></span>
                        </div>
                    </BaseForm>
                </div>
            </Wrapper>
        )
    }
}

export default CreateAccount;