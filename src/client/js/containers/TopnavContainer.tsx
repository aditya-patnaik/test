import * as React from "react"
import RoleSwitcher from "../components/RoleSwitcher";

class TopnavContainer extends React.Component {
    render() {
        return (
            <div className={"topnav-container"}>
                <div className={"left-content"}>
                    <div className="logo-container">
                        <img src="/images/medisot_logo.png" width="30" alt="Medisot Logo" />
                        <label>mediSOT</label>
                    </div>
                </div>
                <div className={"right-content"}>
                    <RoleSwitcher />
                    <a href={"/logout"}><i className={"fas fa-power-off"} /></a>
                </div>
            </div>
        )
    }
}

export default TopnavContainer;