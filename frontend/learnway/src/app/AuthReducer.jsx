import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../component/page/Front/actions/types";

const userInfo = {
  "userId":"",
  "userEmail":"",
  "userPwd":"",
  "name":"",
  "birthday":"",
  "language":"",
  "badUser":"",
  "imgUrl":"",
  "interests":"",
  "bio":"",
};


export default function AuthReducer(state = userInfo, action) {
  switch (action.type) {
    case LOGIN_USER:
      // console.log('Reducer')
      // action.payload의 Promise 객체를 Object 객체로 바꾸기
      const promise = action.payload
      const getData = () => {
        promise.then((appData) => {
          // 로그인에 성공하여 appData의 값을 받아오는 경우만 
          if (appData !== undefined){
            const data = appData.user
            userInfo.userId = data.userId
            userInfo.userEmail = data.userEmail
            userInfo.userPwd = data.userPwd
            userInfo.name = data.name
            userInfo.birthday = data.birthDay
            userInfo.language = data.language
            userInfo.badUser = data.badUser
            userInfo.imgUrl = data.imgUrl
            userInfo.interests = data.interests
            userInfo.bio = data.bio
          } else {
            console.log('로그인 실패해서 데이터 없음')
          }
        })
      }
      getData()
      return { 
        ...state,
        userInfo,
        loginSuccess: userInfo,
      };
    // case REGISTER_USER:
    //   return { ...state, success: action.payload };
    // case AUTH_USER:
    //   return { ...state, userData: action.payload };
    default:
      return state;
  }
}

