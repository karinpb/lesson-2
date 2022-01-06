const INITIAL_STATE = {
    currentUser: null
}

// Default es6 syntax for default value, null is a value, undefined is not which will use initial state
// All reducers gets all actions
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_CURRENT_USER":
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;