import React from "react";
import { useForm } from "react-hook-form";
import {useWindowSize} from 'react-use';

function ProfileSettings() {

    const {width} = useWindowSize();
    const { register, handleSubmit, errors } = useForm({});
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newPassword2, setNewPassword2] = React.useState("");
    const [agreement, setAgreement] = React.useState(false);

    const updateName = (e) => {
        setName(e.target.value);
    };
    const updateEmail = (e) => {
        setEmail(e.target.value);
    };
    const updateOldPassword = (e) => {
        setOldPassword(e.target.value);
    };
    const updateNewPassword = (e) => {
        setNewPassword(e.target.value);
    };
    const updateNewPassword2 = (e) => {
        setNewPassword2(e.target.value);
    };
    const updateAgreement = (e) => {
        setAgreement(e.target.checked);
    };

    function onSubmitForm(data) {}

    const agreementCheckbox = () => (
        <div className="profilesettings_elem">
            <div className="profilesettings-agreement">
                <input
                    type="checkbox"
                    id="profile-agreement"
                    name="profile-agreement"
                    value={agreement}
                    ref={register}
                    onChange={updateAgreement}
                />
                <label htmlFor="profile-agreement">
                    Получать информацию по текущим и новым продуктам и услугам компании на e-mail
                </label>
            </div>
        </div>
    );

    return (
        <div className="cabinet_profilesettings">
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <div className="profilesettings_block">
                    <div className="profilesettings_colum">
                        <div className="profilesettings_elem">
                            <p className="profilesettings_title">Имя</p>
                            <input
                                type="text"
                                className="input"
                                value={name}
                                name="name"
                                ref={register({
                                    required: "Поле не должно быть пустым",
                                })}
                                onChange={updateName}
                            />
                            {errors.name && <p className="form_error">{errors.name.message}</p>}
                        </div>
                        <div className="profilesettings_elem">
                            <p className="profilesettings_title">Email</p>
                            <input
                                type="email"
                                className="input"
                                value={email}
                                name="email"
                                ref={register({
                                    required: "Поле не должно быть пустым",
                                })}
                                onChange={updateEmail}
                            />
                            {errors.email && <p className="form_error">{errors.email.message}</p>}
                        </div>

                        {width > 440 && agreementCheckbox()}
                    </div>
                    <div className="profilesettings_colum">
                        <div className="profilesettings_elem">
                            <p className="profilesettings_title">Вы можете изменить пароль</p>
                            <input
                                type="password"
                                className="input"
                                name="oldPassword"
                                value={oldPassword}
                                ref={register({
                                    required: "Поле не должно быть пустым",
                                })}
                                onChange={updateOldPassword}
                            />
                            {errors.oldPassword && (
                                <p className="form_error">{errors.oldPassword.message}</p>
                            )}
                        </div>
                        <div className="profilesettings_elem">
                            <p className="profilesettings_title">Новый пароль</p>
                            <input
                                type="password"
                                className="input"
                                name="newPassword"
                                value={newPassword}
                                ref={register({
                                    required: "Введите ваш пароль",
                                })}
                                onChange={updateNewPassword}
                            />
                            {errors.newPassword && (
                                <p className="form_error">{errors.newPassword.message}</p>
                            )}
                        </div>
                        <div className="profilesettings_elem">
                            <p className="profilesettings_title">Повторить пароль</p>
                            <input
                                type="password"
                                className="input"
                                name="newPassword2"
                                value={newPassword2}
                                ref={register({
                                    required: "Повторите ваш пароль",
                                })}
                                onChange={updateNewPassword2}
                            />
                            {errors.newPassword2 && (
                                <p className="form_error">{errors.newPassword2.message}</p>
                            )}
                        </div>

                        {width <= 440 && agreementCheckbox()}

                        <div className="profilesettings_elem">
                            <br />
                            <button type="submit" className="btn">
                                Сохранить изменения
                            </button>
                        </div>
                        <div className="profilesettings_elem">
                            <button type="button" className="btn btn-border">
                                Отмена
                            </button>
                        </div>
                    </div>
                    <div className="profilesettings_colum">
                        <div className="profilesettings_elem deleteprofile">
                            <p className="profilesettings_title opasNone">Удалить профиль</p>

                            {width > 440 && (
                                <button type="submit" className="btn btn-border grey deleteprofile">
                                    Удалить профиль
                                </button>
                            )}
                            {width <= 440 && (
                                <button type="submit" className="deleteprofile">
                                    Удалить профиль
                                </button>
                            )}
                        </div>
                        <div className="profilesettings_elem">
                            {width > 440 && (
                                <p>
                                    Это приведет к безвозвратному удалению вашей учетной записи и
                                    всех ее данных. Вы не сможете повторно активировать эту учетную
                                    запись.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ProfileSettings;
