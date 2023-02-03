
import { SET_TOKEN, DELETE_TOKEN } from "../component/page/Front/actions/types";

const initialState= {
  authenticated: false,
  accessToken: null,
  expireTime: null
}

export default function TokenReducer(state=initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      const TOKEN_TIME_OUT = 600*1000;
      state.authenticated = true;
      state.accessToken = action.payload;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
      return state;

    case DELETE_TOKEN:  
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = null;
      return state;
    default:
      return state
  }
}