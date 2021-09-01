import React from "react";
import "./styleHeaderCabinet.css";
import ChoiceLanguage from "../ChoiceLanguage";
import { ReactSVG, IconExit, LogoGoTrueNetArrow } from "../../../images";
import { NavLink, Link } from "react-router-dom";
import classNames from "classnames";

function HeaderCabinet({ menuBt, handleSidebar }) {
    return (
        <header className="header header_cabinet">
            <div className="header_main">
                <div
                    className={classNames("header_menu_bt", { active: menuBt })}
                    onClick={() => handleSidebar()}
                >
                    <div className="header_menu_bt_line"></div>
                    <div className="header_menu_bt_line"></div>
                    <div className="header_menu_bt_line"></div>
                </div>

                <NavLink to="/" className="header-logo">
                    <ReactSVG src={LogoGoTrueNetArrow} className="logo__cabinet" />
                </NavLink>

                <div className="header_control">
                    <ChoiceLanguage />
                    <Link to="/" className="bt_icon header-exit">
                        <ReactSVG src={IconExit} className="icon_login" />
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default React.memo(HeaderCabinet);
