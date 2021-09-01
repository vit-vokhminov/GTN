import React from "react";
import "./styleModals.css";
import { useSelector } from "react-redux";
import { searchAPI } from "../../api/api";

const ModalThanks = ({ refModal, setVisibleModal }) => {
    const { userData } = useSelector(({ user }) => user);

    const handleSendEmail = () => {
        searchAPI
            .getSendEmail(userData.email)
            .then((response) => {
                if (response.status === 200) {
                    //newModal("thanks");
                    //console.log("getSendEmail Отправка Email", response.data);
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log("getSendEmail error", error);
                }
            });
    };

    return (
        <div id="modal-thanks" className="modal" ref={refModal}>
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
                        <div className="btnLink" onClick={() => handleSendEmail()}>
                            Отправить письмо повторно
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ModalThanks);
