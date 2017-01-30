'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Segment = require('./Segment');

var _Segment2 = _interopRequireDefault(_Segment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function (_ref) {
	var segments = _ref.segments,
	    props = _objectWithoutProperties(_ref, ['segments']);

	return _react2.default.createElement(
		'div',
		null,
		segments.map(function (position, i) {
			return _react2.default.createElement(_Segment2.default, _extends({
				key: 'segment-' + i,
				index: i
			}, position, props));
		})
	);
};