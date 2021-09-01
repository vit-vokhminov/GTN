import React from "react";
import "./styleHeader.css";
import { useSelector, useDispatch } from "react-redux";
import { setVisiblePopupLanguage } from "../../redux/actions/popup";
import { ReactSVG, IconTriangle } from "../../images";

function ChoiceLanguage() {
    const dispatch = useDispatch();
    const { selectedLanguage } = useSelector(({ filter }) => filter);

    function openModalLanguage() {
        document.body.style.paddingRight = `${
            window.innerWidth - document.documentElement.clientWidth
        }px`;
        document.body.style.overflow = "hidden";
        dispatch(setVisiblePopupLanguage(true));
    }

    return (
        <div className="lang_choice_wrap">
            {selectedLanguage && (
                <div className="lang_choice" onClick={() => openModalLanguage()}>
                    <p>{selectedLanguage.acronym.toUpperCase()}</p>
                    <ReactSVG src={IconTriangle} className="icon_triangle" />
                </div>
            )}
        </div>
    );
}

export default React.memo(ChoiceLanguage);
