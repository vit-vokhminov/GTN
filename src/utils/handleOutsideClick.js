const handleOutsideClick = (event, dom, close) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(dom.current)) {
        close();
    }
};
export default handleOutsideClick;
