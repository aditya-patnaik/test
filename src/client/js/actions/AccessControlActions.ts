import {ApiUtils} from "../utils/ApiUtils";

const SHARE_ACCESS_TO_DOCTOR = "/deepPurple/api/shareDoctor"
const SHARE_ACCESS_TO_PHARMACY = "/deepPurple/api/sharePharmacy"
const SHARE_ACCESS_TO_LAB = "/deepPurple/api/shareLab"

class AccessControlActions {
    static shareAccessToDoctor(userToShare: string, myUserName: string, newEmr: boolean) {
        let body = {
            "args": {"userToShare": userToShare, "durationInSeconds": 36000},
            "allowCreation": newEmr,
            "user": myUserName
        }
        return ApiUtils.apiPostRequest(SHARE_ACCESS_TO_DOCTOR, body);
    }

    static shareAccessToPharmacy(userToShare: string, myUserName: string, emrID: string) {
        let body = {
            "args": {"userToShare": userToShare, emrID, "durationInSeconds": 36000},
            "user": myUserName
        }
        return ApiUtils.apiPostRequest(SHARE_ACCESS_TO_PHARMACY, body);
    }

    static shareAccessToLab(userToShare: string, myUserName: string, emrID: string) {
        let body = {
            "args": {"userToShare": userToShare, emrID, "durationInSeconds": 36000},
            "user": myUserName
        }
        return ApiUtils.apiPostRequest(SHARE_ACCESS_TO_LAB, body);
    }
}

export default AccessControlActions;