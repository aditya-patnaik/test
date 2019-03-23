import * as React from "react"
import TextInput from "../formElements/TextInput";
import Button from "../formElements/Button";

export interface PatientFilterProps {
    searchPatients: () => Promise<any[]>;
    onPatientSearchResult: (patients: any[]) => void;
}

export interface PatientFilterState {
    name: string;
    gender: string;
}

class PatientFilter extends React.Component<PatientFilterProps, PatientFilterState> {
    constructor(props: PatientFilterProps) {
        super(props)
        this.state ={
            name: null,
            gender: null
        }
    }
    onNameChange = (evt: any) => {
        this.setState({
            name: evt.target.value
        })
    }
    onFilter = () => {
        this.props.searchPatients().then((patients: any[]) => {
            this.props.onPatientSearchResult(patients)
        })
    }
    render() {
        return (
            <div className="patient-filter-container">
                <h3>Patient Search</h3>
                <div className="patient-name-filter-container">
                    <TextInput placeholder="Patient Name" onChange={this.onNameChange} value={this.state.name} />
                </div>
                <Button text="Search" onBtnClick={this.onFilter} />
            </div>
        )
    }
}

export default PatientFilter;