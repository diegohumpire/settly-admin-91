import { Component } from "react";
import './BaseForm.scss';

class BaseForm extends Component {
    render() {
        return (
            <form className="Form" onSubmit={this.props.onSubmit}>
                { this.props.children }
            </form>
        )
    }
}

export {
    BaseForm
}