import { Component } from "react";
import "./Wrapper.scss";


class Wrapper extends Component {
    render() {
        return (
            <div className="Wrapper">
                <h3 className="Title">{ this.props.title }</h3>
                <div>
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default Wrapper;