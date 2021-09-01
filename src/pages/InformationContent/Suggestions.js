import React from "react";
import { useForm } from "react-hook-form";

function Suggestions({ pageSuggestionsRef, t }) {
    const { register, handleSubmit, errors } = useForm({});
    const [message, setMessage] = React.useState("");

    const enterMessage = (e) => {
        setMessage(e.target.value);
    };

    function onSubmitForm() {}

    return (
        <div className="info_content">
            <div
                className="info_block__line info_block__line_form"
                id="info_sug"
                ref={pageSuggestionsRef}
            >
                <div className="info_block__line__main">
                    <h2>{t("pageSuggestions.title")}</h2>

                    <div className="colum">
                        <div className="colum_elem">
                            <div className="info_block__line_txt">
                                <p className="info_block__line_title">
                                    <b>{t("pageSuggestions.txt1")}</b>
                                </p>

                                <p>{t("pageSuggestions.txt2")}</p>

                                <form onSubmit={handleSubmit(onSubmitForm)}>
                                    <textarea
                                        className="textarea"
                                        placeholder={t("pageSuggestions.textareaPlaceholder")}
                                        value={message}
                                        name="message"
                                        ref={register({
                                            required: t("pageSuggestions.textareaPlaceholder"),
                                        })}
                                        onChange={enterMessage}
                                    />
                                    {errors.message && (
                                        <p className="form_error">{errors.message.message}</p>
                                    )}

                                    <div className="btn-info_wrap">
                                        <button
                                            type="submit"
                                            className="btn subscribe-now btn-border_g"
                                        >
                                            {t("pageSuggestions.textareaBtn")}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="colum_elem"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Suggestions);
