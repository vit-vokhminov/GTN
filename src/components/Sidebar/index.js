import React from "react";
import "./styleSidebar.css";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { IconCloseInp, ReactSVG } from "../../images";
import { setSidebar } from "../../redux/actions/popup";
import { useTranslation } from "react-i18next";

function Sidebar() {
    const { t } = useTranslation();
    const { sidebar } = useSelector(({ popup }) => popup);
    const { windowSize } = useSelector(({ settings }) => settings);
    const dispatch = useDispatch();

    const closeSidebar = () => {
        dispatch(setSidebar(false));
    };

    const linkSidebar = () => {
        windowSize[0] <= 1024 && dispatch(setSidebar(false));
    };

    React.useEffect(() => {
        if (windowSize && windowSize[0] <= 1024) {
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
    }, [sidebar, windowSize]);

    return (
        <>
            <div
                className={classNames("sidebar-insert", { active: sidebar })}
                onClick={() => closeSidebar(setSidebar)}
            ></div>
            <div className={classNames("info_sidebar", { active: sidebar })}>
                <div className="sidebar__close" onClick={() => closeSidebar(setSidebar)}>
                    <ReactSVG src={IconCloseInp} />
                </div>
                <div className="info_sidebar_nav">
                    <div className="info_sidebar_elem">
                        <div className="info_sidebar_elem__title main">
                            <Link to="/" onClick={() => linkSidebar(setSidebar)}>
                                {t("sidebar.main")}
                            </Link>
                        </div>
                    </div>
                    <div className="info_sidebar_elem">
                        <div className="info_sidebar_elem__title aboutProject">
                            <Link to="/information/about" onClick={() => linkSidebar(setSidebar)}>
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
                                    onClick={() => linkSidebar(setSidebar)}
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
                                onClick={() => linkSidebar(setSidebar)}
                            >
                                {t("sidebar.subscription")}
                            </Link>
                        </div>
                    </div>
                    <div className="info_sidebar_elem">
                        <div className="info_sidebar_elem__title suggestions">
                            <Link
                                to="/information/suggestions"
                                onClick={() => linkSidebar(setSidebar)}
                            >
                                {t("sidebar.suggestionsAndSuggestions")}
                            </Link>
                        </div>
                    </div>
                    <div className="info_sidebar_elem">
                        <div className="info_sidebar_elem__title supportOurProgect">
                            <Link
                                to="/information/support-project"
                                onClick={() => linkSidebar(setSidebar)}
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
