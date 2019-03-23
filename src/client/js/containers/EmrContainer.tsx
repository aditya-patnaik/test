import * as React from "react"
import ChiefComplaints from "./emr-sections/ChiefComplaints";
import PastHistory from "./emr-sections/PastHistory";
import FamilyHistory from "./emr-sections/FamilyHistory";
import CurrentMedication from "./emr-sections/CurrentMedication";
import Allergies from "./emr-sections/Allergies";
import DiagnosticTests from "./emr-sections/DiagnosticTests";
import DrugsPrescription from "./emr-sections/DrugsPrescription";

export interface EmrContainerProps {

}

export interface EmrContainerState {

}

class EmrContainer extends React.Component<EmrContainerProps, EmrContainerState> {
    constructor(props: EmrContainerProps) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className="emr-container">
                <ChiefComplaints complaints={[]} />
                <PastHistory history={[]} />
                <FamilyHistory history={[]} />
                <CurrentMedication medication={[]} />
                <Allergies allergies={[]} />
                <DiagnosticTests diagnosticTests={[]} />
                {/* Examination
                Systemic Exm - RS CS GIT NS
                Reports - RBC, WBC, Hb, Blood Sugar, Cholesterol, Urea Creatinine, ESR, Radiology */}
                <DrugsPrescription drugs={[]} />
            </div>
        )
    }
}

export default EmrContainer;