import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import { setVisiblePopupLanguage } from "../../redux/actions/popup";
import { setSelectedLanguage, setTestSelect } from "../../redux/actions/filter";
import { ReactSVG, IconCloseInp, IconSearchGrey } from "../../images";

function PopupLanguageSelected(props) {
    const { handleOutsideClick, closePopup, liveSearch, changeLanguage, t, i18n } = props;

    // const [valTranslateQuery, setValTranslateQuery] = React.useState(false);
    // const [valTranslateResults, setValTranslateResults] = React.useState(false);
    const [sortTranslation, setSortTranslation] = React.useState(null);

    const { openPopupLanguage } = useSelector(({ popup }) => popup);
    const { language, selectedLanguage } = useSelector(({ filter }) => filter);
    const dispatch = useDispatch();
    const refCountries = React.useRef(null);
    const refInputSearch = React.useRef(null);
    const popup_content = React.useRef(null);

    const checkLanguage = (idkey, elem) => {
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
        if (language) {
            const a = Object.keys(language)[0];
            const b = language[Object.keys(language)[0]];
            const defaultTestSelect = {};
            defaultTestSelect[a] = b;
            dispatch(setTestSelect(defaultTestSelect));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);

    React.useEffect(() => {
        if (language && selectedLanguage) {
            const { acronym } = selectedLanguage;
            const refreshId = setInterval(() => {
                if (acronym === i18n.language) {
                    clearInterval(refreshId);
                    sortByTranslation();
                }
            }, 10);
        }
        // console.log('language',language)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language, selectedLanguage]);

    /* const checkSelect = (e) => {
        let selectVal = e.target.value.split('==');
        const acronym = selectVal[0].split('_')[0];
        const SelectLang = {
            'id': selectVal[0],
            'acronym': acronym.toUpperCase(),
            'name': selectVal[1],
            'icon': ''
        }
        dispatch(setTestSelect(SelectLang));
    }
    const handleTranslateQuery = () => {
        dispatch(setTranslateQuery(!valTranslateQuery));
        setValTranslateQuery(!valTranslateQuery);
    }
    const handleTranslateResults = () => {
        dispatch(setTranslateResults(!valTranslateResults));
        setValTranslateResults(!valTranslateResults)
    } */

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
                <div className="popup-content popup_modal_main" ref={popup_content}>
                    <div
                        className="popup_modal__close"
                        onClick={() => closePopup(setVisiblePopupLanguage)}
                    >
                        <ReactSVG src={IconCloseInp} />
                    </div>

                    {/* <div className="popup_description">
                        <ReactSVG src={IconMarkerPopup} />
                        <p>
                            Выберете страну, в интернет - пространстве которой вы хотели бы
                            оказаться.
                        </p>
                    </div> */}

                    <div className="popup_modal_cont">
                        <div className="popup_modal_top">
                            <div className="popup_modal_search">
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
                        <div className="popup_modal_row">
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
                                        Object.keys(sortTranslation).map((elem, i) => (
                                            <div
                                                className={`popup_modal_elem lang ${elem}`}
                                                key={i}
                                                onClick={() => {
                                                    checkLanguage(elem, sortTranslation[elem]);
                                                }}
                                            >
                                                <div className="popup_modal_elem_main">
                                                    <img src={language[elem].icon} alt="" />
                                                    <span className="lang">
                                                        {sortTranslation[elem]}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </Scrollbars>
                        </div>
                    </div>

                    {/* <div className="block__test_lang">
                <select onChange={(e)=> {checkSelect(e)}} defaultValue=''>
                    {
                        language && Object.keys(language).map((elem,i) => (
                            <option value={`${elem}==${language[elem]}`} key={i}>
                                {language[elem]}
                            </option>
                        ))
                    }
                </select>
                <br/><br/>
                <label htmlFor="translate__query" onChange={(e)=> {handleTranslateQuery(e)}}>
                    <input type="checkbox"
                           id="translate__query"
                           name="translate__query"
                           value={valTranslateQuery}/> translate_query
                </label>
                <br/><br/>
                <label htmlFor="translate__results" onChange={(e)=> {handleTranslateResults(e)}}>
                    <input type="checkbox"
                           id="translate__results"
                           name="translate__results"
                           value={valTranslateResults}/> translate_results
                </label>
            </div> */}
                </div>
            </div>
        </div>
    );
}

export default React.memo(PopupLanguageSelected);
