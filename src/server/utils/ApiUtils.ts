import * as fetch from "isomorphic-fetch"

export class ApiUtils {
    static apiGetRequest = (url: string) => {
        return new Promise((resolve, reject) => {
            fetch(url).then((response: any) => {
                resolve(response)
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
            }).then((response: any) => {
                if (response.status >= 200 && response.status <400) {
                    response.json().then((data: any) => {
                        resolve(data)
                    })
                } else {
                    response.json().then((data: any) => {
                        reject(data)
                    }).catch((err: any) => {
                        reject(err)
                    })
                }
            }).catch((err) => {
                console.log(err);
                reject(err);
            })
        })
    }
}