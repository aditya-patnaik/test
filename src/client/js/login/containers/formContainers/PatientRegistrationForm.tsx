import * as React from "react"
import DatePicker from "react-datepicker"
import {RegistrationActions} from "../../actions/RegistrationActions"

export interface PatientRegistrationFormProps {
    email: string;
    onRegistrationSuccess: () => void;
}

export interface PatientRegistrationFormState {
    email: string;
    username: string;
    name: string;
    phone: string;
    uniqueGovtID: string;
    dob: Date;
    password: any;
    registrationError: string;
}

export default class PatientRegistrationForm extends React.Component<PatientRegistrationFormProps, PatientRegistrationFormState> {
    constructor(props: PatientRegistrationFormProps) {
        super(props);
        this.state = {
            email: props.email,
            username: "",
            name: "",
            phone: "",
            uniqueGovtID: "",
            dob: null,
            password: "",
            registrationError: null
        }
    }
    onEmailChange = (evt: any) => {
        this.setState({
            email: evt.target.value
        })
    }
    onNameChange = (evt: any) => {
        this.setState({
            name: evt.target.value
        })
    }
    onUsernameChange = (evt: any) => {
        this.setState({
            username: evt.target.value
        })
    }
    onPhoneChange = (evt: any) => {
        this.setState({
            phone: evt.target.value
        })
    }
    onGovtIdChange = (evt: any) => {
        /*if (AppUtils.isPassportNumber(evt.target.value)) {
            this.setState({
                passport: evt.target.value,
                aadhar: ""
            })
        } else {
            this.setState({
                passport: "",
                aadhar: evt.target.value
            })
        }*/
        this.setState({
            uniqueGovtID: evt.target.value
        })
    }
    onDobChange = (value: any) => {
        this.setState({
            dob: value
        })
    }
    onPasswordChange = (evt: any) => {
        this.setState({
            password: evt.target.value
        })
    }
    onSubmit = (evt: any) => {
        RegistrationActions.registerUser({
            username: this.state.username,
            name: this.state.name,
            dob: this.state.dob,
            phone: this.state.phone,
            email: this.state.email,
            uniqueGovtID: this.state.uniqueGovtID
        }, this.state.password).then(() => {
            this.props.onRegistrationSuccess()
        }).catch((err) => {
            this.setState({
                registrationError: err.msg
            })
        });
    }
    render() {
        return (
            <div className={"user-registration-form-container"}>
                <div className="form-row">
                    <input type="text" disabled={true} value={this.state.email} onChange={this.onEmailChange} className="form-control form-control-sm" placeholder="Email" />
                </div>
                <div className="form-row">
                    <input type="text" value={this.state.username} onChange={this.onUsernameChange} className="form-control form-control-sm" placeholder="Username" />
                </div>
                <div className="form-row">
                    <input type="text" value={this.state.name} onChange={this.onNameChange} className="form-control form-control-sm" placeholder="Name" />
                </div>
                <div className="form-row">
                    <input type="text" value={this.state.phone} onChange={this.onPhoneChange} className="form-control form-control-sm" placeholder="Phone" />
                </div>
                <div className="form-row">
                    <input type="text" value={this.state.uniqueGovtID} onChange={this.onGovtIdChange} className="form-control form-control-sm" placeholder="Aadhar / Passport number" />
                </div>
                <div className="form-row">
                    <DatePicker className="form-control form-control-sm"
                                placeholderText="Date of birth"
                                selected={this.state.dob}
                                onChange={this.onDobChange} />
                </div>
                <div className="form-row">
                    <input type="password" value={this.state.password} onChange={this.onPasswordChange} className="form-control form-control-sm" placeholder="Password" />
                </div>
                <div className="form-row">
                    <input type="button" className="btn btn-primary btn-sm register-btn" value="Submit" onClick={this.onSubmit} />
                </div>
                {
                    this.state.registrationError &&
                    <div className="registration-error-container">{this.state.registrationError}</div>
                }
            </div>
        )
    }
}