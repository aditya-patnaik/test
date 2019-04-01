import * as React from "react"
import * as _ from "lodash"
import { NavLink as Link } from "react-router-dom"
import { IUserProfile } from "../../../../server/models/IUserProfile";

export interface PatientListProps {
    patients: any[];
    onPatientSelect?: (user: IUserProfile) => void;
}

class PatientList extends React.Component<PatientListProps> {
    render() {
        return (
            <div className="patient-list-container">
            {
                _.map(this.props.patients, (patient, index) => {
                    return <div key={index} className="patient-list-row" onClick={() => this.props.onPatientSelect(patient)}>
                        {/*<div to={`/emr/${patient.username}`}>*/}
                        <a>
                            <div className="patient-image"><i className="fas fa-user-circle"></i></div>
                            <div className="patient-info">
                                <div className="patient-name">{patient.name}</div>
                                <div className="patient-secondary-info">{patient.age} | {patient.sex}</div>
                            </div>
                        </a>
                    </div>
                })
            }
            </div>
        )
    }
}

export default PatientList;