import {ApiUtils} from "../../utils/ApiUtils";

export const registerUserUrl = "deepPurple/api/registerEmail";
export const confirmEmailUrl = "deepPurple/api/confirmEmail";

export class RegistrationActions {
    static registerEmail(email: string) {
        let body = [{email}];
        return ApiUtils.apiPostRequest(registerUserUrl, body);
    }

    static confirmEmail(email: string, otp: string) {
        let body = [{email, otp}];
        return ApiUtils.apiPostRequest(confirmEmailUrl, body);
    }
}