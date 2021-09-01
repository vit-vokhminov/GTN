import React from "react";
import { Link } from "react-router-dom";
import { ReactSVG, IconPaymentVisa, IconPaymentMastercard, IconPaymentPaypal } from "../../images";

function SupportProject({ pageSupportProjectRef, t }) {
    return (
        <div className="info_content">
            <div
                className="info_block__line info_block__line_support"
                id="info_sup"
                ref={pageSupportProjectRef}
            >
                <div className="info_block__line__main">
                    <h2>{t("pageSupport.title")}</h2>

                    <div className="colum">
                        <div className="colum_elem">
                            <div className="info_block__line_txt">
                                <p>{t("pageSupport.txt1")}</p>

                                <p>{t("pageSupport.txt2")}</p>
                            </div>
                            <div className="payment_system">
                                <div className="payment_system_elem">
                                    <div className="payment_system_elem_main">
                                        <Link to="#">
                                            <ReactSVG src={IconPaymentVisa} />
                                        </Link>
                                    </div>
                                </div>
                                <div className="payment_system_elem">
                                    <div className="payment_system_elem_main">
                                        <Link to="#">
                                            <ReactSVG src={IconPaymentMastercard} />
                                        </Link>
                                    </div>
                                </div>
                                <div className="payment_system_elem">
                                    <div className="payment_system_elem_main">
                                        <Link to="#">
                                            <ReactSVG src={IconPaymentPaypal} />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn subscribe-now btn-border_g">
                                {t("pageSuggestions.textareaBtn")}
                            </button>
                            <br />
                            <div className="info_block__line_txt">
                                <p className="info_block__line_title">{t("pageSupport.txt3")}</p>
                            </div>
                        </div>
                        <div className="colum_elem"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(SupportProject);
