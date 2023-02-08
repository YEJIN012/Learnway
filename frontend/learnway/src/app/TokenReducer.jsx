
import { SET_TOKEN, DELETE_TOKEN, DELETE_INFO } from "../component/page/Front/actions/types";

const initialState= {
  authenticated: false,
  accessToken: null,
  expireTime: null
}

export default function TokenReducer(state=initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      state = action.payload
      return state;

    case DELETE_TOKEN:
      return initialState;

    case DELETE_INFO:
      state = initialState
      return state;

    default:
      return state
  }
}