import React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { setVisiblePopupSendEmailRecoveryPassword } from "../../redux/actions/popup";

const PopupSendEmailRecoveryPassword = ({
    handleOutsideClick,
    closePopup,
    sendRecoveryPassword,
}) => {
    const { openPopupSendEmailRecoveryPassword } = useSelector(({ popup }) => popup);
    const { userEmail } = useSelector(({ settings }) => settings);
    const popup_content = React.useRef(null);

    const handleRecoveryPassword = () => {
        sendRecoveryPassword(userEmail);
    };

    return (
        <div
            id="popup-thanks"
            className={classNames("popup", {
                open: openPopupSendEmailRecoveryPassword,
            })}
            onClick={(event) =>
                handleOutsideClick(
                    event.nativeEvent,
                    popup_content,
                    setVisiblePopupSendEmailRecoveryPassword
                )
            }
        >
            <div className="popup-body">
                <div className="popup-content" ref={popup_content}>
                    <div
                        className="popup__close close-popup"
                        onClick={() => closePopup(setVisiblePopupSendEmailRecoveryPassword)}
                    >
                        x
                    </div>
                    <div className="popup-form">
                        <div className="popup__text">
                            На Ваш e-mail отправлено письмо со ссылкой на изменение пароля
                        </div>
                        <div className="popup-button">
                            <button
                                type="button"
                                className="btn"
                                onClick={() => closePopup(setVisiblePopupSendEmailRecoveryPassword)}
                            >
                                Закрыть
                            </button>
                        </div>
                        <div
                            className="popup__text reference_text"
                            onClick={() => handleRecoveryPassword()}
                        >
                            Оотправить письмо повторно
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupSendEmailRecoveryPassword;
