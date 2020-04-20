const initialState = {
    currentUser: null,
    sources: [],
    countries: [],
    custom1: "",
    custom2: "",
    alertTriggered: false,
    loading: true
}

export const reducer = (prevState=initialState, action) => {
    switch(action.type){
        case "TRIGGER_ALERT_FALSE":
            return {...prevState, alertTriggered: false}
        case "TRIGGER_ALERT_TRUE":
            return {...prevState, alertTriggered: true}
        case "TRIGGER_LOADING_FALSE":
            return {...prevState, loading: false}
        case "HANDLE_CUSTOM1_CHANGE":
            return {...prevState, custom1: action.payload}
        case "HANDLE_CUSTOM2_CHANGE":
            return {...prevState, custom2: action.payload}
        case "HANDLE_CLEAR_CUSTOM1":
            return {...prevState, custom1: ""}
        case "HANDLE_CLEAR_CUSTOM2":
            return {...prevState, custom2: ""}
        case "AUTO_LOGIN":
            return {...prevState, currentUser: action.payload}
        case "SET_CURRENT_USER":
            return {...prevState, currentUser: action.payload}
        default:
            return prevState
    }
}
