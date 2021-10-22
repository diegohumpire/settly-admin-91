import React, { Component } from "react";
import { BaseForm } from "../BaseForm";
import Wrapper from "../Wrapper";

import "./CreateAccount.scss";

class CreateAccount extends Component {
    render() {
        return (
            <Wrapper title="Create your account">
                <div className="CreateAccount">
                    <BaseForm>
                        <input type="text" placeholder="First name"/>
                        <input type="text" placeholder="Surname"/>
                        <input type="email" autoComplete="off" autoCorrect="off" placeholder="Email Address"/>
                        <input type="email" autoComplete="off" autoCorrect="off" placeholder="Confirm Email Address"/>
                        <input type="password" placeholder="Password"/>
                        <input type="password" placeholder="Repeat your password"/>
                        <div className="Buttons">
                            <button className="Button">Create Account</button>
                        </div>
                    </BaseForm>
                </div>
            </Wrapper>
        )
    }
}

export default CreateAccount;