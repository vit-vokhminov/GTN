import React, {FC} from "react";
import "./styleHeader.css";
import { ReactSVG, IconLogin, IconLoginMobile } from "../../images";
import { setVisibleTypeModal } from "../../redux/user";
import {
    ModalAuth,
    ModalRegister,
    ModalProfile,
    ModalRecoveryPassword,
    ModalThanks,
} from "../Modals";
import {handleOutside} from "../../utils";
import {useWindowSize} from 'react-use';
import {useAppDispatch, useAppSelector} from "../../redux/store";


function BtnLogin() {

    const dispatch = useAppDispatch();

    const {width} = useWindowSize();

    const { userData, typeModal } = useAppSelector(store => store.user);

    const [visibleModal, setVisibleModal] = React.useState(false);
    const handleVisibleModal = () => {
        if (typeModal === "thanks") dispatch(setVisibleTypeModal("profile"));
        setVisibleModal(!visibleModal);
    };

    const newModal = (modalVue:string) => {
        document.body.removeEventListener("click", handleOutsideClick);
        dispatch(setVisibleTypeModal(modalVue));
    };

    React.useEffect(() => {
        document.body.addEventListener("click", handleOutsideClick);
        return () => {
            document.body.removeEventListener("click", handleOutsideClick);
        };
    }, [typeModal, visibleModal]);

    const refBtnProfile = React.useRef<HTMLButtonElement | null>(null);
    const refModal = React.useRef<FC | null>(null);

    const handleOutsideClick = (event:MouseEvent) => {
        const result = handleOutside(event, refModal, refBtnProfile);
        if (result === false) {
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
                        {width >= 1024 && (
                            <ReactSVG src={IconLogin} className="icon_login" />
                        )}
                        {width < 1024 && (
                            <ReactSVG src={IconLoginMobile} className="icon_login" />
                        )}
                    </button>
                </>
            );
        }
    };

    const ModalVue = () => {
        if (typeModal === "authorization") {
            return <ModalAuth refModal={refModal} newModal={newModal} />;
        }
        if (typeModal === "registration") {
            return <ModalRegister refModal={refModal} newModal={newModal} />;
        }
        if (typeModal === "profile") {
            return <ModalProfile refModal={refModal} />;
        }
        if (typeModal === "recovery-password") {
            return <ModalRecoveryPassword refModal={refModal} newModal={newModal} />;
        }
        if (typeModal === "thanks") {
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
