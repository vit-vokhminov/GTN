import {createSlice} from "@reduxjs/toolkit";

export type FilterType = {
    searchCategory: string | null,
}
const initialState: FilterType = {
    searchCategory: null,   // поиск, картинки, видео
};

const filters = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setSearchCategory(state, action) {
            state.searchCategory = action.payload
        }
    }
});

export const {setSearchCategory} = filters.actions;
export default filters.reducer;
