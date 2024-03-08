"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _react = _interopRequireWildcard(require("react"));
var _objectAssign = _interopRequireDefault(require("object-assign"));
var _RegionSelect = _interopRequireDefault(require("../RegionSelect"));
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
require('./style.css');
var App = /*#__PURE__*/function (_Component) {
  _inherits(App, _Component);
  function App(props) {
    var _this;
    _classCallCheck(this, App);
    _this = _callSuper(this, App, [props]);
    _this.regionRenderer = _this.regionRenderer.bind(_assertThisInitialized(_this));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_this));
    _this.state = {
      regions: []
    };
    return _this;
  }
  _createClass(App, [{
    key: "onChange",
    value: function onChange(regions) {
      this.setState({
        regions: regions
      });
    }
  }, {
    key: "changeRegionData",
    value: function changeRegionData(index, event) {
      var region = this.state.regions[index];
      var color;
      switch (event.target.value) {
        case '1':
          color = 'rgba(0, 255, 0, 0.5)';
          break;
        case '2':
          color = 'rgba(0, 0, 255, 0.5)';
          break;
        case '3':
          color = 'rgba(255, 0, 0, 0.5)';
          break;
        default:
          color = 'rgba(0, 0, 0, 0.5)';
      }
      region.data.regionStyle = {
        background: color
      };
      this.onChange([].concat(_toConsumableArray(this.state.regions.slice(0, index)), [(0, _objectAssign["default"])({}, region, {
        data: (0, _objectAssign["default"])({}, region.data, {
          dataType: event.target.value
        })
      })], _toConsumableArray(this.state.regions.slice(index + 1))));
    }
  }, {
    key: "regionRenderer",
    value: function regionRenderer(regionProps) {
      var _this2 = this;
      if (!regionProps.isChanging) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            position: 'absolute',
            right: 0,
            bottom: '-1.5em'
          }
        }, /*#__PURE__*/_react["default"].createElement("select", {
          onChange: function onChange(event) {
            return _this2.changeRegionData(regionProps.index, event);
          },
          value: regionProps.data.dataType
        }, /*#__PURE__*/_react["default"].createElement("option", {
          value: "1"
        }, "Green"), /*#__PURE__*/_react["default"].createElement("option", {
          value: "2"
        }, "Blue"), /*#__PURE__*/_react["default"].createElement("option", {
          value: "3"
        }, "Red")));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var regionStyle = {
        background: 'rgba(255, 0, 0, 0.5)'
      };
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          display: 'flex'
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          flexGrow: 1,
          flexShrink: 1,
          width: '50%'
        }
      }, /*#__PURE__*/_react["default"].createElement(_RegionSelect["default"], {
        maxRegions: 1,
        regions: this.state.regions,
        regionStyle: regionStyle,
        constraint: true,
        onChange: this.onChange,
        regionRenderer: this.regionRenderer,
        style: {
          border: '1px solid black'
        }
      }, /*#__PURE__*/_react["default"].createElement("img", {
        src: "/static/example-doc.jpg",
        width: "100%"
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          flexGrow: 1,
          flexShrink: 1,
          width: '50%',
          padding: 15
        }
      }, "Select something with your mouse on the left side"));
    }
  }]);
  return App;
}(_react.Component);
module.exports = App;