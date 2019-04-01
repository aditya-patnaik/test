import * as React from "react"
import TextInput from "../formElements/TextInput";
import Button from "../formElements/Button";

export interface PatientFilterProps {
    searchPatients: (username: string, userGroups: string[]) => Promise<any>;
    onPatientSearchResult: (patients: any[]) => void;
    onUserGroupChange: (userGroup: string) => void;
}

export interface PatientFilterState {
    name: string;
    userGroup: string;
    isSearchLoading: boolean;
}

class PatientFilter extends React.Component<PatientFilterProps, PatientFilterState> {
    constructor(props: PatientFilterProps) {
        super(props)
        this.state ={
            name: null,
            userGroup: "doctor",
            isSearchLoading: false
        }
    }
    onNameChange = (evt: any) => {
        this.setState({
            name: evt.target.value
        })
    }
    onUserGroupChange = (evt: any) => {
        this.setState({
            userGroup: evt.currentTarget.value
        }, () => {
            this.props.onUserGroupChange(this.state.userGroup)
        })
    }
    onFilter = () => {
        this.setState({
            isSearchLoading: true
        }, () => {
            this.props.searchPatients(this.state.name, [this.state.userGroup]).then((response: any) => {
                let userObjs = JSON.parse(response.msg).map((item: any) => item.Record);
                this.props.onPatientSearchResult(userObjs)
            }).catch(() => {
                this.props.onPatientSearchResult([])
            }).finally(() => {
                this.setState({
                    isSearchLoading: false
                })
            })
        })
    }
    render() {
        let isSearchLoading = this.state.isSearchLoading;
        return (
            <div className="patient-filter-container">
                <h3>User Search</h3>
                <div className="patient-name-filter-container">
                    <TextInput placeholder="Username" onChange={this.onNameChange} value={this.state.name} />
                </div>
                <div className="patient-group-filter-container">
                    <div className={"radio-btn-container"}>
                        <input type={"radio"}
                               checked={this.state.userGroup === "doctor"}
                               name={"user-group"}
                               value={"doctor"}
                               onClick={this.onUserGroupChange} />
                        <span>Doctor</span>
                    </div>
                    <div className={"radio-btn-container"}>
                        <input type={"radio"}
                               checked={this.state.userGroup === "lab"}
                               name={"user-group"}
                               value={"lab"}
                               onClick={this.onUserGroupChange} />
                        <span>Lab</span>
                    </div>
                    <div className={"radio-btn-container"}>
                        <input type={"radio"}
                               checked={this.state.userGroup === "pharmacy"}
                               name={"user-group"}
                               value={"pharmacy"}
                               onClick={this.onUserGroupChange} />
                        <span>Pharmacy</span>
                    </div>
                </div>
                <Button text="Search" cssClasses={"search-btn"} onBtnClick={this.onFilter} disabled={isSearchLoading}>
                    { isSearchLoading && <img className={"spinner-gif"} src={"images/loader.gif"} /> }
                </Button>
            </div>
        )
    }
}

export default PatientFilter;