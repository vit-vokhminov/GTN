import React from "react";
import "./styleCategories.css";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { setSearchCategory } from "../../redux/actions/filter";

function Categories() {
    const { t } = useTranslation();
    const { selectedEngine } = useSelector(({ filter }) => filter);
    const dispatch = useDispatch();
    const [active, setActive] = React.useState(0);

    function checkCategory(e, key) {
        setActive(key);
        dispatch(setSearchCategory(e.target.dataset.category));
    }
    function translatingCategory(elem) {
        switch (elem) {
            case "general":
                return t("resultsContent.general");
            case "images":
                return t("resultsContent.images");
            case "videos":
                return t("resultsContent.videos");
            default:
                return "";
        }
    }

    return (
        <div className="categories">
            {selectedEngine &&
                selectedEngine.categories.map((elem, i) => (
                    <div
                        className={classNames("categories_elem", {
                            active: active === i,
                        })}
                        key={`categories_elem__${i}`}
                    >
                        <span data-category={elem} onClick={(e) => checkCategory(e, i)}>
                            {translatingCategory(elem)}
                        </span>
                    </div>
                ))}
        </div>
    );
}

export default React.memo(Categories);
