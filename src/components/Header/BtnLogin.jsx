import React from "react";
import "./styleHeader.css";
import { useSelector } from "react-redux";
import { ReactSVG, IconLogin, IconLoginMobile } from "../../images";
import {
    ModalAuth,
    ModalRegister,
    ModalProfile,
    ModalRecoveryPassword,
    ModalThanks,
} from "../Modals";

function BtnLogin() {
    const { registrToken, windowSize, userData } = useSelector(({ settings }) => settings);

    const [modal, setModal] = React.useState("registration");

    const [visibleModal, setVisibleModal] = React.useState(false);
    const handleVisibleModal = () => {
        if (modal === "thanks") setModal("profile");
        setVisibleModal(!visibleModal);
    };

    const newModal = (modalVue) => {
        document.body.removeEventListener("click", handleOutsideClick);
        setModal(modalVue);
    };

    React.useEffect(() => {
        document.body.addEventListener("click", handleOutsideClick);
        return () => {
            document.body.removeEventListener("click", handleOutsideClick);
        };
    }, [modal, visibleModal]);

    const refBtnProfile = React.useRef(null);
    const refModal = React.useRef(null);

    const handleOutsideClick = (event) => {
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(refModal.current) && !path.includes(refBtnProfile.current)) {
            setVisibleModal(false);
        }
    };

    const vievHeaderMain = () => {
        if (localStorage.getItem("auth_identity_token")) {
            return (
                <button
                    className="bt_icon_active"
                    onClick={() => handleVisibleModal()}
                    ref={refBtnProfile}
                >
                    <span>{userData && userData.name[0]}</span>
                </button>
            );
        } else {
            return (
                <>
                    <button
                        className="bt_icon"
                        onClick={() => handleVisibleModal()}
                        ref={refBtnProfile}
                    >
                        {windowSize && windowSize[0] >= 1024 && (
                            <ReactSVG src={IconLogin} className="icon_login" />
                        )}
                        {windowSize && windowSize[0] < 1024 && (
                            <ReactSVG src={IconLoginMobile} className="icon_login" />
                        )}
                    </button>
                </>
            );
        }
    };

    React.useEffect(() => {
        vievHeaderMain();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrToken]);

    const ModalVue = () => {
        if (modal === "authorization") {
            return <ModalAuth refModal={refModal} newModal={newModal} />;
        }
        if (modal === "registration") {
            return <ModalRegister refModal={refModal} newModal={newModal} />;
        }
        if (modal === "profile") {
            return <ModalProfile refModal={refModal} newModal={newModal} />;
        }
        if (modal === "recovery-password") {
            return <ModalRecoveryPassword refModal={refModal} newModal={newModal} />;
        }
        if (modal === "thanks") {
            return <ModalThanks refModal={refModal} setVisibleModal={setVisibleModal} />;
        }
    };

    return (
        <>
            {vievHeaderMain()}
            {visibleModal && ModalVue()}
        </>
    );
}

export default React.memo(BtnLogin);
