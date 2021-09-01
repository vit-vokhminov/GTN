const handleOutside = (event, refDom, originalOne) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(refDom.current) && !path.includes(originalOne.current)) {
        return false;
    }
};

export default handleOutside;
