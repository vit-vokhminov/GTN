import React from "react";
import "./styleHeader.css";
import { setSidebar } from "../../redux/popup";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { ReactSVG, IconBtnLine, IconBtnDote } from "../../images";
import {useAppDispatch, useAppSelector} from "../../redux/store";

interface Props {
    width: number
}

function BtnLine({ width }:Props) {
    const sidebar = useAppSelector(store => store.popup.sidebar);
    const history = useHistory();
    const dispatch = useAppDispatch();

    const infoPage = () => {
        const path = history.location.pathname;
        return path.search("information");
    };

    const handleSidebar = () => {
        dispatch(setSidebar(!sidebar));
    };

    const btnLine = (width: number) => {
        if (width > 1024) {
            return <ReactSVG src={IconBtnLine} />;
        }
        if (width <= 1024 && width > 440) {
            if (infoPage() === -1) {
                return <ReactSVG src={IconBtnLine} />;
            }
            return (
                <div className={classNames("header_menu_bt", { active: sidebar })}>
                    <div className="header_menu_bt_line"></div>
                    <div className="header_menu_bt_line"></div>
                    <div className="header_menu_bt_line"></div>
                </div>
            );
        }
        return <ReactSVG src={IconBtnDote} />;
    };

    React.useEffect(() => {
        dispatch(setSidebar(false));
    }, [history.location.pathname, dispatch]);

    return (
        <div className="btn_line" onClick={() => handleSidebar()}>
            {btnLine(width)}
        </div>
    );
}

export default React.memo(BtnLine);
