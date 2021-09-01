import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter, {initialState} from "./filter";
import {setCountries} from "../actions/filter";

describe("FilterReduser", () => {
    test("eeeeeeeeeeeee", async () => {


// arrange
        const countries = {
            a : {
                aa: 1,
                bb: 2,
            },
            b : {
                aa: 1,
                bb: 2,
            }
        }
// act
        const state = Filter(initialState,setCountries(countries))
// assert
        expect(state.countries).toBe(countries);





        /*render(<App />);
        await screen.findByText(/Logged in as/i);
        expect(screen.queryByText(/Searches for React/)).toBeNull();
        fireEvent.change(screen.getByRole("textbox"), {
            target: { value: "React" },
        });
        expect(screen.queryByText(/Searches for React/)).toBeInTheDocument();*/
    });
});

