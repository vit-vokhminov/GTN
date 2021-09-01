import { useEffect } from "react";

export default function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return null;
}

// function openPopup(action) {
//     document.body.style.paddingRight = `${
//         window.innerWidth - document.documentElement.clientWidth
//     }px`;
//     document.body.style.overflowY = "hidden";
//     dispatch(action(true));
// }
// return openPopup;
