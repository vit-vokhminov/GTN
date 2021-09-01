import React from "react";
import "./styleHeader.css";
import {setVisiblePopupLanguage} from "../../redux/popup";
import { ReactSVG, IconTriangle } from "../../images";
import {Popup} from "../index";
import openPopup from "../../utils/openPopup";
import {useTranslation} from "react-i18next";
import {searchAPI} from "../../api/api";
import algorithmBinarySearch from "../../utils/algorithmBinarySearch";
import {setLanguage, setSelectedLanguage} from "../../redux/languages";
import {useAppDispatch, useAppSelector} from "../../redux/store";
//import {LanguagesType} from "../../redux/reducers/languages";

function ChoiceLanguage() {

    const dispatch = useAppDispatch();
    const selectedLanguage = useAppSelector(store => store.languages.selectedLanguage);

    const { i18n } = useTranslation();
    const changeLanguage = React.useCallback(
        (language) => {
            i18n.changeLanguage(language);
        },
        [i18n]
    );


    React.useEffect(() => {
        searchAPI.getLangs().then((response) => {
            if (response.status === 200) {
                const browserLang = navigator.language.split("-")[0] || 'en';
                changeLanguage(browserLang);

                let lang: any = algorithmBinarySearch(response.data.data, browserLang);

                const SLang = {
                    id: lang[0],
                    acronym: browserLang,
                    browserLang: navigator.language,
                    name: lang[1].name,
                    icon: lang[1].icon,
                };
                dispatch(setSelectedLanguage(SLang));
                dispatch(setLanguage(response.data.data));
            }
        });
    }, [dispatch,changeLanguage]);

    return (
       <>
           {selectedLanguage &&
               <div className="lang_choice_wrap">
                   <div className="lang_choice" onClick={() => openPopup(dispatch,setVisiblePopupLanguage)}>
                       <p>{selectedLanguage.acronym.toUpperCase()}</p>
                       <ReactSVG src={IconTriangle} className="icon_triangle" />
                   </div>
               </div>
           }
           {selectedLanguage && <Popup illustrate={"languages"}/>}
       </>
    );
}

export default React.memo(ChoiceLanguage);
