import { DELETE_INFO } from "../component/page/Front/actions/types";
import {
    UPDATE_OPPOUSER
} from "../component/page/Loading/actions/types";

const userInfo = {
    bio: "",
    birthDay: "",
    imgUrl: "",
    interests: [],
    language: {},
    name: "",
    userEmail: "",
};

export default function AuthReducer(state = userInfo, action) {
    switch (action.type) {
        case UPDATE_OPPOUSER:
            state = action.payload
            return state;

        case DELETE_INFO:
            state = userInfo
            return state;   

        default:
            return state;
    }
}