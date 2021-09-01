import React from "react";
import { ReactSVG, LogoGoTrueNet } from "../../images";

interface Props {
    setLoadingLogo: (a:boolean) => void
}

function GoTrueNet({setLoadingLogo}:Props) {

    React.useEffect(() => {
        setLoadingLogo(true);
    }, [setLoadingLogo]);


    return (
        <ReactSVG src={LogoGoTrueNet} className="logo_gotruenet" />
    );
}

export default GoTrueNet;
