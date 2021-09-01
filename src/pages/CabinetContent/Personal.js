import React from "react";
import { useSelector } from "react-redux";

function Personal() {
    const { userData } = useSelector(({ user }) => user);

    return (
        <div className="cabinet_personal">
            <div className="cabinet_personal__top">
                <div className="cabinet_personal__top_logo">
                    <div className="cabinet_personal__top_logo_wrap">
                        <span>{userData && userData.name[0]}</span>
                    </div>
                </div>
                <div className="cabinet_personal__top_data">
                    <div className="cabinet_personal_data__title">{userData && userData.name}</div>
                    <div className="cabinet_personal_data__email">{userData && userData.email}</div>
                </div>
            </div>
            <div className="cabinet_personal__cont">
                <div className="cabinet_personal__cont__line">
                    <div className="personal_data__left">Длительность вашего тарифа:</div>
                    <div className="personal_data__right">{userData && userData.plan} дней</div>
                </div>
                <div className="cabinet_personal__cont__line">
                    <div className="personal_data__left">Дата продления:</div>
                    <div className="personal_data__right">15 августа </div>
                </div>
                <div className="cabinet_personal__cont__line">
                    <div className="personal_data__left">Использовать на:</div>
                    <div className="personal_data__right">Windows</div>
                </div>
                <div className="cabinet_personal__cont__line">
                    <div className="personal_data__left">Все данные юзера</div>
                    <div className="personal_data__right">
                        {userData && (
                            <>
                                <p>balance: {userData.balance}</p>
                                <p>create_date: {userData.create_date}</p>
                                <p>email: {userData.email}</p>
                                <p>name: {userData.name}</p>
                                <p>pk: {userData.pk}</p>
                                <p>plan: {userData.plan}</p>
                                <p>status: {userData.status}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <button className="btn">Изменить тариф</button>
        </div>
    );
}

export default Personal;
