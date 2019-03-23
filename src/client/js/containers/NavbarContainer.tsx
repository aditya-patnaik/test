import * as React from "react"
import NavLink from "../components/common/NavLink";

class NavbarContainer extends React.Component {
    render() {
        return (
            <div className="navbar-container">
                <div className="all-links-container">
                    <div className="link-container">
                        <NavLink isExact={true} link="" label="Home" icon="home" />
                    </div>
                    <div className="link-container">
                        <NavLink link="emr" label="Add / View EMR" icon="stethoscope" />
                    </div>
                    <div className="link-container">
                        <NavLink link="grant-access" label="Grant access" icon="lock" />
                    </div>
                    <div className="link-container">
                        <NavLink link="profile" label="Profile" icon="user" />
                    </div>
                    <div className="link-container">
                        <NavLink link="settings" label="Settings" icon="cog" />
                    </div>
                </div>
            </div>
        )
    }
}

export default NavbarContainer;