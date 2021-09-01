import React from "react";
import classNames from "classnames";
import "./styleInputSearch.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setSearchQuery, setAllowSearch } from "../../redux/actions/form";
import Keyboard from "./Keyboard";
import InputCountry from "./InputCountry";
import SpanResultCountry from "./SpanResultCountry";
import { useTranslation } from "react-i18next";
import {
    ReactSVG,
    IconCloseInp,
    IconMicrophone,
    IconKeyboard,
    IconSearch,
    IconSearchMin,
} from "../../images";

function InputSearch() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { searchQuery } = useSelector(({ form }) => form);
    const { windowSize } = useSelector(({ settings }) => settings);
    const [searchingInput, setSearchingInput] = React.useState("");
    const [sendForm, setSendForm] = React.useState(false);
    const { register, handleSubmit } = useForm({});
    const [cursorPosition, setCursorPosition] = React.useState(0);
    const [showKeyboard, setShowKeyboard] = React.useState(false);
    const [eventKeyPressBy_k, setEventKeyPressBy_k] = React.useState("");
    const refInput = React.useRef(null);

    function handleChange(e) {
        setSearchingInput(e.target.value);
    }
    function submitForm() {
        dispatch(setAllowSearch(true));
        dispatch(setSearchQuery(searchingInput));
        setSendForm(true);
    }

    React.useEffect(() => {
        if (sendForm && history.location.pathname === "/") {
            setSendForm(false);
            history.push("/search");
        }
    }, [sendForm, searchQuery, history]);

    function clearInput() {
        setSearchingInput("");
        dispatch(setSearchQuery(""));
    }
    const handleShowKeyboard = () => {
        setShowKeyboard(!showKeyboard);
    };
    const keyPressInputSearch = () => {
        if (showKeyboard) {
            setEventKeyPressBy_k(true);
        }
    };
    React.useEffect(() => {
        if (eventKeyPressBy_k && showKeyboard) {
            setCursorPosition(cursorPosition + 1);
            setEventKeyPressBy_k(false);
        }
    }, [searchingInput, cursorPosition, eventKeyPressBy_k, showKeyboard]);

    React.useEffect(() => {
        if (history.location.pathname !== "/search") {
            setSearchingInput("");
        } else {
            setSearchingInput(searchQuery);
        }
    }, [history.location.pathname, searchQuery]);

    return (
        <div className="input-search_block">
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="input-search_wrap">
                    <div className="input-search_cont">
                        <div className="input-search_main">
                            {/* {!pageMain && <InputCountry /> } */}
                            <InputCountry />

                            <SpanResultCountry />

                            <input
                                name="hiddensearch"
                                type="hidden"
                                value={searchingInput}
                                ref={register({ required: "Что найти?" })}
                            />
                            <input
                                type="text"
                                name="search"
                                className="search-field__input"
                                autoComplete={showKeyboard ? "off" : "on"}
                                onChange={handleChange}
                                value={searchingInput}
                                placeholder={
                                    windowSize && windowSize[0] > 580
                                        ? t("inputSearch.placeholder")
                                        : ""
                                }
                                ref={refInput}
                                onClick={(e) => setCursorPosition(e.target.selectionStart)}
                                onKeyPress={(e) => keyPressInputSearch(e)}
                            />
                            <div className="input-search_control">
                                {searchingInput && (
                                    <div
                                        className={classNames("clear_input", {
                                            active: searchingInput,
                                        })}
                                        onClick={clearInput}
                                    >
                                        <ReactSVG src={IconCloseInp} className="icon_closeInp" />
                                    </div>
                                )}
                                <div className="icon_keyboard" onClick={() => handleShowKeyboard()}>
                                    <ReactSVG src={IconKeyboard} className="icon_keyboard_svg" />
                                </div>

                                <div
                                    className={classNames("icon_microphone", {
                                        hide: searchingInput && windowSize[0] <= 580,
                                    })}
                                >
                                    <ReactSVG
                                        src={IconMicrophone}
                                        className="icon_microphone_svg"
                                    />
                                </div>

                                <button type="submit" className="button_submit">
                                    {(windowSize && windowSize[0]) > 580 && (
                                        <ReactSVG src={IconSearch} className="icon_search" />
                                    )}
                                    {(windowSize && windowSize[0]) <= 580 && (
                                        <ReactSVG src={IconSearchMin} className="icon_search" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    {showKeyboard && (
                        <Keyboard
                            searchingInput={searchingInput}
                            setSearchingInput={setSearchingInput}
                            cursorPosition={cursorPosition}
                            setCursorPosition={setCursorPosition}
                            refInput={refInput}
                            handleShowKeyboard={handleShowKeyboard}
                        />
                    )}
                </div>
            </form>
        </div>
    );
}

export default React.memo(InputSearch);
