import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVisiblePopupCountry } from "../../redux/actions/popup";

function InputCountry() {
    const { selectedCountry } = useSelector(({ filter }) => filter);
    const dispatch = useDispatch();

    function openModalCountry() {
        document.body.style.paddingRight = `${
            window.innerWidth - document.documentElement.clientWidth
        }px`;
        document.body.style.overflow = "hidden";
        dispatch(setVisiblePopupCountry(true));
    }

    return (
        <div className="input-search_lang" onClick={() => openModalCountry()}>
            {selectedCountry && <img src={selectedCountry.icon} alt="" />}
            {selectedCountry && (
                <span data-country={selectedCountry.name}>{selectedCountry.acr}</span>
            )}
        </div>
    );
}

export default React.memo(InputCountry);
