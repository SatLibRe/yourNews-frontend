export function setAlertTrueRedux(){
    return {type: "TRIGGER_ALERT_TRUE" }
}

export function setLoadingFalseRedux(){
    return {type: "TRIGGER_LOADING_FALSE" }
}

export function clearCustom1Redux(){
    return {type: "HANDLE_CLEAR_CUSTOM1" }
}

export function clearCustom2Redux(){
    return {type: "HANDLE_CLEAR_CUSTOM2" }
}

export function setAlertFalseRedux(){
    return {type: "TRIGGER_ALERT_FALSE" }
}

export function handleCustom1ChangeRedux(text){
    return {type: "HANDLE_CUSTOM1_CHANGE", payload: text}
}

export function handleCustom2ChangeRedux(text){
    return {type: "HANDLE_CUSTOM2_CHANGE", payload: text}
}

export function currentUserFetch(token){
    return function(dispatch){
        fetch("http://localhost:3000/autologin", {
            headers: {
                "Authorization": token
              }
        }).then(resp => resp.json())
        .then(resp => {
            if(resp.errors){
              console.log(resp.errors)
            }  else {
              dispatch({type: "AUTO_LOGIN", payload: resp})
            }
          }
        )
    }
}

export function setCurrentUser(resp){
    return {type: "SET_CURRENT_USER", payload: resp}
}