import {ApiUtils} from "../../utils/ApiUtils";

export const registerEmailUrl = "deepPurple/api/registerEmail";
export const confirmEmailUrl = "deepPurple/api/confirmEmail";
export const registerUserUrl = "deepPurple/api/registerUser";
export const loginUrl = "/login";

export class RegistrationActions {
    static registerEmail(email: string) {
        let body = {args: [{email}]};
        return ApiUtils.apiPostRequest(registerEmailUrl, body);
    }

    static confirmEmail(email: string, otp: string) {
        let body = {args: [{email, otp}]};
        return ApiUtils.apiPostRequest(confirmEmailUrl, body);
    }

    static registerUser(userInfo: any, password: string) {
        let body = { args: [userInfo], password };
        return ApiUtils.apiPostRequest(registerUserUrl, body);
    }

    static loginUser(email: string, password: string) {
        let body = { username: email, password };
        return ApiUtils.apiPostRequest(loginUrl, body);
    }
}