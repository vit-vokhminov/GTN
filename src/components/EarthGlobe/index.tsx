import React from "react";
import "./styleEarthGlobe.css";

function EarthGlobe() {
    return (
        <div className="har">
            <div className="globe-container">
                <div className="globe">
                    <div className="globe-sphere" />
                    {/* <div className="globe-outer-shadow"></div> */}
                    <div className="globe-worldmap">
                        <div className="globe-worldmap-back" />
                        <div className="globe-worldmap-front" />
                    </div>
                    <div className="globe-inner-shadow" />
                </div>
            </div>
        </div>
    );
}

export default EarthGlobe;
