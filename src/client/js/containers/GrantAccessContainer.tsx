import * as React from "react"
import UserSearch from "./patient/UserSearch";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import ModalActions from "../actions/ModalActions";
import { IModalPayload } from "../reducers/ModalReducer";
import { IUserProfile } from "../../../server/models/IUserProfile";
import {IAppState} from "../reducers";

class GrantAccessContainer extends React.Component<IMapDispatchToProps & IMapStateToProps> {
    onUserSelect = (user: IUserProfile, userGroup: string) => {
        let latestEmrId = this.props.userProfile.EMRKeys[this.props.userProfile.EMRKeys.length - 1];
        let modalConfig: IModalPayload = { template: "access-confirmation", modalProps: { user, userGroup, emrId: latestEmrId } }
        this.props.updateModal(modalConfig);
    }
    render() {
        return (
            <div className={"grant-access-container"}>
                <UserSearch onUserSelect={this.onUserSelect} />
            </div>
        )
    }
}

interface IMapStateToProps {
    userProfile: IUserProfile;
}

const mapStateToProps = (state: IAppState) => {
    return {
        userProfile: state.user.profile
    }
}

interface IMapDispatchToProps {
    updateModal: (modalConfig: IModalPayload) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateModal: (modalConfig: IModalPayload) => {
            dispatch(ModalActions.updateModal(modalConfig))
        }
    }
}

export default connect<IMapStateToProps, IMapDispatchToProps>(mapStateToProps, mapDispatchToProps)(GrantAccessContainer);