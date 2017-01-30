'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function (_ref) {
    var scale = _ref.scale,
        x = _ref.x,
        y = _ref.y,
        color = _ref.color,
        props = _objectWithoutProperties(_ref, ['scale', 'x', 'y', 'color']);

    if (props.food == null) return false;
    return _react2.default.createElement('div', {
        className: 'food',
        id: 'food-' + color,
        style: {
            position: 'absolute',
            border: '1px solid #ccc',
            borderRadius: scale,
            top: scale * y,
            left: scale * x,
            height: scale / 2,
            width: scale / 2,
            marginTop: scale / 4,
            marginLeft: scale / 4,
            backgroundColor: color
        }
    });
};