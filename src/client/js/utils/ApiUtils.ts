import * as fetch from "isomorphic-fetch"

export class ApiUtils {
    static apiGetRequest = (url: string) => {
        return new Promise((resolve, reject) => {
            fetch(url).then((data: any) => {
                resolve(data)
            }).catch((err) => {
                console.log(err);
                reject(err);
            })
        })
    }

    static apiPostRequest = (url: string, body: any) => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: new Headers({"Content-Type" : "application/json"})
            }).then((data: any) => {
                resolve(data)
            }).catch((err) => {
                console.log(err);
                reject(err);
            })
        })
    }
}