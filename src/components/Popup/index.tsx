import React from "react";
import "./stylePopup.css";

import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";

import PopupLanguageSelected from "./PopupLanguageSelected";
import PopupCountrySelected from "./PopupCountrySelected";

import {liveSearch} from "../../utils";


function Popup({illustrate}:any) {
    const {t, i18n} = useTranslation();
    const changeLanguage = (language:string) => {
        i18n.changeLanguage(language);
    };

    const dispatch = useDispatch();

    const closePopup = (action:any) => {
        dispatch(action(false));
        setTimeout(() => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "0px";
        }, 300);
    };
    const handleOutsideClick = (event:any, popup_content:any, action:any) => {
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(popup_content.current)) {
            closePopup(action);
        }
    };

    const obg = {
        handleOutsideClick,
        closePopup,
        liveSearch,
        changeLanguage,
        t,
        i18n,
    };

    return (
        <>
            {illustrate === "languages" && <PopupLanguageSelected {...obg} />}
            {illustrate === "countries" && <PopupCountrySelected {...obg} />}
        </>
    );
}

export default React.memo(Popup);
