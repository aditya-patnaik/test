import * as React from "react"
import {connect} from "react-redux"
import * as _ from "lodash"
import {IAppState} from "../reducers"
import {Dispatch} from "redux"
import {IUserProfile} from "../../../server/models/IUserProfile"
import CustomDropdown from "../components/common/CustomDropdown"
import PatientActions from "../actions/PatientActions"
import AppUtils from "../utils/AppUtils";
import EmrContainer from "./EmrContainer";

interface MyEmrContainerProps extends IMapStateToProps, IMapDispatchToProps{
    history: any[];
    match: any;
    fetchEmr: (emrId: string) => Promise<any>;
}

interface MyEmrContainerState {
    emrId: string;
    patientEmr: any;
    rawEmr: any;
    isEmrLoading: boolean;
}

class MyEmrContainer extends React.Component<MyEmrContainerProps, MyEmrContainerState> {
    constructor(props: MyEmrContainerProps) {
        super(props);
        this.onEmrSelect = this.onEmrSelect.bind(this);
        this.state = {
            emrId: "",
            patientEmr: null,
            rawEmr: null,
            isEmrLoading: false
        }
    }
    componentWillMount() {
        this.checkAndInitialise(this.props);
    }
    componentWillReceiveProps(nextProps?: any) {
        this.checkAndInitialise(nextProps);
    }
    checkAndInitialise = (props: MyEmrContainerProps) => {
        let newEmrId = props.match.params.emrId;
        if (newEmrId !== this.props.match.params.emrId) {
            if (!_.isEmpty(newEmrId))
                this.setState({
                    emrId: newEmrId,
                    isEmrLoading: true,
                    patientEmr: null,
                    rawEmr: null,
                }, () => {
                    this.props.fetchEmr(props.match.params.emrId).then((emrResponse) => {
                        let emr = JSON.parse(emrResponse.msg)
                        let formattedEmr = AppUtils.formatEmrResponse(emr);
                        this.setState({ rawEmr: emr, patientEmr: formattedEmr })
                    }).catch(() => {
                        this.setState({ patientEmr: undefined })
                    }).finally(() => {
                        this.setState({ isEmrLoading: false })
                    });
                })
        }
    }
    getSelectedEmrId = () => {
        return this.props.match.params.emrId;
    }
    onEmrSelect = (emrId: string) => {
        let newUrl = this.props.match.path.replace(":emrId?", emrId)
        this.props.history.push(newUrl)
    }
    onSave = () => {

    }
    render() {
        let emrId = this.getSelectedEmrId();
        let allEmrIds = this.props.userProfile.EMRKeys;
        return (
            <div className={"my-emr-container"}>
                <div className={"select-emr-label-container"}>
                    <div className={"select-emr-label"}>Select Emr :</div>
                </div>
                <div className={"emr-selector-container"}>
                    <CustomDropdown selectedItem={emrId} dropdownItems={allEmrIds} onItemSelect={this.onEmrSelect} />
                </div>
                {
                    this.state.isEmrLoading &&
                    <div className={"spinner-container"}>
                        <img src={"/images/loader.gif"} className={"spinner-gif"} />
                    </div>
                }
                {
                    !this.state.isEmrLoading && this.state.patientEmr &&
                        <EmrContainer rawEmr={this.state.rawEmr}
                                      patientEmr={this.state.patientEmr}
                                      isReadOnly={true}
                                      onSave={this.onSave} emrId={this.state.emrId} />
                }
            </div>
        )
    }
}

interface IMapStateToProps {
    userProfile: IUserProfile
}

const mapStateToProps = (state: IAppState) => {
    return {
        userProfile: state.user.profile
    }
}

interface IMapDispatchToProps {

}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchEmr: (emrId: string) => {
            return PatientActions.getEmrById(emrId);
        }
    }
}

export default connect<IMapStateToProps, IMapDispatchToProps>(mapStateToProps, mapDispatchToProps)(MyEmrContainer);