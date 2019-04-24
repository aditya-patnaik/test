import * as React from "react"
import ChiefComplaints from "./emr-sections/ChiefComplaints";
import PastHistory from "./emr-sections/PastHistory";
import FamilyHistory from "./emr-sections/FamilyHistory";
import CurrentMedication from "./emr-sections/CurrentMedication";
import Allergies from "./emr-sections/Allergies";
import DiagnosticTests from "./emr-sections/DiagnosticTests";
import DrugsPrescription from "./emr-sections/DrugsPrescription";
import {LegacyRef, Ref} from "react";
import {connect} from "react-redux";
import PatientActions from "../actions/PatientActions";
import Button from "../components/formElements/Button";
import {IAppState} from "../reducers";

export interface EmrContainerProps {
    rawEmr: any;
    patientEmr: any;
    onSave?: () => void;
    emrId: string;
    isReadOnly?: boolean;
}

export interface EmrContainerState {
    patientEmr: any;
    isSaving: boolean;
    saveError: any;
}

type ComponentProps = IMapDispatchToProps & IMapStateToProps & EmrContainerProps

class EmrContainer extends React.Component<ComponentProps, EmrContainerState> {
    private chiefComplaintsRef: any;
    private pastHistoryRef: any;
    private familyHistoryRef: any;
    private currentMedicationRef: any;
    private allergiesRef: any;
    private diagnosticTestsRef: any;
    private drugsPrescriptionRef: any;

    constructor(props: ComponentProps) {
        super(props)
        this.state = {
            patientEmr: props.patientEmr,
            isSaving: false,
            saveError: null
        }
    }

    getUpdatedEmr = () => {
        let patientEmr = this.props.rawEmr;
        patientEmr.chiefComplaint = this.chiefComplaintsRef.getSaveObject();
        patientEmr.chiefComplaintHistory.allergies = this.allergiesRef.getSaveObject();
        patientEmr.chiefComplaintHistory.currentMedication = this.currentMedicationRef.getSaveObject();
        patientEmr.chiefComplaintHistory.familyHistory = this.familyHistoryRef.getSaveObject();
        patientEmr.chiefComplaintHistory.pastHistory = this.pastHistoryRef.getSaveObject();
        // patientEmr.chiefComplaintsHistory.personalHistory;
        patientEmr.diagnosticTestsAdvised = this.diagnosticTestsRef.getSaveObject();
        patientEmr.drugsPrescribed = this.drugsPrescriptionRef.getSaveObject();
        return patientEmr
    }

    saveEmr = () => {
        let emrId = this.props.emrId;
        let updatedEmr = this.getUpdatedEmr();
        this.setState({
            isSaving: true
        }, () => {
            this.props.saveEmr(emrId, updatedEmr).then(() => {
                this.props.onSave()
            }).catch((err) => {
                this.setState({
                    saveError: err
                })
            })
        })
    }

    render() {
        return (
            <div className="emr-container">
                {
                    (this.props.userGroup === "DOCTOR" || this.props.userGroup === "PATIENT") &&
                    <div>
                        <ChiefComplaints ref={(myref) => this.chiefComplaintsRef = myref} complaints={this.state.patientEmr.chiefComplaint} />
                        <PastHistory ref={(myref) => this.pastHistoryRef = myref} history={this.state.patientEmr.pastHistory} />
                        <FamilyHistory ref={(myref) => this.familyHistoryRef = myref} history={this.state.patientEmr.familyHistory} />
                        <CurrentMedication ref={(myref) => this.currentMedicationRef = myref} medication={this.state.patientEmr.currentMedication} />
                        <Allergies ref={(myref) => this.allergiesRef = myref} allergies={this.state.patientEmr.allergies} />
                    </div>
                }
                {
                    (this.props.userGroup === "DOCTOR" || this.props.userGroup === "PATIENT" || this.props.userGroup === "LAB") &&
                    <DiagnosticTests ref={(myref) => this.diagnosticTestsRef = myref}
                                     isReadOnly={this.props.userGroup === "LAB"}
                                     userGroup={this.props.userGroup}
                                     diagnosticTests={this.state.patientEmr.diagnosticTestsAdvised} />
                }
                {/* Examination
                Systemic Exm - RS CS GIT NS
                Reports - RBC, WBC, Hb, Blood Sugar, Cholesterol, Urea Creatinine, ESR, Radiology */}
                {
                    (this.props.userGroup === "DOCTOR" || this.props.userGroup === "PATIENT" || this.props.userGroup === "PHARMACY") &&
                    <DrugsPrescription ref={(myref) => this.drugsPrescriptionRef = myref}
                                       isReadOnly={this.props.userGroup === "PHARMACY"}
                                       drugs={this.state.patientEmr.drugsPrescribed} />
                }
                {
                    (!this.props.isReadOnly && this.props.userGroup !== "PHARMACY" && this.props.userGroup !== "LAB") &&
                    <div className={"button-container"}>
                        <Button text={"Save"} onBtnClick={this.saveEmr}>
                            {
                                this.state.isSaving &&
                                <img className={"spinner-gif"} src={"/images/loader.gif"} />
                            }
                        </Button>
                    </div>
                }
            </div>
        )
    }
}

interface IMapStateToProps {
    userGroup: string;
}

const mapStateToProps = (state: IAppState) => {
    return {
        userGroup: state.user.role
    }
}

interface IMapDispatchToProps {
    saveEmr?: (emrId: string, emr: any) => Promise<any>
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        saveEmr: (emrId: string, emr: any) => {
            return PatientActions.saveEmr(emrId, emr)
        }
    }
}

export default connect<IMapStateToProps, IMapDispatchToProps>(mapStateToProps, mapDispatchToProps)(EmrContainer);