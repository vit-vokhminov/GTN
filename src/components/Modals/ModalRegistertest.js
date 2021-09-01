// import React from "react";
// import { searchAPI } from "../../api/api";
// import { render } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import ModalRegister from "./ModalRegister";

// jest.mock(searchAPI);
// const params = {
//     email: "vvv@vvv.vv",
//     name: "vit",
//     password: "111",
// };

// describe("ModalRegister", () => {
//     it("Registration Modal API", async () => {
//         searchAPI.getRegistration.mockImplementationOnce(() =>
//             Promise.resolve({ data: { params } })
//         );
//         const { getByRole, findAllByRole } = render(<ModalRegister />);
//         userEvent.click(getByRole("button"));
//         const items = await findAllByRole("listitem");
//         expect(items).toHaveLength(3);
//     });
// });
