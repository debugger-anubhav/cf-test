"use strict";
exports.id = 3999;
exports.ids = [3999];
exports.modules = {

/***/ 46451:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(27574);
var _typeof3 = __webpack_require__(50426);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(__webpack_require__(59651));
var _typeof2 = _interopRequireDefault(__webpack_require__(50426));
var _objectSpread2 = _interopRequireDefault(__webpack_require__(51686));
var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(46181));
var React = _interopRequireWildcard(__webpack_require__(18038));
var _classnames = _interopRequireDefault(__webpack_require__(71198));
var _common = __webpack_require__(73034);
var _useId = _interopRequireDefault(__webpack_require__(2658));
var _excluded = ["id", "prefixCls", "steps", "strokeWidth", "trailWidth", "gapDegree", "gapPosition", "trailColor", "strokeLinecap", "style", "className", "strokeColor", "percent"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function stripPercentToNumber(percent) {
  return +percent.replace('%', '');
}
function toArray(value) {
  var mergedValue = value !== null && value !== void 0 ? value : [];
  return Array.isArray(mergedValue) ? mergedValue : [mergedValue];
}
var VIEW_BOX_SIZE = 100;
var getCircleStyle = function getCircleStyle(perimeter, perimeterWithoutGap, offset, percent, rotateDeg, gapDegree, gapPosition, strokeColor, strokeLinecap, strokeWidth) {
  var stepSpace = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 0;
  var offsetDeg = offset / 100 * 360 * ((360 - gapDegree) / 360);
  var positionDeg = gapDegree === 0 ? 0 : {
    bottom: 0,
    top: 180,
    left: 90,
    right: -90
  }[gapPosition];
  var strokeDashoffset = (100 - percent) / 100 * perimeterWithoutGap;
  // Fix percent accuracy when strokeLinecap is round
  // https://github.com/ant-design/ant-design/issues/35009
  if (strokeLinecap === 'round' && percent !== 100) {
    strokeDashoffset += strokeWidth / 2;
    // when percent is small enough (<= 1%), keep smallest value to avoid it's disappearance
    if (strokeDashoffset >= perimeterWithoutGap) {
      strokeDashoffset = perimeterWithoutGap - 0.01;
    }
  }
  return {
    stroke: typeof strokeColor === 'string' ? strokeColor : undefined,
    strokeDasharray: "".concat(perimeterWithoutGap, "px ").concat(perimeter),
    strokeDashoffset: strokeDashoffset + stepSpace,
    transform: "rotate(".concat(rotateDeg + offsetDeg + positionDeg, "deg)"),
    transformOrigin: '0 0',
    transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s',
    fillOpacity: 0
  };
};
var Circle = function Circle(props) {
  var _defaultProps$props = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, _common.defaultProps), props),
    id = _defaultProps$props.id,
    prefixCls = _defaultProps$props.prefixCls,
    steps = _defaultProps$props.steps,
    strokeWidth = _defaultProps$props.strokeWidth,
    trailWidth = _defaultProps$props.trailWidth,
    _defaultProps$props$g = _defaultProps$props.gapDegree,
    gapDegree = _defaultProps$props$g === void 0 ? 0 : _defaultProps$props$g,
    gapPosition = _defaultProps$props.gapPosition,
    trailColor = _defaultProps$props.trailColor,
    strokeLinecap = _defaultProps$props.strokeLinecap,
    style = _defaultProps$props.style,
    className = _defaultProps$props.className,
    strokeColor = _defaultProps$props.strokeColor,
    percent = _defaultProps$props.percent,
    restProps = (0, _objectWithoutProperties2.default)(_defaultProps$props, _excluded);
  var mergedId = (0, _useId.default)(id);
  var gradientId = "".concat(mergedId, "-gradient");
  var radius = VIEW_BOX_SIZE / 2 - strokeWidth / 2;
  var perimeter = Math.PI * 2 * radius;
  var rotateDeg = gapDegree > 0 ? 90 + gapDegree / 2 : -90;
  var perimeterWithoutGap = perimeter * ((360 - gapDegree) / 360);
  var _ref = (0, _typeof2.default)(steps) === 'object' ? steps : {
      count: steps,
      space: 2
    },
    stepCount = _ref.count,
    stepSpace = _ref.space;
  var circleStyle = getCircleStyle(perimeter, perimeterWithoutGap, 0, 100, rotateDeg, gapDegree, gapPosition, trailColor, strokeLinecap, strokeWidth);
  var percentList = toArray(percent);
  var strokeColorList = toArray(strokeColor);
  var gradient = strokeColorList.find(function (color) {
    return color && (0, _typeof2.default)(color) === 'object';
  });
  var paths = (0, _common.useTransitionDuration)();
  var getStokeList = function getStokeList() {
    var stackPtg = 0;
    return percentList.map(function (ptg, index) {
      var color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
      var stroke = color && (0, _typeof2.default)(color) === 'object' ? "url(#".concat(gradientId, ")") : undefined;
      var circleStyleForStack = getCircleStyle(perimeter, perimeterWithoutGap, stackPtg, ptg, rotateDeg, gapDegree, gapPosition, color, strokeLinecap, strokeWidth);
      stackPtg += ptg;
      return /*#__PURE__*/React.createElement("circle", {
        key: index,
        className: "".concat(prefixCls, "-circle-path"),
        r: radius,
        cx: 0,
        cy: 0,
        stroke: stroke,
        strokeLinecap: strokeLinecap,
        strokeWidth: strokeWidth,
        opacity: ptg === 0 ? 0 : 1,
        style: circleStyleForStack,
        ref: function ref(elem) {
          // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
          // React will call the ref callback with the DOM element when the component mounts,
          // and call it with `null` when it unmounts.
          // Refs are guaranteed to be up-to-date before componentDidMount or componentDidUpdate fires.
          paths[index] = elem;
        }
      });
    }).reverse();
  };
  var getStepStokeList = function getStepStokeList() {
    // only show the first percent when pass steps
    var current = Math.round(stepCount * (percentList[0] / 100));
    var stepPtg = 100 / stepCount;
    var stackPtg = 0;
    return new Array(stepCount).fill(null).map(function (_, index) {
      var color = index <= current - 1 ? strokeColorList[0] : trailColor;
      var stroke = color && (0, _typeof2.default)(color) === 'object' ? "url(#".concat(gradientId, ")") : undefined;
      var circleStyleForStack = getCircleStyle(perimeter, perimeterWithoutGap, stackPtg, stepPtg, rotateDeg, gapDegree, gapPosition, color, 'butt', strokeWidth, stepSpace);
      stackPtg += (perimeterWithoutGap - circleStyleForStack.strokeDashoffset + stepSpace) * 100 / perimeterWithoutGap;
      return /*#__PURE__*/React.createElement("circle", {
        key: index,
        className: "".concat(prefixCls, "-circle-path"),
        r: radius,
        cx: 0,
        cy: 0,
        stroke: stroke
        // strokeLinecap={strokeLinecap}
        ,
        strokeWidth: strokeWidth,
        opacity: 1,
        style: circleStyleForStack,
        ref: function ref(elem) {
          paths[index] = elem;
        }
      });
    });
  };
  return /*#__PURE__*/React.createElement("svg", (0, _extends2.default)({
    className: (0, _classnames.default)("".concat(prefixCls, "-circle"), className),
    viewBox: "".concat(-VIEW_BOX_SIZE / 2, " ").concat(-VIEW_BOX_SIZE / 2, " ").concat(VIEW_BOX_SIZE, " ").concat(VIEW_BOX_SIZE),
    style: style,
    id: id,
    role: "presentation"
  }, restProps), gradient && /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gradientId,
    x1: "100%",
    y1: "0%",
    x2: "0%",
    y2: "0%"
  }, Object.keys(gradient).sort(function (a, b) {
    return stripPercentToNumber(a) - stripPercentToNumber(b);
  }).map(function (key, index) {
    return /*#__PURE__*/React.createElement("stop", {
      key: index,
      offset: key,
      stopColor: gradient[key]
    });
  }))), !stepCount && /*#__PURE__*/React.createElement("circle", {
    className: "".concat(prefixCls, "-circle-trail"),
    r: radius,
    cx: 0,
    cy: 0,
    stroke: trailColor,
    strokeLinecap: strokeLinecap,
    strokeWidth: trailWidth || strokeWidth,
    style: circleStyle
  }), stepCount ? getStepStokeList() : getStokeList());
};
if (false) {}
var _default = Circle;
exports["default"] = _default;

/***/ }),

/***/ 97330:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(27574);
var _typeof = __webpack_require__(50426);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(__webpack_require__(59651));
var _objectSpread2 = _interopRequireDefault(__webpack_require__(51686));
var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(46181));
var React = _interopRequireWildcard(__webpack_require__(18038));
var _classnames = _interopRequireDefault(__webpack_require__(71198));
var _common = __webpack_require__(73034);
var _excluded = ["className", "percent", "prefixCls", "strokeColor", "strokeLinecap", "strokeWidth", "style", "trailColor", "trailWidth", "transition"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Line = function Line(props) {
  var _defaultProps$props = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, _common.defaultProps), props),
    className = _defaultProps$props.className,
    percent = _defaultProps$props.percent,
    prefixCls = _defaultProps$props.prefixCls,
    strokeColor = _defaultProps$props.strokeColor,
    strokeLinecap = _defaultProps$props.strokeLinecap,
    strokeWidth = _defaultProps$props.strokeWidth,
    style = _defaultProps$props.style,
    trailColor = _defaultProps$props.trailColor,
    trailWidth = _defaultProps$props.trailWidth,
    transition = _defaultProps$props.transition,
    restProps = (0, _objectWithoutProperties2.default)(_defaultProps$props, _excluded);
  // eslint-disable-next-line no-param-reassign
  delete restProps.gapPosition;
  var percentList = Array.isArray(percent) ? percent : [percent];
  var strokeColorList = Array.isArray(strokeColor) ? strokeColor : [strokeColor];
  var paths = (0, _common.useTransitionDuration)();
  var center = strokeWidth / 2;
  var right = 100 - strokeWidth / 2;
  var pathString = "M ".concat(strokeLinecap === 'round' ? center : 0, ",").concat(center, "\n         L ").concat(strokeLinecap === 'round' ? right : 100, ",").concat(center);
  var viewBoxString = "0 0 100 ".concat(strokeWidth);
  var stackPtg = 0;
  return /*#__PURE__*/React.createElement("svg", (0, _extends2.default)({
    className: (0, _classnames.default)("".concat(prefixCls, "-line"), className),
    viewBox: viewBoxString,
    preserveAspectRatio: "none",
    style: style
  }, restProps), /*#__PURE__*/React.createElement("path", {
    className: "".concat(prefixCls, "-line-trail"),
    d: pathString,
    strokeLinecap: strokeLinecap,
    stroke: trailColor,
    strokeWidth: trailWidth || strokeWidth,
    fillOpacity: "0"
  }), percentList.map(function (ptg, index) {
    var dashPercent = 1;
    switch (strokeLinecap) {
      case 'round':
        dashPercent = 1 - strokeWidth / 100;
        break;
      case 'square':
        dashPercent = 1 - strokeWidth / 2 / 100;
        break;
      default:
        dashPercent = 1;
        break;
    }
    var pathStyle = {
      strokeDasharray: "".concat(ptg * dashPercent, "px, 100px"),
      strokeDashoffset: "-".concat(stackPtg, "px"),
      transition: transition || 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear'
    };
    var color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
    stackPtg += ptg;
    return /*#__PURE__*/React.createElement("path", {
      key: index,
      className: "".concat(prefixCls, "-line-path"),
      d: pathString,
      strokeLinecap: strokeLinecap,
      stroke: color,
      strokeWidth: strokeWidth,
      fillOpacity: "0",
      ref: function ref(elem) {
        // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
        // React will call the ref callback with the DOM element when the component mounts,
        // and call it with `null` when it unmounts.
        // Refs are guaranteed to be up-to-date before componentDidMount or componentDidUpdate fires.
        paths[index] = elem;
      },
      style: pathStyle
    });
  }));
};
if (false) {}
var _default = Line;
exports["default"] = _default;

/***/ }),

/***/ 73034:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useTransitionDuration = exports.defaultProps = void 0;
var _react = __webpack_require__(18038);
var defaultProps = {
  percent: 0,
  prefixCls: 'rc-progress',
  strokeColor: '#2db7f5',
  strokeLinecap: 'round',
  strokeWidth: 1,
  trailColor: '#D9D9D9',
  trailWidth: 1,
  gapPosition: 'bottom'
};
exports.defaultProps = defaultProps;
var useTransitionDuration = function useTransitionDuration() {
  var pathsRef = (0, _react.useRef)([]);
  var prevTimeStamp = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var now = Date.now();
    var updated = false;
    pathsRef.current.forEach(function (path) {
      if (!path) {
        return;
      }
      updated = true;
      var pathStyle = path.style;
      pathStyle.transitionDuration = '.3s, .3s, .3s, .06s';
      if (prevTimeStamp.current && now - prevTimeStamp.current < 100) {
        pathStyle.transitionDuration = '0s, 0s';
      }
    });
    if (updated) {
      prevTimeStamp.current = Date.now();
    }
  });
  return pathsRef.current;
};
exports.useTransitionDuration = useTransitionDuration;

/***/ }),

/***/ 2658:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(27574);
var _typeof = __webpack_require__(50426);
Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isBrowserClient = exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(31974));
var React = _interopRequireWildcard(__webpack_require__(18038));
var _canUseDom = _interopRequireDefault(__webpack_require__(4382));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var uuid = 0;
/** Is client side and not jsdom */
var isBrowserClient =  true && (0, _canUseDom.default)();
/** Get unique id for accessibility usage */
exports.isBrowserClient = isBrowserClient;
function getUUID() {
  var retId;
  // Test never reach
  /* istanbul ignore if */
  if (isBrowserClient) {
    retId = uuid;
    uuid += 1;
  } else {
    retId = 'TEST_OR_SSR';
  }
  return retId;
}
var _default = function _default(id) {
  // Inner id for accessibility usage. Only work in client side
  var _React$useState = React.useState(),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    innerId = _React$useState2[0],
    setInnerId = _React$useState2[1];
  React.useEffect(function () {
    setInnerId("rc_progress_".concat(getUUID()));
  }, []);
  return id || innerId;
};
exports["default"] = _default;

/***/ }),

/***/ 23999:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;


var _interopRequireDefault = __webpack_require__(27574);
__webpack_unused_export__ = ({
  value: true
});
__webpack_unused_export__ = ({
  enumerable: true,
  get: function get() {
    return _Circle.default;
  }
});
Object.defineProperty(exports, "x1", ({
  enumerable: true,
  get: function get() {
    return _Line.default;
  }
}));
__webpack_unused_export__ = void 0;
var _Line = _interopRequireDefault(__webpack_require__(97330));
var _Circle = _interopRequireDefault(__webpack_require__(46451));
var _default = {
  Line: _Line.default,
  Circle: _Circle.default
};
__webpack_unused_export__ = _default;

/***/ }),

/***/ 4382:
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = canUseDom;
function canUseDom() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

/***/ })

};
;