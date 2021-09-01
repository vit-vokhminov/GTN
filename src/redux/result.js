import {createSlice} from "@reduxjs/toolkit";

// export interface resultImages {
//     images: {
//         img_src: string;
//         link: string;
//         original: {
//             snippet: string;
//             title: string;
//         };
//         snippet: string;
//         thumbnail_src: string;
//         title: string;
//     };
// }
//
// export interface resultSearch {
//     general: {
//         link: string;
//         original: {
//             snippet: string;
//             title: string;
//         };
//         snippet: string;
//         title: string;
//     };
// }

const initialState = {
    resultSearch: {
        general: [],
        images: [],
        videos: [],
    },
};

const result = createSlice({
    name: "result",
    initialState,
    reducers: {
        setResultSearch(state, action) {
            state.resultSearch = action.payload
        }
    }
});

export const {setResultSearch} = result.actions;
export default result.reducer;
