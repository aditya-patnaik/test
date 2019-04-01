import {IEmrResponse} from "../../../server/models/response/IEmrResponse";

export default class AppUtils {
    static isPassportNumber(text: string) {
        let passportRegex = new RegExp("^(?!^0+$)[a-zA-Z0-9]{3,20}$");
        if (passportRegex.test(text)) return true;
        return false;
    }
    static formatEmrResponse(emrResponse: IEmrResponse) {
        let formattedEmrResponse = { ...emrResponse, ...emrResponse.chiefComplaintHistory }
        delete formattedEmrResponse["chiefComplaintHistory"]
        return formattedEmrResponse;
    }
}