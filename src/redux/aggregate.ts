import {createSlice} from "@reduxjs/toolkit";

interface CountriesType {
    icon: string,
    acr: string
}
interface EnginesType {
    name: string,
    icon: string,
    categories: Array<string>
}
interface DataEnginesType {
    farhub: {
        address: string,
        api_key: string,
    },
    langs: string,
    engines: EnginesType[]
}

export type AggregateType = {
    countries: CountriesType[] | null, // {}
    selectedCountry: {
        name: string,
        acr: string,
        icon: string,
        translation: string,
    } | null,
    dataEngines: DataEnginesType | null | any, // {}
    selectedEngine: EnginesType | null | any,
}
const initialState: AggregateType = {
    countries: null,        // доступные страны {}
    selectedCountry: null,  // выбранная страна для поиска
    dataEngines: null,      // доступные поисковики в выбранной стране
    selectedEngine: null,   // выбранный поисковик
};

const aggregate = createSlice({
    name: "aggregate",
    initialState,
    reducers: {
        setCountries(state, action) {
            state.countries = action.payload
        },
        setSelectedCountry(state, action) {
            state.selectedCountry = action.payload
        },
        setDataEngines(state, action) {
            state.dataEngines =action.payload
        },
        setSelectedEngine(state, action) {
            state.selectedEngine = state.dataEngines.engines.find(
                (elem: any) => elem.name === action.payload
            )
        }
    }
});

export const {setCountries, setSelectedCountry, setDataEngines, setSelectedEngine} = aggregate.actions;
export default aggregate.reducer;
