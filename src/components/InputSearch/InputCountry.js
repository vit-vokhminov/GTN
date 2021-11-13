import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVisiblePopupCountry } from "../../redux/popup";
import {Popup} from "../index";
import {openPopup} from "../../utils";
import {searchAPI} from "../../api/api";
import LoadingCountry from "./LoadingCountry";
import {setCountries, setDataEngines, setSelectedCountry, setSelectedEngine} from "../../redux/aggregate";
import {useTranslation} from "react-i18next";

function InputCountry() {
    const { selectedCountry } = useSelector(({ aggregate }) => aggregate);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    React.useEffect(() => {
        searchAPI
            .getCountries()
            .then((response) => {
                if (response.status === 200) {
                    dispatch(
                        setSelectedCountry({
                            name: Object.keys(response.data.data)[0],
                            acr: Object.values(response.data.data)[0].acr,
                            icon: Object.values(response.data.data)[0].icon,
                            translation: t(`country.${Object.keys(response.data.data)[0]}`),
                        })
                    );
                    dispatch(setCountries(response.data.data));
                    searchAPI
                        .getAggregators(Object.keys(response.data.data)[0])
                        .then((response) => {
                            if (response.status === 200) {
                                dispatch(setDataEngines(response.data.data));
                                dispatch(
                                    setSelectedEngine(Object.values(response.data.data.engines)[0].name)
                                );
                            }
                        })
                        .catch((error) => {
                            if (error.response) {
                                //console.log(error.response.data);
                            }
                        });
                }
            })
            .catch((error) => {
                if (error.response) {
                   //console.log(error.response.data);
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="input-search_country" onClick={() => openPopup(dispatch,setVisiblePopupCountry)}>
                {selectedCountry ?
                    <>
                        <img src={`/img/flags/${selectedCountry.icon}`} alt="" />
                        <span data-country={selectedCountry.name}>{selectedCountry.acr}</span>
                    </>
                    :
                    <LoadingCountry />
                }
            </div>
            <Popup illustrate={"countries"}/>
        </>
    );
}

export default React.memo(InputCountry);
