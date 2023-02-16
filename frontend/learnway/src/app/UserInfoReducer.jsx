import { GET_LANGUAGE, GET_INTEREST, DELETE_INFO} from "../component/page/Front/actions/types";

const initialLang = {
  language : null,
  interests : null
};

export default function UserInfoReducer(state = initialLang, action) {
  // const promise = action.payload
  // console.log(promise)
  switch (action.type) {
    // 언어 정보 저장
    case GET_LANGUAGE:
      state = { interests: state.interests, language: action.payload}  
      return state;
    
    // 취향 정보 저장
    case GET_INTEREST:
      state = { interests: action.payload, language: state.language}  
      return state;

    case DELETE_INFO:
      state = initialLang
      return state;

    default:
      return state;
  };
};