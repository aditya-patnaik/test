import * as React from "react"
import EmrContainer from "./EmrContainer";
import PatientCard from "../components/patient/PatientCard";
import UserSearch from "./patient/UserSearch";
import PatientActions from "../actions/PatientActions";
import AppUtils from "../utils/AppUtils";

export interface EmrWrapperContainerProps {
    history?: any;
    match?: any;
    patientId: string;
}

export interface EmrWrapperContainerState {
    patientDetails: any;
    patientEmr: any;
    rawEmr: any;
    isEmrLoading: boolean;
}

class EmrWrapperContainer extends React.Component<EmrWrapperContainerProps, EmrWrapperContainerState> {
    constructor(props: EmrWrapperContainerProps) {
        super(props)
        this.state = {
            patientDetails: null,
            rawEmr: null,
            patientEmr: null,
            isEmrLoading: false
        }
    }
    checkAndUpdatePatientDetails(nextProps?: EmrWrapperContainerProps) {
        let props = nextProps ? nextProps : this.props;
        if (props.match.params && props.match.params.patientId !== undefined) {
            let patientId = props.match.params.patientId;
            this.setState({ patientDetails: { name: patientId }});
        }
        if (props.match.params && props.match.params.emrId !== undefined) {
            let emrId = props.match.params.emrId;
            PatientActions.getEmrById(emrId).then((emrResponse: any) => {
                let emr = JSON.parse(emrResponse.msg)
                let formattedEmr = AppUtils.formatEmrResponse(emr);
                this.setState({ rawEmr: emr, patientEmr: formattedEmr })
            }).catch(() => {
                this.setState({ patientEmr: undefined })
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
    onEmrSave = () => {
        this.props.history.push("/");
    }
    render() {
        return (
            <div className="emr-wrapper-container">
                {
                    !this.state.patientDetails &&
                    <UserSearch />
                }
                {
                    this.state.patientDetails &&
                    <PatientCard patientDetails={this.state.patientDetails} />
                }
                {
                    this.props.match.params.emrId !== undefined && this.state.patientEmr === null &&
                    <div>
                        Please wait while the EMR is fetched
                        <img className={"spinner-gif"} src={"/images/loader.gif"} />
                    </div>
                }
                {
                    this.state.patientEmr === undefined &&
                    <div>
                        You are not authorized to view this EMR
                    </div>
                }
                {
                    this.state.patientEmr &&
                    <EmrContainer emrId={this.props.match.params.emrId}
                                  rawEmr={this.state.rawEmr}
                                  patientEmr={this.state.patientEmr}
                                  onSave={this.onEmrSave} />
                }
            </div>
        )
    }
}

export default EmrWrapperContainer;