import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { setVisiblePopupSupport } from "../../redux/actions/popup";
import { ReactSVG, IconCloseInp, IMG_visa, IMG_masterCard, IMG_payPal } from "../../images";

const PopupSupport = ({ handleOutsideClick, closePopup }) => {
    const { openPopupSupport } = useSelector(({ popup }) => popup);
    const popup_content = React.useRef(null);

    return (
        <div
            id="popup-propose"
            className={classNames("popup", {
                open: openPopupSupport,
            })}
            onClick={(event) =>
                handleOutsideClick(event.nativeEvent, popup_content, setVisiblePopupSupport)
            }
        >
            <div className="popup-body">
                <div className="popup-content popup-content_support" ref={popup_content}>
                    <div
                        className="popup__close close-popup"
                        onClick={() => closePopup(setVisiblePopupSupport)}
                    >
                        <ReactSVG src={IconCloseInp} />
                    </div>
                    <div className="popup_support_title">Поддержите наш проект!</div>
                    <p>Пожалуйста, выберете платежную систему:</p>
                    <div className="payment_system">
                        <div className="payment_system_elem">
                            <div className="payment_system_elem_main">
                                <Link to="#">
                                    <img src={IMG_visa} alt="" />
                                </Link>
                            </div>
                        </div>
                        <div className="payment_system_elem">
                            <div className="payment_system_elem_main">
                                <Link to="#">
                                    <img src={IMG_masterCard} alt="" />
                                </Link>
                            </div>
                        </div>
                        <div className="payment_system_elem">
                            <div className="payment_system_elem_main">
                                <Link to="#">
                                    <img src={IMG_payPal} alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="popup_support-button">
                        <button type="button" className="btn">
                            Поддержать
                        </button>
                    </div>
                    <div className="support_txt">
                        <p>
                            Спасибо за поддержку! Мы благодарны за каждый вклад, потому что это
                            единственный способ продолжать нашу работу и развивать наш проект!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupSupport;
