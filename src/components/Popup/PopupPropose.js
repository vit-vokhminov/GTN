import React from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { setVisiblePopupPropose } from "../../redux/actions/popup";
import { ReactSVG, IconCloseInp } from "../../images";

const PopupPropose = ({ handleOutsideClick, closePopup }) => {
    const { openPopupPropose } = useSelector(({ popup }) => popup);
    const popup_content = React.useRef(null);
    // const dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm({});
    const [username, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    /* const [completion, setСompletion] = React.useState(false);
    const [btnInactive, setBtnInactive] = React.useState(true); */

    const enterUserName = (e) => {
        setUserName(e.target.value);
    };
    const enterEmail = (e) => {
        setEmail(e.target.value);
    };
    const enterMessage = (e) => {
        setMessage(e.target.value);
    };

    function onSubmitForm() {}

    return (
        <div
            id="popup-propose"
            className={classNames("popup", {
                open: openPopupPropose,
            })}
            onClick={(event) =>
                handleOutsideClick(event.nativeEvent, popup_content, setVisiblePopupPropose)
            }
        >
            <div className="popup-body">
                <div className="popup-content" ref={popup_content}>
                    <div
                        className="popup__close close-popup"
                        onClick={() => closePopup(setVisiblePopupPropose)}
                    >
                        <ReactSVG src={IconCloseInp} />
                    </div>
                    <div className="popup-form">
                        <form onSubmit={handleSubmit(onSubmitForm)}>
                            <div className="colum_center">
                                <div className="popup__title">
                                    Мы всегда открыты для пожеланий и предложений и готовы
                                    совершенствоваться
                                </div>
                                <div className="popup-input">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Ваше имя"
                                        value={username}
                                        name="username"
                                        ref={register({ required: "Ваше имя" })}
                                        onChange={enterUserName}
                                    />
                                    {errors.username && (
                                        <p className="form_error">{errors.username.message}</p>
                                    )}
                                </div>
                                <div className="popup-input">
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="Ваш e-mail"
                                        value={email}
                                        name="email"
                                        ref={register({
                                            required: "Ваш e-mail",
                                        })}
                                        onChange={enterEmail}
                                    />
                                    {errors.email && (
                                        <p className="form_error">{errors.email.message}</p>
                                    )}
                                </div>
                                <div className="popup-textarea">
                                    <textarea
                                        className="textarea"
                                        placeholder="Комментарий"
                                        value={message}
                                        name="message"
                                        ref={register({
                                            required: "Комментарий",
                                        })}
                                        onChange={enterMessage}
                                    />
                                    {errors.message && (
                                        <p className="form_error">{errors.message.message}</p>
                                    )}
                                </div>
                                <div className="popup-button">
                                    <button type="submit" className="btn">
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

export default PopupPropose;
