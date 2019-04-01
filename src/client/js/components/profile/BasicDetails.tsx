import * as React from "react"
import {IUserProfile} from "../../../../server/models/IUserProfile";
import TextInput from "../formElements/TextInput";

export interface BasicDetailsProps {
    user: IUserProfile;
}

interface BasicDetailsState {
    email: string;
    userName: string;
    name: string;
    age: string;
    dob: string;
    phone: string;
    uniqueGovtId: string;
}

class BasicDetails extends React.Component<BasicDetailsProps, BasicDetailsState> {
    constructor(props: BasicDetailsProps) {
        super(props);
        this.state = {
            email: props.user.email,
            userName: props.user.userName,
            name: props.user.name,
            age: props.user.age,
            dob: props.user.dob,
            phone: props.user.phone,
            uniqueGovtId: props.user.uniqueGovtID
        }
    }
    onEmailChange = (evt: any) => {
        this.setState({
            email: evt.target.value
        })
    }
    onUserNameChange = (evt: any) => {
        this.setState({
            userName: evt.target.value
        })
    }
    render() {
        return (
            <div className={"basic-details-container"}>
                <h2>Basic Details</h2>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Email:
                    </div>
                    <div className={"input-container"}>
                        <TextInput onChange={this.onEmailChange} value={this.state.email} disabled={true} />
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Username:
                    </div>
                    <div className={"input-container"}>
                        <TextInput onChange={this.onUserNameChange} value={this.state.userName} disabled={true} />
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Name:
                    </div>
                    <div className={"input-container"}>
                        <TextInput onChange={this.onEmailChange} value={this.state.name} disabled={true} />
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Age:
                    </div>
                    <div className={"input-container"}>
                        <TextInput onChange={this.onEmailChange} value={this.state.age} disabled={true} />
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Date of birth:
                    </div>
                    <div className={"input-container"}>
                        <TextInput onChange={this.onEmailChange} value={this.state.dob} disabled={true} />
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Phone:
                    </div>
                    <div className={"input-container"}>
                        <TextInput onChange={this.onEmailChange} value={this.state.phone} disabled={true} />
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Govt. Id:
                    </div>
                    <div className={"input-container"}>
                        <TextInput onChange={this.onEmailChange} value={this.state.uniqueGovtId} disabled={true} />
                    </div>
                </div>
            </div>
        )
    }
}

export default BasicDetails;