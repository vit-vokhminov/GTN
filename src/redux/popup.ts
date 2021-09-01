import {createSlice} from "@reduxjs/toolkit";

export interface Action<P> {
    readonly type: string;
    readonly payload?: P;
}

export type PopupState = {
    openPopupLanguage: boolean,
    openPopupCountry: boolean,
    sidebar: boolean,
}

const initialState: PopupState = {
    openPopupLanguage: false,
    openPopupCountry: false,
    sidebar: false,
}

const popup = createSlice({
    name: "popups",
    initialState,
    reducers: {
        setVisiblePopupLanguage(state, action) {
            state.openPopupLanguage = action.payload
        },
        setVisiblePopupCountry(state, action) {
            state.openPopupCountry = action.payload
        },
        setSidebar(state, action) {
            state.sidebar =action.payload
        }
    }
});

export const {setVisiblePopupLanguage, setVisiblePopupCountry, setSidebar} = popup.actions;
export default popup.reducer;
