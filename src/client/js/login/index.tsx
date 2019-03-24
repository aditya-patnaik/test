import * as React from "react";
import * as ReactDOM from "react-dom";
import "./../../css/login.scss";
import RegistrationFlow from "./containers/RegistrationFlow";

class Login extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="registration-container-wrapper">
                    <RegistrationFlow />
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Login />,
    document.getElementById("root")
);