import * as React from "react"
import * as _ from "lodash"
import NavLink from "../components/common/NavLink";
import {connect} from "react-redux";
import {IAppState} from "../reducers";
import {USER_ROLES} from "../constants/AppConstants";
import {IUserProfile} from "../../../server/models/IUserProfile";

const PATIENT_ID_PARAM = "$patientId"

interface INAV_ITEM {
    id: number;
    link: string;
    label: string;
    icon: string;
    roles: string[];
    isExact?: boolean;
}

const NAV_ITEMS: {[key: string]: INAV_ITEM} = {
    HOME: { id: 1, isExact: true, link: "", label: "Home", icon: "home", roles: [USER_ROLES.PATIENT, USER_ROLES.DOCTOR, USER_ROLES.LAB, USER_ROLES.PHARMACY] },
    // MY_EMR: { id: 2, link: `emr/${PATIENT_ID_PARAM}`, label: "My EMR", icon: "stethoscope", roles: [USER_ROLES.PATIENT] },
    MY_EMR: { id: 2, link: `my-emr`, label: "My EMR", icon: "stethoscope", roles: [USER_ROLES.PATIENT] },
    MY_VITALS: { id: 3, link: `my-vitals`, label: "My Vitals", icon: "heartbeat", roles: [USER_ROLES.PATIENT] },
    ADD_EMR: { id: 4, link: `emr`, label: "Add / View EMR", icon: "stethoscope", roles: [USER_ROLES.DOCTOR, USER_ROLES.LAB]  },
    VIEW_EMR: { id: 5, link: `emr`, label: "View EMR", icon: "stethoscope", roles: [USER_ROLES.PHARMACY]  },
    GRANT_ACCESS: { id: 6, link: `grant-access`, label: "Grant access", icon: "lock", roles: [USER_ROLES.PATIENT] },
    MY_PATIENTS: { id: 7, link: `my-patients`, label: "My Patients", icon: "user", roles: [USER_ROLES.DOCTOR, USER_ROLES.LAB, USER_ROLES.PHARMACY]  },
    PROFILE: { id: 8, link: `profile`, label: "Profile", icon: "user", roles: [USER_ROLES.PATIENT, USER_ROLES.DOCTOR, USER_ROLES.LAB, USER_ROLES.PHARMACY]  },
    SETTINGS: { id: 9, link: `settings`, label: "Settings", icon: "cog", roles: [USER_ROLES.PATIENT, USER_ROLES.DOCTOR, USER_ROLES.LAB, USER_ROLES.PHARMACY]  }
}

class NavbarContainer extends React.Component<IMapStateToProps> {
    getNavItems = () => {
        let currentRole = this.props.role;
        return Object.values(NAV_ITEMS).filter((navItem) => {
            return navItem.roles.indexOf(currentRole) !== -1
        })
    }
    getResolvedLink = (link: string) => {
        return link.replace(PATIENT_ID_PARAM, this.props.userProfile.userName)
    }
    render() {
        let navItems = this.getNavItems();
        return (
            <div className="navbar-container">
                <div className="all-links-container">
                    {
                        _.map(navItems, (navItem: INAV_ITEM, index: number) => {
                            return <div className={"link-container"} key={index}>
                                <NavLink isExact={navItem.isExact} label={navItem.label} icon={navItem.icon} link={this.getResolvedLink(navItem.link)}/>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

interface IMapStateToProps {
    role?: string;
    userProfile?: IUserProfile;
}

const mapStateToProps = (state: IAppState) => {
    return {
        role: state.user.role,
        userProfile: state.user.profile
    }
}

export default connect(mapStateToProps)(NavbarContainer);