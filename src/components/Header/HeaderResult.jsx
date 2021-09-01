import React from "react";
import "./styleHeader.css";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { setVisiblePopupAuth } from "../../redux/actions/popup";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ChoiceLanguage from "./ChoiceLanguage";

function HeaderResult({ cabinet }) {
    const dispatch = useDispatch();
    let history = useHistory();

    function openPopup(action) {
        document.body.style.paddingRight = `${
            window.innerWidth - document.documentElement.clientWidth
        }px`;
        document.body.style.overflow = "hidden";
        dispatch(action(true));
    }

    function headerCabinet() {
        if (history.location.pathname.match(/cabinet/)) {
            if (localStorage.getItem("auth_identity_token")) {
                return (
                    <>
                        <button className="header-cabinet__link popup-link">Настройки</button>
                        <div className="header-cabinet-content">
                            <ul className="header-cabinet-list">
                                <li>
                                    <button href="#popup-password" className="popup-link">
                                        Изменить пароль
                                    </button>
                                </li>
                                <li>
                                    <button href="#">Изменить профиль</button>
                                </li>
                                <li>
                                    <button href="#">Выход</button>
                                </li>
                            </ul>
                        </div>
                    </>
                );
            } else {
                history.push("/");
            }
        } else {
            if (localStorage.getItem("auth_identity_token")) {
                return (
                    <>
                        <NavLink to="/cabinet" className="header-cabinet__link popup-link">
                            Личный кабинет
                        </NavLink>
                        <div className="header-cabinet-content">
                            <ul className="header-cabinet-list">
                                <li>
                                    <button href="#popup-password" className="popup-link">
                                        Изменить пароль
                                    </button>
                                </li>
                                <li>
                                    <button href="#">Изменить профиль</button>
                                </li>
                                <li>
                                    <button href="#">Выход</button>
                                </li>
                            </ul>
                        </div>
                    </>
                );
            } else {
                return (
                    <>
                        <button
                            className="header-cabinet__link popup-link"
                            onClick={() => openPopup(setVisiblePopupAuth)}
                        >
                            Вход
                        </button>
                    </>
                );
            }
        }
    }

    return (
        <header className={classNames("header", { header_border: cabinet })}>
            <div className="center-wrapper">
                <div className="header-body">
                    <NavLink to="/" className="header-logo">
                        go<span>true</span>net
                    </NavLink>
                    <div className="header-auth">
                        <div className="header-lang">
                            <ChoiceLanguage />
                        </div>
                        <div className="header-cabinet">{headerCabinet()}</div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default React.memo(HeaderResult);
