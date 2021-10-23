import React, { Component, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { BaseForm } from "../BaseForm";
import Wrapper from "../Wrapper";
import axios from "axios";
import PropTypes from 'prop-types';

import "./Login.scss";

async function loginUser(credentials) {
    return await axios.post('/api/access', credentials, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'appplication/json'
        }
    })
    .then((data) => {
        return data;
    })
    .catch(error => error);
}

function setUserInformation({ name, email }) {
    localStorage.setItem('user_information', JSON.stringify({ name, email }))
}

export default function Login({ setToken }) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState();
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        console.log('Login...');
        const request = await loginUser({
            email,
            password
        });
        
        console.log(request);
        console.log('Done...');

        if (request.response?.status && [501, 422, 400].includes(request.response?.status)) {
            setErrorMessage("Invalid Credentials");
        } else {
            console.log(request.data);
            setToken(request.data);
            setUserInformation(request.data);
            history.push('/');
        }
    }

    return (
        <Wrapper title="Login">
            <div className="Login">
                {location.hash.toString() === "#success_new_account" ? <h5 style={{ color: 'green', textAlign: 'center' }}>Account Created!</h5> : ''}
                {errorMessage ? <h5 style={{ color: 'red', textAlign: 'center' }}>{ errorMessage }</h5> : ''}
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
