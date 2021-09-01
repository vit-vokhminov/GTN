import React, { Component } from "react";
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps";
import tooltip from "wsdm-tooltip";

const wrapperStyles = {
    width: "100%",
    maxWidth: 980,
    margin: "0 auto",
};

class WorldMap extends Component {
    state = {
        center: [0, 20],
        zoom: 1,
        highlighted: "",
        hovered: false,
    };

    componentDidMount() {
        this.tip = tooltip();
        this.tip.create();
    }

    handleClick = (geo) => {
        console.log(geo.properties);
        this.setState({
            clicked: true,
            pressed: true,
            highlighted: geo.properties.NAME,
        });
    };

    handleWheel = (event) => {
        if (event.deltaY > 0) {
            this.setState({
                zoom: this.state.zoom / 1.1,
            });
        }
        if (event.deltaY < 0) {
            this.setState({
                zoom: this.state.zoom * 1.1,
            });
        }
    };

    handleMouseMove = (geography, evt) => {
        this.tip.show(`
      <div class="tooltip-inner">
        ${geography.properties.NAME}
      </div>
    `);

        this.tip.position({ pageX: evt.pageX, pageY: evt.pageY });
    };

    handleMouseLeave = () => {
        this.tip.hide();
    };

    render() {
        return (
            <div
                style={wrapperStyles}
                onWheel={this.handleWheel}
                className="mapWorld"
            >
                <div className="mapWorld_cont">
                    <ComposableMap
                        projectionConfig={{
                            scale: 205,
                            rotation: [-11, 0, 0],
                        }}
                        width={980}
                        height={551}
                        style={{
                            width: "100%",
                            height: "auto",
                        }}
                    >
                        <ZoomableGroup
                            center={this.state.center}
                            zoom={this.state.zoom}
                        >
                            <Geographies
                                geography="/geography.json"
                                disableOptimization
                            >
                                {(geographies, projection) =>
                                    geographies.map((geography, i) => (
                                        <Geography
                                            key={i}
                                            cacheId={
                                                geography.properties.ISO_A3 + i
                                            }
                                            geography={geography}
                                            projection={projection}
                                            onMouseMove={this.handleMouseMove}
                                            onMouseLeave={this.handleMouseLeave}
                                            onClick={this.handleClick}
                                            style={{
                                                default: {
                                                    fill:
                                                        geography.properties
                                                            .NAME ===
                                                        this.state.highlighted
                                                            ? "#1a3272"
                                                            : "#F0EAD6",
                                                    stroke:
                                                        geography.properties
                                                            .CONTINENT ===
                                                        this.state.highlighted
                                                            ? "#fe0074"
                                                            : "#B2A27D",
                                                    strokeWidth: 0.75,
                                                    outline: "none",
                                                    transition: "all 250ms",
                                                },
                                                hover: {
                                                    fill: "#1a3272",
                                                    stroke: "#fe0074",
                                                    strokeWidth: 0.75,
                                                    outline: "none",
                                                    transition: "all 250ms",
                                                },
                                                pressed: {
                                                    fill: "#1a3272",
                                                    stroke: "#fe0074",
                                                    strokeWidth: 0.75,
                                                    outline: "none",
                                                    transition: "all 250ms",
                                                },
                                            }}
                                        />
                                    ))
                                }
                            </Geographies>
                        </ZoomableGroup>
                    </ComposableMap>
                </div>
            </div>
        );
    }
}

export default WorldMap;
