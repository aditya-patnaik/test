import * as React from "react"
import TextInput from "../formElements/TextInput";
import TagInput from "../formElements/TagInput";
import {ILabProfile} from "../../../../server/models/ILabProfile";

export interface LabProfileDetailsProps {
    labProfile: ILabProfile;
}

interface LabProfileDetailsState {
    duration: string;
    labID: string;
    phoneNumber: string;
    status: string;
    testingOffered: string[];
}

class LabProfileDetails extends React.Component<LabProfileDetailsProps, LabProfileDetailsState> {
    constructor(props: LabProfileDetailsProps) {
        super(props);
        this.state = {
            duration: props.labProfile ? props.labProfile.duration : "",
            labID: props.labProfile ? props.labProfile.labID : "",
            phoneNumber: props.labProfile ? props.labProfile.phoneNumber : "",
            status: props.labProfile ? props.labProfile.status : "",
            testingOffered: props.labProfile ? props.labProfile.testingOffered : []
        }
    }
    onDurationChange = (evt: any) => {
        this.setState({
            duration: evt.target.value
        })
    }
    onLabIdChange = (evt: any) => {
        this.setState({
            labID: evt.target.value
        })
    }
    onPhoneNumberChange = (evt: any) => {
        this.setState({
            phoneNumber: evt.target.value
        })
    }
    onStatusChange = (evt: any) => {
        this.setState({
            status: evt.target.value
        })
    }
    onOfferedTestsChange = (input: string): Promise<string[]> => {
        return new Promise((resolve, reject) => {
            if (input !== "") resolve([input]);
            else resolve([]);
        })
    }
    onTestAddition = (test: string) => {
        let tests = this.state.testingOffered;
        tests.push(test);
        this.setState({
            testingOffered: tests
        })
    }
    render() {
        return (
            <div className={"basic-details-container"}>
                <h2>Lab Profile</h2>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Lab Id:
                    </div>
                    <div className={"input-container"}>
                        <TextInput onChange={this.onLabIdChange} value={this.state.labID} disabled={true} />
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Duration:
                    </div>
                    <div className={"input-container"}>
                        <TextInput onChange={this.onDurationChange} value={this.state.duration} disabled={true} />
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Phone:
                    </div>
                    <div className={"input-container"}>
                        <TextInput onChange={this.onPhoneNumberChange} value={this.state.phoneNumber} disabled={true} />
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Status:
                    </div>
                    <div className={"input-container"}>
                        <TextInput onChange={this.onStatusChange} value={this.state.status} disabled={true} />
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Tests Offered:
                    </div>
                    <div className={"input-container"}>
                        <TagInput onChange={this.onOfferedTestsChange}
                                  tags={this.state.testingOffered}
                                  onOptionSelect={this.onTestAddition}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default LabProfileDetails;