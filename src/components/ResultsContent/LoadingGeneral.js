import React from "react";
import ContentLoader from "react-content-loader";

const LoadingGeneral = (props) => (
    <ContentLoader
        speed={7}
        width={600}
        height={120}
        viewBox="0 0 600 120"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="23" rx="2" ry="2" width="366" height="16" />
        <rect x="0" y="50" rx="2" ry="2" width="600" height="44" />
        <rect x="0" y="0" rx="2" ry="2" width="600" height="18" />
    </ContentLoader>
);

export default LoadingGeneral;
