import React from "react";
//import { render, screen, fireEvent } from "@testing-library/react";
import aggregate, {initialState, setDataEngines, setSelectedEngine} from "../aggregate";


describe("reducerAggregate", () => {
    it("should install the search engine data", async () => {

// arrange
        const engine = {
            name: 'a',
            icon: 'https://url',
            categories: ["images"]
        };
        const data = {
            farhub: {
                address: 'a',
                api_key: 'a',
            },
            langs: 'a',
            engines: [engine]
        };

// act
        const state1 = aggregate(initialState,setDataEngines(data));
        const state2 = aggregate(state1,setSelectedEngine('a'));
        const state3 = aggregate(state1,setSelectedEngine('b'));
// assert
        expect(state1.dataEngines).toBe(data);
        expect(state2.selectedEngine).toBe(engine);
        expect(state3.selectedEngine).toBe(undefined);

    });

});

