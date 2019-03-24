import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./../../css/login.scss";
import RegistrationFlow from "./containers/RegistrationFlow";
import LoginContainer from "./containers/LoginContainer";

class Login extends React.Component {
    render() {
        return (
            <Router>
                <div id={"App"} className="App">
                    <Route path="/login" component={LoginContainer} />
                    <Route path={"/register"} component={RegistrationFlow} />
                    {/*<div className="registration-container-wrapper">*/}
                        {/*<RegistrationFlow />*/}
                    {/*</div>*/}
                </div>
            </Router>
        )
    }
}

ReactDOM.render(
    <Login />,
    document.getElementById("root")
);