import React from "react";
import { HeaderMain, Logo, SearchSystem, InputSearch, Footer, Sidebar } from "../components";

function Home() {

    return (
        <div className="wrapper wrapper-main">
            <Sidebar />

            <div className="main">
                <HeaderMain />
                <div className="center-wrapper">
                    <div className="search-top">
                        <Logo />
                    </div>

                    <div className="search-body">
                        <InputSearch />
                        <SearchSystem />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default React.memo(Home);
