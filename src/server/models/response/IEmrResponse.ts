export interface IChiefComplaintHistory {
    allergies: string[];
    currentMedication: string[];
    familyHistory: string[];
    pastHistory: string[];
    personalHistory: string[];
}

export interface IEmrResponse {
    chiefComplaint: string[];
    chiefComplaintHistory: IChiefComplaintHistory;
    diagnosticTestsAdvised: string[];
    drugsPrescribed: string[];
}