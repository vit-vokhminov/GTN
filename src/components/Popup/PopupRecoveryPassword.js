import React from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setVisiblePopupRecoveryPassword } from "../../redux/actions/popup";
import { setUserEmail } from "../../redux/actions/settings";
import { ReactSVG, IconCloseInp } from "../../images";

function PopupRecoveryPassword(props) {
    const { handleOutsideClick, closePopup, validateEmail, sendRecoveryPassword } = props;

    const { openPopupRecoveryPassword } = useSelector(({ popup }) => popup);
    const popup_content = React.useRef(null);
    const dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm({});
    const [btnInactive, setBtnInactive] = React.useState(true);
    const [email, setEmail] = React.useState("");
    const [noEmail, setNoEmail] = React.useState(false);

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const onSubmitForm = (data) => {
        console.log("onSubmitForm", data);
        dispatch(setUserEmail(data.email));
        sendRecoveryPassword(data.email, setNoEmail);
    };

    React.useEffect(() => {
        validateEmail(email) ? setBtnInactive(false) : setBtnInactive(true);
    }, [email, validateEmail]);

    return (
        <div
            id="popup-password"
            className={classNames("popup", {
                open: openPopupRecoveryPassword,
            })}
            onClick={(event) =>
                handleOutsideClick(
                    event.nativeEvent,
                    popup_content,
                    setVisiblePopupRecoveryPassword
                )
            }
        >
            <div className="popup-body">
                <div className="popup-content" ref={popup_content}>
                    <div
                        className="popup__close close-popup"
                        onClick={() => closePopup(setVisiblePopupRecoveryPassword)}
                    >
                        <ReactSVG src={IconCloseInp} />
                    </div>
                    <div className="popup-form">
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <div className="colum_center">
                                <div className="popup__title">
                                    Отправить e-mail
                                    <br />
                                    для изменения пароля
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
                                    {noEmail && (
                                        <p className="form_error">Такой e-mail не существует</p>
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
}

export default PopupRecoveryPassword;
