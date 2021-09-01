import React from "react";
import "./styleSidebar.css";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { IconCloseInp, ReactSVG } from "../../images";
import { setSidebar } from "../../redux/popup";
import { useTranslation } from "react-i18next";
import {useWindowSize} from 'react-use';
import {useAppDispatch, useAppSelector} from "../../redux/store";


function Sidebar() {
    const { t } = useTranslation();
    const sidebar = useAppSelector(store => store.popup.sidebar);
    const {width} = useWindowSize();
    const dispatch = useAppDispatch();

    const closeSidebar = () => {
        dispatch(setSidebar(false));
    };

    const linkSidebar = () => {
        width <= 1024 && dispatch(setSidebar(false));
    };

    React.useEffect(() => {
        if (width <= 1024) {
            if (sidebar) {
                document.body.style.paddingRight = `${
                    window.innerWidth - document.documentElement.clientWidth
                }px`;
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
                document.body.style.paddingRight = "0px";
            }
        }
    }, [sidebar, width]);

    return (
        <>
            <div
                className={classNames("sidebar-insert", { active: sidebar })}
                onClick={() => closeSidebar()}
            ></div>
            <div className={classNames("info_sidebar", { active: sidebar })}>
                <div className="sidebar__close" onClick={() => closeSidebar()}>
                    <ReactSVG src={IconCloseInp} />
                </div>
                <div className="info_sidebar_nav">
                    <div className="info_sidebar_elem">
                        <div className="info_sidebar_elem__title main">
                            <Link to="/" onClick={() => linkSidebar()}>
                                {t("sidebar.main")}
                            </Link>
                        </div>
                    </div>
                    <div className="info_sidebar_elem">
                        <div className="info_sidebar_elem__title aboutProject">
                            <Link to="/information/about" onClick={() => linkSidebar()}>
                                {t("sidebar.aboutProject")}
                            </Link>
                        </div>
                        <ul>
                            <li className="advantagesOfGotruenet">
                                <Link to="/information/about">
                                    {t("sidebar.advantagesOfGotruenet")}
                                </Link>
                            </li>
                            <li className="instructionsForUse">
                                <Link to="/information/about">
                                    {t("sidebar.instructionsForUse")}
                                </Link>
                            </li>
                            <li className="about-registration">
                                <Link
                                    to="/information/about#about-registration"
                                    onClick={() => linkSidebar()}
                                >
                                    {t("sidebar.registration")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="info_sidebar_elem">
                        <div className="info_sidebar_elem__title subscription">
                            <Link
                                to="/information/subscription"
                                onClick={() => linkSidebar()}
                            >
                                {t("sidebar.subscription")}
                            </Link>
                        </div>
                    </div>
                    <div className="info_sidebar_elem">
                        <div className="info_sidebar_elem__title suggestions">
                            <Link
                                to="/information/suggestions"
                                onClick={() => linkSidebar()}
                            >
                                {t("sidebar.suggestionsAndSuggestions")}
                            </Link>
                        </div>
                    </div>
                    <div className="info_sidebar_elem">
                        <div className="info_sidebar_elem__title supportOurProgect">
                            <Link
                                to="/information/support-project"
                                onClick={() => linkSidebar()}
                            >
                                {t("sidebar.supportOurProgect")}
                            </Link>
                        </div>
                    </div>
                    <div className="info_sidebar_elem">
                        <div className="info_sidebar_elem__title privacyPolicy">
                            <Link to="/information/privacy-policy">
                                {t("sidebar.privacyPolicy")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default React.memo(Sidebar);
