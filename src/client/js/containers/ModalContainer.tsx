import * as React from "react"
import { connect } from "react-redux";
import { IAppState } from "../reducers";
import { Dispatch } from "redux";
import ModalActions from "../actions/ModalActions";
import { IModalReducer } from "../reducers/ModalReducer";
import AccessConfirmation from "../components/modals/AccessConfirmation";

export const ModalMap: {[key: string]: any} = {
    "access-confirmation": AccessConfirmation
}

class ModalContainer extends React.Component<IMapStateToProps & IMapDispatchToProps> {
    render() {
        let Component = ModalMap[this.props.modal.template];
        let modalProps = this.props.modal.modalProps;
        return (
            <div className="modal-container-wrapper">
                {
                    this.props.modal.visible &&
                    <div className="modal-container">
                        <div className="modal">
                            <div className="modal-actions-container">
                                <i className="fas fa-window-close" onClick={this.props.hideModal}></i>
                            </div>
                            <div className="modal-content-container">
                                <Component {...modalProps} hideModal={this.props.hideModal} />
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

interface IMapStateToProps {
    modal?: IModalReducer
}

const mapStateToProps = (state: IAppState) => {
    return {
        modal: state.modal
    }
}

interface IMapDispatchToProps {
    hideModal?: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        hideModal: () => {
            dispatch(ModalActions.hideModal());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);