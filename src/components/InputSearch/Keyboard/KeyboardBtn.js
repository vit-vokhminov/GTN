import React from "react";
import "./styleKeyboard.css";
import classNames from "classnames";

function KeyboardBtn({
    massRow,
    keyId,
    changeLayout,
    tab,
    shift,
    selectedLanguage,
    languageSelectionPanel,
}) {
    const elemRow = massRow.split(" ");

    function kSymbol(btn) {
        const elemBtn = {};
        switch (btn) {
            case "{bksp}":
                elemBtn.class = "k_btn k_bksp";
                elemBtn.simbol = "\u21D0";
                return elemBtn;
            case "{\\}":
                elemBtn.class = "k_btn k_slash";
                elemBtn.simbol = "\\";
                return elemBtn;
            case "{|}":
                elemBtn.class = "k_btn k_slash";
                elemBtn.simbol = "|";
                return elemBtn;
            case "{@}":
                elemBtn.class = "k_btn k_tab";
                elemBtn.simbol = "@";
                return elemBtn;
            case "{tab}":
                elemBtn.class = "k_btn k_caps_lock";
                elemBtn.simbol = "ABC";
                return elemBtn;
            case "{shift}":
                elemBtn.class = "k_btn k_shift";
                elemBtn.simbol = "\u21D1";
                return elemBtn;
            case "{enter}":
                elemBtn.class = "k_btn k_enter";
                elemBtn.simbol = "\u21B5";
                return elemBtn;
            case "{lang}":
                elemBtn.class = "k_btn k_lang";
                elemBtn.simbol = selectedLanguage
                    ? selectedLanguage[0].toUpperCase() +
                      selectedLanguage.slice(1)
                    : "";
                return elemBtn;
            case "{space}":
                elemBtn.class = "k_btn k_space";
                elemBtn.simbol = "";
                return elemBtn;
            case "{?!{}~}":
                elemBtn.class = "k_btn k_symbols";
                elemBtn.simbol = "# { } ! ?";
                return elemBtn;
            default:
                elemBtn.class = "k_btn";
                elemBtn.simbol = btn;
                return elemBtn;
        }
    }

    return (
        <>
            {elemRow.map((btn, k) => {
                const elemBtn = kSymbol(btn);
                return (
                    <div
                        className={classNames(elemBtn.class, {
                            active:
                                (elemBtn.simbol === "ABC" && tab) ||
                                (elemBtn.simbol === "\u21D1" && shift) ||
                                (elemBtn.class === "k_btn k_lang" &&
                                    languageSelectionPanel),
                        })}
                        key={`k_btn__${keyId}_${k}`}
                        onClick={(e) => {
                            changeLayout(e, elemBtn.simbol, elemBtn.class);
                        }}
                    >
                        <span>{elemBtn.simbol}</span>
                    </div>
                );
            })}
        </>
    );
}

export default React.memo(KeyboardBtn);
