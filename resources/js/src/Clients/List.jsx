import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper";
import { image as image_default } from "../image_default";
import { width } from "tailwindcss/defaultTheme";
import axios from "axios";
import useToken from "../useToken";

import './List.scss';

const ClientRow = ({ client, deleteAction }) => {
    return (
        <tr className="ClientRow">
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td className="ProfilePicture">
                <img 
                    style={
                        {
                            width: '3rem',
                            heigh: '3rem'
                        }
                    } 
                    src={`${client.profile_picture}`} alt="Profile Picture" 
                />
            </td>
            <td className="Actions">
                <Link to={`/client-form?id=${client.id}`}>
                    <button className="Action">Editar</button>
                </Link>
                <button className="Action Danger" onClick={ deleteAction } id={client.id}>Eliminar</button>
            </td>
        </tr>
    )
}

function List() {

    const [clients, setClients] = useState([]);
    const { token, setToken } = useToken();
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true)
        const request = await axios.get('/api/clients', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'appplication/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = request.data.data;
        
        console.log(data);
        setClients(data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const deleteClient = async (id) => {
        const request = await axios.delete(`/api/clients/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'appplication/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(request);
    }
    
    const deleteActionHandler = (e) => {
        e.preventDefault();
        const { id } = e.target;
        deleteClient(id);
        fetchData();
    }

    return (
        <Wrapper title="Clients">
            <div className="ClientList">
                <div className="Actions">
                    <Link to="/client-form">
                        <button className="Action">New</button>
                    </Link>
                </div>
                <table className="ListTable">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Profile Picture</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !isLoading ? 
                                clients.map((client) => (
                                    <ClientRow client={client} deleteAction={deleteActionHandler} key={client.id} />
                                )) :
                                <tr>
                                    <td>Loading...</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
}

export {
    List
}