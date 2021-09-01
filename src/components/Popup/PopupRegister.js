import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { setVisiblePopupRegister, setVisiblePopupThanks } from "../../redux/actions/popup";
import { setUserData } from "../../redux/actions/settings";
import { searchAPI } from "../../api/api";
import { ReactSVG, IconCloseInp } from "../../images";

const PopupRegister = ({ handleOutsideClick, closePopup }) => {
    const { openPopupRegister } = useSelector(({ popup }) => popup);
    const popup_content = React.useRef(null);
    const dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm({});
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [agreement, setAgreement] = React.useState(false);
    const [btnInactive, setBtnInactive] = React.useState(true);
    const [checkPassword, setCheckPassword] = React.useState(false);

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };
    const updateEmail = (e) => {
        setEmail(e.target.value);
    };
    const updatePassword = (e) => {
        setPassword(e.target.value);
    };
    const updateConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };
    const updateCheckPassword = (e) => {
        setCheckPassword(password !== confirmPassword);
    };
    /* const updateAgreement = (e) => {
        setAgreement(e.target.checked);
    }; */

    async function onSubmitForm(data) {
        await searchAPI
            .getIp()
            .then((response) => {
                if (response.status === 200) {
                    data.ip = response.data.ip;
                }
            })
            .catch((error) => {
                if (error.response) {
                    //console.log(error.response.data);
                }
            });
        console.log("data", data);
        searchAPI
            .getRegistration(data)
            .then((response) => {
                if (response.status === 201) {
                    searchAPI
                        .getSendEmail(data.email)
                        .then((response) => {
                            if (response.status === 200) {
                                dispatch(setVisiblePopupRegister(false));
                                dispatch(setVisiblePopupThanks(true));
                                console.log(response);
                            }
                        })
                        .catch((error) => {
                            if (error.response) {
                                console.log("======================");
                                console.log(error.response.data);
                                console.log("======================");
                            }
                        });

                    setUsername("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setAgreement(false);

                    const identityUser = {
                        auth_identity_token: response.data.auth_identity_token,
                        user_data: navigator.userAgent,
                    };
                    searchAPI
                        .getUser(identityUser)
                        .then((response) => {
                            if (response.status === 200) {
                                localStorage.setItem(
                                    "auth_identity_token",
                                    response.data.auth_identity_token
                                );
                                dispatch(setUserData(response.data.user));
                            }
                        })
                        .catch((error) => {
                            if (error.response) {
                                // console.log(error.response.data);
                            }
                        });
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log("======================");
                    console.log(error.response.data);
                    console.log("======================");
                }
            });
    }

    React.useEffect(() => {
        if (
            username &&
            email &&
            agreement &&
            password !== "" &&
            confirmPassword !== "" &&
            password === confirmPassword
        ) {
            setBtnInactive(false);
        } else {
            setBtnInactive(true);
        }
    }, [username, email, password, confirmPassword, agreement]);

    return (
        <div
            id="popup-register"
            className={classNames("popup", {
                open: openPopupRegister,
            })}
            onClick={(event) =>
                handleOutsideClick(event.nativeEvent, popup_content, setVisiblePopupRegister)
            }
        >
            <div className="popup-body">
                <div className="popup-content" ref={popup_content}>
                    <div
                        className="popup__close close-popup"
                        onClick={() => closePopup(setVisiblePopupRegister)}
                    >
                        <ReactSVG src={IconCloseInp} />
                    </div>
                    <div className="popup-form">
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <div className="colum_center">
                                <div className="popup__title">Регистрация</div>
                                {/* <input
                                    type="hidden"
                                    name="user_data"
                                    value={navigator.userAgent}
                                    ref={register()}
                                /> */}
                                <div className="popup-input">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Ваше имя"
                                        value={username}
                                        name="name"
                                        ref={register({
                                            required: "Введите ваше имя",
                                        })}
                                        onChange={updateUsername}
                                    />
                                    {errors.username && (
                                        <p className="form_error">{errors.username.message}</p>
                                    )}
                                </div>
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
                                        placeholder="Ваш пароль"
                                        value={password}
                                        name="password"
                                        ref={register({
                                            required: "Введите ваш пароль",
                                        })}
                                        onChange={updatePassword}
                                    />
                                    {errors.password && (
                                        <p className="form_error">{errors.password.message}</p>
                                    )}
                                </div>
                                <div className="popup-input">
                                    <input
                                        type="password"
                                        className="input"
                                        placeholder="Повторите пароль"
                                        value={confirmPassword}
                                        name="confirmPassword"
                                        // ref={register({
                                        //     required: "Повторите пароль",
                                        // })}
                                        onBlur={updateCheckPassword}
                                        onChange={updateConfirmPassword}
                                    />
                                    {checkPassword && (
                                        <p className="form_error">Пароли не совпадают</p>
                                    )}
                                </div>
                                {/*  <div className="popup-input">
                                <div className="checkbox">
                                    <input
                                        type="checkbox"
                                        id="register-data"
                                        value="register-data"
                                    />
                                    <label htmlFor="register-data">Согласен на обработку моих данных (<a
                                        href="#popup-register-data" className="popup-link">Условия</a>)</label>
                                </div>
                            </div> */}
                                {/*  <div className="popup-input">
                                    <div className="checkbox">
                                        <input
                                            type="checkbox"
                                            id="register-agreement"
                                            name="agreement"
                                            value={agreement}
                                            ref={register}
                                            onChange={updateAgreement}
                                        />
                                        <label htmlFor="register-agreement">Принимаю пользовательское соглашение (<a
                                            href="#popup-register-agreement"
                                            className="popup-link">Условия</a>)</label>
                                    </div>
                                </div> */}
                                <div className="popup-button">
                                    <button
                                        type="submit"
                                        className={classNames("btn", {
                                            btn_inactive: btnInactive,
                                        })}
                                    >
                                        Зарегистрироваться
                                    </button>
                                </div>
                                <div className="reg_privacy">
                                    <p>
                                        Отправляя форму, вы даете согласие на обработку своих
                                        персональных данных и соглашаетесь с&nbsp;
                                        <Link to="">политикой конфиденциальности.</Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(PopupRegister);
