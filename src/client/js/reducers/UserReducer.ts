import {SWITCH_ROLE, UPDATE_USER} from "../actions/types";
import {IUserProfile} from "../../../server/models/IUserProfile";

export interface IUserReducer {
    profile: IUserProfile;
    role: string;
}

const INITIAL_STATE = {
    profile: null as IUserProfile,
    role: "PATIENT"
}

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case UPDATE_USER:
            return { ...state, profile: action.payload };
        case SWITCH_ROLE:
            return { ...state, role: action.payload };
        default:
            return state
    }
}