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

export function handleCustom1Change(text){
    return {type: "HANDLE_CUSTOM1_CHANGE", payload: text}
}

export function handleCustom2Change(text){
    return {type: "HANDLE_CUSTOM2_CHANGE", payload: text}
}