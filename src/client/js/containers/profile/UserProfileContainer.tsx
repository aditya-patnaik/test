import * as React from "react"
import BasicDetails from "../../components/profile/BasicDetails";
import {connect} from "react-redux";
import {IAppState} from "../../reducers";
import {IUserProfile} from "../../../../server/models/IUserProfile";
import DoctorProfileDetails from "../../components/profile/DoctorProfileDetails";
import PharmacyProfileDetails from "../../components/profile/PharmacyProfileDetails";
import LabProfileDetails from "../../components/profile/LabProfileDetails";

class UserProfileContainer extends React.Component<IMapStateToProps> {
    render() {
        return (
            <div className={"user-profile-container"}>
                <div className={"profile-details-container basic-details-container"}>
                    <BasicDetails user={this.props.userProfile} />
                </div>
                <div className={"profile-details-container basic-details-container"}>
                    <DoctorProfileDetails doctorProfile={this.props.userProfile.doctor} />
                </div>
                <div className={"profile-details-container basic-details-container"}>
                    <PharmacyProfileDetails pharmacyProfile={this.props.userProfile.pharmacy} />
                </div>
                <div className={"profile-details-container basic-details-container"}>
                    <LabProfileDetails labProfile={this.props.userProfile.lab} />
                </div>
            </div>
        )
    }
}

interface IMapStateToProps {
    userProfile: IUserProfile
}

const mapStateToProps = (state: IAppState) => {
    return {
        userProfile: state.user.profile
    }
}

export default connect<IMapStateToProps>(mapStateToProps)(UserProfileContainer);