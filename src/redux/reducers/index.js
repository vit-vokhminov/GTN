import { combineReducers } from "redux";

import settings from "./settings";
import filter from "./filter";
import popup from "./popup";
import form from "./form";

export default combineReducers({
    settings,
    filter,
    popup,
    form,
});
