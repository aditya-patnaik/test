import * as React from "react";
import * as ReactDOM from "react-dom";
import RegistrationContainer from "./components/RegistrationContainer"
import "./../../css/login.scss";

class Login extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="registration-container-wrapper">
                    <RegistrationContainer />
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Login />,
    document.getElementById("root")
);