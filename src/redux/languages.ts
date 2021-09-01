import {createSlice} from "@reduxjs/toolkit";

interface LanguageType {
    name: string;
    icon: string;
}
interface SelectedLanguageType {
    id: string,
    acronym: string,
    browserLang: string,
    name: string,
    icon: string,
}
export type LanguagesType = {
    language: LanguageType[] | null,
    selectedLanguage: SelectedLanguageType | null
}

const initialState: LanguagesType = {
    language: null,             // доступные языки
    selectedLanguage: null,     // выбранный язык сайта
}

const languages = createSlice({
    name: "languages",
    initialState,
    reducers: {
        setLanguage(state, action) {
            state.language = action.payload
        },
        setSelectedLanguage(state, action) {
            state.selectedLanguage = action.payload
        }
    }
});

export const {setLanguage, setSelectedLanguage} = languages.actions;
export default languages.reducer;
