import React from "react";
import classNames from "classnames";

const SelectOption = ({ engine, icon, clickOptionq, checkEngine }) => (
    <div
        className={classNames("select-options__value", {
            "gray-none": engine === checkEngine,
        })}
        data-value={engine}
        onClick={clickOptionq}
    >
        <img src={icon} alt="" />
    </div>
);

export default React.memo(SelectOption);
