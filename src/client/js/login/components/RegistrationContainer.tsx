import * as React from "react";
import PatientRegistrationForm from "../containers/formContainers/PatientRegistrationForm";
import DoctorRegistrationForm from "../containers/formContainers/DoctorRegistrationForm";
import InstitutionRegistrationForm from "../containers/formContainers/InstitutionRegistrationForm";
import LabRegistration from "../containers/formContainers/LabRegistration";
import UserTypeSelector from "./UserTypeSelector";

export interface RegistrationContainerProps {
    email: string;
    onRegistrationSuccess: () => void;
}

export interface RegistrationContainerState {
    selectedType: number;
}

export default class RegistrationContainer extends React.Component<RegistrationContainerProps, RegistrationContainerState> {
    constructor(props: RegistrationContainerProps) {
        super(props);
        this.state = {
            selectedType: 1
        }
    }
    updateSelection = (type: number) => {
        this.setState({
            selectedType: type
        })
    }
    formToDisplay = () => {
        if (this.state.selectedType === 1) return <PatientRegistrationForm email={this.props.email} onRegistrationSuccess={this.props.onRegistrationSuccess} />
        else if (this.state.selectedType === 2) return <DoctorRegistrationForm />
        else if (this.state.selectedType === 3) return <InstitutionRegistrationForm />
        else return <LabRegistration />
    }
    render() {
        return (
            <div className="registration-container col-md-3">
                <div className="logo-container">
                    <img src="images/medisot_logo.png" width="30" alt="Medisot Logo" />
                    <label>mediSOT</label>
                </div>
                {/*<UserTypeSelector updateSelection={this.updateSelection} selectedType={this.state.selectedType} />*/}
                {this.formToDisplay()}
            </div>
        )
    }
}