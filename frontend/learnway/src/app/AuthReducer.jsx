import {
    LOGIN_USER,
    LOGOUT_USER,
    UPDATE_USER,
    REGISTER_USER,
    DELETE_INFO,
} from "../component/page/Front/actions/types";

const userInfo = {
    userId: "",
    userEmail: "",
    userPwd: "",
    name: "",
    birthDay: "",
    language: "",
    badUser: "",
    imgUrl: "",
    interests: "",
    bio: "",
    provider: "",
    providerId: "",
};

export default function AuthReducer(state = userInfo, action) {
    switch (action.type) {
        case LOGIN_USER:
            state = action.payload
            return state;

        case LOGOUT_USER:
            return state;

        case UPDATE_USER:
            state = action.payload;
            return state;

        case REGISTER_USER:
            return state;

        case DELETE_INFO:
            state = userInfo
            return state;   
          
        default:
            return state;
    };
};
