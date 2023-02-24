const selectedMatchLang={
  languageId:null,
  languageName:null
};
  
  function MainReducer(state = selectedMatchLang, action){
    if(action.type === 'matchLangUpdate'){
        state = action.payload;
      return state; 
    }
    else{
      return state;
    }
  }

  export default MainReducer;