import React from "react";

const ResultsElem = ({ title, link, snippet }) => (
    <div className="results-item">
        <div className="results-item__title">
            <a href={link} target="_blank" rel="noreferrer">
                {title}
            </a>
        </div>
        <div className="results-item__link">
            <a href={link} target="_blank" rel="noreferrer">
                {link}
            </a>
        </div>
        <div className="results-item__text">{snippet}</div>
        <div className="results-item__search">baidu</div>
    </div>
);

export default React.memo(ResultsElem);
