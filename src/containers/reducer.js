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
        case "TRIGGER_ALERT":
            return {...this.state, alertTriggered: false}
        default:
            return prevState
    }
}
