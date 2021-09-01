import React from "react";
import "./styleResultsContent.css";
//import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ResultsElem from "./ResultsElem";
import LoadingGeneral from "./LoadingGeneral";
import ResultsElemImages from "./ResultsElemImages";
import ResultsElemVideos from "./ResultsElemVideos";
import { searchAPI } from "../../api/api";
import { setStartSearch, setChoiceCountry } from "../../redux/form";
import { setResultSearch } from "../../redux/result";
import {useAppDispatch, useAppSelector} from "../../redux/store";

interface ErrorAnswer {
    status: number,
    response: string,
}


function ResultsContent() {

    const { filter, aggregate, languages, form, user, result } = useAppSelector(store => store);

    const { searchCategory } = filter;
    const {
        selectedEngine,
        selectedCountry,
        dataEngines,
    } = aggregate;
    const { selectedLanguage } = languages;
    const { startSearch, searchQuery } = form;
    const { userData } = user;
    const { resultSearch } = result;

    const [loading, setLoading] = React.useState<boolean>(false);
    const [errorAnswer, setErrorAnswer] = React.useState<ErrorAnswer | null>(null);
    const dispatch = useAppDispatch();
    const history = useHistory();

    const isUnmountedRef = React.useRef(false);

    React.useEffect(() => {
        // after mount
        return () => {
            // after unmount
            isUnmountedRef.current = true;
        }
    }, []);

    React.useEffect(() => {
        if (history.location.pathname === "/cabinet") {
            dispatch(setResultSearch(null));
        }
    }, [dispatch,history.location.pathname]);

    React.useEffect(() => {
        if (startSearch && searchQuery && selectedEngine && searchCategory) {
            dispatch(setStartSearch(false));
            dispatch(setResultSearch(null));
            setErrorAnswer(null);
            setLoading(true);
            const categoriesData = [searchCategory];
            const userEmail = userData ? userData.email : -1;
            const params = {
                data: {
                    engine: selectedEngine.name,
                    query: searchQuery,
                    categories: categoriesData,
                    country: selectedCountry && selectedCountry.name,
                    from_lang: selectedLanguage && selectedLanguage.id,
                    to_lang: dataEngines.langs,
                    user_email: userEmail,
                    user_data: Object.assign(navigator),
                },
            };

            console.log("params", params);
            dispatch(setChoiceCountry(selectedCountry && selectedCountry.name));

            if (isUnmountedRef.current) return;

            searchAPI
                .getReques(params, dataEngines.farhub)
                .then((response) => {
                    if (response.status === 200) {
                        if (isUnmountedRef.current) return;

                        const resultData = {
                            general: null,
                            images: null,
                            videos: null,
                        };
                        switch (searchCategory) {
                            case "general":
                                resultData.general = response.data.general;
                                break;
                            case "images":
                                resultData.images = response.data.images;
                                break;
                            case "videos":
                                resultData.videos = response.data[searchCategory];
                                break;
                            default:
                                break;
                        }

                        setLoading(false);
                        dispatch(setResultSearch(resultData));
                    }
                })
                .catch((error) => {
                    console.log("error", error);
                    if (error.response) {
                        const err = {
                            status: error.response.status,
                            response: JSON.stringify(error.response.request.response),
                        };
                        setErrorAnswer(err);
                        setLoading(false);
                        console.log(error.response);
                    }
                    return null;
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startSearch, searchQuery, selectedEngine, searchCategory]);

    const loader = () => {
        switch (searchCategory) {
            case "images":
                return <LoadingGeneral />;
            case "videos":
                return <LoadingGeneral />;
            case "general":
                const loadElem = [];
                for (let i = 0; i < 10; i++) {
                    loadElem.push(<LoadingGeneral key={`loadingGeneral_${i}`} />);
                }
                return loadElem;
            default:
                break;
        }
    };

    function renderSwitch() {
        if (searchCategory) {
            switch (searchCategory) {
                case "images":
                    return (
                        <div className="results-content_images">
                            <ResultsElemImages {...resultSearch.images} />
                        </div>
                    );
                case "videos":
                    return (
                        <div className="results-content_videos">
                            {resultSearch.videos &&
                            resultSearch.videos.map((elem:any, i:number) => (
                                    <ResultsElemVideos
                                        key={`results-elem_videos__${i}`}
                                        keyId={i}
                                        {...elem}
                                    />
                                ))}
                        </div>
                    );
                case "general":
                    return (
                        <div className="results-general">
                            {resultSearch.general &&
                            resultSearch.general.map((elem:any, i:number) => (
                                    <ResultsElem key={`results-elem__${i}`} keyId={i} {...elem} />
                                ))}
                        </div>
                    );
                default:
                    break;
            }
        }
    }
console.log(resultSearch)
    return (
        <div className="results-content">
            {resultSearch && renderSwitch()}
            {loading && <div className="results-loading">{loader()}</div>}
            {errorAnswer && (
                <p>
                    Что-то пошло не так, код
                    {errorAnswer.status}
                    <br />
                    {errorAnswer.response}
                </p>
            )}
        </div>
    );
}

export default React.memo(ResultsContent);
