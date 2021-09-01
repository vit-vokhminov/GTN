import React from "react";
//import { render, screen, fireEvent } from "@testing-library/react";
import Filter, {initialState, setSearchCategory} from "../filter";


describe("reducerFilter", () => {
    it("should set search category when dispatched set search category", async () => {

        // arrange
        const filter = "images";
        // act
        const state = Filter(initialState,setSearchCategory(filter));
        // assert
        expect(state.searchCategory).toBe(filter);

    });
});

