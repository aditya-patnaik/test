import { HIDE_MODAL, SHOW_MODAL, UPDATE_MODAL } from "./types";
import { IModalReducer, IModalPayload } from "../reducers/ModalReducer";

export default class ModalActions {
    static hideModal() {
        return { type: HIDE_MODAL }
    }
    static showModal() {
        return { type: SHOW_MODAL }
    }
    static updateModal(modalConfig: IModalPayload) {
        return { type: UPDATE_MODAL, payload: modalConfig }
    }
}