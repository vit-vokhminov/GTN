import React from "react";
import {Route, Switch} from "react-router-dom";
import {
    Home,
    Search,
    Verify,
    NotFound,
    Cabinet,
    Information
} from "./pages";
import {searchAPI} from "./api/api";
import {setUserData, setVisibleTypeModal} from "./redux/user";
import {useAppDispatch} from "./redux/store";

const App = () => {

    const dispatch = useAppDispatch();

    if (localStorage.getItem("auth_identity_token")) {
        const identificationUser = {
            token: localStorage.getItem("auth_identity_token"),
            ip: "127.0.0.1",
        };
        searchAPI
            .getUser(identificationUser)
            .then((response) => {
                if (response.status === 200) {
                    const userData = {...response.data};
                    delete userData.token;
                    dispatch(setUserData(userData));
                    dispatch(setVisibleTypeModal("profile"));
                    localStorage.setItem("auth_identity_token", response.data.token);
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log("Токен был просрочен. Данные пользователя стерты. Токен удалён.");
                    console.log("getUser error", error);
                    console.log("getUser error.response", error.response);
                    localStorage.removeItem("auth_identity_token");
                    dispatch(setUserData(null));
                    dispatch(setVisibleTypeModal("authorization"));
                }
            });
    }


    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/search" component={Search}/>
                <Route path="/cabinet" component={Cabinet}/>
                <Route path="/verify/:param" component={Verify}/>
                <Route path="/information" component={Information}/>
                {/*<Route path="/reset_pwd_email/:token" component={RecoveryPassword} />*/}
                {/* <Route path="/info" component={Info} /> */}

                <Route component={NotFound}/>
            </Switch>

        </div>
    );
};

export default App;
