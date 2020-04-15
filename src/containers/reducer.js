const initialState = {
    currentUser: null,
    sources: [],
    countries: [],
    reload: false,
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
        default:
            return prevState
    }
}
