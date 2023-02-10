import { CHAT_INFO } from "../../page/Front/actions/types";

import { request } from "../../page/Front/utils/axios";


const CHAT_URL = '/chat';

//채팅방 정보 가져오기
export function chatRoomLst(dataToSubmit) {
  const URL = CHAT_URL + `/room/all/${dataToSubmit}`
  const data = request("get", URL)
  return {
    type: CHAT_INFO,
    payload: data
  }
}