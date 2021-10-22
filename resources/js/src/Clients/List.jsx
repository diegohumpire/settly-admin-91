import React, { Component } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../Wrapper";
import { image as image_default } from "../image_default";
import { width } from "tailwindcss/defaultTheme";

import './List.scss';

const ClientRow = ({ client }) => {
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
                    src={`data:image/png;base64,${client.profile_picture}`} alt="Profile Picture" 
                />
            </td>
            <td className="Actions">
                <Link to={`/client-form?id=${client.id}`}>
                    <button className="Action">Editar</button>
                </Link>
                <button className="Action Danger">Eliminar</button>
            </td>
        </tr>
    )
}

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clients: [
                {
                    id: 1,
                    name: 'Diego',
                    email: 'dh@gmail.com',
                    profile_picture: image_default
                },
                {
                    id: 2,
                    name: 'Alberto',
                    email: 'alberto@gmail.com',
                    profile_picture: image_default
                }
            ]
        }
    }

    render() {
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
                                this.state.clients.map((client) => (
                                    <ClientRow client={client} key={client.id} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        )
    }
}

export {
    List
};