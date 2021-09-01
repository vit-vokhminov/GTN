import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import languages from "./languages";
import aggregate from "./aggregate";
import filter from "./filter";
import popup from "./popup";
import form from "./form";
import user from "./user";
import result from "./result";

export const store = configureStore({
    reducer: {
        languages,
        aggregate,
        filter,
        popup,
        form,
        user,
        result,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
