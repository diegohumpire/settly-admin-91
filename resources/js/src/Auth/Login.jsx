import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { BaseForm } from "../BaseForm";
import Wrapper from "../Wrapper";
import axios from "axios";
import PropTypes from 'prop-types';

import "./Login.scss";

async function loginUser(credentials) {
    return axios.post('/api/access', credentials, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'appplication/json'
        }
    })
    .then(data => {
        console.log(data);
        return data.data;
    })
    .catch(error => {
        console.log(error);
        return error;
    });
}

export default function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        console.log(token);
        setToken(token);
    }

    return (
        <Wrapper title="Login">
            <div className="Login">
                <BaseForm onSubmit={handleSubmit}>
                    <input type="email" autoComplete="off" autoCorrect="off" placeholder="Email Address" onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <div className="Buttons">
                        <button className="Button">Join</button>
                    </div>
                    <div className="tiny">
                        <span>No account yet? <Link to="/create-account">Create one here</Link></span>
                    </div>
                </BaseForm>
            </div>
        </Wrapper>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};
