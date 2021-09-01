import React from "react";
import "./styleSearchSystem.css";
import SearchSystemItem from "./SearchSystemItem";
import Carousel from "react-elastic-carousel";
// import Carousel, {consts} from "react-elastic-carousel";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedEngine, setSearchCategory } from "../../redux/actions/filter";
import { ReactSVG, IconArrowLeft, IconArrowRight } from "../../images";

function SearchSystem() {
    const { selectedEngine, dataEngines } = useSelector(({ filter }: any) => filter);
    const { windowSize } = useSelector(({ settings }: any) => settings);
    const dispatch = useDispatch();

    const choiceEngine = (e: React.ChangeEvent<HTMLElement>): void => {
        dispatch(setSelectedEngine(e.target.dataset.checksearch));
    };

    React.useEffect(() => {
        if (selectedEngine) {
            let obj = selectedEngine.categories;
            let keys = Object.keys(obj);
            dispatch(setSearchCategory(obj[keys[0]]));
        }
    }, [selectedEngine, dispatch]);

    const breakPointsCarousel = [
        { width: 2, itemsToShow: 2 },
        { width: 480, itemsToShow: 3 },
        { width: 580, itemsToShow: 4 },
        { width: 650, itemsToShow: 5 },
    ];

    const System = () => {
        if (dataEngines.engines.length > 5 || (windowSize && windowSize[0] <= 650)) {
            return (
                <div className="search-system_rec">
                    <Carousel
                        breakPoints={breakPointsCarousel}
                        pagination={false}
                        //trackTouch={true}
                        preventDefaultTouchmoveEvent={true}
                        renderArrow={({ type, onClick, isEdge }) => {
                            const pointer =
                                type === "PREV" ? (
                                    <ReactSVG src={IconArrowLeft} className="icon_arrowLeft" />
                                ) : (
                                    <ReactSVG src={IconArrowRight} className="icon_arrowRight" />
                                );
                            return (
                                <button
                                    onClick={onClick}
                                    disabled={isEdge}
                                    className="sliderBt bt_icon bt_icon_string"
                                >
                                    {pointer}
                                </button>
                            );
                        }}
                    >
                        {dataEngines.engines.map((elem:any, i:number) => {
                            return (
                                <SearchSystemItem
                                    key={`CarouselElem_${i}`}
                                    {...elem}
                                    checked={elem.name === selectedEngine.name}
                                    choiceEngine={choiceEngine}
                                />
                            );
                        })}
                    </Carousel>
                </div>
            );
        } else {
            return dataEngines.engines.map((elem:any, i:number) => {
                return (
                    <SearchSystemItem
                        key={i}
                        {...elem}
                        checked={elem.name === selectedEngine.name}
                        choiceEngine={choiceEngine}
                    />
                );
            });
        }
    };

    return <div className="search-system">{dataEngines && selectedEngine && System()}</div>;
}

export default React.memo(SearchSystem);
