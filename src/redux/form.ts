import {createSlice} from "@reduxjs/toolkit";

export type FormType = {
    startSearch: boolean,
    searchQuery: string,
    choiceCountry: Array<string>
}

const initialState:FormType = {
    startSearch: false,
    searchQuery: "",        // поисковый запрос в инпуте
    choiceCountry: [''],    // выбранная страна, указывается при сабмите формы, нужно для расширения браузера
};

const form = createSlice({
    name: "form",
    initialState,
    reducers: {
        setStartSearch(state, action) {
            state.startSearch = action.payload
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload
        },
        setChoiceCountry(state, action) {
            state.choiceCountry =action.payload
        }
    }
});

export const {setStartSearch, setSearchQuery, setChoiceCountry} = form.actions;
export default form.reducer;
