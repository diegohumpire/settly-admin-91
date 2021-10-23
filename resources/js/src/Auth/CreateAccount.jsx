import React, { Component, useState } from "react";
import { BaseForm } from "../BaseForm";
import Wrapper from "../Wrapper";
import { useHistory } from "react-router-dom";

import "./CreateAccount.scss";

export default function CreateAccount() {
    const [newAccount, setNewAccount] = useState({
        name: '',
        surname: '',
        email: '',
        email_confirmation: '',
        password: '',
        password_confirmation: ''
    });
    const [errorMessage, setErrorMessage] = useState();
    const history = useHistory();

    const createAccount = async () => {
        return await axios.post(`/api/user`, newAccount, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'appplication/json'
            }
        })
        .then(data => data)
        .catch(error => error);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        const request = await createAccount();

        if (request.response?.status && [501, 422, 400].includes(request.response?.status)) {
            setErrorMessage("Invalid data");
        } else {
            console.log(request.data);
            history.push({
                pathname: '/login',
                hash: '#success_new_account'
            });
        }

    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setNewAccount((newAccount) => ({
            ...newAccount, 
            [name]: value
        }))
    }

    return (
        <Wrapper title="Create your account">
            <div className="CreateAccount">
                {errorMessage ? <h5 style={{ color: 'red', textAlign: 'center' }}>{ errorMessage }</h5> : ''}
                <BaseForm onSubmit={ submitHandler }>
                    <input type="text" name="name" onChange={onChangeHandler} placeholder="First name"/>
                    <input type="text" name="surname" onChange={onChangeHandler} placeholder="Surname"/>
                    <input type="email" name="email" onChange={onChangeHandler} autoComplete="off" autoCorrect="off" placeholder="Email Address"/>
                    <input type="email" name="email_confirmation" onChange={onChangeHandler} autoComplete="off" autoCorrect="off" placeholder="Confirm Email Address"/>
                    <input type="password" name="password" onChange={onChangeHandler} placeholder="Password"/>
                    <input type="password" name="password_confirmation" onChange={onChangeHandler} placeholder="Repeat your password"/>
                    <div className="Buttons">
                        <button className="Button">Create Account</button>
                    </div>
                </BaseForm>
            </div>
        </Wrapper>
    )
}
