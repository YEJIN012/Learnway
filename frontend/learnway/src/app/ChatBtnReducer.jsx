const ChatBtnState=false;
  
  function ChatBtnReducer(state = ChatBtnState, action){
    if(action.type === 'ChatBtnUpdate'){
        state = action.payload;
      return state; 
    }
    else{
      return state;
    }
  }

  export default ChatBtnReducer;