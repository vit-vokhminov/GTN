import React from "react";
import "./styleModals.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { searchAPI } from "../../api/api";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/user";

const ModalRegister = ({ refModal, newModal }) => {
    const popup_content = React.useRef(null);
    const dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm({});
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

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

    function onSubmitForm(data) {
        // await searchAPI
        //     .getIp()
        //     .then((response) => {
        //         if (response.status === 200) {
        //             data.ip = response.data.ip;
        //         }
        //     })
        //     .catch((error) => {
        //         if (error.response) {
        //             console.log("getIp error", error);
        //         }
        //     });
        data.ip = "127.0.0.1";
        searchAPI
            .getRegistration(data)
            .then((response) => {
                if (response.status === 201) {
                    searchAPI
                        .getSendEmail(data.email)
                        .then((response) => {
                            if (response.status === 200) {
                                newModal("thanks");
                            }
                        })
                        .catch((error) => {
                            if (error.response) {
                                //console.log("getSendEmail error", error);
                            }
                        });
                    const userData = { ...response.data };
                    delete userData.token;
                    dispatch(setUserData(userData));
                    localStorage.setItem("auth_identity_token", response.data.token);
                }
            })
            .catch((error) => {
                if (error.response) {
                    //console.log("getRegistration error", error);
                }
            });
    }

    React.useEffect(() => {
        if (
            username &&
            email &&
            password !== "" &&
            confirmPassword !== "" &&
            password === confirmPassword
        ) {
            //setBtnInactive(false);
        } else {
            //setBtnInactive(true);
        }
    }, [username, email, password, confirmPassword]);

    return (
        <div id="modal-register" className="modal" ref={refModal}>
            <div className="modal-content" ref={popup_content}>
                <div className="modal-form">
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <div className="modal__title">??????????????????????</div>

                        <div className="modal-input">
                            <input
                                type="text"
                                className="input"
                                placeholder="???????? ??????"
                                value={username}
                                name="name"
                                ref={register({
                                    required: "?????????????? ???????? ??????",
                                })}
                                onChange={updateUsername}
                            />
                            {errors.username && (
                                <p className="form_error">{errors.username.message}</p>
                            )}
                        </div>
                        <div className="modal-input">
                            <input
                                type="email"
                                className="input"
                                placeholder="?????? e-mail"
                                value={email}
                                name="email"
                                ref={register({
                                    required: "?????????????? ?????? e-mail",
                                })}
                                onChange={updateEmail}
                            />
                            {errors.email && <p className="form_error">{errors.email.message}</p>}
                        </div>
                        <div className="modal-input">
                            <input
                                type="password"
                                className="input"
                                placeholder="?????? ????????????"
                                value={password}
                                name="password"
                                ref={register({
                                    required: "?????????????? ?????? ????????????",
                                })}
                                onChange={updatePassword}
                            />
                            {errors.password && (
                                <p className="form_error">{errors.password.message}</p>
                            )}
                        </div>
                        <div className="modal-input">
                            <input
                                type="password"
                                className="input"
                                placeholder="?????????????????? ????????????"
                                value={confirmPassword}
                                name="confirmPassword"
                                // ref={register({
                                //     required: "?????????????????? ????????????",
                                // })}
                                onBlur={updateCheckPassword}
                                onChange={updateConfirmPassword}
                            />
                            {checkPassword && <p className="form_error">???????????? ???? ??????????????????</p>}
                        </div>

                        <div className="modal-button_block">
                            <button type="submit" className="btn">
                                ????????????????????????????????????
                            </button>
                        </div>
                        <div className="modal-button_block">
                            <div className="btn-empty" onClick={() => newModal("authorization")}>
                                ??????????
                            </div>
                        </div>
                        <div className="register_privacy">
                            <p>
                                ?????????????????? ??????????, ???? ?????????? ???????????????? ???? ?????????????????? ?????????? ????????????????????????
                                ???????????? ?? ???????????????????????? ??&nbsp;
                                <Link to="information/privacy-policy">
                                    ?????????????????? ????????????????????????????????????.
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ModalRegister);
