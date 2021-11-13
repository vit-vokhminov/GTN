import React from "react";
import "./styleModals.css";

import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUserEmail } from "../../redux/user";
import { searchAPI } from "../../api/api";
import {validateEmail} from "../../utils";

const ModalRecoveryPassword = ({ refModal, newModal }) => {
    const dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm({});
    const [btnInactive, setBtnInactive] = React.useState(true);
    const [email, setEmail] = React.useState("");
    const [noEmail, setNoEmail] = React.useState(false);

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const onSubmitForm = (data) => {
        dispatch(setUserEmail(data.email));
        sendRecoveryPassword(data.email, setNoEmail);
    };

    React.useEffect(() => {
        validateEmail(email) ? setBtnInactive(false) : setBtnInactive(true);
    }, [email]);

    const sendRecoveryPassword = (email, setNoEmail) => {
        searchAPI
            .getRecoveryPassword(email)
            .then((response) => {
                if (response.status === 200) {
                    setNoEmail(false);
                }
            })
            .catch((error) => {
                setNoEmail(true);
                //console.log(error.response.data);
            });
    };

    return (
        <div id="modal-recovery_password" className="modal" ref={refModal}>
            <div className="modal-content">
                <form onSubmit={handleSubmit(onSubmitForm)}>
                    <div className="modal__title">
                        Отправить e-mail
                        <br />
                        для изменения пароля
                    </div>
                    <div className="modal-input">
                        <input
                            type="email"
                            className="input"
                            placeholder="Ваш e-mail"
                            value={email}
                            name="email"
                            ref={register({
                                required: "Введите ваш e-mail",
                            })}
                            onChange={updateEmail}
                        />
                        {errors.email && <p className="form_error">{errors.email.message}</p>}
                        {noEmail && <p className="form_error">Такой e-mail не существует</p>}
                    </div>
                    <div className="modal-button_block">
                        <button
                            type="submit"
                            className={classNames("btn", {
                                btn_inactive: btnInactive,
                            })}
                        >
                            Отправить
                        </button>
                    </div>
                    <div className="modal-button_line">
                        <div className="btnLink" onClick={() => newModal("authorization")}>
                            Я кажется вспомнил пароль
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default React.memo(ModalRecoveryPassword);
