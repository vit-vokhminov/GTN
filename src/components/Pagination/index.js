import React from "react";
import "./stylePagination.css";
import { useTranslation } from "react-i18next";

function Pagination() {
    const { t } = useTranslation();
    return (
        <div className="pagination">
            <div className="pagination_elem active">
                <span>1</span>
            </div>
            <div className="pagination_elem">
                <span>2</span>
            </div>
            <div className="pagination_elem">
                <span>3</span>
            </div>
            <div className="pagination_elem">
                <span>4</span>
            </div>
            <div className="pagination_elem pagination_next">
                <span>{t("pagination.next")}</span>
            </div>
        </div>
    );
}

export default Pagination;
