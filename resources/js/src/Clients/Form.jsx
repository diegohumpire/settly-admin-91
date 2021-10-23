import { Component, useState, useEffect, useRef } from "react";
import Wrapper from "../Wrapper";
import { useLocation } from "react-router-dom";
import { BaseForm } from "../BaseForm";
import useToken from "../useToken";
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
};


function ClientForm() {
    let query = useQuery();

    const [message, setMessage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const { token, setToken } = useToken();
    const [client, setClient] = useState({
        name: "",
        email: "",
        profile_picture: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    if (query.get('id')) {
        useEffect(() => {
            const fetchData = async () => {
                setIsLoading(true);
                setMessage("Loading...");

                const request = await axios.get(`/api/clients/${query.get('id')}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'appplication/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = request.data.data;
                
                console.log(data);
                setClient(data);
                setIsLoading(false);
                setMessage("");
            }
            fetchData();
        }, []);
    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setClient((client) => ({
            ...client, 
            [name]: value
        }))
    }

    const onChangeImageHandler = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64);
        setPreviewImage(base64);
        setClient((client) => ({
            ...client, 
            ['profile_picture']: base64
        }))
    }

    const onClickHandler = (e) => {
        e.preventDefault();
        console.log(client);
    }

    const putData = async () => {
        setIsLoading(true);
        setMessage("Loading...");

        const clientBody = {
            name: client.name,
            email: client.email,
            profile_picture: client.profile_picture
        };
        
        const request = await axios.put(`/api/clients/${query.get('id')}`, clientBody, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'appplication/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = request.data.data;

        console.log(data);
        setClient(data);
        setIsLoading(false);
        setMessage("Done!");
    }

    const postData = async () => {
        setIsLoading(true);
        setMessage("Loading...");

        const clientBody = {
            name: client.name,
            email: client.email,
            profile_picture: client.profile_picture
        };
        
        const request = await axios.post(`/api/clients`, clientBody, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'appplication/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = request.data.data;

        console.log(data);
        setClient(data);
        setIsLoading(false);
        setMessage("Done!");
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        
        if (query.get('id')) {
            putData();           
        } else {
            postData();
        }
    }

    return (
        <Wrapper title={ query.get('id') ? `Edit Client` : `New Client` }>
            <div style={{ textAlign: 'center', margin: 'auto' }}>
                <span style={{ textAlign: 'center', margin: 'auto', color: 'green' }}>{ message }</span>
            </div>
            <BaseForm onSubmit={onSubmitHandler}>
                <input type="text" name="name" value={client.name} onChange={onChangeHandler} autoComplete="off" autoCorrect="off" placeholder="Name"/>
                <input type="email" name="email" value={client.email} onChange={onChangeHandler} onChange={onChangeHandler}autoComplete="off" autoCorrect="off" placeholder="Email Address"/>
                <input type="file" name="profile_picture" accept=".jpeg, .png, .jpg" onChange={onChangeImageHandler}/>
                <img src={ previewImage } alt="Preview" style={{ marginBottom: '0.5rem', maxWidth: '4rem', maxHeight: '4rem' }} />
                <button>Save</button>
                <Link to="/">
                    <button className="Secondary" style={{ marginTop: '0.5rem' }}>Back</button>
                </Link>
            </BaseForm>
        </Wrapper>
    );
}

export {
    ClientForm
}