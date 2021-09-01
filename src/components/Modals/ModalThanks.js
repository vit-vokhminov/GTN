import React from "react";
import "./styleModals.css";
import { useSelector } from "react-redux";
import { searchAPI } from "../../api/api";

const ModalThanks = ({ refModal, setVisibleModal }) => {
    const { userEmail } = useSelector(({ settings }) => settings);

    const sendRecoveryPassword = (email, setNoEmail) => {
        searchAPI
            .getRecoveryPassword(email)
            .then((response) => {
                if (response.status === 200) {
                    setNoEmail(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setNoEmail(true);
                if (error.response) {
                    console.log(error.response.data);
                }
            });
    };

    const handleRecoveryPassword = () => {
        sendRecoveryPassword(userEmail);
    };

    return (
        <div id="modal-test" className="modal" ref={refModal}>
            <div className="modal-content">
                <div className="modal-form">
                    <div className="modal__title">СПАСИБО!</div>
                    <div className="modal__text">
                        На Ваш e-mail отправлено письмо со ссылкой на подтверждение регистрации
                    </div>
                    <div className="modal-button_block">
                        <button
                            type="button"
                            className="btn"
                            onClick={() => setVisibleModal(false)}
                        >
                            Закрыть
                        </button>
                    </div>
                    <div className="modal-button_line">
                        <div className="btnLink" onClick={() => handleRecoveryPassword()}>
                            Отправить письмо повторно
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ModalThanks);
