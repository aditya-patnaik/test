import {SHOW_MODAL, HIDE_MODAL, UPDATE_MODAL} from "../actions/types";

export interface IModalPayload {
    template: string;
    modalProps: any;
}

export interface IModalReducer extends IModalPayload {
    visible: boolean;
}

const INITIAL_STATE = {
    template: null as string,
    visible: false
}

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case SHOW_MODAL:
            return { ...state, visible: true };
        case HIDE_MODAL:
            return { ...state, visible: false };
        case UPDATE_MODAL:
            return { ...state, visible: true, modalProps: action.payload.modalProps, template: action.payload.template };
        default:
            return state
    }
}