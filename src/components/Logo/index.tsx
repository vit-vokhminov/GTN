import React from "react";
import GoTrueNet from "./GoTrueNet";
import GoTrueNetMin from "./GoTrueNetMin";
import {EarthGlobe} from "../index";
import classNames from "classnames";
import {useWindowSize} from 'react-use';

function Logo() {

    const [loadingBall, setLoadingBall] = React.useState<boolean>(false);
    const [loadingLogo, setLoadingLogo] = React.useState<boolean>(false);
    const [loadingAll, setLoadingAll] = React.useState<boolean>(false);

    const {width} = useWindowSize();

    function logoLoading(){
        if (width > 580) {
            return (
                <>
                    <EarthGlobe setLoadingBall={setLoadingBall} />
                    <GoTrueNet setLoadingLogo={setLoadingLogo} />
                </>
            );
        }
        if (width <= 580) {
            return (
                <>
                    <EarthGlobe setLoadingBall={setLoadingBall} />
                    <GoTrueNetMin setLoadingLogo={setLoadingLogo} />
                </>
            );
        }
    };

    React.useEffect(() => {
        if(loadingBall && loadingLogo){
            setTimeout(() => setLoadingAll(true), 100);
        }
    }, [loadingBall, loadingLogo]);

    return (
        <>
            <div className={classNames("logo_gotruenet_main",{
                noneblock: !loadingAll,
            })}>
                {logoLoading()}
            </div>
        </>
    );
}

export default React.memo(Logo);
