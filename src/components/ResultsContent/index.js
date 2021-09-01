import React from "react";
import "./styleResultsContent.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ResultsElem from "./ResultsElem";
import LoadingGeneral from "./LoadingGeneral";
import ResultsElemImages2 from "./ResultsElemImages2";
import ResultsElemVideos from "./ResultsElemVideos";
import { searchAPI } from "../../api/api";
import { setChoiceCountry } from "../../redux/actions/form";

function ResultsContent() {
    const {
        testTranslateQuery,
        testTranslateResults,
        selectedEngine,
        searchCategory,
        selectedCountry,
        selectedLanguage,
        dataEngines,
    } = useSelector(({ filter }) => filter);

    const { searchQuery, allowSearch } = useSelector(({ form }) => form);
    const { userData } = useSelector(({ settings }) => settings);

    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [errorAnswer, setErrorAnswer] = React.useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    React.useEffect(() => {
        if (history.location.pathname === "/cabinet") {
            setResult(null);
        }
    }, [history.location.pathname]);

    React.useEffect(() => {
        if (allowSearch && searchQuery && selectedEngine && searchCategory) {
            setErrorAnswer("");
            setResult(null);
            setLoading(true);
            const categoriesData = [searchCategory];
            const userEmail = userData ? userData.email : -1;
            const params = {
                data: {
                    engine: selectedEngine.name,
                    query: searchQuery,
                    categories: categoriesData,
                    country: selectedCountry.name,
                    from_lang: selectedLanguage.id,
                    to_lang: dataEngines.langs,
                    translate_query: testTranslateQuery,
                    translate_results: testTranslateResults,
                    user_email: userEmail,
                    user_data: Object.assign(navigator),
                },
            };

            console.log("params", params);
            dispatch(setChoiceCountry(selectedCountry.name));

            searchAPI
                .getReques(params, dataEngines.farhub)
                .then((response) => {
                    if (response.status === 200) {
                        console.log("search/find", response.data);
                        const resultData = {};
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
                        setResult(resultData);
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
    }, [allowSearch, searchQuery, selectedEngine, searchCategory]);

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
                            <ResultsElemImages2 {...result.images} />
                            {/* {(result.images && result.images.map((elem, i) =>{
                            <ResultsElemImages2 key={`results-elem_images__${i}`} keyId={i} {...elem} />
                        }))} */}
                        </div>
                    );
                case "videos":
                    return (
                        <div className="results-content_videos">
                            {result.videos &&
                                result.videos.map((elem, i) => (
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
                            {result.general &&
                                result.general.map((elem, i) => (
                                    <ResultsElem key={`results-elem__${i}`} keyId={i} {...elem} />
                                ))}
                        </div>
                    );
                default:
                    break;
            }
        }
    }

    return (
        <div className="results-content">
            {result && renderSwitch()}
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
