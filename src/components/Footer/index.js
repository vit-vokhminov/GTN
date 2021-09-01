import React from "react";
import classNames from "classnames";
import "./styleFooterLinks.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
//import { setVisiblePopupSupport } from "../../redux/actions/popup";
//import { setVisiblePopupPropose, setVisiblePopupSupport } from "../../redux/actions/popup";
import { ReactSVG, IconShareMobile } from "../../images";

import icon_social_vk1 from "../../assets/images/icon-social-vk.png";
import icon_social_vk2 from "../../assets/images/icon-social-vk.png";
import icon_social_vk3 from "../../assets/images/icon-social-vk.png";
import icon_social_vk4 from "../../assets/images/icon-social-vk.png";

const ShareIcon = [
    { icon: icon_social_vk1, text: "Alt text" },
    { icon: icon_social_vk2, text: "Alt text" },
    { icon: icon_social_vk3, text: "Alt text" },
    { icon: icon_social_vk4, text: "Alt text" },
];

const Footer = () => {
    const { t } = useTranslation();
    const [footerShare, setFooterShare] = React.useState(false);
    const { windowSize } = useSelector(({ settings }) => settings);

    function showFooterShare() {
        setFooterShare(!footerShare);
    }

    const refFooterShare = React.useRef(null);

    //const dispatch = useDispatch();
    // function openPopup(action) {
    //     document.body.style.paddingRight = `${
    //         window.innerWidth - document.documentElement.clientWidth
    //     }px`;
    //     document.body.style.overflowY = "hidden";
    //     dispatch(action(true));
    // }

    const handleOutsideClick = (event) => {
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(refFooterShare.current)) {
            setFooterShare(false);
        }
    };

    React.useEffect(() => {
        document.body.addEventListener("click", handleOutsideClick);
        return () => {
            document.body.removeEventListener("click", handleOutsideClick);
        };
    }, [footerShare]);

    return (
        <div className="footer">
            <div className="footer_main">
                <div className="footer-links">
                    {windowSize && windowSize[0] >= 580 && (
                        <div className="footer-links__item copyright">
                            &copy;&nbsp;2020&ndash;2021 Gotruenet
                        </div>
                    )}

                    <div className="footer-links__item footer-links__support_us">
                        {/* <button onClick={() => openPopup(setVisiblePopupSupport)}>
                            {windowSize && windowSize[0] >= 1024 && t("footer.support-the-project")}
                            {windowSize &&
                                windowSize[0] < 1024 &&
                                t("footer.support-the-project-mobile")}
                        </button> */}
                        <Link to="/information/support-project">
                            {windowSize && windowSize[0] >= 1024 && t("footer.support-the-project")}
                            {windowSize &&
                                windowSize[0] < 1024 &&
                                t("footer.support-the-project-mobile")}
                        </Link>
                    </div>

                    <div className="footer-links__item">
                        <Link to="/information/subscription">
                            {t("footer.full-version-of-the-extension")}
                        </Link>
                        {/* <button onClick={() => openPopup(setVisiblePopupPropose)}>Полная версия расширения</button> */}
                    </div>

                    {/*  <div className="footer-links__item">
                        <Link to='/information'>{t("footer.background_information")}</Link>
                    </div> */}

                    <div
                        ref={refFooterShare}
                        className={classNames("footer-links__item footer-share", {
                            active: footerShare,
                        })}
                    >
                        <div className="footer-share_main" onClick={() => showFooterShare()}>
                            <button>
                                <span>{t("footer.share")}</span>
                                <span className="footer-share__icon">
                                    <ReactSVG src={IconShareMobile} className="icon_login" />
                                </span>
                            </button>
                        </div>
                        <div
                            className={classNames("footer-share-content", {
                                open: footerShare,
                            })}
                        >
                            <div className="footer-share-list">
                                {ShareIcon.map((elem, i) => (
                                    <Link to="#" className="footer-share__btn" key={i}>
                                        <img src={elem.icon} alt={elem.text} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
