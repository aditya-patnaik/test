import * as React from "react"
import * as _ from "lodash"
import {IUserProfile} from "../../../../server/models/IUserProfile";
import PatientList from "../../components/patient/PatientList";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import PatientActions from "../../actions/PatientActions";

export interface RawMyPatientsContainerProps {
    history?: any;
}

interface MyPatientsContainerState {
    isLoading: boolean;
    err: any;
    users: any;
}

type MyPatientsContainerProps = RawMyPatientsContainerProps & IMapDispatchToProps

class MyPatientsContainer extends React.Component<MyPatientsContainerProps, MyPatientsContainerState> {
    constructor(props: MyPatientsContainerProps) {
        super(props)
        this.state = {
            isLoading: false,
            err: null,
            users: []
        }
    }
    componentWillMount() {
        this.setState({
            isLoading: true
        }, () => {
            this.props.getAccessibleEmrs().then((results) => {
                let emrs = JSON.parse(results.msg)
                this.setState({users: emrs})
            }).catch((err) => {
                this.setState({err})
            }).finally(() => {
                this.setState({
                    isLoading: false
                })
            })
        })
    }
    getUsers = () => {
        let users: any[] = [];
        _.map(Object.keys(this.state.users), (user) => {
            users.push({ name: user, age: 20, sex: "M" })
        })
        return users;
    }
    onPatientSelect = (user: IUserProfile) => {
        let emrs = this.state.users[user.name];
        let accessibleEmrs = emrs.read;
        this.props.history.push(`/emr/${user.name}/${accessibleEmrs[accessibleEmrs.length - 1]}`)
    }
    render() {
        let users = this.getUsers();
        return (
            <div className={"my-patients-container"}>
                <h2>My Patients</h2>
                {
                    this.state.users &&
                    <PatientList patients={users} onPatientSelect={this.onPatientSelect}/>
                }
                {
                    this.state.isLoading &&
                    <div>
                        Please wait while we fetch the users
                        <img className={"spinner-gif"} src={"images/loader.gif"} />
                    </div>
                }
                {
                    !this.state.isLoading && this.state.users.length === 0 &&
                    <div>
                        You don't have access to any EMRs
                    </div>
                }
            </div>
        )
    }
}

interface IMapDispatchToProps {
    getAccessibleEmrs: () => Promise<any>
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getAccessibleEmrs: () => {
            return PatientActions.getAccessibleEmrs()
        }
    }
}

export default connect(null, mapDispatchToProps)(MyPatientsContainer);