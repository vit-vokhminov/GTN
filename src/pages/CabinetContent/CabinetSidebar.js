import React from "react";
import { ReactSVG } from "../../images";
import classNames from "classnames";
import {useWindowSize} from 'react-use';

function CabinetSidebar({ pages, handleSidebar, menuBt, tabActive, openTabFromSidebar }) {

    const {width} = useWindowSize();

    return (
        <>
            {width <= 1024 && (
                <>
                    <div
                        className={classNames("cabinet-insert", { active: menuBt })}
                        onClick={() => handleSidebar()}
                    ></div>
                    <div className={classNames("cabinet_sidebar", { active: !menuBt })}>
                        <ul className="cabinet_sidebar_nav">
                            {pages.map((elem, i) => (
                                <button
                                    className={`cabinet_sidebar_bt ${
                                        i === tabActive ? "active" : ""
                                    }`}
                                    onClick={openTabFromSidebar}
                                    data-index={i}
                                    key={`cabinet_sidebar_bt${i}`}
                                >
                                    <ReactSVG src={elem.icon} className="cabinet_sidebar_icon" />
                                    <span>{elem.title}</span>
                                </button>
                            ))}
                        </ul>

                        <div className="copyright">
                            <span>&copy;&nbsp;2020&ndash;2021 Gotruenet</span>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default CabinetSidebar;
