"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _react = _interopRequireWildcard(require("react"));
var _propTypes = require("prop-types");
var _objectAssign = _interopRequireDefault(require("object-assign"));
var _Region = _interopRequireDefault(require("./Region"));
var _style = _interopRequireDefault(require("./style"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var OldRegionSelect = /*#__PURE__*/function (_Component) {
  _inherits(OldRegionSelect, _Component);
  function OldRegionSelect(props) {
    var _this;
    _classCallCheck(this, OldRegionSelect);
    _this = _callSuper(this, OldRegionSelect, [props]);
    _this.onComponentMouseTouchDown = _this.onComponentMouseTouchDown.bind(_assertThisInitialized(_this));
    _this.onDocMouseTouchMove = _this.onDocMouseTouchMove.bind(_assertThisInitialized(_this));
    _this.onDocMouseTouchEnd = _this.onDocMouseTouchEnd.bind(_assertThisInitialized(_this));
    _this.onRegionMoveStart = _this.onRegionMoveStart.bind(_assertThisInitialized(_this));
    _this.regionCounter = 0;
    return _this;
  }
  _createClass(OldRegionSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("mousemove", this.onDocMouseTouchMove);
      document.addEventListener("touchmove", this.onDocMouseTouchMove);
      document.addEventListener("mouseup", this.onDocMouseTouchEnd);
      document.addEventListener("touchend", this.onDocMouseTouchEnd);
      document.addEventListener("touchcancel", this.onDocMouseTouchEnd);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("mousemove", this.onDocMouseTouchMove);
      document.removeEventListener("touchmove", this.onDocMouseTouchMove);
      document.removeEventListener("mouseup", this.onDocMouseTouchEnd);
      document.removeEventListener("touchend", this.onDocMouseTouchEnd);
      document.removeEventListener("touchcancel", this.onDocMouseTouchEnd);
    }
  }, {
    key: "getClientPos",
    value: function getClientPos(e) {
      var pageX, pageY;
      if (e.touches) {
        pageX = e.touches[0].pageX;
        pageY = e.touches[0].pageY;
      } else {
        pageX = e.pageX;
        pageY = e.pageY;
      }
      return {
        x: pageX,
        y: pageY
      };
    }
  }, {
    key: "onDocMouseTouchMove",
    value: function onDocMouseTouchMove(event) {
      if (!this.isChanging) {
        return;
      }
      var index = this.regionChangeIndex;
      var updatingRegion = this.props.regions[index];
      var clientPos = this.getClientPos(event);
      var regionChangeData = this.regionChangeData;
      var x, y, width, height;
      if (!regionChangeData.isMove) {
        var x1Pc, y1Pc, x2Pc, y2Pc;
        x1Pc = (regionChangeData.clientPosXStart - regionChangeData.imageOffsetLeft) / regionChangeData.imageWidth * 100;
        y1Pc = (regionChangeData.clientPosYStart - regionChangeData.imageOffsetTop) / regionChangeData.imageHeight * 100;
        x2Pc = (clientPos.x - regionChangeData.imageOffsetLeft) / regionChangeData.imageWidth * 100;
        y2Pc = (clientPos.y - regionChangeData.imageOffsetTop) / regionChangeData.imageHeight * 100;
        x = Math.min(x1Pc, x2Pc);
        y = Math.min(y1Pc, y2Pc);
        width = Math.abs(x1Pc - x2Pc);
        height = Math.abs(y1Pc - y2Pc);
        if (this.props.constraint) {
          if (x2Pc >= 100) {
            x = x1Pc;
            width = 100 - x1Pc;
          }
          if (y2Pc >= 100) {
            y = y1Pc;
            height = 100 - y1Pc;
          }
          if (x2Pc <= 0) {
            x = 0;
            width = x1Pc;
          }
          if (y2Pc <= 0) {
            y = 0;
            height = y1Pc;
          }
        }
      } else {
        x = (clientPos.x + regionChangeData.clientPosXOffset - regionChangeData.imageOffsetLeft) / regionChangeData.imageWidth * 100;
        y = (clientPos.y + regionChangeData.clientPosYOffset - regionChangeData.imageOffsetTop) / regionChangeData.imageHeight * 100;
        width = updatingRegion.width;
        height = updatingRegion.height;
        if (this.props.constraint) {
          if (x + width >= 100) {
            x = Math.round(100 - width);
          }
          if (y + height >= 100) {
            y = Math.round(100 - height);
          }
          if (x <= 0) {
            x = 0;
          }
          if (y <= 0) {
            y = 0;
          }
        }
      }
      var rect = {
        x: x,
        y: y,
        width: width,
        height: height,
        isChanging: true
      };
      this.props.onChange([].concat(_toConsumableArray(this.props.regions.slice(0, index)), [(0, _objectAssign["default"])({}, updatingRegion, rect)], _toConsumableArray(this.props.regions.slice(index + 1))));
    }
  }, {
    key: "onDocMouseTouchEnd",
    value: function onDocMouseTouchEnd() {
      if (this.isChanging) {
        this.isChanging = false;
        var index = this.regionChangeIndex;
        var updatingRegion = this.props.regions[index];
        var changes = {
          "new": false,
          isChanging: false
        };
        this.regionChangeIndex = null;
        this.regionChangeData = null;
        this.props.onChange([].concat(_toConsumableArray(this.props.regions.slice(0, index)), [(0, _objectAssign["default"])({}, updatingRegion, changes)], _toConsumableArray(this.props.regions.slice(index + 1))));
      }
    }
  }, {
    key: "onComponentMouseTouchDown",
    value: function onComponentMouseTouchDown(event) {
      if (event.target.dataset.wrapper || event.target.dataset.dir || isSubElement(event.target, function (el) {
        return el.dataset && el.dataset.wrapper;
      })) {
        return;
      }
      event.preventDefault();
      var clientPos = this.getClientPos(event);
      var imageOffset = this.getElementOffset(this.refs.image);
      var xPc = (clientPos.x - imageOffset.left) / this.refs.image.offsetWidth * 100;
      var yPc = (clientPos.y - imageOffset.top) / this.refs.image.offsetHeight * 100;
      this.isChanging = true;
      var rect = {
        x: xPc,
        y: yPc,
        width: 0,
        height: 0,
        "new": true,
        data: {
          index: this.regionCounter
        },
        isChanging: true
      };
      this.regionCounter += 1;
      this.regionChangeData = {
        imageOffsetLeft: imageOffset.left,
        imageOffsetTop: imageOffset.top,
        clientPosXStart: clientPos.x,
        clientPosYStart: clientPos.y,
        imageWidth: this.refs.image.offsetWidth,
        imageHeight: this.refs.image.offsetHeight,
        isMove: false
      };
      if (this.props.regions.length < this.props.maxRegions) {
        this.props.onChange(this.props.regions.concat(rect));
        this.regionChangeIndex = this.props.regions.length;
      } else {
        this.props.onChange([].concat(_toConsumableArray(this.props.regions.slice(0, this.props.maxRegions - 1)), [rect]));
        this.regionChangeIndex = this.props.maxRegions - 1;
      }
    }
  }, {
    key: "getElementOffset",
    value: function getElementOffset(el) {
      var rect = el.getBoundingClientRect();
      var docEl = document.documentElement;
      var rectTop = rect.top + window.pageYOffset - docEl.clientTop;
      var rectLeft = rect.left + window.pageXOffset - docEl.clientLeft;
      return {
        top: rectTop,
        left: rectLeft
      };
    }
  }, {
    key: "onRegionMoveStart",
    value: function onRegionMoveStart(event, index) {
      if (!event.target.dataset.wrapper && !event.target.dataset.dir) {
        return;
      }
      event.preventDefault();
      var clientPos = this.getClientPos(event);
      var imageOffset = this.getElementOffset(this.refs.image);
      var clientPosXStart, clientPosYStart;
      var currentRegion = this.props.regions[index];
      var regionLeft = currentRegion.x / 100 * this.refs.image.offsetWidth + imageOffset.left;
      var regionTop = currentRegion.y / 100 * this.refs.image.offsetHeight + imageOffset.top;
      var regionWidth = currentRegion.width / 100 * this.refs.image.offsetWidth;
      var regionHeight = currentRegion.height / 100 * this.refs.image.offsetHeight;
      var clientPosDiffX = regionLeft - clientPos.x;
      var clientPosDiffY = regionTop - clientPos.y;
      var resizeDir = event.target.dataset.dir;
      if (resizeDir) {
        if (resizeDir === "se") {
          clientPosXStart = regionLeft;
          clientPosYStart = regionTop;
        } else if (resizeDir === "sw") {
          clientPosXStart = regionLeft + regionWidth;
          clientPosYStart = regionTop;
        } else if (resizeDir === "nw") {
          clientPosXStart = regionLeft + regionWidth;
          clientPosYStart = regionTop + regionHeight;
        } else if (resizeDir === "ne") {
          clientPosXStart = regionLeft;
          clientPosYStart = regionTop + regionHeight;
        }
      } else {
        clientPosXStart = clientPos.x;
        clientPosYStart = clientPos.y;
      }
      this.isChanging = true;
      this.regionChangeData = {
        imageOffsetLeft: imageOffset.left,
        imageOffsetTop: imageOffset.top,
        clientPosXStart: clientPosXStart,
        clientPosYStart: clientPosYStart,
        clientPosXOffset: clientPosDiffX,
        clientPosYOffset: clientPosDiffY,
        imageWidth: this.refs.image.offsetWidth,
        imageHeight: this.refs.image.offsetHeight,
        isMove: resizeDir ? false : true,
        resizeDir: resizeDir
      };
      this.regionChangeIndex = index;
    }
  }, {
    key: "renderRect",
    value: function renderRect(rect, index) {
      var _this2 = this;
      return /*#__PURE__*/_react["default"].createElement(_Region["default"], {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        handles: !rect["new"],
        data: rect.data,
        key: index,
        index: index,
        customStyle: this.props.regionStyle,
        dataRenderer: this.props.regionRenderer,
        onCropStart: function onCropStart(event) {
          return _this2.onRegionMoveStart(event, index);
        },
        changing: index === this.regionChangeIndex
      });
    }
  }, {
    key: "render",
    value: function render() {
      var regions = this.props.regions;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: "image",
        style: (0, _objectAssign["default"])({}, _style["default"].RegionSelect, this.props.style),
        className: this.props.className,
        onTouchStart: this.onComponentMouseTouchDown,
        onMouseDown: this.onComponentMouseTouchDown
      }, regions.map(this.renderRect.bind(this)), this.props.debug ? /*#__PURE__*/_react["default"].createElement("table", {
        style: {
          position: "absolute",
          right: 0,
          top: 0
        }
      }, /*#__PURE__*/_react["default"].createElement("tbody", null, regions.map(function (rect, index) {
        return /*#__PURE__*/_react["default"].createElement("tr", {
          key: index
        }, /*#__PURE__*/_react["default"].createElement("td", null, "x: ", Math.round(rect.x, 1)), /*#__PURE__*/_react["default"].createElement("td", null, "y: ", Math.round(rect.y, 1)), /*#__PURE__*/_react["default"].createElement("td", null, "width: ", Math.round(rect.width, 1)), /*#__PURE__*/_react["default"].createElement("td", null, "height: ", Math.round(rect.height, 1)));
      }))) : null, this.props.children);
    }
  }]);
  return OldRegionSelect;
}(_react.Component);
OldRegionSelect.propTypes = {
  constraint: _propTypes.PropTypes.bool,
  regions: _propTypes.PropTypes.array,
  children: _propTypes.PropTypes.any,
  onChange: _propTypes.PropTypes.func.isRequired,
  regionRenderer: _propTypes.PropTypes.func,
  maxRegions: _propTypes.PropTypes.number,
  debug: _propTypes.PropTypes.bool,
  className: _propTypes.PropTypes.string,
  style: _propTypes.PropTypes.object,
  regionStyle: _propTypes.PropTypes.object
};
OldRegionSelect.defaultProps = {
  maxRegions: Infinity,
  debug: false,
  regions: [],
  constraint: false
};
function isSubElement(el, check) {
  if (el === null) {
    return false;
  } else if (check(el)) {
    return true;
  } else {
    return isSubElement(el.parentNode, check);
  }
}

// support both es6 modules and common js
module.exports = OldRegionSelect;
module.exports["default"] = OldRegionSelect;