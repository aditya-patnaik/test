import {ApiUtils} from "../utils/ApiUtils";
import {Dispatch} from "redux";
import {SWITCH_ROLE, UPDATE_USER} from "./types";

export const GET_USER_PROFILE_URL = "/getUserProfile"

export default class UserActions {
    static getUserProfileSuccess(userProfile: any) {
        return { type: UPDATE_USER, payload: userProfile }
    }

    static getUserProfile(dispatch: Dispatch) {
        ApiUtils.apiGetRequest(GET_USER_PROFILE_URL).then((userProfileResponse: any) => {
            let userProfile = JSON.parse(userProfileResponse.msg);
            dispatch(UserActions.getUserProfileSuccess(userProfile))
        })
    }

    static switchUserRole(role: string) {
        return { type: SWITCH_ROLE, payload: role }
    }
}