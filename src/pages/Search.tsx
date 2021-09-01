import React from "react";
import {
    Footer,
    HeaderMain,
    ResultsContent,
    Categories,
    InputSearch,
    SearchSystem,
    Pagination,
    Sidebar,
} from "../components";
import { ReactSVG, LogoGoTrueNetArrow } from "../images";
import { NavLink } from "react-router-dom";


function Search() {
    return (
        <div className="wrapper wrapper_res">
            <Sidebar />
            <HeaderMain />

            <div className="main">
                <NavLink to="/" className="header-logo">
                    <ReactSVG src={LogoGoTrueNetArrow} className="logo__res" />
                </NavLink>

                <div className="center-wrapper">
                    <div className="res_sett">
                        <InputSearch />

                        <SearchSystem />
                    </div>

                    <Categories />

                    <div className="res_cont">
                        <ResultsContent />
                    </div>

                    <Pagination />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default React.memo(Search);
