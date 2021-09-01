import React from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
    Home,
    Search,
    Verify,
    RecoveryPassword,
    NotFound,
    Cabinet,
    //Info,
    Information,
    Test,
} from "./pages";
import { searchAPI } from "./api/api";
import {
    setLanguage,
    setSelectedLanguage,
    setSelectedEngine,
    setSelectedCountry,
    setCountries,
    setDataEngines,
} from "./redux/actions/filter";
import { setUserData, setWindowSize } from "./redux/actions/settings";
import { Popup } from "./components";

const App = () => {
    const { t, i18n } = useTranslation();
    const changeLanguage = React.useCallback(
        (language) => {
            i18n.changeLanguage(language);
        },
        [i18n]
    );
    const dispatch = useDispatch();

    React.useEffect(() => {
        searchAPI.getLangs().then((response) => {
            if (response.status === 200) {
                const browserLang = navigator.language.split("-")[0];

                changeLanguage(browserLang);

                function binarySearch(list, n) {
                    let start = 0;
                    let end = list.length;
                    while (start < end) {
                        const middle = Math.floor((start + end) / 2);
                        const value = list[middle];
                        if (value.match(browserLang)) {
                            return [list[middle], response.data[list[middle]]];
                        }
                        if (n < value) {
                            end = middle;
                        } else {
                            start = middle + 1;
                        }
                    }
                    return -1;
                }

                let lang = binarySearch(Object.keys(response.data), browserLang);

                const SLang = {
                    id: lang[0],
                    acronym: browserLang,
                    browserLang: navigator.language,
                    name: lang[1].name,
                    icon: lang[1].icon,
                };

                dispatch(setSelectedLanguage(SLang));
                dispatch(setLanguage(response.data));
            }
        });
    }, [changeLanguage, dispatch]);

    React.useLayoutEffect(() => {
        const vh = window.innerHeight / 100;
        document.documentElement.style.setProperty("--vh", `${vh}px`);

        function updateSize() {
            dispatch(setWindowSize([window.innerWidth, window.innerHeight]));
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, [dispatch]);

    if (localStorage.getItem("auth_identity_token")) {
        const identityUser = {
            token: localStorage.getItem("auth_identity_token"),
            ip: "127.0.0.1",
        };
        searchAPI
            .getUser(identityUser)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("auth_identity_token", response.data.auth_identity_token);
                    dispatch(setUserData(response.data.user));
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log("Токен был просрочен. Данные пользователя стерты. Токен удалён.");
                    console.log("getUser error", error);
                    console.log("getUser error.response", error.response);
                    localStorage.removeItem("auth_identity_token");
                    dispatch(setUserData(null));
                }
            });
    }

    React.useEffect(() => {
        searchAPI
            .getCountries()
            .then((response) => {
                if (response.status === 200) {
                    dispatch(
                        setSelectedCountry({
                            name: Object.keys(response.data)[0],
                            acr: Object.values(response.data)[0].acr,
                            icon: Object.values(response.data)[0].icon,
                            translation: t(`country.${Object.keys(response.data)[0]}`),
                        })
                    );
                    dispatch(setCountries(response.data));

                    searchAPI
                        .getAggregators(Object.keys(response.data)[0])
                        .then((response) => {
                            if (response.status === 200) {
                                dispatch(setDataEngines(response.data));
                                dispatch(
                                    setSelectedEngine(Object.values(response.data.engines)[0].name)
                                );
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            if (error.response) {
                                console.log(error.response.data);
                            }
                        });
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    console.log(error.response.data);
                }
            });
    }, [dispatch, t]);

    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/search" component={Search} />
                <Route path="/cabinet" component={Cabinet} />
                <Route path="/verify/" component={Verify} />
                <Route path="/reset_pwd_email/:token" component={RecoveryPassword} />
                {/* <Route path="/info" component={Info} /> */}
                <Route path="/information" component={Information} />
                <Route path="/test" component={Test} />

                <Route component={NotFound} />
            </Switch>

            <Popup />
        </div>
    );
};

export default React.memo(App);
