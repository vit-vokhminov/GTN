import React from "react";
import { useDispatch } from "react-redux";
import { setVisiblePopupPassword } from "../redux/actions/popup";
import { setResetToken } from "../redux/actions/settings";
//import {useParams} from "react-router-dom";

function RecoveryPassword() {
    const dispatch = useDispatch();
    const token = React.useParams().token;
    //const stableDispatch = React.useCallback(dispatch, [])

    React.useEffect(() => {
        dispatch(setResetToken(token));
        dispatch(setVisiblePopupPassword(true));
    }, [token, dispatch]);

    return (
        <div className="wrapper">
            <div className="main">Изменение пароля</div>
        </div>
    );
}

export default RecoveryPassword;
