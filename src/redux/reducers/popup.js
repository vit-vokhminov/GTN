const initialState = {
    openPopupAuth: false,
    openPopupRegister: false,
    openPopupLanguage: false,
    openPopupCountry: false,
    openPopupPassword: false,
    openPopupPropose: false,
    openPopupThanks: false,
    openPopupSupport: false,
    openPopupRecoveryPassword: false,
    openPopupSendEmailRecoveryPassword: false,
    sidebar: false,
};

const reduserPopup = (state = initialState, action) => {
    switch (action.type) {
        case "SET_VISIBLE_POPUP_AUTH":
            return {
                ...state,
                openPopupAuth: action.payload,
            };
        case "SET_VISIBLE_POPUP_REGISTER":
            return {
                ...state,
                openPopupRegister: action.payload,
            };
        case "SET_VISIBLE_popup_modal":
            return {
                ...state,
                openPopupLanguage: action.payload,
            };
        case "SET_VISIBLE_POPUP_COUNTRY":
            return {
                ...state,
                openPopupCountry: action.payload,
            };
        case "SET_VISIBLE_POPUP_PASSWORD":
            return {
                ...state,
                openPopupPassword: action.payload,
            };
        case "SET_VISIBLE_POPUP_PROPOSE":
            return {
                ...state,
                openPopupPropose: action.payload,
            };
        case "SET_VISIBLE_POPUP_THANKS":
            return {
                ...state,
                openPopupThanks: action.payload,
            };
        case "SET_VISIBLE_POPUP_SUPPORT":
            return {
                ...state,
                openPopupSupport: action.payload,
            };
        case "SET_VISIBLE_POPUP_RECOVERY_PASSWORD":
            return {
                ...state,
                openPopupRecoveryPassword: action.payload,
            };
        case "SET_VISIBLE_POPUP_SEND_EMAIL_RECOVERY_PASSWORD":
            return {
                ...state,
                openPopupSendEmailRecoveryPassword: action.payload,
            };
        case "SET_SIDEBAR":
            return {
                ...state,
                sidebar: action.payload,
            };
        default:
            return state;
    }
};

export default reduserPopup;
