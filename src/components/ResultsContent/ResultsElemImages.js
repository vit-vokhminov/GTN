import React from "react";

const ResultsElem = ({ link, img_src, thumbnail_src, title, keyId }) => {
    const photos = [];

    const img = new Image();
    img.src = thumbnail_src;
    img.onload = function () {
        photos[keyId] = {
            src: thumbnail_src,
            width: Math.ceil(this.width / this.height),
            height: Math.ceil(this.height / this.width),
        };
    };

    return (
        <div className="image-elem">
            <a href={img_src} className="image-elem_img" target="_blank" rel="noreferrer">
                <img src={thumbnail_src} alt="" loading="lazy" />
            </a>
            <a href="link" target="_blank" className="image-elem_snippet">
                <div className="image-elem__title">{title}</div>
            </a>
        </div>
    );
};

export default ResultsElem;
