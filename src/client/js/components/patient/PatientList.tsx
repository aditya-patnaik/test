import * as React from "react"
import * as _ from "lodash"
import { NavLink as Link } from "react-router-dom"

export interface PatientListProps {
    patients: any[];
}

class PatientList extends React.Component<PatientListProps> {
    render() {
        return (
            <div className="patient-list-container">
            {
                _.map(this.props.patients, (patient, index) => {
                    return <div key={index} className="patient-list-row">
                        <Link to={`/emr/${patient.id}`}>
                            <div className="patient-image"><i className="fas fa-user-circle"></i></div>
                            <div className="patient-info">
                                <div className="patient-name">{patient.name}</div>
                                <div className="patient-secondary-info">{patient.age} | {patient.gender}</div>
                            </div>
                        </Link>
                    </div>
                })
            }
            </div>
        )
    }
}

export default PatientList;