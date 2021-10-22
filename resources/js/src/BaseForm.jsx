import { Component } from "react";
import './BaseForm.scss';

class BaseForm extends Component {
    render() {
        return (
            <form className="Form">
                { this.props.children }
            </form>
        )
    }
}

export {
    BaseForm
}