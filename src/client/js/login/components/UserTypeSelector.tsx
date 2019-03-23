import * as React from "react";

export interface UserTypeSelectorProps {
    selectedType: number;
    updateSelection: (selection: number) => void;
}

export default class UserTypeSelector extends React.Component<UserTypeSelectorProps> {
    render() {
        return (
            <div>
                <div className={`registration-type-button ${this.props.selectedType === 1 ? "active" : ""}`}
                        onClick={this.props.updateSelection.bind(this, 1)}>
                    <i className="fas fa-user-alt"></i>
                    <span>Patient</span>
                </div>
                <div className={`registration-type-button ${this.props.selectedType === 2 ? "active" : ""}`}
                        onClick={this.props.updateSelection.bind(this, 2)}>
                    <i className="fas fa-stethoscope"></i>
                    <span>Doctor</span>
                </div>
                <div className={`registration-type-button ${this.props.selectedType === 3 ? "active" : ""}`}
                        onClick={this.props.updateSelection.bind(this, 3)}>
                    <i className="fas fa-clinic-medical"></i>
                    <span>Pharma</span>
                </div>
                <div className={`registration-type-button ${this.props.selectedType === 4 ? "active" : ""}`}
                        onClick={this.props.updateSelection.bind(this, 4)}>
                    <i className="fas fa-microscope"></i>
                    <span>Lab</span>
                </div>
            </div>
        )
    }
}