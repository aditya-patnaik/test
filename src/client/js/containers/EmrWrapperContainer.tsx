import * as React from "react"
import EmrContainer from "./EmrContainer";
import PatientCard from "../components/patient/PatientCard";
import PatientSearch from "./patient/PatientSearch";
import PatientActions from "../actions/PatientActions";

export interface EmrWrapperContainerProps {
    match?: any;
    patientId: string;
}

export interface EmrWrapperContainerState {
    patientDetails: any;
    patientEmr: any;
}

class EmrWrapperContainer extends React.Component<EmrWrapperContainerProps, EmrWrapperContainerState> {
    constructor(props: EmrWrapperContainerProps) {
        super(props)
        this.state = {
            patientDetails: null,
            patientEmr: null
        }
    }
    checkAndUpdatePatientDetails(nextProps?: EmrWrapperContainerProps) {
        let props = nextProps ? nextProps : this.props;
        if (props.match.params && props.match.params.patientId !== undefined) {
            let patientId = props.match.params.patientId;
            PatientActions.getPatient(patientId).then((patientDetails) => {
                this.setState({patientDetails})
            })
        }
    }
    componentDidMount() {
        this.checkAndUpdatePatientDetails()
    }
    componentWillReceiveProps(nextProps: EmrWrapperContainerProps) {
        this.checkAndUpdatePatientDetails(nextProps)
    }
    onPatientSelect = (patient: any) => {
        this.setState({
            patientDetails: patient
        })
    }
    render() {
        return (
            <div className="emr-wrapper-container">
                {
                    !this.state.patientDetails &&
                    <PatientSearch />
                }
                {
                    this.state.patientDetails &&
                    <PatientCard patientDetails={this.state.patientDetails} />
                }
                {
                    this.state.patientDetails &&
                    <EmrContainer />
                }
            </div>
        )
    }
}

export default EmrWrapperContainer;