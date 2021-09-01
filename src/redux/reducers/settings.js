const initialState = {
    farHub: null,
    registrToken: false,
    resetToken: false,
    userData: null,
    userEmail: null,
    windowSize: null,
};

const reduserSettings = (state = initialState, action) => {
    switch (action.type) {
        case "SET_REGISTR-TOKEN":
            return {
                ...state,
                registrToken: action.payload,
            };
        case "SET_RESET-TOKEN":
            return {
                ...state,
                resetToken: action.payload,
            };
        case "SET_USER_DATA":
            return {
                ...state,
                userData: action.payload,
            };
        case "SET_USER_EMAIL":
            return {
                ...state,
                userEmail: action.payload,
            };
        case "SET_FARHUB":
            return {
                ...state,
                farHub: action.payload,
            };
        case "SET_WINDOW_SIZE":
            return {
                ...state,
                windowSize: action.payload,
            };
        default:
            return state;
    }
};

export default reduserSettings;
