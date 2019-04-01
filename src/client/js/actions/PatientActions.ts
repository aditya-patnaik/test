import {ApiUtils} from "../utils/ApiUtils";

export const GET_USER_BY_USERNAME = "/getUserFromUsername"
export const GET_ACCESSIBLE_EMRS = "/getAccessibleEmrs"
export const GET_EMR_BY_ID = "/getEmrById?emrId=$emrId"
export const SAVE_EMR = "/saveEmr?emrId=$emrId"

export default class PatientActions {
    static searchPatients = (username: string, userGroups: string[]): Promise<any> => {
        let body = {
            "func": "queryAllUserProfile",
            "args": {"groups": userGroups},
            "user": username
        }
        return ApiUtils.apiPostRequest(GET_USER_BY_USERNAME, body);
        // return new Promise((resolve, reject) => {
        //     resolve([{id: 1, name: "Ozzy Osbourne", age: 20, gender: "Male"},
        //              {id: 2, name: "Janis Joplin", age: 30, gender: "Female"},
        //              {id: 3, name: "George Harrison", age: 25, gender: "Male"}])
        // })
    }

    static getPatient = (patientId: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            resolve({id: 1, name: "Ozzy Osbourne", age: 20, gender: "Male"})
        })
    }

    static getAccessibleEmrs = (): Promise<any> => {
        return ApiUtils.apiGetRequest(GET_ACCESSIBLE_EMRS);
    }

    static getEmrById = (emrId: string): Promise<any> => {
        return ApiUtils.apiGetRequest(GET_EMR_BY_ID.replace("$emrId", emrId))
    }

    static saveEmr = (emrId: string, emr: any): Promise<any> => {
        return ApiUtils.apiPostRequest(SAVE_EMR.replace("$emrId", emrId), emr)
    }
}