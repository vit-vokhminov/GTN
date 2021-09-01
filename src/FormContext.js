import React, { useState, createContext } from "react";

export const FormContext = createContext();

export const FormProvider = (props) => {
    const [users, setUsers] = useState([
        {
            name: " ",
            email: " ",
            id: null,
        },
    ]);
    return (
        <FormContext.Provider value={[users, setUsers]}>
            {props.children}
        </FormContext.Provider>
    );
};
