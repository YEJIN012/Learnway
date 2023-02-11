import { CHAT_INFO, DELETE_INFO } from "../component/page/Front/actions/types";

const chatinfo = {
  Rooms: ""
}

export default function ChatInfoReducer(state = chatinfo, action) {
  switch (action.type) {

    case CHAT_INFO:
      state = action.payload
      return state

    case DELETE_INFO:
      return state;   

    default:
      return state
  }
}

