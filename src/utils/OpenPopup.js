const openPopup = (dispatch, action) => {
    document.body.style.paddingRight = `${
        window.innerWidth - document.documentElement.clientWidth
    }px`;
    document.body.style.overflow = "hidden";
    dispatch(action(true));
};

export default openPopup;
