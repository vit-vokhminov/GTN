import React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { Scrollbars } from "react-custom-scrollbars";
import { setVisiblePopupCountry } from "../../redux/popup";
import { setSelectedEngine, setSelectedCountry, setDataEngines } from "../../redux/aggregate";
import { ReactSVG, IconCloseInp, IconSearchGrey, IconMarkerPopup } from "../../images";
import { searchAPI } from "../../api/api";

// interface SortableType = {
//     name: string,
//     acr: string,
//     icon: string,
//     translation: string,
// }

const PopupCountrySelected = (props) => {
    const { handleOutsideClick, closePopup, liveSearch, t, i18n } = props;

    const [sortTranslation, setSortTranslation] = React.useState(null);

    const refCountries = React.useRef(null);
    const refInputSearch = React.useRef(null);
    const popup_content = React.useRef(null);

    const { openPopupCountry } = useSelector(({ popup }) => popup);
    const { countries } = useSelector(({ aggregate }) => aggregate);
    const { selectedLanguage } = useSelector(({ languages }) => languages);
    const dispatch = useDispatch();

    // TS country: SortableType
    function checkCountry(country) {
        dispatch(setSelectedCountry(country));

        searchAPI
            .getAggregators(country.name)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setDataEngines(response.data));
                    console.log('Object.values(response.data.engines)[0].name',Object.values(response.data.engines)[0].name)
                    dispatch(setSelectedEngine(Object.values(response.data.engines)[0].name)); // TS string
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    console.log(error.response.data);
                }
            });
        closePopup(setVisiblePopupCountry);
    }

    React.useEffect(() => {
        if (countries && selectedLanguage) {
            const refreshId = setInterval(() => {
                if (selectedLanguage.acronym === i18n.language) {
                    const sortable = [];
// TS sortable: SortableType
                    Object.keys(countries).map((elem) =>
                        sortable.push({
                            name: elem,
                            acr: countries[elem].acr,
                            icon: countries[elem].icon,
                            translation: t(`country.${elem}`),
                        })
                    );

                    clearInterval(refreshId);
                    sortable.sort((a, b) => (a.translation > b.translation ? 1 : -1));
                    setSortTranslation(sortable);
                }
            }, 10);
        }
    }, [countries, selectedLanguage, t, i18n]);

    return (
        <div
            className={classNames("popup popup-country", {
                open: openPopupCountry,
            })}
            onClick={(event) =>
                handleOutsideClick(event.nativeEvent, popup_content, setVisiblePopupCountry)
            }
        >
            <div className="popup-body">
                <div className="popup-main" ref={popup_content}>
                    <div
                        className="popup_close"
                        onClick={() => closePopup(setVisiblePopupCountry)}
                    >
                        <ReactSVG src={IconCloseInp} />
                    </div>

                    <div className="popup_description">
                        <ReactSVG src={IconMarkerPopup} />
                        <p>
                            Выберете страну, в интернет - пространстве которой, вы хотели бы
                            оказаться.
                        </p>
                    </div>

                    <div className="popup_content">
                        <div className="popup_content_top">
                            <div className="popup_content_search">
                                <input
                                    type="text"
                                    name="s_lang"
                                    placeholder={t("popups.langCountry")}
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
                                        sortTranslation.map((elem, i) => (
                                            <div
                                                className={`popup_content_elem country ${elem.name}`}
                                                key={i}
                                                onClick={() => {
                                                    checkCountry(elem);
                                                }}
                                            >
                                                <div className="popup_content_elem_main">
                                                    <img src={elem.icon} alt="" />
                                                    <span className="lang">{elem.translation}</span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </Scrollbars>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(PopupCountrySelected);
