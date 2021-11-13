import React from "react";
import { searchAPI } from "../api/api";
import { Redirect,useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData, setVisibleTypeModal } from "../redux/user";
//import { useRouteMatch } from "react-router-dom";

const useCount = () => {
    const [seconds, setSeconds] = React.useState(5);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((seconds) => seconds - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return { seconds };
};

function Verify() {
    const count = useCount();
    const [token, setToken] = React.useState("");
    const dispatch = useDispatch();

    const { param } = useParams<{ param: string }>()
   // const param = useParams<{ param: string }>().param
    let urlToken = param;
    //let urlToken = useRouteMatch().params.param;

    React.useEffect(() => {
        setToken(urlToken);
        if (token) {
            searchAPI
                .getVerifyEmail(token)
                .then((response) => {
                    if (response.status === 200) {
                        const userData = { ...response.data };
                        delete userData.token;
                        dispatch(setUserData(userData));
                        dispatch(setVisibleTypeModal("profile"));
                        localStorage.setItem("auth_identity_token", response.data.token);
                    }
                })
                .catch((error) => {
                    //console.log("getVerifyEmail ERROR", error);
                    //console.log("getVerifyEmail ERROR.response", error.response);
                });
        }
    }, [token, urlToken, dispatch]);

    return (
        <div className="wrapper">
            <div className="main">
                <h1>Ваша почта подтверждена</h1>
                {token && (
                    <div className="verify_count">
                        {count.seconds === 0 ? <Redirect to={"/"} /> : count.seconds}
                    </div>
                )}
            </div>
        </div>
    );
}

export default React.memo(Verify);
