import * as React from "react"
import TextInput from "../formElements/TextInput";
import {IPharmacyProfile} from "../../../../server/models/IPharmacyProfile";

export interface PharmacyProfileDetailsProps {
    pharmacyProfile: IPharmacyProfile;
}

interface PharmacyProfileDetailsState {
    drugLicenceNo: string;
    pharmacyName: string;
    pharmacyRegistrationNo: string;
}

class PharmacyProfileDetails extends React.Component<PharmacyProfileDetailsProps, PharmacyProfileDetailsState> {
    constructor(props: PharmacyProfileDetailsProps) {
        super(props);
        this.state = {
            drugLicenceNo: props.pharmacyProfile ? props.pharmacyProfile.drugLicenceNo : "",
            pharmacyName: props.pharmacyProfile ? props.pharmacyProfile.pharmacyName : "",
            pharmacyRegistrationNo: props.pharmacyProfile ? props.pharmacyProfile.pharmacyRegistrationNo : ""
        }
    }
    onDrugLicenseChange = (evt: any) => {
        this.setState({
            drugLicenceNo: evt.target.value
        })
    }
    onPharmacyNameChange = (evt: any) => {
        this.setState({
            pharmacyName: evt.target.value
        })
    }
    onRegistrationNumberChange = (evt: any) => {
        this.setState({
            pharmacyRegistrationNo: evt.target.value
        })
    }
    render() {
        return (
            <div className={"basic-details-container"}>
                <h2>Pharmacy Profile</h2>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Drug License Number:
                    </div>
                    <div className={"input-container"}>
                        <TextInput onChange={this.onDrugLicenseChange} value={this.state.drugLicenceNo} disabled={true} />
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Pharmacy Name:
                    </div>
                    <div className={"input-container"}>
                        <TextInput onChange={this.onPharmacyNameChange} value={this.state.pharmacyName} disabled={true} />
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-4 col-sm-12 label-container"}>
                        Pharmacy Regd Number:
                    </div>
                    <div className={"input-container"}>
                        <TextInput onChange={this.onPharmacyNameChange} value={this.state.pharmacyRegistrationNo} disabled={true} />
                    </div>
                </div>
            </div>
        )
    }
}

export default PharmacyProfileDetails;