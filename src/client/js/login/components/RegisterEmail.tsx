import * as React from "react"
import {RegistrationActions} from "../actions/RegistrationActions";
import {Link} from "react-router-dom";

export interface RegisterEmailProps {
    onConfirmation: (email: string) => void;
}

export interface RegisterEmailState {
    email: string;
    otp: string;
}

class RegisterEmail extends React.Component<RegisterEmailProps, RegisterEmailState> {
    constructor(props: RegisterEmailProps) {
        super(props);
        this.state = {
            email: "",
            otp: null
        }
    }
    onEmailChange = (evt: any) => {
        this.setState({
            email: evt.target.value
        })
    }
    onOtpChange = (evt: any) => {
        this.setState({
            otp: evt.target.value
        })
    }
    onSubmit = (evt: any) => {
        if (this.state.email !== "" && this.state.otp === null) {
            RegistrationActions.registerEmail(this.state.email).then((data) => {
                this.setState({
                    otp: ""
                })
            })
        } else {
            RegistrationActions.confirmEmail(this.state.email, this.state.otp).then((data) => {
                this.props.onConfirmation(this.state.email);
            })
        }
    }
    render() {
        return (
            <div className={"register-email-container col-md-3"}>
                <div className="logo-container">
                    <img src="images/medisot_logo.png" width="30" alt="Medisot Logo" />
                    <label>mediSOT</label>
                </div>
                <div className="form-row">
                    <input type="text" disabled={this.state.otp !== null} onChange={this.onEmailChange} className="form-control form-control-sm" placeholder="Email" />
                </div>
                {
                    this.state.otp !== null &&
                    <div className="form-row">
                        <input type="text" onChange={this.onOtpChange} className="form-control form-control-sm" placeholder="OTP" />
                    </div>
                }
                <div className="form-row">
                    <input type="button" onClick={this.onSubmit} className="btn btn-primary btn-sm register-btn" value="Register" />
                </div>
                <div className={"login-user"}>
                    <span>Already registered? <Link to={"login"}>Login here</Link></span>
                </div>
            </div>
        )
    }
}

export default RegisterEmail;