import {
    LOGIN_USER,
    LOGOUT_USER,
    UPDATE_USER,
    REGISTER_USER,
    AUTH_USER,
} from "../component/page/Front/actions/types";

const userInfo = {
    userId: "",
    userEmail: "",
    userPwd: "",
    name: "",
    birthday: "",
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
            // console.log('Reducer')
            // action.payload의 Promise 객체를 Object 객체로 바꾸기
            const promise = action.payload;
            const getData = () => {
                promise.then((appData) => {
                    // 로그인에 성공하여 appData의 값을 받아오는 경우만
                    if (appData !== undefined) {
                        const data = appData.user;
                        state.userId = data.userId;
                        state.userEmail = data.userEmail;
                        state.userPwd = data.userPwd;
                        state.name = data.name;
                        state.birthday = data.birthDay;
                        state.language = data.language;
                        state.badUser = data.badUser;
                        state.imgUrl = data.imgUrl;
                        state.interests = data.interests;
                        state.bio = data.bio;
                    } else {
                        console.log("로그인 실패해서 데이터 없음");
                    }
                });
            };
            getData();
            return state;


        case LOGOUT_USER:
            return state;


        case UPDATE_USER:
            // console.log('Reducer')
            // action.payload의 Promise 객체를 Object 객체로 바꾸기
            const promise3 = action.payload;
            const getData3 = () => {
                promise3.then((appData) => {
                    // 로그인한 유저의 정보 갱신
                        const data = appData.user;
                        state.userId = data.userId;
                        state.userEmail = data.userEmail;
                        state.userPwd = data.userPwd;
                        state.name = data.name;
                        state.birthday = data.birthDay;
                        state.language = data.language;
                        state.badUser = data.badUser;
                        state.imgUrl = data.imgUrl;
                        state.interests = data.interests;
                        state.bio = data.bio;
                });
            };
            getData3();
            return state;

            
        case REGISTER_USER:
            return state;

        // case AUTH_USER:
        //   return { ...state, userData: action.payload };
        default:
            return state;
    }
}
