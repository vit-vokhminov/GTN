import React from "react";

function Main({ pages, TabContent, tabActive, openTab }) {
    return (
        <>
            <div className="cabinet_content">
                <div className="cabinetTab">
                    {pages.map((elem, i) => (
                        <button
                            className={`cabinetTablinks ${i === tabActive ? "active" : ""}`}
                            onClick={openTab}
                            data-index={i}
                            key={`cabinetTablinks${i}`}
                        >
                            {elem.title}
                        </button>
                    ))}
                </div>
                {pages[tabActive] && <TabContent {...pages[tabActive]} />}
            </div>
        </>
    );
}

export default Main;
