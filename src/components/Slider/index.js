import React from "react";
import Slider from "./Rangeslider";
import "./styleSlider.css";

const labels = {
    1: "1 день",
    2: "2 дня",
    3: "3 дня",
    4: "4 дня",
    5: "5 дней",
    6: "6 дней",
    7: "7 дней",
    8: "1 мес",
    9: "3 мес",
    10: "6 мес",
    11: "12 мес",
};

function RangeSlider() {
    const [value, setValue] = React.useState(7);

    const handleOnChange = (value) => {
        setValue(value);
    };
    const handleLabel = () => {
        const tooltip = (
            <div className="tooltip">
                <div className="tooltip-top">{labels[value]}</div>
                <div className="tooltip-center">$&nbsp;{value}.00</div>
                <div className="tooltip-bottom">$&nbsp;1.00/мес</div>
            </div>
        );

        return tooltip;
    };

    return (
        <div className="rangeslider-wrap">
            <div className="tooltip_mobile">
                <div className="tooltip_mobile_line">
                    <span>Период подписки</span>
                    <div>{labels[value]}</div>
                </div>
                <div className="tooltip_mobile_line">
                    <span>Стоимость подписки</span>
                    <div>$&nbsp;{value}.00</div>
                </div>
            </div>
            <div className="rangeslider-main">
                <Slider
                    min={1}
                    max={11}
                    step={1}
                    tooltip={false}
                    value={value}
                    handleLabel={handleLabel()}
                    orientation="horizontal"
                    onChange={handleOnChange}
                    labels={labels}
                />
            </div>
        </div>
    );
}
export default RangeSlider;
