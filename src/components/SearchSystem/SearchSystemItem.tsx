import React from "react";
import { ReactSVG } from "../../images"

type SearchSystemElemProps = {
    name: string,
    icon: string,
    checked: boolean,
    choiceEngine(e: React.MouseEvent<HTMLElement>): string,
};

function SearchSystemItem({ name, icon, checked, choiceEngine }: SearchSystemElemProps) {
    return (
        <div className="search-system-item">
            <div className="radio">
                <input
                    name="search-system"
                    type="radio"
                    id={`search-system__${name}`}
                    defaultValue={name}
                    checked={checked}
                    readOnly
                />
                <label
                    htmlFor={`search-system__${name}`}
                    data-checksearch={name}
                    className={`unique-id-search-system ${name}`}
                    onClick={(e: React.MouseEvent<HTMLElement>) => choiceEngine(e)}
                >
                    <ReactSVG src={icon} className="search-system__icon" />
                </label>
            </div>
        </div>
    );
}

export default React.memo(SearchSystemItem);
