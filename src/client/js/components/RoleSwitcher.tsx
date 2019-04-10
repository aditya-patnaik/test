import * as React from "react"
import * as _ from "lodash"
import {connect} from "react-redux";
import UserActions from "./../actions/UserActions";
import {IUserProfile} from "../../../server/models/IUserProfile";
import {IAppState} from "../reducers";
import {Dispatch} from "redux";
import {withRouter} from "react-router-dom";

interface RoleSwitcherRouterProps {
    history?: any;
}

type RoleSwitcherProps = IMapStateToProps & IMapDispatchToProps & RoleSwitcherRouterProps;

class RoleSwitcher extends React.Component<RoleSwitcherProps> {
    getDisplayName = (role: string) => {
        if (role === "PATIENT") return "Patient"
        else if (role === "DOCTOR") return "Doctor"
        else if (role === "LAB") return "Lab"
        else return "Pharmacy"
    }
    getAvailableRoles = () => {
        let userProfile = this.props.userProfile;
        let roles = [];
        if (!_.isEmpty(userProfile.doctor)) roles.push({internalValue: "DOCTOR", displayValue: "Doctor"})
        if (!_.isEmpty(userProfile.pharmacy)) roles.push({internalValue: "PHARMACY", displayValue: "Pharmacy"})
        if (!_.isEmpty(userProfile.lab)) roles.push({internalValue: "LAB", displayValue: "Lab"})
        return roles;
    }
    switchRole = (evt: any, role: string) => {
        if (this.props.currentRole !== role) {
            evt.currentTarget.parentElement.parentElement.blur();
            this.props.switchRole(role);
            this.props.history.push("/");
        }
    }
    render() {
        let roles = this.getAvailableRoles();
        return (
            <div className={"role-switcher-container"} tabIndex={0}>
                <div className={"current-role"}>{this.getDisplayName(this.props.currentRole)} Mode</div>
                {
                    roles.length > 0 &&
                    <div className={"roles-list-container"}>
                        <div className={"role-row"} onClick={(evt: any) => this.switchRole(evt, "PATIENT")}>{"Patient"}</div>
                        {
                            _.map(roles, (role: any, index: number) => {
                                return <div key={index} className={"role-row"} onClick={(evt: any) => this.switchRole(evt, role.internalValue)}>{role.displayValue}</div>
                            })
                        }
                    </div>
                }
            </div>
        )
    }
}

interface IMapStateToProps {
    userProfile?: IUserProfile;
    currentRole?: string;
}

const mapStateToProps = (state: IAppState) => {
    return {
        userProfile: state.user.profile,
        currentRole: state.user.role
    }
}

interface IMapDispatchToProps {
    switchRole?: (role: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        switchRole: (role: string) => {
            dispatch(UserActions.switchUserRole(role))
        }
    }
}

export default withRouter(connect<IMapStateToProps, IMapDispatchToProps>(mapStateToProps, mapDispatchToProps)(RoleSwitcher) as any);