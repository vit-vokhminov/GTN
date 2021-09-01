Object.defineProperty(exports, "__esModule", {
    value: true,
});

let _createClass = (function () {
    function defineProperties(target, props) {
        for (let i = 0; i < props.length; i++) {
            let descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
})();

let _classnames = require("classnames");

let _classnames2 = _interopRequireDefault(_classnames);

let _react = require("react");

let _react2 = _interopRequireDefault(_react);

let _propTypes = require("prop-types");

let _propTypes2 = _interopRequireDefault(_propTypes);

let _resizeObserverPolyfill = require("resize-observer-polyfill");

let _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

let _utils = require("./utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true,
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError(
            "Super expression must either be null or a function, not " + typeof superClass
        );
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: { value: subClass, enumerable: false, writable: true, configurable: true },
    });
    if (superClass)
        Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
} /* eslint no-debugger: "warn" */

/**
 * Predefined constants
 * @type {Object}
 */
let constants = {
    orientation: {
        horizontal: {
            dimension: "width",
            direction: "left",
            reverseDirection: "right",
            coordinate: "x",
        },
        vertical: {
            dimension: "height",
            direction: "top",
            reverseDirection: "bottom",
            coordinate: "y",
        },
    },
};

let Slider = (function (_Component) {
    _inherits(Slider, _Component);

    function Slider(props, context) {
        _classCallCheck(this, Slider);

        let _this = _possibleConstructorReturn(
            this,
            (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props, context)
        );

        _this.handleFormat = function (value) {
            let format = _this.props.format;

            return format ? format(value) : value;
        };

        _this.handleUpdate = function () {
            if (!_this.slider) {
                // for shallow rendering
                return;
            }
            let orientation = _this.props.orientation;

            let dimension = (0, _utils.capitalize)(constants.orientation[orientation].dimension);
            let sliderPos = _this.slider["offset" + dimension];
            let handlePos = _this.handle["offset" + dimension];

            _this.setState({
                limit: sliderPos - handlePos,
                grab: handlePos / 2,
            });
        };

        _this.handleStart = function (e) {
            let onChangeStart = _this.props.onChangeStart;

            document.addEventListener("mousemove", _this.handleDrag);
            document.addEventListener("mouseup", _this.handleEnd);
            _this.setState(
                {
                    active: true,
                },
                function () {
                    onChangeStart && onChangeStart(e);
                }
            );
        };

        _this.handleDrag = function (e) {
            e.stopPropagation();
            let onChange = _this.props.onChange;
            let _e$target = e.target,
                className = _e$target.className,
                classList = _e$target.classList,
                dataset = _e$target.dataset;

            if (!onChange || className === "rangeslider__labels") return;

            let value = _this.position(e);

            if (classList && classList.contains("rangeslider__label-item") && dataset.value) {
                value = parseFloat(dataset.value);
            }

            onChange && onChange(value, e);
        };

        _this.handleEnd = function (e) {
            let onChangeComplete = _this.props.onChangeComplete;

            _this.setState(
                {
                    active: false,
                },
                function () {
                    onChangeComplete && onChangeComplete(e);
                }
            );
            document.removeEventListener("mousemove", _this.handleDrag);
            document.removeEventListener("mouseup", _this.handleEnd);
        };

        _this.handleKeyDown = function (e) {
            e.preventDefault();
            let keyCode = e.keyCode;
            let _this$props = _this.props,
                value = _this$props.value,
                min = _this$props.min,
                max = _this$props.max,
                step = _this$props.step,
                onChange = _this$props.onChange;

            let sliderValue = void 0;

            switch (keyCode) {
                case 38:
                case 39:
                    sliderValue = value + step > max ? max : value + step;
                    onChange && onChange(sliderValue, e);
                    break;
                case 37:
                case 40:
                    sliderValue = value - step < min ? min : value - step;
                    onChange && onChange(sliderValue, e);
                    break;
                default:
                    break;
            }
        };

        _this.getPositionFromValue = function (value) {
            let limit = _this.state.limit;
            let _this$props2 = _this.props,
                min = _this$props2.min,
                max = _this$props2.max;

            let diffMaxMin = max - min;
            let diffValMin = value - min;
            let percentage = diffValMin / diffMaxMin;
            let pos = Math.round(percentage * limit);

            return pos;
        };

        _this.getValueFromPosition = function (pos) {
            let limit = _this.state.limit;
            let _this$props3 = _this.props,
                orientation = _this$props3.orientation,
                min = _this$props3.min,
                max = _this$props3.max,
                step = _this$props3.step;

            let percentage = (0, _utils.clamp)(pos, 0, limit) / (limit || 1);
            let baseVal = step * Math.round((percentage * (max - min)) / step);
            let value = orientation === "horizontal" ? baseVal + min : max - baseVal;

            return (0, _utils.clamp)(value, min, max);
        };

        _this.position = function (e) {
            let grab = _this.state.grab;
            let _this$props4 = _this.props,
                orientation = _this$props4.orientation,
                reverse = _this$props4.reverse;

            let node = _this.slider;
            let coordinateStyle = constants.orientation[orientation].coordinate;
            let directionStyle = reverse
                ? constants.orientation[orientation].reverseDirection
                : constants.orientation[orientation].direction;
            let clientCoordinateStyle = "client" + (0, _utils.capitalize)(coordinateStyle);
            let coordinate = !e.touches
                ? e[clientCoordinateStyle]
                : e.touches[0][clientCoordinateStyle];
            let direction = node.getBoundingClientRect()[directionStyle];
            let pos = reverse ? direction - coordinate - grab : coordinate - direction - grab;
            let value = _this.getValueFromPosition(pos);

            return value;
        };

        _this.coordinates = function (pos) {
            let _this$state = _this.state,
                limit = _this$state.limit,
                grab = _this$state.grab;
            let orientation = _this.props.orientation;

            let value = _this.getValueFromPosition(pos);
            let position = _this.getPositionFromValue(value);
            let handlePos = orientation === "horizontal" ? position + grab : position;
            let fillPos = orientation === "horizontal" ? handlePos : limit - handlePos;

            return {
                fill: fillPos,
                handle: handlePos,
                label: handlePos,
            };
        };

        _this.renderLabels = function (labels) {
            return _react2.default.createElement(
                "ul",
                {
                    ref: function ref(sl) {
                        _this.labels = sl;
                    },
                    className: (0, _classnames2.default)("rangeslider__labels"),
                },
                labels
            );
        };

        _this.state = {
            active: false,
            limit: 0,
            grab: 0,
        };
        return _this;
    }

    _createClass(Slider, [
        {
            key: "componentDidMount",
            value: function componentDidMount() {
                this.handleUpdate();
                let resizeObserver = new _resizeObserverPolyfill2.default(this.handleUpdate);
                resizeObserver.observe(this.slider);
            },

            /**
             * Format label/tooltip value
             * @param  {Number} - value
             * @return {Formatted Number}
             */

            /**
             * Update slider state on change
             * @return {void}
             */

            /**
             * Attach event listeners to mousemove/mouseup events
             * @return {void}
             */

            /**
             * Handle drag/mousemove event
             * @param  {Object} e - Event object
             * @return {void}
             */

            /**
             * Detach event listeners to mousemove/mouseup events
             * @return {void}
             */

            /**
             * Support for key events on the slider handle
             * @param  {Object} e - Event object
             * @return {void}
             */

            /**
             * Calculate position of slider based on its value
             * @param  {number} value - Current value of slider
             * @return {position} pos - Calculated position of slider based on value
             */

            /**
             * Translate position of slider to slider value
             * @param  {number} pos - Current position/coordinates of slider
             * @return {number} value - Slider value
             */

            /**
             * Calculate position of slider based on value
             * @param  {Object} e - Event object
             * @return {number} value - Slider value
             */

            /**
             * Grab coordinates of slider
             * @param  {Object} pos - Position object
             * @return {Object} - Slider fill/handle coordinates
             */
        },
        {
            key: "render",
            value: function render() {
                let _this2 = this;

                let _props = this.props,
                    value = _props.value,
                    orientation = _props.orientation,
                    className = _props.className,
                    tooltip = _props.tooltip,
                    reverse = _props.reverse,
                    labels = _props.labels,
                    min = _props.min,
                    max = _props.max,
                    handleLabel = _props.handleLabel;
                let active = this.state.active;

                let dimension = constants.orientation[orientation].dimension;
                let direction = reverse
                    ? constants.orientation[orientation].reverseDirection
                    : constants.orientation[orientation].direction;
                let position = this.getPositionFromValue(value);
                let coords = this.coordinates(position);
                let fillStyle = _defineProperty({}, dimension, coords.fill + "px");
                let handleStyle = _defineProperty({}, direction, coords.handle + "px");
                let showTooltip = tooltip && active;

                let labelItems = [];
                let labelKeys = Object.keys(labels);

                if (labelKeys.length > 0) {
                    labelKeys = labelKeys.sort(function (a, b) {
                        return reverse ? a - b : b - a;
                    });

                    let _iteratorNormalCompletion = true;
                    let _didIteratorError = false;
                    let _iteratorError = undefined;
                    let _iterator;
                    let _step;

                    try {
                        for (
                            _iterator = labelKeys[Symbol.iterator]();
                            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
                            _iteratorNormalCompletion = true
                        ) {
                            let key = _step.value;

                            let labelPosition = this.getPositionFromValue(key);
                            let labelCoords = this.coordinates(labelPosition);
                            let labelStyle = _defineProperty(
                                {},
                                direction,
                                labelCoords.label + "px"
                            );

                            const widthLabelItem = (fillStyle, labelStyle) => {
                                let fillStyleWidth = +fillStyle.width.split("px")[0];
                                let labelStyleLeft = +labelStyle.left.split("px")[0];

                                if (fillStyleWidth >= labelStyleLeft) {
                                    return "active";
                                }
                                return "";
                            };

                            labelItems.push(
                                _react2.default.createElement(
                                    "li",
                                    {
                                        key: key,
                                        className: (0, _classnames2.default)(
                                            `rangeslider__label-item ${widthLabelItem(
                                                fillStyle,
                                                labelStyle
                                            )}`
                                        ),
                                        "data-value": key,
                                        onMouseDown: this.handleDrag,
                                        onTouchStart: this.handleStart,
                                        onTouchEnd: this.handleEnd,
                                        style: labelStyle,
                                    },
                                    this.props.labels[key]
                                )
                            );
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }

                return _react2.default.createElement(
                    "div",
                    {
                        ref: function ref(s) {
                            _this2.slider = s;
                        },
                        className: (0, _classnames2.default)(
                            "rangeslider",
                            "rangeslider-" + orientation,
                            { "rangeslider-reverse": reverse },
                            className
                        ),
                        onMouseDown: this.handleDrag,
                        onMouseUp: this.handleEnd,
                        onTouchStart: this.handleStart,
                        onTouchEnd: this.handleEnd,
                        "aria-valuemin": min,
                        "aria-valuemax": max,
                        "aria-valuenow": value,
                        "aria-orientation": orientation,
                    },
                    _react2.default.createElement("div", {
                        className: "rangeslider__fill",
                        style: fillStyle,
                    }),
                    _react2.default.createElement(
                        "div",
                        {
                            ref: function ref(sh) {
                                _this2.handle = sh;
                            },
                            className: "rangeslider__handle",
                            onMouseDown: this.handleStart,
                            onTouchMove: this.handleDrag,
                            onTouchEnd: this.handleEnd,
                            onKeyDown: this.handleKeyDown,
                            style: handleStyle,
                            tabIndex: 0,
                        },
                        showTooltip
                            ? _react2.default.createElement(
                                  "div",
                                  {
                                      ref: function ref(st) {
                                          _this2.tooltip = st;
                                      },
                                      className: "rangeslider__handle-tooltip",
                                  },
                                  _react2.default.createElement(
                                      "span",
                                      null,
                                      this.handleFormat(value)
                                  )
                              )
                            : null,
                        _react2.default.createElement(
                            "div",
                            { className: "rangeslider__handle-label" },
                            handleLabel
                        )
                    ),
                    labels ? this.renderLabels(labelItems) : null
                );
            },
        },
    ]);

    return Slider;
})(_react.Component);

Slider.propTypes = {
    min: _propTypes2.default.number,
    max: _propTypes2.default.number,
    step: _propTypes2.default.number,
    value: _propTypes2.default.number,
    orientation: _propTypes2.default.string,
    tooltip: _propTypes2.default.bool,
    reverse: _propTypes2.default.bool,
    labels: _propTypes2.default.object,
    handleLabel: _propTypes2.default.object,
    format: _propTypes2.default.func,
    onChangeStart: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onChangeComplete: _propTypes2.default.func,
};
Slider.defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    orientation: "horizontal",
    tooltip: true,
    reverse: false,
    labels: {},
    handleLabel: "",
};
exports.default = Slider;
