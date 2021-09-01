import React from "react";
import Slider from "../../components/Slider";

function Subscriptions({ pageSubscriptionsRef, t }) {
    return (
        <div className="info_content">
            <div className="info_block__line info_block__line_form" ref={pageSubscriptionsRef}>
                <div className="info_block__line__main">
                    <div className="info_block__line_txt">
                        <h2>{t("pageSubscription.title")}</h2>

                        <p>
                            <b>{t("pageSubscription.txt1")}</b>
                        </p>

                        <p>{t("pageSubscription.txt2")}</p>

                        <p>{t("pageSubscription.txt3")}</p>
                    </div>

                    <div className="snip">{t("pageSubscription.snip")}</div>
                </div>
            </div>

            <div className="info_block__line info_block__line_slider" id="info_slider">
                <div className="info_block__line__main">
                    <Slider />
                </div>
            </div>

            <div className="info_block__line info_block__line_bt-subscribe">
                <button className="btn subscribe-now">{t("pageSubscription.btnSubscribe")}</button>
            </div>
        </div>
    );
}

export default React.memo(Subscriptions);
