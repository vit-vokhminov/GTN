import React from "react";
import { Link } from "react-router-dom";

const ResultsElem = ({ link, thumbnail_src, title }) => (
    <div className="video-elem">
        <div className="video-elem_main">
            <Link to={link} target="_blank">
                <div className="video-elem__preview">
                    <img src={thumbnail_src} alt="" />
                </div>
                <div className="video-elem__title">{title}</div>
            </Link>
        </div>
    </div>
);

export default ResultsElem;
