import React from "react";
import { useParams, useHistory } from "react-router-dom";
//import { searchAPI } from "../api/api";

function Verify(props) {
    const token = useParams();
    //localStorage.setItem("auth_identity_token", token);
    console.log("Verify props", props);
    console.log("useParams().token", token);
    //const [count, setCount] = React.useState(5);
    const history = useHistory();
    console.log("Verify history", history);
    // React.useEffect(() => {
    //     const token = useParams();
    //     console.log("useEffect token", token);
    // }, []);

    // searchAPI
    //     .getVerifyEmail(token)
    //     .then((response) => {
    //         if (response.status === 200) {
    //             //console.log(response.data)
    //             setTimeout(function () {
    //                 setCount(count - 1);
    //                 if (count === 1) {
    //                     props.history.push("/");
    //                 }
    //             }, 1000);
    //         }
    //     })
    //     .catch((error) => {
    //         //console.log(error);
    //     });

    return (
        <div className="wrapper">
            <div className="main">
                <h1>Ваша почта подтверждена</h1>
                <div className="verify_count">{111}</div>
            </div>
        </div>
    );
}

export default Verify;
