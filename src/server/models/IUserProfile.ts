import {IDoctorProfile} from "./IDoctorProfile";
import {IPharmacyProfile} from "./IPharmacyProfile";
import {ILabProfile} from "./ILabProfile";

export interface IUserProfile {
    email: string;
    userName: string;
    name: string;
    age: string;
    dob: string;
    phone: string;
    uniqueGovtID: string;
    doctor: IDoctorProfile;
    pharmacy: IPharmacyProfile;
    lab: ILabProfile;
    EMRKeys: string[];
}