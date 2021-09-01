import React from "react";
import "./styleModals.css";
import { useForm } from "react-hook-form";
import { setToken, setUserData } from "../../redux/actions/settings";
import { searchAPI } from "../../api/api";
import { useDispatch } from "react-redux";

const ModalAuth = ({ refModal, newModal }) => {
    const { register, handleSubmit, errors } = useForm({});
    const [answerError, setAnswerError] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useDispatch();

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };
    const updatePassword = (e) => {
        setPassword(e.target.value);
    };
    function onSubmitForm(data) {
        searchAPI
            .getAuth(data)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("auth_identity_token", response.data.auth_identity_token);
                    setEmail("");
                    setPassword("");
                    setAnswerError(false);

                    dispatch(setToken(true));
                    dispatch(setUserData(response.data.user));
                }
            })
            .catch((error) => {
                setAnswerError(true);
            });
    }

    return (
        <div id="modal-auth" className="modal" ref={refModal}>
            <div className="modal-content">
                <div className="modal-form">
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <div className="modal__title">Вход</div>
                        <input
                            type="hidden"
                            name="user_data"
                            value={navigator.userAgent}
                            ref={register()}
                        />
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
                        </div>
                        <div className="modal-input">
                            <input
                                type="password"
                                className="input"
                                placeholder="Пароль"
                                name="password"
                                value={password}
                                ref={register({
                                    required: "Введите ваш пароль",
                                })}
                                onChange={updatePassword}
                            />
                            {errors.email && <p className="form_error">{errors.email.message}</p>}
                        </div>
                        {answerError && <p className="form_error">Неверный логин или пароль</p>}

                        <div className="modal-button_block">
                            <button type="submit" className="btn">
                                Войти
                            </button>
                        </div>

                        <div className="modal-button_block">
                            <div className="btn-empty" onClick={() => newModal("registration")}>
                                Зарегистрироваться
                            </div>
                        </div>
                        <div className="modal-button_line">
                            <div className="btnLink" onClick={() => newModal("recovery-password")}>
                                Восстановить пароль
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ModalAuth);
