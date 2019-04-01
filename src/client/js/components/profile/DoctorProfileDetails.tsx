import * as React from "react"
import TextInput from "../formElements/TextInput";
import {IDoctorProfile} from "../../../../server/models/IDoctorProfile";
import TagInput from "../formElements/TagInput";

export interface DoctorProfileDetailsProps {
    doctorProfile: IDoctorProfile;
}

interface DoctorProfileDetailsState {
    doctorRegistrationID: string;
    associatedHospital: string[];
    speciality: string[];
}

class DoctorProfileDetails extends React.Component<DoctorProfileDetailsProps, DoctorProfileDetailsState> {
    constructor(props: DoctorProfileDetailsProps) {
        super(props);
        this.state = {
            doctorRegistrationID: props.doctorProfile ? props.doctorProfile.doctorRegistrationID : "",
            associatedHospital: props.doctorProfile ? props.doctorProfile.associatedHospital : [],
            speciality: props.doctorProfile ? props.doctorProfile.speciality : []
        }
    }
    onRegistrationIdChange = (evt: any) => {
        this.setState({
            doctorRegistrationID: evt.target.value
        })
    }
    onAssociatedHospitalsChange = (input: string): Promise<string[]> => {
        return new Promise((resolve, reject) => {
            if (input !== "") resolve([input]);
            else resolve([]);
        })
    }
    onHospitalAddition = (hospital: string) => {
        let currentHospitals = this.state.associatedHospital;
        currentHospitals.push(hospital);
        this.setState({
            associatedHospital: currentHospitals
        })
    }
    onSpecialitiesChange = (input: string): Promise<string[]> => {
        return new Promise((resolve, reject) => {
            if (input !== "") resolve([input]);
            else resolve([]);
        })
    }
    onSpecialityAddition = (speciality: string) => {
        let currentSpecialities = this.state.speciality;
        currentSpecialities.push(speciality);
        this.setState({
            speciality: currentSpecialities
        })
    }
    render() {
        return (
            <div className={"basic-details-container"}>
                <h2>Doctor Profile</h2>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Registration Id:
                    </div>
                    <div className={"input-container"}>
                        <TextInput onChange={this.onRegistrationIdChange} value={this.state.doctorRegistrationID} disabled={true} />
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Associated Hospital(s):
                    </div>
                    <div className={"input-container"}>
                        <TagInput onChange={this.onAssociatedHospitalsChange}
                                  tags={this.state.associatedHospital}
                                  onOptionSelect={this.onHospitalAddition}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Speciality(s):
                    </div>
                    <div className={"input-container"}>
                        <TagInput onChange={this.onSpecialitiesChange}
                                  tags={this.state.speciality}
                                  onOptionSelect={this.onSpecialityAddition} />
                    </div>
                </div>
            </div>
        )
    }
}

export default DoctorProfileDetails;