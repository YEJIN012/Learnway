import { GET_LANGUAGE, GET_INTEREST} from "../component/page/Front/actions/types";

const initialLang = {}

export default function UerInfoReducer(state = initialLang, action) {
  const promise = action.payload
  switch (action.type) {
    // 언어 정보 저장
    case GET_LANGUAGE:
      const getLang = () => {
        promise.then((e) => {
          const msg = e.msg
          const status = e.status
          if (status === 202 ) {
            console.log(msg)
            console.log(e)
            state.language = e.language
          } else {
            console.log('언어 정보 데이터 없음');
          }
        })
      }
    getLang()
    return state;
    
    case GET_INTEREST:
      const getIt = () => {
        promise.then((e) => {
          console.log("취향 정보가 store에 저장되었습니다.")
          if (e !== undefined) {
          state.interests = e.interests
          } else {
            console.log('취향 정보 데이터 없음');
          }
        })
      }
    getIt()
    
    return state;
    default:
      return state;
  }
}