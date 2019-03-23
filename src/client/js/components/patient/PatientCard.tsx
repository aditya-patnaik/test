import * as React from "react"

export interface PatientCardProps {
    patientDetails: any;
}

class PatientCard extends React.Component<PatientCardProps> {
    render() {
        return (
            <div className="patient-card-container">
                <div className="patient-image-container">
                    <i className="fas fa-user-circle"></i>
                </div>
                <div className="patient-name-container">{this.props.patientDetails.name}</div>
            </div>
        )
    }
}

export default PatientCard;