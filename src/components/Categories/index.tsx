import React from "react";
import "./styleCategories.css";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { setSearchCategory } from "../../redux/filter";
import { setStartSearch } from "../../redux/form";


function Categories() {
    const { t } = useTranslation();
    const selectedEngine = useAppSelector(store => store.aggregate.selectedEngine);
    const dispatch = useAppDispatch();
    const [active, setActive] = React.useState(0);

    function checkCategory(e:any, key:number) {
        setActive(key);
        dispatch(setSearchCategory(e.target.dataset.category));
        dispatch(setStartSearch(true));
    }
    function translatingCategory(elem:any) {
        switch (elem) {
            case "general":
                return t("resultsContent.general","");
            case "images":
                return t("resultsContent.images","");
            case "videos":
                return t("resultsContent.videos","");
            default:
                return "";
        }
    }

    React.useEffect(() => {
        setActive(0);
    }, [selectedEngine]);

    return (
        <div className="categories">
            {selectedEngine &&
                selectedEngine.categories.map((elem:any, i:number) => (
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
