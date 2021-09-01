import React from "react";
import { useHistory } from "react-router-dom";
import "./stylePages/styleInformation.css";
import { HeaderMain, Footer, Sidebar } from "../components";
import { ReactSVG, LogoGoTrueNetArrow, IconUseArrow } from "../images";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Information() {
    const infoTopRef = React.useRef<HTMLDivElement | null>(null);
    const infoRegRef = React.useRef<HTMLDivElement | null>(null);
    const infoSubRef = React.useRef<HTMLDivElement | null>(null);

    const { t } = useTranslation();
    const history = useHistory();

    React.useEffect(() => {
        const hach = history.location.hash;
        const scrollParams:ScrollIntoViewOptions = { behavior: "smooth", block: "start" };

        const infoTopRefCurrent = infoTopRef.current;
        if(infoTopRefCurrent){
            if (hach === "#info_top") {
                return infoTopRefCurrent.scrollIntoView(scrollParams);
            }
            if (hach === "#info_reg") {
                return infoTopRefCurrent.scrollIntoView(scrollParams);
            }
            if (hach === "#info_sub") {
                return infoTopRefCurrent.scrollIntoView(scrollParams);
            }
        }

    }, [history.location.hash]);

    return (
        <div className="wrapper info_wrapper">
            <Sidebar />

            <div className="main">
                <div className="header-fix">
                    <HeaderMain />

                    <div
                        className="info_block__line block__line__logo"
                        id="info_top"
                        ref={infoTopRef}
                    >
                        <div className="info_block__line__main">
                            <NavLink to="/" className="info-logo-nav">
                                <ReactSVG src={LogoGoTrueNetArrow} className="logo__res" />
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className="info_block__line block__line__about">
                    <div className="info_block__line__main">
                        <h2>{t("pageAbout.blockAbout.Title")}</h2>
                        <div className="snip">{t("pageAbout.blockAbout.Snip1")}</div>
                        <div className="info_block__line_txt_main">
                            <div className="info_block__line_txt">
                                <p className="info_block__line_title">
                                    <b>{t("pageAbout.blockAbout.Txt1")}</b>
                                </p>

                                <p>{t("pageAbout.blockAbout.Txt2")}</p>

                                <p>{t("pageAbout.blockAbout.Txt3")}</p>
                            </div>
                            <div className="info_block__line_txt">
                                <p className="info_block__line_title">
                                    <b>{t("pageAbout.blockAbout.Txt4")}</b>
                                </p>

                                <p>{t("pageAbout.blockAbout.Txt5")}</p>
                            </div>
                        </div>

                        <br />

                        <div className="snip">{t("pageAbout.blockAbout.Snip2")}</div>

                        <div className="i-use">
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>{t("pageAbout.blockAbout.IUse1")}</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>{t("pageAbout.blockAbout.IUse2")}</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>{t("pageAbout.blockAbout.IUse3")}</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>{t("pageAbout.blockAbout.IUse4")}</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>{t("pageAbout.blockAbout.IUse5")}</span>
                            </div>
                            <div className="i-use-elem">
                                <ReactSVG src={IconUseArrow} />
                                <span>{t("pageAbout.blockAbout.IUse6")}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="info_block__line info_block__line_reg"
                    id="info_reg"
                    ref={infoRegRef}
                >
                    <div className="info_block__line__main">
                        <div className="snip">{t("pageAbout.blockRegistration.Title")}</div>
                        <div className="info_block__line_txt_main">
                            <div className="info_block__line_txt">
                                <p className="info_block__line_title">
                                    <b>{t("pageAbout.blockRegistration.Snip1")}</b>
                                </p>

                                <p>{t("pageAbout.blockRegistration.Txt1")}</p>

                                <p>{t("pageAbout.blockRegistration.Txt2")}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="info_block__line block__line__sub" id="info_sub" ref={infoSubRef}>
                    <div className="info_block__line__main">
                        <div className="snip">{t("pageAbout.blockSubscription.snip")}</div>

                        <div className="colum">
                            <div className="colum_elem">
                                <div className="info_block__line_txt_main">
                                    <div className="info_block__line_txt">
                                        <p className="info_block__line_title">
                                            <b>{t("pageAbout.blockSubscription.txt1")}</b>
                                        </p>

                                        <p>{t("pageAbout.blockSubscription.txt2")}</p>
                                    </div>
                                </div>

                                {/*<p className="by_reg">Оформив подписку, Вы получаете наш <b>VPN - сервис Gotruenet</b> в
                ПОДАРОК!</p>*/}
                            </div>
                            <div className="colum_elem">
                                <div className="i-use i-use_num">
                                    <p className="info_block__line_title">
                                        <b>{t("pageAbout.blockSubscription.columTitle")}</b>
                                    </p>
                                    <div className="i-use-elem">
                                        <span className="i-use_ellipse">1</span>
                                        <span>{t("pageAbout.blockSubscription.columElem1")}</span>
                                    </div>
                                    <div className="i-use-elem">
                                        <span className="i-use_ellipse">2</span>
                                        <span>{t("pageAbout.blockSubscription.columElem2")}</span>
                                    </div>
                                    <div className="i-use-elem">
                                        <span className="i-use_ellipse">3</span>
                                        <span>{t("pageAbout.blockSubscription.columElem3")}</span>
                                    </div>
                                </div>
                                <div className="subscribe-now_mob">
                                    <button className="btn subscribe-now">
                                        {t("pageAbout.blockSubscription.columBtn")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default React.memo(Information);
