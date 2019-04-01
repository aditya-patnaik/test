import * as React from "react"
import PatientFilter from "../../components/patient/PatientFilter";
import PatientList from "../../components/patient/PatientList";
import PatientActions from "../../actions/PatientActions";
import { IUserProfile } from "../../../../server/models/IUserProfile";

export interface UserSearchProps {
    onUserSelect?: (user: IUserProfile, userGroup: string) => void;
}

export interface UserSearchState {
    patientList: any[];
    userGroup: string;
}

class UserSearch extends React.Component<UserSearchProps, UserSearchState> {
    constructor(props: UserSearchProps) {
        super(props)
        this.state = {
            patientList: null,
            userGroup: "doctor"
        }
    }
    onUserGroupChange = (userGroup: string) => {
        this.setState({userGroup})
    }
    onSearch = (patients: any[]) => {
        this.setState({
            patientList: patients
        })
    }
    onUserSelect = (user: IUserProfile) => {
        this.props.onUserSelect(user, this.state.userGroup);
    }
    render() {
        return (
            <div className="patient-search-container">
                <div className="patient-filter-wrapper-container">
                    <PatientFilter searchPatients={PatientActions.searchPatients}
                                onPatientSearchResult={this.onSearch} onUserGroupChange={this.onUserGroupChange} />
                </div>
                {
                    this.state.patientList &&
                    <div className="patient-list-wrapper-container">
                        <div className="list-info">{`Showing ${this.state.patientList.length} results`}</div>
                        <PatientList patients={this.state.patientList} onPatientSelect={this.onUserSelect} />   
                    </div>
                }
                {
                    this.state.patientList !== null && this.state.patientList.length === 0 &&
                    <div className={"no-user-found-label"}>No user found</div>
                }
            </div>
        )
    }
}

export default UserSearch;