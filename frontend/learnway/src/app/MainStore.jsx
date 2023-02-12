const selectedMatchLang="TO";
  
  function MainStore(state = selectedMatchLang, action){
    if(action.type === 'matchLangUpdate'){
        state = action.payload;
      return state; 
    }
    else{
      return state;
    }
  }

  export default MainStore;