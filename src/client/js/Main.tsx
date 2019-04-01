import * as React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavbarContainer from "./containers/NavbarContainer";
import EmrWrapperContainer from "./containers/EmrWrapperContainer";
import TopnavContainer from "./containers/TopnavContainer";
import {connect} from "react-redux";
import {IAppState} from "./reducers";
import {Dispatch} from "redux";
import UserActions from "./actions/UserActions";
import UserProfileContainer from "./containers/profile/UserProfileContainer";
import {IUserProfile} from "../../server/models/IUserProfile";
import GrantAccessContainer from "./containers/GrantAccessContainer";
import ModalContainer from "./containers/ModalContainer";
import MyPatientsContainer from "./containers/patient/MyPatientsContainer";
import MyEmrContainer from "./containers/MyEmrContainer";

type MainProps = IMapStateToProps & IMapDispatchToProps;

class Main extends React.Component<MainProps> {
    componentWillMount() {
        this.props.getUserProfile();
    }
    render() {
        let user = this.props.user;
        return (
            <Router>
                {
                    !user &&
                    <div className={"main-app-loader"}><img src={"/images/loader.gif"} /></div>
                }
                {
                    user &&
                    <div id="app">
                        <ModalContainer />
                        <TopnavContainer/>
                        <NavbarContainer />
                        <div className="main-content-container">
                            <Route path="/emr/:patientId?/:emrId?" component={EmrWrapperContainer} />
                            <Route path="/my-emr/:emrId?" component={MyEmrContainer} />
                            <Route path="/profile" component={UserProfileContainer} />
                            <Route path="/grant-access" component={GrantAccessContainer} />
                            <Route path="/my-patients" component={MyPatientsContainer} />
                            {/* <Route path="/about" component={About} />
                            <Route path="/topics" component={Topics} /> */}
                        </div>
                    </div>
                }
            </Router>
        )
    }
}

interface IMapStateToProps {
    user: IUserProfile;
}

const mapStateToProps = (state: IAppState) => {
    return {
        user: state.user.profile
    }
}

interface IMapDispatchToProps {
    getUserProfile: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getUserProfile: () => {
            UserActions.getUserProfile(dispatch);
        }
    }
}

export default connect<IMapStateToProps, IMapDispatchToProps, {}>(mapStateToProps, mapDispatchToProps)(Main);