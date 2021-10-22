import { Component } from "react";
import Wrapper from "../Wrapper";
import { useLocation } from "react-router-dom";
import { BaseForm } from "../BaseForm";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

function ClientForm() {
    let query = useQuery();

    return (
        <Wrapper title={ query.get('id') ? `Edit Client` : `New Client` }>
            <BaseForm>
                <input type="text" autoComplete="off" autoCorrect="off" placeholder="Name"/>
                <input type="email" autoComplete="off" autoCorrect="off" placeholder="Email Address"/>
                <button>Save</button>
            </BaseForm>
        </Wrapper>
    );
}

export {
    ClientForm
}