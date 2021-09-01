import React from "react";
import { useHistory } from "react-router-dom";
import "./stylePages/styleInformation.css";
import { HeaderMain, Footer } from "../components";
import { ReactSVG, LogoGoTrueNetArrow } from "../images";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    About,
    Subscriptions,
    Suggestions,
    SupportProject,
    PrivacyPolicy,
} from "./InformationContent";
import { Sidebar } from "../components";

function Information() {
    const { t } = useTranslation();
    const history = useHistory();

    let page;
    if (history.location.pathname.includes("/information/")) {
        page = history.location.pathname.split("/information/")[1].split("#")[0];
    } else {
        page = "about";
    }

    const pageAboutRef = React.useRef(null);
    const aboutRegistrationRef = React.useRef(null);
    const pageSubscriptionsRef = React.useRef(null);
    const pageSuggestionsRef = React.useRef(null);
    const pageSupportProjectRef = React.useRef(null);
    const pagePrivacyPolicytRef = React.useRef(null);

    const objRef = {
        pageAboutRef,
        aboutRegistrationRef,
        pageSubscriptionsRef,
        pageSuggestionsRef,
        pageSupportProjectRef,
        pagePrivacyPolicytRef,
    };

    React.useEffect(() => {
        const hach = history.location.hash ? history.location.hash : page;

        const scrollParams = { behavior: "smooth", block: "start" };

        const scrollPage = (RefElem) => {
            if (RefElem.current) {
                RefElem.current.scrollIntoView(scrollParams);
            }
        };

        switch (hach) {
            case "about":
                scrollPage(pageAboutRef);
                break;
            case "#about-registration":
                scrollPage(aboutRegistrationRef);
                break;
            case "subscription":
                scrollPage(pageSubscriptionsRef);
                break;
            case "suggestions":
                scrollPage(pageSuggestionsRef);
                break;
            case "support-project":
                scrollPage(pageSupportProjectRef);
                break;
            case "privacy-policy":
                scrollPage(pagePrivacyPolicytRef);
                break;
            default:
                break;
        }
    }, [history.location, page]);

    return (
        <div className="wrapper info_wrapper">
            <Sidebar />
            <div className="main">
                <div className="header-fix">
                    <HeaderMain />

                    <div className="info_block__line block__line__logo">
                        <div className="info_block__line__main">
                            <NavLink to="/" className="info-logo-nav">
                                <ReactSVG src={LogoGoTrueNetArrow} className="logo__res" />
                            </NavLink>
                        </div>
                    </div>
                </div>

                {page === "about" && <About {...objRef} t={t} />}
                {page === "subscription" && <Subscriptions {...objRef} t={t} />}
                {page === "suggestions" && <Suggestions {...objRef} t={t} />}
                {page === "support-project" && <SupportProject {...objRef} t={t} />}
                {page === "privacy-policy" && <PrivacyPolicy {...objRef} t={t} />}
            </div>

            <Footer />
        </div>
    );
}

export default React.memo(Information);
