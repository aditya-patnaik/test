import * as React from "react"
import {Link} from "react-router-dom";
import {RegistrationActions} from "../actions/RegistrationActions";

export interface LoginContainerProps {

}

interface LoginContainerState {
    email: string;
    password: string;
    loginError: string;
    loginLoader: boolean;
}

class LoginContainer extends React.Component<LoginContainerProps, LoginContainerState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: "",
            loginLoader: false,
            loginError: null
        }
    }
    onEmailChange = (evt: any) => {
        this.setState({
            email: evt.target.value
        })
    }
    onPasswordChange = (evt: any) => {
        this.setState({
            password: evt.target.value
        })
    }
    onLogin = (evt: any) => {
        this.setState({
            loginError: null,
            loginLoader: true
        }, () => {
            RegistrationActions.loginUser(this.state.email, this.state.password).then(() => {
                window.location.href = "/";
            }).catch(() => {
                this.setState({
                    loginError: "Incorrect username / password"
                })
            }).finally(() => {
                this.setState({
                    loginLoader: false
                })
            });
        })
    }
    render() {
        let isLoginLoading = this.state.loginLoader;
        return (
            <div className={"login-container col-md-3"}>
                <div className="logo-container">
                    <img src="images/medisot_logo.png" width="30" alt="Medisot Logo" />
                    <label>mediSOT</label>
                </div>
                <div className="form-row">
                    <input name={"username"}
                           autoComplete={"off"}
                           type="text"
                           value={this.state.email}
                           onChange={this.onEmailChange}
                           className="form-control form-control-sm"
                           placeholder="Email" />
                </div>
                <div className="form-row">
                    <input name={"password"} type="password" value={this.state.password} onChange={this.onPasswordChange} className="form-control form-control-sm" placeholder="Password" />
                </div>
                <div className="form-row">
                    <button disabled={isLoginLoading} onClick={this.onLogin} className="btn btn-primary btn-sm register-btn">
                        <span>Login</span>
                        { isLoginLoading && <img className={"spinner-gif"} src={"images/loader.gif"} /> }
                    </button>
                </div>
                {
                    this.state.loginError &&
                    <div className={"login-error"}>Incorrect username / password</div>
                }
                <div className={"register-user"}>
                    <span>Haven't registered yet? <Link to={"register"}>Register here</Link></span>
                </div>
            </div>
        )
    }
}

export default LoginContainer;