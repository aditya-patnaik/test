import * as React from "react"
import VitalsContainer from "./vitals/VitalsContainer";
import { connect } from "react-redux";
import { IAppState } from "../reducers";
import { IUserProfile } from "../../../server/models/IUserProfile";

class MyVitalsContainer extends React.Component<IConnectProps, any> {
    render() {
        return (
            <div className="my-vitals-container">
                <VitalsContainer username={this.props.loggedInUser.userName} />
            </div>
        )
    }
}

type IConnectProps = IMapStateToProps;

interface IMapStateToProps {
    loggedInUser: IUserProfile;
}

const mapStateToProps = (state: IAppState) => {
    return {
        loggedInUser: state.user.profile
    }
}

export default connect(mapStateToProps, null)(MyVitalsContainer);