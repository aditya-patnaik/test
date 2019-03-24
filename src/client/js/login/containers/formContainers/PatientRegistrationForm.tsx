import * as React from "react";
import DatePicker from "react-datepicker";

export interface PatientRegistrationFormProps {
    email: string;
}

export interface PatientRegistrationFormState {
    email: string;
    name: string;
    phone: string;
    uniqueGovtID: string;
    dob: Date;
    password: any;
}

export default class PatientRegistrationForm extends React.Component<PatientRegistrationFormProps, PatientRegistrationFormState> {
    constructor(props: PatientRegistrationFormProps) {
        super(props);
        this.state = {
            email: props.email,
            name: "",
            phone: "",
            uniqueGovtID: "",
            dob: null,
            password: ""
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
    render() {
        return (
            <div>
                <div className="form-row">
                    <input type="text" disabled={true} value={this.state.email} onChange={this.onEmailChange} className="form-control form-control-sm" placeholder="Email" />
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
                <div className="form-row"><input type="button" className="btn btn-primary btn-sm register-btn" value="Submit" /></div>
            </div>
        )
    }
}