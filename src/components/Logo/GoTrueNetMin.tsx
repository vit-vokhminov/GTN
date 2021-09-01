import React from "react";
import { ReactSVG, LogoGoTrueNetMin } from "../../images";

interface Props {
    setLoadingLogo: (a:boolean) => void
}

function GoTrueNet({setLoadingLogo}:Props) {

    React.useEffect(() => {
        setLoadingLogo(true);
    }, [setLoadingLogo]);


    return (
        <ReactSVG src={LogoGoTrueNetMin} className="logo_gotruenet" />
    );
}

export default GoTrueNet;
