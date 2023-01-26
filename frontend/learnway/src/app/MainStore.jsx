const selectedMatchLang="";
  
  function UserStore(state = selectedMatchLang, action){
    if(action.type === 'matchLangUpdate'){
        state = action.payload;
      return state; 
    }
    else{
      return state;
    }
  }

  export default UserStore;