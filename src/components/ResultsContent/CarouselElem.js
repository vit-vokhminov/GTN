import React from "react";
import Carousel from "react-elastic-carousel";

const CarouselElem = ({ arr }) => (
    <div className="results-item results-item__carousel">
        <Carousel itemsToShow={5} pagination={false}>
            {arr.map((elem, i) => (
                <div className="image-elem" key={i}>
                    <a
                        href={elem.link}
                        className="image-elem_main"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={elem.thumbnail_src} alt="" loading="lazy" />
                        <div className="image-elem__title">{elem.title}</div>
                    </a>
                </div>
            ))}
        </Carousel>
    </div>
);

export default CarouselElem;
