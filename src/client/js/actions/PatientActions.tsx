export default class PatientActions {
    static searchPatients = (): Promise<any[]> => {
        return new Promise((resolve, reject) => {
            resolve([{id: 1, name: "Ozzy Osbourne", age: 20, gender: "Male"},
                     {id: 2, name: "Janis Joplin", age: 30, gender: "Female"},
                     {id: 3, name: "George Harrison", age: 25, gender: "Male"}])
        })
    }

    static getPatient = (patientId: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            resolve({id: 1, name: "Ozzy Osbourne", age: 20, gender: "Male"})
        })
    } 
}