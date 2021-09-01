const initialState = {
    allowSearch: false,
    searchQuery: "", // поисковый запрос в инпуте
    choiceCountry: "", // выбранная страна, указывается при сабмите формы
    foundImages: [], // что это ?
    searchResult: null, // результат выдачи
};

const reduserForm = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ALLOW_SEARCH":
            return {
                ...state,
                allowSearch: action.payload,
            };
        case "SET_SEARCH-QUERY":
            return {
                ...state,
                searchQuery: action.payload,
            };
        case "SET_CHOICE_COUNTRY":
            return {
                ...state,
                choiceCountry: [action.payload],
            };
        case "SET_FOUND_IMAGES":
            return {
                ...state,
                foundImages: [...state.foundImages, action.payload],
            };
        case "SET_SEARCH_RESULT":
            return {
                ...state,
                searchResult: [...state.searchResult, action.payload],
            };
        default:
            return state;
    }
};

export default reduserForm;
