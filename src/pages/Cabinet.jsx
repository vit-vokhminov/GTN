import React from "react";
import "./stylePages/styleCabinet.css";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { HeaderCabinet, Footer } from "../components";

import { Main } from "./CabinetContent";
import CabinetSidebar from "./CabinetContent/CabinetSidebar";
import Personal from "./CabinetContent/Personal";
import TariffPlans from "./CabinetContent/TariffPlans";
import ProfileSettings from "./CabinetContent/ProfileSettings";
import Suggestions from "./CabinetContent/Suggestions";
import {
    IconCabinetMyProfile,
    IconCabinetTable,
    IconCabinetDoc,
    IconCabinetSettings,
} from "../images";

const TabContent = ({ content }) => <div className="cabinetTabContent">{content}</div>;
const pages = [
    { title: "Личный кабинет", content: <Personal />, icon: IconCabinetMyProfile },
    { title: "Тарифные планы", content: <TariffPlans />, icon: IconCabinetTable },
    { title: "Настройки профиля", content: <ProfileSettings />, icon: IconCabinetDoc },
    { title: "Пожелания и предложения", content: <Suggestions />, icon: IconCabinetSettings },
];

function Cabinet() {
    const [tabActive, setTabActive] = React.useState(0);
    const [menuBt, setMenuBt] = React.useState(false);
    const { userData } = useSelector(({ settings }) => settings);

    if (!localStorage.getItem("auth_identity_token") || !userData) {
        return <Redirect to={"/"} />;
    }

    const openTab = (e) => setTabActive(+e.target.dataset.index);
    const openTabFromSidebar = (e) => {
        setMenuBt(false);
        setTabActive(+e.target.dataset.index);
    };

    const handleSidebar = () => {
        setMenuBt(!menuBt);
    };

    return (
        <div className="wrapper wrapper-cabinet">
            <HeaderCabinet menuBt={menuBt} handleSidebar={handleSidebar} />

            <div className="cabinet_main">
                <CabinetSidebar
                    pages={pages}
                    handleSidebar={handleSidebar}
                    menuBt={menuBt}
                    tabActive={tabActive}
                    openTabFromSidebar={openTabFromSidebar}
                />
                <Main
                    pages={pages}
                    TabContent={TabContent}
                    tabActive={tabActive}
                    openTab={openTab}
                />
            </div>

            <Footer />
        </div>
    );
}

export default Cabinet;
