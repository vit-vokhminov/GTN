import React from "react";

function NotFound() {
    return (
        <div className="wrapper">
            <div className="main">
                <div className="not_found">
                    <h1>404</h1>
                    <img src={`./images/404.gif`} alt="" />
                </div>
            </div>
        </div>
    );
}

export default React.memo(NotFound);
