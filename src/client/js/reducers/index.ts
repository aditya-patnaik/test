import {combineReducers} from "redux";
import UserReducer, {IUserReducer} from "./UserReducer";
import ModalReducer, { IModalReducer } from "./ModalReducer";

export interface IAppState {
    user: IUserReducer;
    modal: IModalReducer;
}

export default combineReducers({
    user: UserReducer,
    modal: ModalReducer
})