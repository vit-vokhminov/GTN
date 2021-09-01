import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { setVisiblePopupLanguage } from "../../redux/popup";
import { setSelectedLanguage } from "../../redux/languages";
import { ReactSVG, IconCloseInp, IconSearchGrey } from "../../images";

function PopupLanguageSelected(props) {
    const { handleOutsideClick, closePopup, liveSearch, changeLanguage, t, i18n } = props;

    // const [valTranslateQuery, setValTranslateQuery] = React.useState(false);
    // const [valTranslateResults, setValTranslateResults] = React.useState(false);
    const [sortTranslation, setSortTranslation] = React.useState(null);

    const { openPopupLanguage } = useSelector(({ popup }) => popup);
    const { language, selectedLanguage } = useSelector(({ languages }) => languages);

    const dispatch = useDispatch();
    const refCountries = React.useRef(null);
    const refInputSearch = React.useRef(null);
    const popup_content = React.useRef(null);

    const checkLanguage = (idkey, elem) => {
        if(idkey !== selectedLanguage.id){
            const acronym = idkey.split("_")[0];
            const SLang = {
                id: idkey,
                acronym,
                browserLang: navigator.language,
                name: elem.name,
                icon: elem.icon,
            };

            changeLanguage(acronym);
            dispatch(setSelectedLanguage(SLang));
            closePopup(setVisiblePopupLanguage);
            const refreshId = setInterval(() => {
                if (acronym === i18n.language) {
                    clearInterval(refreshId);
                    sortByTranslation();
                    refInputSearch.current.value = "";
                    liveSearch(null, refCountries);
                }
            }, 10);
        }
    };

    const sortByTranslation = () => {
        const sortable = [];
        for (const key in language) {
            sortable.push([key, t(`languages.${key}`)]);
        }

        sortable.sort((a, b) => (a[1] > b[1] ? 1 : -1));

        const sortElements = {};
        sortable.map((elem) => (sortElements[elem[0]] = elem[1]));
        setSortTranslation(sortElements);
    };

    React.useEffect(() => {
        if (language && selectedLanguage) {
            const { acronym } = selectedLanguage;
            const refreshId = setInterval(() => {
                if (acronym === i18n.language) {

                    sortByTranslation();
                    clearInterval(refreshId);
                }
            }, 110);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language, selectedLanguage]);

    return (
        <div
            className={classNames("popup popup-language", {
                open: openPopupLanguage,
            })}
            onClick={(event) =>
                handleOutsideClick(event.nativeEvent, popup_content, setVisiblePopupLanguage)
            }
        >
            <div className="popup-body">
                <div className="popup-main" ref={popup_content}>
                    <div
                        className="popup_close"
                        onClick={() => closePopup(setVisiblePopupLanguage)}
                    >
                        <ReactSVG src={IconCloseInp} />
                    </div>

                    <div className="popup_content">
                        <div className="popup_content_top">
                            <div className="popup_content_search">
                                <input
                                    type="text"
                                    name="s_lang"
                                    placeholder={t("popups.langPlaceholder")}
                                    onChange={(e) => liveSearch(e, refCountries)}
                                    ref={refInputSearch}
                                />
                                <ReactSVG src={IconSearchGrey} className="icon_search" />
                            </div>
                        </div>
                        <div className="popup_content_row">
                            <Scrollbars
                                autoHide
                                renderTrackVertical={(props) => (
                                    <div {...props} className="track-vertical" />
                                )}
                                renderView={(props) => <div {...props} className="view" />}
                                renderThumbVertical={(props) => (
                                    <div {...props} className="thumb-vertical" />
                                )}
                            >
                                <div className="view_row" ref={refCountries}>
                                    {sortTranslation &&
                                        Object.keys(sortTranslation).map((elem, i) => {
                                            return (
                                                <div
                                                    className={`popup_content_elem lang ${elem}`}
                                                    key={i}
                                                    onClick={() => {
                                                        checkLanguage(elem, sortTranslation[elem]);
                                                    }}
                                                >
                                                    <div className="popup_content_elem_main">
                                                        <img src={language[elem].icon} alt="" />
                                                        <span className="lang">
                                                            {sortTranslation[elem]}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                            </Scrollbars>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(PopupLanguageSelected);
