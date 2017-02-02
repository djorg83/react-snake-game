'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ALIVE_COLOR = 'red';
var DEAD_COLOR = 'gray';

exports.default = function (_ref) {
    var scale = _ref.scale,
        x = _ref.x,
        y = _ref.y,
        dead = _ref.dead,
        props = _objectWithoutProperties(_ref, ['scale', 'x', 'y', 'dead']);

    if (props.food == null) return false;
    return _react2.default.createElement('div', {
        className: 'food',
        style: {
            position: 'absolute',
            borderRadius: scale,
            top: scale * y,
            left: scale * x,
            height: scale / 2,
            width: scale / 2,
            marginTop: scale / 4,
            marginLeft: scale / 4,
            backgroundColor: dead ? DEAD_COLOR : ALIVE_COLOR
        }
    });
};