import * as React from "react"
import Button from "../formElements/Button";
import { IUserProfile } from "../../../../server/models/IUserProfile";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import AccessControlActions from "../../actions/AccessControlActions";
import {IAppState} from "../../reducers";

export interface RawAccessConfirmationProps {
    user: IUserProfile;
    userGroup: string;
    emrId?: string;
    hideModal: () => void;
}

interface AccessConfirmationState {
    newEmr: boolean;
    isLoading: boolean;
    err: any;
}

type AccessConfirmationProps = IMapStateToProps & IMapDispatchToProps & RawAccessConfirmationProps;

class AccessConfirmation extends React.Component<AccessConfirmationProps, AccessConfirmationState> {
    constructor(props: AccessConfirmationProps) {
        super(props)
        this.state = {
            isLoading: false,
            newEmr: true,
            err: null
        }
    }
    giveAccess = () => {
        let userToShare = this.props.user.userName;
        let myUserName = this.props.userProfile.userName;
        this.setState({
            isLoading: true
        }, () => {
            if (this.props.userGroup === "doctor") {
                this.props.shareAccessToDoctor(userToShare, myUserName, this.state.newEmr).then((result: any) => {
                    this.props.hideModal()
                }).catch((err: any) => {
                    this.setState({err})
                }).finally(() => {
                    this.setState({
                        isLoading: false
                    })
                })
            } else if (this.props.userGroup === "pharmacy") {
                this.props.shareAccessToPharmacy(userToShare, myUserName, this.props.emrId).then((result: any) => {
                    this.props.hideModal()
                }).catch((err: any) => {
                    this.setState({err})
                }).finally(() => {
                    this.setState({
                        isLoading: false
                    })
                })
            } else {
                this.props.shareAccessToLab(userToShare, myUserName, this.props.emrId).then((result: any) => {
                    this.props.hideModal()
                }).catch((err: any) => {
                    this.setState({err})
                }).finally(() => {
                    this.setState({
                        isLoading: false
                    })
                })
            }
        })
    }
    onCheckBoxClick = (evt: any) => {
        this.setState({
            newEmr: evt.currentTarget.checked
        });
    }
    render() {
        return (
            <div className="access-confirmation-modal">
                <div>Are you sure you want to give access to {this.props.user.name}?</div>
                {
                    this.state.err &&
                        <div>{this.state.err}</div>
                }
                {
                    this.props.userGroup === "doctor" &&
                    <div className={"checkbox-container"}>
                        <input type={"checkbox"} checked={this.state.newEmr} onClick={this.onCheckBoxClick} />
                        <span>Select this option if you want the Doctor to be able to create a new EMR</span>
                    </div>
                }
                <div className="button-container">
                    <Button onBtnClick={this.giveAccess} text={"Yes"}>
                        {
                            this.state.isLoading &&
                            <img className={"spinner-gif"} src={"images/loader.gif"} />
                        }
                    </Button>
                    <Button onBtnClick={this.props.hideModal} text={"No"} />
                </div>
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
    shareAccessToDoctor: (userToShare: string, username: string, newEmr: boolean) => Promise<any>
    shareAccessToPharmacy: (userToShare: string, username: string, emrId: string) => Promise<any>
    shareAccessToLab: (userToShare: string, username: string, emrId: string) => Promise<any>
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        shareAccessToDoctor: (userToShare: string, username: string, newEmr: boolean) => {
            return AccessControlActions.shareAccessToDoctor(userToShare, username, newEmr)
        },
        shareAccessToPharmacy: (userToShare: string, username: string, emrId: string) => {
            return AccessControlActions.shareAccessToPharmacy(userToShare, username, emrId)
        },
        shareAccessToLab: (userToShare: string, username: string, emrId: string) => {
            return AccessControlActions.shareAccessToLab(userToShare, username, emrId)
        }
    }
}

export default connect<IMapStateToProps, IMapDispatchToProps>(mapStateToProps, mapDispatchToProps)(AccessConfirmation);