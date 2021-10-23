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
    const history = useHistory();

    const createAccount = async () => {
        const request = await axios.post(`/api/user`, newAccount, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'appplication/json'
            }
        }).catch(error => error);
        const data = request.data.data;

        console.log(data);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        try {
            createAccount();
            history.push('/');
        } catch(err) {
            console.error(err);
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
