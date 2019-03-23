import * as React from "react";
import DatePicker from "react-datepicker";
import AppUtils from "./../../../utils/AppUtils";

export interface PatientRegistrationFormProps {

}

export interface PatientRegistrationFormState {
    name: string;
    aadhar: string;
    passport: string;
    dob: Date;
}

export default class PatientRegistrationForm extends React.Component<PatientRegistrationFormProps, PatientRegistrationFormState> {
    constructor(props: PatientRegistrationFormProps) {
        super(props);
        this.state = {
            name: "",
            aadhar: "",
            passport: "",
            dob: null
        }
    }
    onNameChange = (evt: any) => {
        this.setState({
            name: evt.target.value
        })
    }
    onPassportChange = (evt: any) => {
        if (AppUtils.isPassportNumber(evt.target.value)) {
            this.setState({
                passport: evt.target.value,
                aadhar: ""
            })
        } else {
            this.setState({
                passport: "",
                aadhar: evt.target.value
            })
        }
    }
    onDobChange = (value: any) => {
        this.setState({
            dob: value
        })
    }
    render() {
        return (
            <div>
                <div className="form-row">
                    <input type="text" onChange={this.onNameChange} className="form-control form-control-sm" placeholder="Name" />
                </div>
                <div className="form-row">
                    <input type="text" className="form-control form-control-sm" placeholder="Aadhar / Passport number" />
                </div>
                <div className="form-row">
                    <DatePicker className="form-control form-control-sm"
                                placeholderText="Date of birth"
                                selected={this.state.dob}
                                onChange={this.onDobChange} />
                </div>
                <div className="form-row"><input type="button" className="btn btn-primary btn-sm register-btn" value="Submit" /></div>
            </div>
        )
    }
}