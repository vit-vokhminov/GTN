import React from "react";
import "./styleHeader.css";
import ChoiceLanguage from "./ChoiceLanguage";
import BtnLine from "./BtnLine";
import BtnLogin from "./BtnLogin";
import {useWindowSize} from 'react-use';

function HeaderMain() {

    const {width} = useWindowSize();

    return (
        <header className="header">
            {width <= 1024 && (
                <div className="header_bt-line">
                    <BtnLine width={width} />
                </div>
            )}

            <div className="header_control">
                <ChoiceLanguage />

                <BtnLogin />

                {width > 1024 && <BtnLine width={width} />}
            </div>
        </header>
    );
}

export default React.memo(HeaderMain);
