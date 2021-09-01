import React from "react";
import "./styleHeader.css";
import { useSelector } from "react-redux";
import ChoiceLanguage from "./ChoiceLanguage";
import BtnLine from "./BtnLine";
import BtnLogin from "./BtnLogin";

function HeaderMain() {
    const { windowSize } = useSelector(({ settings }) => settings);

    return (
        <header className="header">
            {windowSize && windowSize[0] <= 1024 && (
                <div className="header_bt-line">
                    <BtnLine windowSize={windowSize} />
                </div>
            )}

            <div className="header_control">
                <ChoiceLanguage />

                <BtnLogin />

                {windowSize && windowSize[0] > 1024 && <BtnLine windowSize={windowSize} />}
            </div>
        </header>
    );
}

export default React.memo(HeaderMain);
