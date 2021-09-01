import React from "react";
import { useForm } from "react-hook-form";

function Suggestions() {
    const { register, handleSubmit, errors } = useForm({});
    const [message, setMessage] = React.useState("");

    const enterMessage = (e) => {
        setMessage(e.target.value);
    };

    function onSubmitForm() {}

    return (
        <div className="cabinet_suggestions">
            <div className="cabinet_suggestions_title">
                <h2>Помогите нам стать лучше!</h2>
            </div>

            <p>
                Мы всегда открыты к диалогу и приветствуем любые идеи и критику. Напишите ваше
                мнение о сервисе и ваши предложения!
            </p>

            <form onSubmit={handleSubmit(onSubmitForm)}>
                <textarea
                    className="textarea"
                    placeholder="Введите сообщение"
                    value={message}
                    name="message"
                    ref={register({
                        required: "Введите сообщение",
                    })}
                    onChange={enterMessage}
                />
                {errors.message && <p className="form_error">{errors.message.message}</p>}

                <div className="btn-info_wrap">
                    <button type="submit" className="btn subscribe-now btn-border_g">
                        Отправить
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Suggestions;
