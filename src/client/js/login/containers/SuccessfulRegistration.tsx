import * as React from "react"
import {Link} from "react-router-dom";

class SuccessfulRegistration extends React.Component {
    render() {
        return (
            <div className={"successful-registration-container"}>
                Your registration is successful!
                <div>
                    Click <Link to={"login"}>here</Link> to login
                </div>
            </div>
        )
    }
}

export default SuccessfulRegistration;