import {ApiUtils} from "../utils/ApiUtils";
import UrlUtils from "../utils/UrlUtils";
import {CHECK_AUTH_URL} from "../constants/ApiConstants";

export default class ChainCodeService {
    static checkAuth(username: string, password: string) {
        let body = { username, password }
        return ApiUtils.apiPostRequest(UrlUtils.getChainCodeServiceUrl(CHECK_AUTH_URL), body);
    }
}