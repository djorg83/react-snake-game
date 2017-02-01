'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var COLORS = ['#a9ff70', '#98e665', '#87cc5a', '#77b34f', '#558038', '#44672d', '#334d22', '#223416', '#111a0b'];

exports.default = function (_ref) {
    var scale = _ref.scale,
        x = _ref.x,
        y = _ref.y,
        color = _ref.color,
        index = _ref.index,
        props = _objectWithoutProperties(_ref, ['scale', 'x', 'y', 'color', 'index']);

    return _react2.default.createElement(
        _reactAddonsCssTransitionGroup2.default,
        {
            transitionName: 'segment',
            transitionAppear: true,
            transitionAppearTimeout: 500,
            transitionEnter: false,
            transitionLeave: false
        },
        _react2.default.createElement('div', { className: true, style: {
                position: 'absolute',
                top: scale * y,
                left: scale * x,
                height: scale,
                width: scale,
                backgroundColor: COLORS[0] //COLORS[Math.min(8, index)]
            } })
    );
};