import * as React from "react"
import PatientFilter from "../../components/patient/PatientFilter";
import PatientList from "../../components/patient/PatientList";
import PatientActions from "../../actions/PatientActions";

export interface PatientSearchProps {
    
}

export interface PatientSearchState {
    patientList: any[];
}

class PatientSearch extends React.Component<PatientSearchProps, PatientSearchState> {
    constructor(props: PatientSearchProps) {
        super(props)
        this.state = {
            patientList: null
        }
    }
    onSearch = (patients: any[]) => {
        this.setState({
            patientList: patients
        })
    }
    render() {
        return (
            <div className="patient-search-container">
                <div className="patient-filter-wrapper-container">
                    <PatientFilter searchPatients={PatientActions.searchPatients}
                                onPatientSearchResult={this.onSearch} />
                </div>
                {
                    this.state.patientList &&
                    <div className="patient-list-wrapper-container">
                        <div className="list-info">{`Showing ${this.state.patientList.length} results`}</div>
                        <PatientList patients={this.state.patientList} />   
                    </div>
                }
            </div>
        )
    }
}

export default PatientSearch;