// eslint-disable-next-line react-hooks/exhaustive-deps
import React from "react";
import "./stylePopup.css";
// import classNames from 'classnames';
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import PopupAuth from "./PopupAuth";
import PopupRegister from "./PopupRegister";
import PopupSupport from "./PopupSupport";
import PopupPropose from "./PopupPropose";
import PopupPassword from "./PopupPassword";
import PopupRecoveryPassword from "./PopupRecoveryPassword";
import PopupSendEmailRecoveryPassword from "./PopupSendEmailRecoveryPassword";
import PopupThanks from "./PopupThanks";
import PopupRegisterData from "./PopupRegisterData";
import PopupRegisterAgreement from "./PopupRegisterAgreement";
import PopupLanguageSelected from "./PopupLanguageSelected";
import PopupCountrySelected from "./PopupCountrySelected";

import {
    setVisiblePopupRecoveryPassword,
    setVisiblePopupSendEmailRecoveryPassword,
} from "../../redux/actions/popup";
import { searchAPI } from "../../api/api";

function Popup() {
    const { t, i18n } = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const dispatch = useDispatch();

    const closePopup = (action) => {
        dispatch(action(false));
        setTimeout(() => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "0px";
        }, 300);
    };
    const handleOutsideClick = (event, popup_content, action) => {
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(popup_content.current)) {
            closePopup(action);
        }
    };
    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // pattn = new RegExp("^[\.\-_A-Za-z0-9]+?@[\.\-A-Za-z0-9]+?\.[A-Za-z0-9]{2,6}$");
        return re.test(email);
    };
    const sendRecoveryPassword = (email, setNoEmail) => {
        searchAPI
            .getRecoveryPassword(email)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setVisiblePopupRecoveryPassword(false));
                    dispatch(setVisiblePopupSendEmailRecoveryPassword(true));
                    setNoEmail(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setNoEmail(true);
                if (error.response) {
                    console.log(error.response.data);
                }
            });
    };
    const liveSearch = (e, refCountries) => {
        const removeHide = () => {
            refCountries.current.childNodes.forEach((elem) => {
                elem.classList.remove("hide");
            });
        };
        if (e) {
            const val = e.target.value.toLowerCase().trim();
            if (val !== "") {
                refCountries.current.childNodes.forEach((elem) => {
                    if (elem.querySelector(".lang").innerText.toLowerCase().search(val) === -1) {
                        elem.classList.add("hide");
                    } else {
                        elem.classList.remove("hide");
                    }
                });
            } else {
                removeHide();
            }
        } else {
            removeHide();
        }
    };

    const obg = {
        handleOutsideClick,
        closePopup,
        validateEmail,
        sendRecoveryPassword,
        liveSearch,
        changeLanguage,
        t,
        i18n,
    };

    return (
        <>
            <PopupAuth {...obg} />
            <PopupRegister {...obg} />
            <PopupSupport {...obg} />
            <PopupPropose {...obg} />
            <PopupPassword {...obg} />
            <PopupRecoveryPassword {...obg} />
            <PopupSendEmailRecoveryPassword {...obg} />
            <PopupThanks {...obg} />
            <PopupRegisterData />
            <PopupRegisterAgreement />
            <PopupLanguageSelected {...obg} />
            <PopupCountrySelected {...obg} />
        </>
    );
}

export default Popup;
