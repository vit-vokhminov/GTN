import React from "react";
import classNames from "classnames";
import "./styleSelect.css";
import { useDispatch, useSelector } from "react-redux";
import SelectOption from "./SelectOption";
import { setSelectedEngine } from "../../redux/actions/filter";

function Select({ option }) {
    const { selectedEngine } = useSelector(({ filter }) => filter);
    const dispatch = useDispatch();
    const [show, setShow] = React.useState(false);
    const [inputValSelect, setInputValSelect] = React.useState(option ? option[0].engine : null);

    const select = React.useRef(null);
    const selectTitle = React.useRef(null);

    function showSelect() {
        setShow(!show);
    }

    function clickOption(e) {
        setInputValSelect(e.target.dataset.value);
        selectTitle.current.innerHTML = e.target.innerHTML;
        setShow(!show);
        dispatch(setSelectedEngine(e.target.dataset.value));
    }

    const handleOutsideClick = (event) => {
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(select.current)) {
            setShow(false);
        }
    };

    React.useEffect(() => {
        document.body.addEventListener("click", handleOutsideClick);
        return () => {
            document.body.removeEventListener("click", handleOutsideClick);
        };
    }, [show]);

    return (
        <div
            ref={select}
            className={classNames("select", {
                active: show,
            })}
        >
            <div
                className={classNames("select-title", {
                    "select-title_greycolor":
                        selectedEngine && inputValSelect !== selectedEngine.engine,
                })}
            >
                <div className="select-title__value" ref={selectTitle} onClick={() => showSelect()}>
                    <img src={option && option[0].icon} alt="" />
                </div>
            </div>

            {show && (
                <div className="select-options">
                    {option &&
                        option.map((elem, i) => (
                            <SelectOption
                                key={`select-options${i}`}
                                {...elem}
                                clickOptionq={clickOption}
                                checkEngine={selectedEngine.engine}
                            />
                        ))}
                    <input type="hidden" defaultValue={inputValSelect} />
                </div>
            )}
        </div>
    );
}

export default React.memo(Select);
