import React from "react";
import "./styleKeyboard.css";
import KeyboardBtn from "./KeyboardBtn";
import SimpleKeyboardLayouts from "./languages";
import { useTranslation } from "react-i18next";
import { ReactSVG, IconCloseInp } from "../../../images";

const special = [
    "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
    "{@} \u00D7 \u00F7 \u2260 \u221A \u2227 \u2228 \u222B \u2218 [ ] { } {|}",
    '{tab} \u2211 \u00BC \u00BD \u00BE \u2039 \u203A \u00AB \u00BB \u0027 : " {enter}',
    "{shift} \u00A7 \u00B5 \u2220 \u00B6 \u0192 \u221E \u20BD < > ? {shift}",
    "{lang} {space} {?!{}~}",
];

function Keyboard({
    searchingInput,
    setSearchingInput,
    cursorPosition,
    setCursorPosition,
    refInput,
    handleShowKeyboard,
}) {
    const languages = new SimpleKeyboardLayouts().layouts;

    for (const elem in languages) {
        languages[elem].special = special;
    }
    const { t } = useTranslation();

    const [layout, setLayout] = React.useState("default"); // раскладка tab не tab
    const [selectedLanguage, setSelectedLanguage] = React.useState("english"); // выбранный язык клавиатуры
    const [languageSelectionPanel, setLanguageSelectionPanel] = React.useState(false); // показ панели выбора языка
    const [language, setLanguage] = React.useState(languages[selectedLanguage][layout]);
    const [tab, setTab] = React.useState(false);
    const [shift, setShift] = React.useState(false);

    function changeLayout(e, btnSimbol, btnClass) {
        if (shift) {
            setLayout("default");
            setShift(false);
            setTab(false);
        }
        if (btnClass === "k_btn k_lang") {
            setLanguageSelectionPanel(!languageSelectionPanel);
        } else {
            switch (btnSimbol) {
                case "ABC":
                    setTab(!tab);
                    if (tab) {
                        setLayout(layout === "default" ? "shift" : "default");
                    } else {
                        setLayout("shift");
                    }
                    break;
                case "# { } ! ?":
                    setTab(false);
                    setShift(false);
                    setLayout(layout === "special" ? "default" : "special");
                    break;
                case "\u21D1":
                    if (tab) {
                        setShift(true);
                        setTab(false);
                    } else {
                        setShift(!shift);
                        setLayout(layout === "default" ? "shift" : "default");
                    }
                    break;
                case "\u21D0":
                    backSpace();
                    break;
                default:
                    const arrSplit = searchingInput.split("");
                    if (refInput.current.selectionStart === refInput.current.selectionEnd) {
                        arrSplit.splice(cursorPosition, 0, btnSimbol);
                    } else {
                        arrSplit.splice(
                            cursorPosition,
                            refInput.current.selectionEnd - 1,
                            btnSimbol
                        );
                    }
                    setSearchingInput(arrSplit.join(""));
                    setCursorPosition(cursorPosition + 1);
            }
        }
    }

    function backSpace() {
        const selectStart = refInput.current.selectionStart;
        const selectEnd = refInput.current.selectionEnd;

        if (selectStart !== 0 && selectEnd !== 0) {
            const text = searchingInput;
            if (selectStart === selectEnd) {
                const newValue =
                    text.substr(0, selectStart - 1) + text.substr(selectStart, text.length - 1);
                setSearchingInput(newValue);
                setCursorPosition(selectStart - 1);
            } else {
                const newValue =
                    text.substr(0, selectStart) + text.substr(selectEnd, text.length - 1);
                setSearchingInput(newValue);
                setCursorPosition(selectStart);
            }
        } else {
            refInput.current.focus();
            refInput.current.setSelectionRange(0, 0);
        }
    }

    React.useEffect(() => {
        setLanguage(languages[selectedLanguage][layout]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layout, selectedLanguage]);

    React.useEffect(() => {
        refInput.current.focus();
        refInput.current.setSelectionRange(cursorPosition, cursorPosition);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchingInput, cursorPosition]);

    return (
        <div className="keyboard">
            <ReactSVG
                src={IconCloseInp}
                className="keyboard_icon-close"
                onClick={() => handleShowKeyboard()}
            />
            <div className="keyboard_main">
                {language.map((mass, i) => (
                    <div className="k_row" key={`k_row__${i}`}>
                        <KeyboardBtn
                            massRow={mass}
                            keyId={i}
                            changeLayout={changeLayout}
                            tab={tab}
                            shift={shift}
                            languageSelectionPanel={languageSelectionPanel}
                            selectedLanguage={selectedLanguage}
                        />
                    </div>
                ))}
            </div>
            {languageSelectionPanel && (
                <div className="k_choice_lang">
                    {Object.keys(languages).map((elem, i) => (
                        <div
                            className="k_choice_lang__elem"
                            key={`k_choice__${i}`}
                            onClick={() => {
                                setSelectedLanguage(elem);
                                setLanguageSelectionPanel(false);
                            }}
                        >
                            <img src={`/images/flags/${elem}.svg`} alt="" />
                            <span>{t(`languages.${languages[elem].acronim}`,"")}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default React.memo(Keyboard);
