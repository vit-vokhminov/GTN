const liveSearch = (e, refCountries) => {
    const removeHide = () => {
        refCountries.current.childNodes.forEach((elem) => {
            elem.classList.remove("hide");
        });
    };
    if (e) {
        const val = e.target.value.toLowerCase().trim();
        if (val !== "") {
            refCountries.current.childNodes.forEach((elem) => {
                if (elem.querySelector(".lang").innerText.toLowerCase().search(val) === -1) {
                    elem.classList.add("hide");
                } else {
                    elem.classList.remove("hide");
                }
            });
        } else {
            removeHide();
        }
    } else {
        removeHide();
    }
};

export default liveSearch;
