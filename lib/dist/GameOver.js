'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return _react2.default.createElement(
        'div',
        { style: {
                position: 'absolute',
                top: '45%',
                width: '100%',
                textAlign: 'center',
                color: 'white'
            } },
        _react2.default.createElement(
            'div',
            { style: {
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 20
                } },
            _react2.default.createElement(
                'div',
                { style: {
                        fontSize: 50
                    } },
                'Game Over'
            ),
            _react2.default.createElement(
                'div',
                { className: 'blink' },
                'Click to Continue'
            )
        )
    );
};