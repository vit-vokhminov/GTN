import React from "react";
import "./styleModals.css";
import { useForm } from "react-hook-form";
import { setUserData, setVisibleTypeModal } from "../../redux/user";
import { searchAPI } from "../../api/api";
import { useTranslation } from "react-i18next";
import {useAppDispatch} from "../../redux/store";

interface SubmitFormType {
    email: string,
    ip: string,
    password: string,
}
interface PropsType {
    refModal: any,
    newModal: (a:string) => void,
}

const ModalAuth = ({ refModal, newModal }:PropsType) => {

    const { t } = useTranslation();
    const { register, handleSubmit, errors } = useForm({});
    const [answerError, setAnswerError] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useAppDispatch();

    const updateEmail = (e:any) => {
        setEmail(e.target.value);
    };
    const updatePassword = (e:any) => {
        setPassword(e.target.value);
    };
    function onSubmitForm(data:SubmitFormType) {
        console.log("data",data)
        data.ip = "127.0.0.1";
        searchAPI
            .getAuth(data)
            .then((response) => {
                if (response.status === 200) {
                    const userData = { ...response.data };
                    delete userData.token;
                    dispatch(setUserData(userData));
                    dispatch(setVisibleTypeModal("profile"));
                    localStorage.setItem("auth_identity_token", response.data.token);
                }
            })
            .catch((error) => {
                console.log("getAuth error", error);
                console.log("getAuth error", error.response);
                setAnswerError(true);
            });
    }

    return (
        <div id="modal-auth" className="modal" ref={refModal}>
            <div className="modal-content">
                <div className="modal-form">
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <div className="modal__title">
                            {t("modals.modalAuth.title","")}
                        </div>
                        {/* <input
                            type="hidden"
                            name="user_data"
                            value={navigator.userAgent}
                            ref={register()}
                        /> */}
                        <div className="modal-input">
                            <input
                                data-testid="element"
                                id="modal-auth__email"
                                type="email"
                                className="input"
                                placeholder={t("modals.modalAuth.inputEmailPlaceholder","")}
                                value={email}
                                name="email"
                                ref={register({
                                    required: `${t("modals.modalAuth.inputEmailPlaceholder","")}`,
                                })}
                                onChange={e => updateEmail(e)}
                            />
                            {errors.email && <p className="form_error">{errors.email.message}</p>}
                        </div>
                        <div className="modal-input">
                            <input
                                data-testid="element"
                                id="modal-auth__password"
                                type="password"
                                className="input"
                                placeholder={t("modals.modalAuth.inputPasswordPlaceholder","")}
                                name="password"
                                value={password}
                                ref={register({
                                    required: `{t("modals.modalAuth.inputPasswordError","")}`,
                                })}
                                onChange={updatePassword}
                            />
                            {errors.email && <p className="form_error">{errors.email.message}</p>}
                        </div>
                        {answerError && <p className="form_error">
                            {t("modals.modalAuth.answerError","")}
                        </p>}

                        <div className="modal-button_block">
                            <button type="submit" className="btn" data-testid="element">
                                {t("modals.modalAuth.btnSubmit","")}
                            </button>
                        </div>

                        <div className="modal-button_block">
                            <div className="btn-empty" onClick={() => newModal("registration")}>
                                {t("modals.modalAuth.btnRegistration","")}
                            </div>
                        </div>
                        <div className="modal-button_line">
                            <div className="btnLink" onClick={() => newModal("recovery-password")}>
                                {t("modals.modalAuth.btnRecovery-password","")}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ModalAuth);
