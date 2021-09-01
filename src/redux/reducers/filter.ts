interface countriesType {
    icon: string,
    acr: string
}
interface enginesType {
    name: string,
    icon: string,
    categories: Array<string>
}
interface dataEnginesType {
    farhub: {
        address: string,
        api_key: string,
    },
    langs: string,
    engines: enginesType
}

export type filterType = {
    countries: Array<countriesType> | null, // {}
    selectedCountry: {
        name: string,
        acr: string,
        icon: string,
        translation: string,
    } | null,
    dataEngines: dataEnginesType | null | FIXME, // {}
    selectedEngine: enginesType | null | any,
    language: null | any, // {}
    selectedLanguage: {
        id: string,
        acronym: string,
        browserLang: string,
        name: string,
        icon: string,
    } | null,
    searchCategory: string | null, 
    testSelect: null | any, // {}
    testTranslateQuery: boolean | null,
    testTranslateResults: boolean | null,
    testCountries: string | null,
}
export const initialState: filterType = {
    countries: null, // доступные страны {}
    selectedCountry: null, // выбранная страна для поиска
    dataEngines: null, // доступные поисковики в выбранной стране
    selectedEngine: null, // выбранный поисковик
    language: null, // доступные языки {}
    selectedLanguage: null, // выбранный язык сайта
    searchCategory: null, // поиск, картинки, видео

    testSelect: null,
    testTranslateQuery: false,
    testTranslateResults: false,
    testCountries: null,
};

const reduserFilter = (state = initialState, action: any): filterType => {
    switch (action.type) {
        case "SET_COUNTRIES":
            return {
                ...state,
                countries: action.payload,
            };
        case "SET_SELECTED_COUNTRY":
            return {
                ...state,
                selectedCountry: action.payload,
            };
        case "SET_DATA_ENGINES":
            return {
                ...state,
                dataEngines: action.payload,
            };
        case "SET_SELECTED_ENGINE":
            return {
                ...state,
                selectedEngine: state.dataEngines.engines.find(
                    (elem: any) => elem.name === action.payload
                ),
            };
        case "SET_LANGUAGE":
            return {
                ...state,
                language: action.payload,
            };
        case "SET_SELECTED_LANGUAGE":
            return {
                ...state,
                selectedLanguage: action.payload,
            };
        case "SET_SEARCH-CATEGOTY":
            return {
                ...state,
                searchCategory: action.payload,
            };

        case "SET_TEST_SELECT":
            return {
                ...state,
                testSelect: action.payload,
            };
        case "SET_TRANSLATE_QUERY":
            return {
                ...state,
                testTranslateQuery: action.payload,
            };
        case "SET_TRANSLATE_RESULTS":
            return {
                ...state,
                testTranslateResults: action.payload,
            };
        default:
            return state;
    }
};

export default reduserFilter;
