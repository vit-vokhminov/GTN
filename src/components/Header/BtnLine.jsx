import React from "react";
import "./styleHeader.css";
import { useSelector, useDispatch } from "react-redux";
import { setSidebar } from "../../redux/actions/popup";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { ReactSVG, IconBtnLine, IconBtnDote } from "../../images";

function BtnLine({ windowSize }) {
    const { sidebar } = useSelector(({ popup }) => popup);
    const history = useHistory();
    const dispatch = useDispatch();

    const infoPage = () => {
        const path = history.location.pathname;
        return path.search("information");
    };

    const handleSidebar = () => {
        dispatch(setSidebar(!sidebar));
    };

    const btnLine = (windowSize) => {
        if (windowSize[0] > 1024) {
            return <ReactSVG src={IconBtnLine} />;
        }
        if (windowSize[0] <= 1024 && windowSize[0] > 440) {
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
            {windowSize && btnLine(windowSize)}
        </div>
    );
}

export default React.memo(BtnLine);
