import {DEEP_PURPLE_API_HOST, DEEP_PURPLE_API_PORT} from "../configs/configs";

export default class UrlUtils {
    static getChainCodeServiceUrl(url: string): string {
        return DEEP_PURPLE_API_HOST + ":" + DEEP_PURPLE_API_PORT + "/" + url;
    }
}