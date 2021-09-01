import {createSlice} from "@reduxjs/toolkit";

// export type userType = {
//     userData: null,
//     userEmail: string,
//     typeModal: string,
// }

const initialState = {
    userData: {
        name: '',
        email: ''
    },
    userEmail: null,
    typeModal: "authorization",
};

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData(state, action) {
            state.userData = action.payload
        },
        setUserEmail(state, action) {
            state.userEmail = action.payload
        },
        setVisibleTypeModal(state, action) {
            state.typeModal =action.payload
        }
    }
});

export const {setUserData, setUserEmail, setVisibleTypeModal} = user.actions;
export default user.reducer;
