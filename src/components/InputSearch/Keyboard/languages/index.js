import arabic from "./arabic";
import bengali from "./bengali";
import chinese from "./chinese";
import english from "./english";
import french from "./french";
import german from "./german";
import hindi from "./hindi";
import italian from "./italian";
import japanese from "./japanese";
import polish from "./polish";
import russian from "./russian";
import spanish from "./spanish";
import turkish from "./turkish";
import ukrainian from "./ukrainian";
import urdu from "./urdu";

class SimpleKeyboardLayouts {
    layouts = {
        arabic,
        bengali,
        chinese,
        english,
        french,
        german,
        hindi,
        italian,
        japanese,
        polish,
        russian,
        spanish,
        turkish,
        ukrainian,
        urdu,
    };

    get = (layout) => (layout ? this.layouts[layout] : this.layouts);
}

export default SimpleKeyboardLayouts;

/*
import SimpleKeyboardLayouts from "./components/Layouts";
export default SimpleKeyboardLayouts;
*/
