import * as fetch from "isomorphic-fetch"

export class ApiUtils {
    static apiGetRequest = (url: string) => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "GET",
                headers: new Headers({"Content-Type" : "application/json"})
            }).then((response: any) => {
                if (response.status >= 200 && response.status < 400) {
                    response.json().then((body: any) => {
                        resolve(body);
                    })
                } else {
                    response.json().then((body: any) => {
                        reject(body);
                    }).catch((err: any) => {
                        reject(err);
                    })
                }
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
                if (response.status >= 200 && response.status < 400) {
                    response.json().then((body: any) => {
                        resolve(body);
                    })
                } else {
                    response.json().then((body: any) => {
                        reject(body);
                    }).catch((err: any) => {
                        reject(err);
                    })
                }
            }).catch((err) => {
                console.log(err);
                reject(err);
            })
        })
    }
}