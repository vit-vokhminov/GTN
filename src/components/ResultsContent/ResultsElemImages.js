import React from "react";
import { Link } from "react-router-dom";
//import CarouselElem from "./CarouselElem";

const ResultsElemImages = (props) => {
    const [catalogImg, setCatalogImg] = React.useState(props);

    const isUnmountedRef = React.useRef(false);

    React.useEffect(() => {
        // after mount
        return () => {
            // after unmount
            isUnmountedRef.current = true;
        }
    }, []);

    React.useEffect(() => {
        if (props) {
            const images = [];

            function packimgs() {
                const padding = 8;
                const divWidth = 780; // ширина области
                const divHeight = 180; // высота блоков
                let generalWidth = 0;

                // суммируем пропорциональную ширину всех картинок
                let w = 0;
                for (let i = 0; i < images.length; i++) {
                    images[i].aspect = images[i].width / images[i].height;
                    w += images[i].aspect;
                    generalWidth += 180 * images[i].aspect;
                }

                // колличество строк
                let nrows = Math.ceil(generalWidth / divWidth);

                // удаление лишних строк от слишком широких картинок
                for (let i = 0; i < images.length; i++) {
                    if (images[i].aspect > (1.5 * w) / nrows)
                        nrows -= Math.round((images[i].aspect * nrows) / w) - 1;
                }
                if (nrows < 1) nrows = 1;
                const rows = [];
                const rowHeight = divHeight;
                w = rowHeight * w + padding * images.length;

                for (let j = 0; j < nrows; j++) {
                    rows[j] = [];
                    rows[j].space = divWidth;
                }
                let j = 0;
                let rowWidth = 0;
                for (let i = 0; i < images.length; i++) {
                    const imgWidth = rowHeight * images[i].aspect + padding;
                    if (
                        j < nrows - 1 &&
                        rows[j].length > 0 &&
                        Math.abs(rowWidth - w / (nrows - 1 - j)) <
                            Math.abs(rowWidth - w / (nrows - 1 - j) + imgWidth * 2)
                    ) {
                        rowWidth = 0;
                        j++;
                    }
                    rows[j].push(images[i]);
                    rows[j].space -= imgWidth;
                    rowWidth += imgWidth;
                    w -= imgWidth;
                }

                // Заполнение блока
                let eI = 0;
                const arrayCatalog = Array(nrows);
                for (let j = 0; j < nrows; j++) {
                    arrayCatalog[j] = [];
                    const rowWidth1 = divWidth - padding * rows[j].length;
                    const rowWidth = rowWidth1 - rows[j].space;
                    const rowHeight1 =
                        rows[j].space > 0 ? (rowHeight * rowWidth1) / rowWidth : divHeight;

                    for (let i = 0; i < rows[j].length; i++) {
                        const cwidth = (rows[j][i].aspect * rowWidth1 * rowHeight) / rowWidth;
                        arrayCatalog[j][i] = {};
                        arrayCatalog[j][i].height = `${divHeight}px`;
                        arrayCatalog[j][i].width = `${cwidth}px`;
                        arrayCatalog[j][i].marginTop = `${(divHeight - rowHeight1) / 2}px`;
                        arrayCatalog[j][i].marginLeft = `${(cwidth - rows[j][i].width) / 2}px`;
                        arrayCatalog[j][i].thumbnail_src = images[eI].src;
                        arrayCatalog[j][i].img_src = props[eI].img_src;
                        arrayCatalog[j][i].link = props[eI].link;
                        arrayCatalog[j][i].snippet = props[eI].snippet;
                        arrayCatalog[j][i].title = props[eI].title;
                        eI++;
                    }
                }
                // console.log(arrayCatalog)
                setCatalogImg(arrayCatalog);
            }

            images.loaded = 0;

            for (let i = 0; i < Object.keys(props).length; i++) {
                const img = new Image();
                img.src = props[i].thumbnail_src;
                images.push(img);
                img.onload = function () {
                    if (isUnmountedRef.current) return;
                    if (images.length === ++images.loaded) packimgs();
                };
            }
        }
    }, [props]);

    return (
        <>
            {catalogImg.length > 0 &&
                catalogImg.map((elemRow, rowI) => (
                    <div
                        className="row"
                        key={`row_${rowI}`}
                        style={{ height: catalogImg[0][0].height }}
                    >
                        {elemRow.map((elemCol, colI) => (
                            <div
                                className="col"
                                key={`row_${rowI}__col_${colI}`}
                                style={{ height: elemCol.height, width: elemCol.width }}
                            >
                                <div className="col_preview">
                                    <Link to={elemCol.link} className="col_link" target="_blank">
                                        <img
                                            src={elemCol.thumbnail_src}
                                            alt=""
                                            style={{ height: elemCol.height }}
                                        />
                                    </Link>
                                    <div className="col_deck">
                                        <Link to={elemCol.link} target="_blank">
                                            {elemCol.title}
                                        </Link>
                                        <p>{elemCol.snippet}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
        </>
    );
};

export default React.memo(ResultsElemImages);
