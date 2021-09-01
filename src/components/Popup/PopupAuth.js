import React from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    setVisiblePopupAuth,
    setVisiblePopupRegister,
    setVisiblePopupRecoveryPassword,
} from "../../redux/actions/popup";
import { setToken, setUserData } from "../../redux/actions/settings";
import { searchAPI } from "../../api/api";
import { ReactSVG, IconCloseInp } from "../../images";

const PopupAuth = ({ handleOutsideClick, closePopup }) => {
    const { openPopupAuth } = useSelector(({ popup }) => popup);
    const refPopup = React.useRef(null);

    const { register, handleSubmit, errors } = useForm({});
    const [answerError, setAnswerError] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const dispatch = useDispatch();

    function openRegisterPopup() {
        dispatch(setVisiblePopupAuth(false));
        dispatch(setVisiblePopupRegister(true));
    }
    function openPopupRecoveryPassword() {
        dispatch(setVisiblePopupAuth(false));
        dispatch(setVisiblePopupRecoveryPassword(true));
        setAnswerError(false);
    }
    function onSubmitForm(data) {
        searchAPI
            .getAuth(data)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("auth_identity_token", response.data.auth_identity_token);
                    setEmail("");
                    setPassword("");
                    setAnswerError(false);
                    dispatch(setVisiblePopupAuth(false));
                    dispatch(setToken(true));
                    dispatch(setUserData(response.data.user));
                }
            })
            .catch((error) => {
                setAnswerError(true);
            });
    }

    return (
        <div
            id="popup-auth"
            className={classNames("popup", {
                open: openPopupAuth,
            })}
            onClick={(event) =>
                handleOutsideClick(event.nativeEvent, refPopup, setVisiblePopupAuth)
            }
        >
            <div className="popup-body">
                <div className="popup-content" ref={refPopup}>
                    <div className="popup__close" onClick={() => closePopup(setVisiblePopupAuth)}>
                        <ReactSVG src={IconCloseInp} />
                    </div>
                    <div className="popup-form">
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <div className="colum_center">
                                <div className="popup__title">Вход</div>
                                <input
                                    type="hidden"
                                    name="user_data"
                                    value={navigator.userAgent}
                                    ref={register()}
                                />
                                <div className="popup-input">
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
                                    {errors.email && (
                                        <p className="form_error">{errors.email.message}</p>
                                    )}
                                </div>
                                <div className="popup-input">
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
                                    {errors.email && (
                                        <p className="form_error">{errors.email.message}</p>
                                    )}
                                </div>
                                {answerError && (
                                    <p className="form_error">Неверный логин или пароль</p>
                                )}

                                <div className="popup-button">
                                    <button type="submit" className="btn">
                                        Войти
                                    </button>
                                </div>

                                <button className="btnLink" onClick={() => openRegisterPopup()}>
                                    Зарегистрироваться
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="recover_bot">
                        <div className="popup-forget">
                            <span
                                className="popup-forget__link popup-link"
                                onClick={() => openPopupRecoveryPassword()}
                            >
                                Восстановить пароль
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(PopupAuth);
