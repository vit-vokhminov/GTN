import React from "react";
import "./styleModals.css";
import { ReactSVG, IconModalProfile, IconModalCalendar } from "../../images";
import { useSelector } from "react-redux";

const ModalProfile = ({ refModal }) => {
    const { userData } = useSelector(({ settings }) => settings);

    return (
        <div id="modal-profile" className="modal" ref={refModal}>
            <div className="modal-content">
                <div className="modal-profile_block">
                    <div className="modal-profile_line">
                        <div className="modal-profile_icon" style={{ top: "0px" }}>
                            <div className="profile_icon">{userData && userData.name[0]}</div>
                        </div>
                        <div className="modal-profile_data">
                            <div className="modal-profile_data_title">
                                {userData && userData.name}
                            </div>
                            <div className="modal-profile_data_text">
                                {userData && userData.email}
                            </div>
                        </div>
                    </div>
                    <div className="modal-profile_line">
                        <div className="modal-profile_icon" style={{ top: "1px" }}>
                            <ReactSVG
                                src={IconModalProfile}
                                className="modal-profile_icon_profile"
                            />
                        </div>
                        <div className="modal-profile_data">
                            <div className="modal-profile_data_text">Мой профиль</div>
                        </div>
                    </div>
                    <div className="modal-profile_line">
                        <div className="modal-profile_icon" style={{ top: "2px" }}>
                            <ReactSVG
                                src={IconModalCalendar}
                                className="modal-profile_icon_calendar"
                            />
                        </div>
                        <div className="modal-profile_data">
                            <div className="modal-profile_data_title">На вашем тарифном плане</div>
                            <div className="modal-profile_data_text">осталось 12 дней</div>
                        </div>
                    </div>
                </div>
                <div className="modal-button_block">
                    <div className="btn">Выйти из профиля</div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ModalProfile);
