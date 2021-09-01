import React from "react";
import ModalAuth from "./ModalAuth";
import { render, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'

import { searchAPI } from "../../api/api";
import {store} from "../../redux/store";
import App from "../../App";
import {Provider} from "react-redux";
jest.mock('../../api/api');


describe("ModalAuth", () => {
    it("Submit form", async () => {

// arrange

        const { getAllByTestId, onSubmitForm } = render(
            <Provider store={store}>
                <ModalAuth />
            </Provider>
            )
        const mockSubmitForm = jest.fn(onSubmitForm)
        const [email, password, submit] = getAllByTestId("element");

        //const email = screen.getByTestId("email");
        //const password = screen.getByTestId("password");
        //const onSubmitForm = jest.fn();
// act
        userEvent.type(email, "vvv@vvv.vv");
        userEvent.type(password, "12345");
        //await act(async () => {
            fireEvent.submit(submit);
        //})

// assert
        //expect(mockSubmitForm).toHaveBeenCalled()
        //expect(searchAPI.getAuth).toHaveBeenCalled()
        expect(email.value).toBe('vvv@vvv.vv')
        expect(password.value).toBe('12345')

    });

});
