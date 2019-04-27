import * as React from "react"
import VitalsEdit from "../../components/vitals/VitalsEdit"
import VitalsView from "../../components/vitals/VitalsView"
import PatientActions from "../../actions/PatientActions";
import { connect } from "react-redux";
import Button from "../../components/formElements/Button";

export enum VIEW_STATES {
    EDIT = "EDIT",
    VIEW = "VIEW"
}

interface RawVitalsContainerProps {
    username: string;
}

interface VitalsContainerState {
    currentView: VIEW_STATES,
    currentVitals: any,
    isVitalsLoading: boolean,
    error: any
}

type VitalsContainerProps = RawVitalsContainerProps & IConnectProps;

class VitalsContainer extends React.Component<VitalsContainerProps, VitalsContainerState> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentView: VIEW_STATES.VIEW,
            currentVitals: null,
            isVitalsLoading: false,
            error: null
        }
    }
    componentDidMount() {
        this.setState({
            isVitalsLoading: true
        }, () => {
            this.getUpdatedVitals();
        })
    }
    getUpdatedVitals = () => {
        this.props.getVitals(this.props.username).then((vitals: any) => {
            this.setState({
                currentVitals: JSON.parse(vitals.msg),
                isVitalsLoading: false
            })
        }).catch((err: any) => {
            this.setState({
                error: err,
                isVitalsLoading: false
            })
        })
    }
    onVitalsSave = () => {
        this.setState({
            currentView: VIEW_STATES.VIEW
        }, () => {
            this.getUpdatedVitals()
        })
    }
    toggleView = () => {
        let newView = this.state.currentView === VIEW_STATES.VIEW ? VIEW_STATES.EDIT : VIEW_STATES.VIEW;
        this.setState({
            currentView: newView
        })
    }
    render() {
        let toggleBtnText = this.state.currentView === VIEW_STATES.VIEW ? "Edit" : "View"
        return (
            <div className={"vitals-container-wrapper"}>
                <div className="stick-to-right toggle-view-btn-container">
                    <Button text={toggleBtnText} onBtnClick={this.toggleView} />
                </div>
                {
                    this.state.isVitalsLoading &&
                    <div>Fetching Vitals...</div>
                }
            {
                !this.state.isVitalsLoading && this.state.currentView === VIEW_STATES.EDIT &&
                <VitalsEdit saveVitals={this.props.saveVitals} onVitalsSave={this.onVitalsSave} />
            }
            {
                !this.state.isVitalsLoading && this.state.currentView === VIEW_STATES.VIEW &&
                <VitalsView currentVitals={this.state.currentVitals} />
            }
            </div>
        )
    }
}

type IConnectProps = IMapDispatchToProps & IMapStateToProps;

interface IMapStateToProps {

}

interface IMapDispatchToProps {
    getVitals: (username: string) => Promise<any>;
    saveVitals: (vitals: any) => Promise<any>;
}

export const mapDispatchToProps = (dispatch: any) => {
    return {
        getVitals: (username: string) => {
            return PatientActions.getVitals(username)
        },
        saveVitals: (vitals: any) => {
            return PatientActions.saveVitals(vitals)
        }
    }
}

export default connect(null, mapDispatchToProps)(VitalsContainer);