import React from "react";
import Slider from "../../components/Slider";

function TariffPlans() {
    return (
        <div className="cabinet_tariffplans">
            <div className="info_block__line__main">
                <div className="snip">
                    У вас есть возможность оформить подписку даже на 1 день! Но обращаем ваше
                    внимание, что чем продолжительнее период подписки, тем дешевле месячная
                    стоимость ее использования.
                </div>
            </div>
            <div className="info_block__line info_block__line_slider">
                <div className="info_block__line__main">
                    <Slider />
                </div>
            </div>
            <button type="submit" className="btn">
                Оформить подписку
            </button>
        </div>
    );
}

export default TariffPlans;
