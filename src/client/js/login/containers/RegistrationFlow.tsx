import * as React from "react"
import RegisterEmail from "../components/RegisterEmail";
import RegistrationContainer from "../components/RegistrationContainer";
import SuccessfulRegistration from "./SuccessfulRegistration";

interface RegistrationFlowState {
    email: string;
    step: number;
}

class RegistrationFlow extends React.Component<{}, RegistrationFlowState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            email: "",
            step: 1
        }
    }
    onConfirmation = (email: string) => {
        this.setState({
            email,
            step: 2
        })
    }
    onRegistrationSuccess = () => {
        this.setState({
            step: 3
        })
    }
    render() {
        return (
            <div className={"registration-flow-container"}>
                {
                    this.state.step === 1 &&
                        <RegisterEmail onConfirmation={this.onConfirmation} />
                }
                {
                    this.state.step === 2 &&
                        <RegistrationContainer email={this.state.email} onRegistrationSuccess={this.onRegistrationSuccess} />
                }
                {
                    this.state.step === 3 &&
                        <SuccessfulRegistration />
                }
            </div>
        )
    }
}

export default RegistrationFlow;