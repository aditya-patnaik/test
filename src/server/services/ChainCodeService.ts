import {ApiUtils} from "../utils/ApiUtils";
import UrlUtils from "../utils/UrlUtils";
import {
    CHECK_AUTH_URL, GET_ACCESSIBLE_EMRS, GET_EMR_BY_ID,
    GET_USER_BY_USERNAME_URL,
    GET_USER_PROFILE, SAVE_EMR,
    SHARE_EMR_WITH_DOCTOR, SHARE_EMR_WITH_LAB, SHARE_EMR_WITH_PHARMACY, SAVE_VITAL, GET_VITAL
} from "../constants/ApiConstants";

export default class ChainCodeService {
    static checkAuth(username: string, password: string) {
        let body = { username, password }
        return ApiUtils.apiPostRequest(UrlUtils.getChainCodeServiceUrl(CHECK_AUTH_URL), body);
    }

    static getUserProfile(username: string) {
        let body = { func: "getUserProfile", user: username }
        return ApiUtils.apiPostRequest(UrlUtils.getChainCodeServiceUrl(GET_USER_PROFILE), body);
    }

    static getUserFromUsername(reqBody: any) {
        return ApiUtils.apiPostRequest(UrlUtils.getChainCodeServiceUrl(GET_USER_BY_USERNAME_URL), reqBody)
    }

    static shareEmrWithDoctor(reqBody: any) {
        return ApiUtils.apiPostRequest(UrlUtils.getChainCodeServiceUrl(SHARE_EMR_WITH_DOCTOR), reqBody)
    }

    static shareEmrWithPharmacy(reqBody: any) {
        return ApiUtils.apiPostRequest(UrlUtils.getChainCodeServiceUrl(SHARE_EMR_WITH_PHARMACY), reqBody)
    }

    static shareEmrWithLab(reqBody: any) {
        return ApiUtils.apiPostRequest(UrlUtils.getChainCodeServiceUrl(SHARE_EMR_WITH_LAB), reqBody)
    }

    static getAccessibleEmrs(username: string) {
        let body = { func: "getAccessibleEMR", user: username }
        return ApiUtils.apiPostRequest(UrlUtils.getChainCodeServiceUrl(GET_ACCESSIBLE_EMRS), body);
    }

    static getEmrById(username: string, emrId: string) {
        let body = { func: "viewEMR", args: emrId, user: username }
        return ApiUtils.apiPostRequest(UrlUtils.getChainCodeServiceUrl(GET_EMR_BY_ID), body);
    }

    static saveEmr(emr: any, emrId: string, username: string) {
        let body = {
            args: [{ "emrID": emrId, "jsonData" : JSON.stringify(emr) }],
            user: username
        }
        return ApiUtils.apiPostRequest(UrlUtils.getChainCodeServiceUrl(SAVE_EMR), body);
    }

    static getVitals(vitalsUser: string, loggedInUser: string) {
        let body = {
            func: "viewVitals",
            args: vitalsUser,
            user: loggedInUser
        }
        return ApiUtils.apiPostRequest(UrlUtils.getChainCodeServiceUrl(GET_VITAL), body);
    }

    static getVitalsForLocation(location: string, loggedInUser: string) {
        let body = {
            func: "getVitalsBasedOnLocation",
            args: { location: location },
            user: loggedInUser
        }
        return ApiUtils.apiPostRequest(UrlUtils.getChainCodeServiceUrl(GET_VITAL), body);
    }

    static saveVitals(vitals: any, username: string) {
        let body = {
            func: "addVitals",
            args: vitals,
            user: username
        }
        return ApiUtils.apiPostRequest(UrlUtils.getChainCodeServiceUrl(SAVE_VITAL), body);
    }
}