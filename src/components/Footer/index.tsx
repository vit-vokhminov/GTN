import React from "react";
import classNames from "classnames";
import "./styleFooterLinks.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ReactSVG, IconShareMobile } from "../../images";
import {useWindowSize} from 'react-use';

import icon_social_vk1 from "../../assets/img/icon-social-vk.png";
import icon_social_vk2 from "../../assets/img/icon-social-vk.png";
import icon_social_vk3 from "../../assets/img/icon-social-vk.png";
import icon_social_vk4 from "../../assets/img/icon-social-vk.png";

const ShareIcon = [
    { icon: icon_social_vk1, text: "Alt text" },
    { icon: icon_social_vk2, text: "Alt text" },
    { icon: icon_social_vk3, text: "Alt text" },
    { icon: icon_social_vk4, text: "Alt text" },
];

const Footer = () => {
    const { t } = useTranslation();
    const [footerShare, setFooterShare] = React.useState(false);
    const {width} = useWindowSize();

    function showFooterShare() {
        setFooterShare(!footerShare);
    }

    const refFooterShare = React.useRef(null);

    const handleOutsideClick = (event:MouseEvent) => {
        // firefox not event.path
        // @ts-ignore
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
                    {width >= 580 && (
                        <div className="footer-links__item copyright">
                            &copy;&nbsp;2020&ndash;2021 Gotruenet
                        </div>
                    )}

                    <div className="footer-links__item footer-links__support_us">
                        <Link to="/information/support-project">
                            {width >= 1024 && t("footer.support-the-project","")}
                            {width < 1024 &&
                                t("footer.support-the-project-mobile","")}
                        </Link>
                    </div>

                    <div className="footer-links__item">
                        <Link to="/information/subscription">
                            {t("footer.full-version-of-the-extension","")}
                        </Link>
                    </div>

                    <div
                        ref={refFooterShare}
                        className={classNames("footer-links__item footer-share", {
                            active: footerShare,
                        })}
                    >
                        <div className="footer-share_main" onClick={() => showFooterShare()}>
                            <button>
                                <span>{t("footer.share","")}</span>
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

export default React.memo(Footer);
