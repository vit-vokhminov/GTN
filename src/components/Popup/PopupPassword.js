import React from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setVisiblePopupPassword } from "../../redux/actions/popup";
import { searchAPI } from "../../api/api";
import { setToken, setResetToken, setUserData } from "../../redux/actions/settings";
import { ReactSVG, IconCloseInp } from "../../images";

const PopupPassword = ({ handleOutsideClick, closePopup }) => {
    const history = useHistory();
    const { openPopupPassword } = useSelector(({ popup }) => popup);
    const { resetToken } = useSelector(({ settings }) => settings);
    const popup_content = React.useRef(null);
    const dispatch = useDispatch();
    // register, handleSubmit, errors
    const { register, handleSubmit } = useForm({});
    // const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [checkPassword, setCheckPassword] = React.useState(false);
    const [btnInactive, setBtnInactive] = React.useState(true);

    /* const enterOldPassword = (e) => {
         setOldPassword(e.target.value);
     }; */
    const enterNewPassword = (e) => {
        setNewPassword(e.target.value);
    };
    const enterConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };
    const enterCheckPassword = (e) => {
        if (newPassword && confirmPassword) {
            setCheckPassword(newPassword !== confirmPassword);
        } else {
            setCheckPassword(false);
        }
    };

    function onSubmitForm(data) {
        const params = {
            reset_token: resetToken,
            new_pwd: data.newpassword,
            user_data: navigator.userAgent,
        };

        searchAPI
            .getResetPassword(params)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("auth_identity_token", response.data.auth_identity_token);
                    dispatch(setUserData(response.data.user));
                    dispatch(setToken(true));
                    dispatch(setResetToken(false));
                    dispatch(setVisiblePopupPassword(false));
                    history.push("/");
                    // console.log(response.data);
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
                console.log(error);
            });
    }

    React.useEffect(() => {
        if (newPassword !== "" && confirmPassword !== "" && newPassword === confirmPassword) {
            setBtnInactive(false);
        } else {
            setBtnInactive(true);
        }
    }, [newPassword, confirmPassword]);

    return (
        <div
            id="popup-password"
            className={classNames("popup", {
                open: openPopupPassword,
            })}
            onClick={(event) =>
                handleOutsideClick(event.nativeEvent, popup_content, setVisiblePopupPassword)
            }
        >
            <div className="popup-body">
                <div className="popup-content" ref={popup_content}>
                    <div
                        className="popup__close close-popup"
                        onClick={() => closePopup(setVisiblePopupPassword)}
                    >
                        <ReactSVG src={IconCloseInp} />
                    </div>
                    <div className="popup-form">
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <div className="colum_center">
                                <div className="popup__title">Изменить пароль</div>
                                {/* <div className="popup-input">
                                <input
                                    type="password"
                                    className="input"
                                    placeholder="Старый пароль"
                                    value={oldPassword}
                                    name="oldpassword"
                                    ref={register({required: "Ваш старый пароль"})}
                                    onChange={enterOldPassword}
                                />
                            </div> */}
                                <div className="popup-input">
                                    <input
                                        type="password"
                                        className="input"
                                        placeholder="Новый пароль"
                                        value={newPassword}
                                        name="newpassword"
                                        ref={register({
                                            required: "Ваш новый пароль",
                                        })}
                                        onBlur={enterCheckPassword}
                                        onChange={enterNewPassword}
                                    />
                                </div>
                                <div className="popup-input">
                                    <input
                                        type="password"
                                        className="input"
                                        placeholder="Повторите новый пароль"
                                        value={confirmPassword}
                                        name="confirmPassword"
                                        ref={register({
                                            required: "Повторите новый пароль",
                                        })}
                                        onBlur={enterCheckPassword}
                                        onChange={enterConfirmPassword}
                                    />
                                    {checkPassword && (
                                        <p className="form_error">Пароли не совпадают</p>
                                    )}
                                </div>
                                <div className="popup-button">
                                    <button
                                        type="submit"
                                        className={classNames("btn", {
                                            btn_inactive: btnInactive,
                                        })}
                                    >
                                        Отправить
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupPassword;
