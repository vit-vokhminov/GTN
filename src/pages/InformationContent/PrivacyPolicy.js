import React from "react";

function PrivacyPolicy({ pagePrivacyPolicytRef, t }) {
    return (
        <div className="info_content">
            <div
                className="info_block__line info_block__line_privacy-policy"
                ref={pagePrivacyPolicytRef}
            >
                <div className="info_block__line__main">
                    <h2>{t("pagePrivacyPolicy.title")}</h2>
                    <div className="info_privacy-policy_description">
                        <p>{t("pagePrivacyPolicy.description1")}</p>
                        <p>{t("pagePrivacyPolicy.description2")}</p>
                        <p>{t("pagePrivacyPolicy.description3")}</p>
                    </div>
                    <div className="column">
                        <div className="column_elem">
                            <div className="snip">{t("pagePrivacyPolicy.line_1_Snip")}</div>
                        </div>
                        <div className="column_elem">
                            <p>{t("pagePrivacyPolicy.line_1_Text")}</p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="column_elem">
                            <div className="snip">{t("pagePrivacyPolicy.line_2_Snip")}</div>
                        </div>
                        <div className="column_elem">
                            <p>{t("pagePrivacyPolicy.line_2_Text1")}</p>
                            <p>{t("pagePrivacyPolicy.line_2_Text2")}</p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="column_elem">
                            <div className="snip">{t("pagePrivacyPolicy.line_3_Snip")}</div>
                        </div>
                        <div className="column_elem">
                            <p>{t("pagePrivacyPolicy.line_3_Text")}</p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="column_elem">
                            <div className="snip">{t("pagePrivacyPolicy.line_4_Snip")}</div>
                        </div>
                        <div className="column_elem">
                            <p>{t("pagePrivacyPolicy.line_4_Text")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(PrivacyPolicy);
