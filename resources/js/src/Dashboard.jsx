import Wrapper from "./Wrapper";
import { List as ClientList } from "./Clients/List";
import { Link, useHistory } from "react-router-dom";
import "./Dashboard.scss";

function getName() {
    const item = localStorage.getItem('user_information');
    const user_information = JSON.parse(item);

    return user_information?.name;
}

export default function Dashboard() {
    const history = useHistory();
    const name = getName();

    const logout = (e) => {
        e.preventDefault();
        history.push('/login');
        localStorage.removeItem('token'); 
    }

    return (
        <Wrapper title="Dashboard">
            <h4 style={{ textAlign: 'center' }}>Hi {name}, welcome to your admin account</h4>
            <div className="Dashboard">
                <div className="Actions">
                    <Link to="/client-form">
                        <button className="Action">New</button>
                    </Link>
                    <div>
                        <button className="Action Secondary" onClick={ logout }>Logout</button>
                    </div> 
                </div>
                <ClientList />
            </div>
        </Wrapper>
    );
}