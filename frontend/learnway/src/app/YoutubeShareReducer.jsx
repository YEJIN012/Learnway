import { DELETE_INFO } from "../component/page/Front/actions/types";
import { YOUTUBE_PLAY_STATE,YOUTUBE_TIME_VOD_ID} from "../component/VideoChat/Youtube/actions/types";

const initialState={
    
    vodId : null,
    playinfo:{
        playstate : null,
        playtime : null
    }
}


export default function YoutubeShareReducer(state = initialState, action) {
  // const promise = action.payload
  // console.log(promise)
  switch (action.type) {
    //재생 상태 자징(상태, 시간)
    case YOUTUBE_PLAY_STATE:
      state.playinfo = state.payload 
      return state.playstate;
    
    //영상 ID
    case YOUTUBE_TIME_VOD_ID:
      state.vodId = state.payload
      return state.vodId;

    case DELETE_INFO:
      state = initialState
      return state;   

    default:
      return state;
  }
}