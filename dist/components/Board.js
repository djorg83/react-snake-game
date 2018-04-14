'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Food = require('./Food');

var _Food2 = _interopRequireDefault(_Food);

var _Snake = require('./Snake');

var _Snake2 = _interopRequireDefault(_Snake);

var _GameOver = require('./GameOver');

var _GameOver2 = _interopRequireDefault(_GameOver);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Board = function (_Component) {
    _inherits(Board, _Component);

    function Board() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Board);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Board.__proto__ || Object.getPrototypeOf(Board)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            refreshRate: 200,
            scale: 10,
            columns: 25,
            rows: 25,
            direction: 'right',
            segments: [{
                x: 2,
                y: 0
            }, {
                x: 1,
                y: 0
            }, {
                x: 0,
                y: 0
            }],
            food: null,
            lastDirection: null,
            lastPosition: {
                x: 2,
                y: 0
            },
            dead: false,
            score: 0,
            highScore: 0,
            timer: null,
            changeDirectionTimeout: null,
            lastEat: Date.now()
        }, _this.restart = function () {
            _this.setState({
                direction: 'right',
                grid: _this.state.grid || _this.getGrid(),
                segments: [{
                    x: 2,
                    y: 0
                }, {
                    x: 1,
                    y: 0
                }, {
                    x: 0,
                    y: 0
                }],
                food: null,
                lastDirection: null,
                lastPosition: {
                    x: 2,
                    y: 0
                },
                dead: false,
                score: 0
            }, function () {
                return _this.placeFood();
            });
        }, _this.playSound = function (action) {
            if (_this.props.sound !== true) return;

            var audioClipName = null;
            switch (action) {
                case 'eat':
                    audioClipName = 'eat-food';
                    break;
                case 'die':
                    audioClipName = 'die';
                    break;
                case 'move':
                    audioClipName = 'tick';
                    break;
                case 'change-direction':
                    audioClipName = 'woosh';
                    break;
                default:
                    break;
            }

            if (audioClipName == null) return;

            _utils2.default.playAudioClip(audioClipName);
        }, _this.getSpeed = function () {
            var frequency = _this.state.refreshRate - 6 * _this.state.segments.length;
            return Math.max(30, frequency);
        }, _this.getScoreForMove = function () {
            var foodEaten = _this.state.segments.length - 3;
            var thisFoodScore = foodEaten * foodEaten * 100;
            var timeSinceLastEat = Date.now() - _this.state.lastEat;
            var bonusTime = foodEaten > 0 ? Math.max(0, 10000 - timeSinceLastEat) * Math.ceil(foodEaten / 5) : 0;
            var score = thisFoodScore + bonusTime;
            return score;
        }, _this.startTimer = function () {

            if (_this.state.timer != null) {
                clearInterval(_this.state.timer);
            }

            var speed = _this.getSpeed();
            var timer = setInterval(_this.move.bind(_this), speed);

            _this.setState({
                timer: timer
            }, function () {
                return _this.move();
            });
        }, _this.stopTimer = function () {
            clearInterval(_this.state.timer);
            _this.setState(function (prevState) {
                return { timer: null };
            });
        }, _this.getFoodCoordinates = function () {
            var point = null;
            while (point == null || _this.doesPointIntersect(point, _this.state.segments)) {
                point = _utils2.default.getRandomCoordinates(_this.state.columns, _this.state.rows);
            }
            return point;
        }, _this.placeFood = function (previousFood) {

            var scoreForMove = _this.getScoreForMove();
            var score = _this.state.score + scoreForMove;
            var highScore = localStorage.getItem('snake-high-score') || 0;

            var scoreLocation = null;
            if (previousFood != null) {
                scoreLocation = {
                    points: scoreForMove,
                    x: previousFood.x,
                    y: previousFood.y
                };
            }

            var food = _this.getFoodCoordinates();

            _this.setState({
                food: food,
                score: score,
                scoreLocation: scoreLocation,
                highScore: highScore,
                lastEat: Date.now()
            }, function () {
                return _this.startTimer();
            });
        }, _this.changeDirection = function (e) {

            if (_this.state.changeDirectionTimeout != null) {
                clearTimeout(_this.state.changeDirectionTimeout);
            }

            if ((typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object' && e.keyCode === 13 && _this.state.dead) return _this.restart();

            var head = _this.state.segments[0];

            var nextDirection = typeof e === 'string' ? e : _utils2.default.getDirectionFromKeyCode(_this.state.direction, e.keyCode);

            if (_this.state.lastDirection != null && _utils2.default.isSamePosition(head, _this.state.lastPosition)) {

                if (_utils2.default.isInverseDirection(nextDirection, _this.state.lastDirection)) {
                    var timeout = setTimeout(function () {
                        return _this.changeDirection(e);
                    }, 100);
                    console.log('death prevented');
                    return _this.setState({
                        changeDirectionTimeout: timeout
                    });
                }
            }

            if (nextDirection === _this.state.direction) return;

            _this.playSound('change-direction');

            _this.setState({
                direction: nextDirection,
                lastDirection: _this.state.direction,
                lastPosition: {
                    x: head.x,
                    y: head.y
                }
            }, function () {
                return _this.startTimer();
            });
        }, _this.move = function () {
            if (_this.state.dead) return;

            var segments = _this.state.segments.slice(0);
            var removed = segments.pop();

            var head = segments.length < 1 ? {
                x: removed.x,
                y: removed.y
            } : {
                x: segments[0].x,
                y: segments[0].y
            };

            switch (_this.state.direction) {
                case 'left':
                    head.x--;
                    break;
                case 'up':
                    head.y--;
                    break;
                case 'down':
                    head.y++;
                    break;
                case 'right':
                default:
                    head.x++;
                    break;
            }

            var dead = false;

            if (head.x < 0) dead = true;
            if (head.y < 0) dead = true;
            if (head.x > _this.state.columns - 1) dead = true;
            if (head.y > _this.state.rows - 1) dead = true;

            segments.unshift(head);

            var ateFood = _utils2.default.isSamePosition(head, _this.state.food);
            if (ateFood) {
                segments.push(removed);
            }

            dead = dead || _this.doesPointIntersect(segments[0], segments);

            var highScore = localStorage.getItem('snake-high-score') || 0;
            if (dead && (highScore == null || _this.state.score > highScore)) {
                highScore = _this.state.score;
                localStorage.setItem('snake-high-score', highScore);
            }

            var previousFood = _this.state.food;

            _this.setState({
                segments: segments,
                dead: dead,
                food: ateFood ? null : _this.state.food,
                scoreLocation: ateFood ? null : _this.state.scoreLocation
            }, function () {
                if (_this.state.dead) {
                    _this.playSound('die');
                } else if (ateFood) {
                    _this.playSound('eat');
                    _this.placeFood(previousFood);
                } else {
                    _this.playSound('move');
                }
            });
        }, _this.doesPointIntersect = function (point, segments) {
            return segments.length > 1 && segments.some(function (position, i) {
                return i > 0 && _utils2.default.isSamePosition(position, point);
            });
        }, _this.getGrid = function () {
            var borderColor = _this.state.dead ? '#666' : '#ccc';
            var tiles = [];
            for (var y = 0; y < _this.state.rows; y++) {
                for (var x = 0; x < _this.state.columns; x++) {
                    tiles.push(_react2.default.createElement('div', {
                        key: "tile-" + x + '-' + y,
                        style: {
                            position: 'absolute',
                            height: _this.state.scale,
                            width: _this.state.scale,
                            top: _this.state.scale * y,
                            left: _this.state.scale * x
                            //borderLeft : x > 0 ? `1px solid ${borderColor}` : 'none',
                            //borderBottom : y < this.state.columns - 1 ? `1px solid ${borderColor}` : 'none'
                        }
                    }));
                }
            }
            return tiles;
        }, _this.enforceMinMax = function (value, min, max) {
            return Math.max(min, Math.min(max, value));
        }, _this.getScoreLocation = function () {
            if (_this.state.scoreLocation == null) return null;

            var top = _this.state.scale * _this.state.scoreLocation.y;
            var left = _this.state.scale * _this.state.scoreLocation.x;

            var minTop = 50;
            var maxTop = _this.state.boardHeight - minTop;

            var minLeft = 100;
            var maxLeft = _this.state.boardWidth - minLeft;

            top = _this.enforceMinMax(top, minTop, maxTop);
            left = _this.enforceMinMax(left, minLeft, maxLeft);

            return { top: top, left: left };
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Board, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var container = document.getElementById('snake-container').parentElement;
            var containerWidth = container.offsetWidth;
            var containerHeight = container.offsetHeight;
            var boardWidth = containerWidth - 125;
            var boardHeight = containerHeight - 125;

            var scale = Math.floor(boardWidth / this.state.columns);

            this.setState({
                boardWidth: boardWidth,
                boardHeight: boardHeight,
                scale: scale,
                rows: Math.floor(boardHeight / scale)
            }, function () {
                return _this2.restart();
            });

            _utils2.default.attachEvent(window, 'keydown', this.changeDirection.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _utils2.default.detachEvent(window, 'keydown', this.changeDirection.bind(this));
            this.stopTimer();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this,
                _React$createElement;

            var scoreLocation = this.getScoreLocation();

            return _react2.default.createElement(
                'div',
                { style: {
                        width: '100%',
                        height: '100%',
                        position: 'relative'
                    } },
                _react2.default.createElement(
                    'style',
                    { type: 'text/css', scoped: true },
                    '.segment-appear {\n                    \topacity: 0.01;\n                    }\n                    \n                    .segment-appear.segment-appear-active {\n                    \topacity: 1;\n                    \ttransition: opacity .5s ease-in;\n                    }\n                    \n                    .food {\n                    \tanimation: food-appear .3s;\n                    }\n                    \n                    @-webkit-keyframes food-appear {\n                    \t0% {\n                    \t\ttop: 0;\n                    \t\tleft: 0;\n                    \t\twidth: 300px;\n                    \t\theight: 300px;\n                    \t\tborder-radius: 300px;\n                    \t}\n                    }\n                    @-moz-keyframes food-appear {\n                    \t0% {\n                    \t\ttop: 0;\n                    \t\tleft: 0;\n                    \t\twidth: 300px;\n                    \t\theight: 300px;\n                    \t\tborder-radius: 300px;\n                    \t}\n                    }\n                    keyframes food-appear {\n                    \t0% {\n                    \t\ttop: 0;\n                    \t\tleft: 0;\n                    \t\twidth: 300px;\n                    \t\theight: 300px;\n                    \t\tborder-radius: 300px;\n                    \t}\n                    }\n                    \n                    .blink {\n                    \tanimation: blink 2s infinite;\n                    \t-webkit-animation: blink 2s infinite;\n                    }\n                    \n                    @-webkit-keyframes blink {\n                    \t0% {\n                    \t\topacity: 0;\n                    \t}\n                    \t50% {\n                    \t\topacity: 1;\n                    \t}\n                    \t100% {\n                    \t\topacity: 0;\n                    \t}\n                    }\n                    @-moz-keyframes blink {\n                    \t0% {\n                    \t\topacity: 0;\n                    \t}\n                    \t50% {\n                    \t\topacity: 1;\n                    \t}\n                    \t100% {\n                    \t\topacity: 0;\n                    \t}\n                    }\n                    keyframes blink {\n                    \t0% {\n                    \t\topacity: 0;\n                    \t}\n                    \t50% {\n                    \t\topacity: 1;\n                    \t}\n                    \t100% {\n                    \t\topacity: 0;\n                    \t}\n                    }\n                    \n                    .score {\n                    \tanimation-name: score;\n                    \tanimation-duration: .7s;\n                    \tanimation-timing-function: ease-out; \n                    }\n                    \n                    @-webkit-keyframes score {\n                    \t0% {\n                    \t\tfont-size: 15px;\n                    \t\theight: 15px;\n                    \t\topacity: 1;\n                    \t}\n                    \t75% {\n                    \t\tfont-size: 40px;\n                    \t\theight: 40px;\n                    \t\topacity: 1;\n                    \t}\n                    \t100% {\n                    \t\tfont-size: 50px;\n                    \t\theight: 50px;\n                    \t\topacity: 1;\n                    \t}\n                    }\n                    @-moz-keyframes score {\n                    \t0% {\n                    \t\tfont-size: 15px;\n                    \t\theight: 15px;\n                    \t\topacity: 1;\n                    \t}\n                    \t75% {\n                    \t\tfont-size: 40px;\n                    \t\theight: 40px;\n                    \t\topacity: 1;\n                    \t}\n                    \t100% {\n                    \t\tfont-size: 50px;\n                    \t\theight: 50px;\n                    \t\topacity: 1;\n                    \t}}\n                    keyframes score {\n                    \t0% {\n                    \t\tfont-size: 15px;\n                    \t\theight: 15px;\n                    \t\topacity: 1;\n                    \t}\n                    \t75% {\n                    \t\tfont-size: 40px;\n                    \t\theight: 40px;\n                    \t\topacity: 1;\n                    \t}\n                    \t100% {\n                    \t\tfont-size: 50px;\n                    \t\theight: 50px;\n                    \t\topacity: 1;\n                    \t}\n                    }'
                ),
                _react2.default.createElement(
                    'div',
                    { style: {
                            height: 30,
                            marginLeft: 10,
                            fontSize: Math.max(10, this.state.scale * .6)
                        } },
                    _react2.default.createElement(
                        'div',
                        { style: {
                                float: 'left',
                                color: '#000'
                            } },
                        _react2.default.createElement(
                            'strong',
                            null,
                            'High Score:'
                        ),
                        '\xA0',
                        _utils2.default.addCommas(this.state.highScore)
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: {
                                float: 'left',
                                marginLeft: 10,
                                color: '#000'
                            } },
                        _react2.default.createElement(
                            'strong',
                            null,
                            'Score:'
                        ),
                        '\xA0',
                        _utils2.default.addCommas(this.state.score)
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        id: 'snake-container',
                        onClick: this.state.dead ? this.restart : function () {},
                        style: {
                            width: this.state.scale * this.state.columns,
                            height: this.state.scale * this.state.rows,
                            position: 'relative',
                            backgroundColor: '#333',
                            marginLeft: 5,
                            border: '2px solid #ccc',
                            boxShadow: '1px 2px 8px 0px rgba(0, 0, 0, 0.2)',
                            overflow: 'hidden'
                        }
                    },
                    this.state.grid,
                    _react2.default.createElement(_Snake2.default, this.state),
                    _react2.default.createElement(_Food2.default, _extends({}, this.state, this.state.food)),
                    scoreLocation && _react2.default.createElement(
                        'div',
                        { className: 'score', style: {
                                opacity: 0,
                                position: 'absolute',
                                top: scoreLocation.top,
                                left: scoreLocation.left,
                                width: 1000,
                                height: 200,
                                textAlign: 'center'
                            } },
                        _react2.default.createElement(
                            'div',
                            { style: {
                                    position: 'relative',
                                    left: '-50%',
                                    top: '-50%',
                                    color: '#0f79d6',
                                    textShadow: '0px 0px 10px #333'
                                } },
                            '+',
                            this.state.scoreLocation.points
                        )
                    ),
                    this.state.dead && _react2.default.createElement(_GameOver2.default, { restart: this.restart })
                ),
                _react2.default.createElement(
                    'div',
                    { style: {
                            position: 'absolute',
                            top: 100,
                            right: 5
                        } },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'button',
                            {
                                onClick: function onClick() {
                                    return _this3.changeDirection('up');
                                },
                                onTouchEnd: function onTouchEnd() {
                                    return _this3.changeDirection('up');
                                },
                                style: {
                                    width: 35,
                                    height: 35,
                                    marginLeft: 35,
                                    backgroundColor: this.state.direction === 'up' ? '#999' : '#ccc'
                                }
                            },
                            '\u2191'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'button',
                            {
                                onClick: function onClick() {
                                    return _this3.changeDirection('left');
                                },
                                onTouchEnd: function onTouchEnd() {
                                    return _this3.changeDirection('left');
                                },
                                style: {
                                    width: 35,
                                    height: 35,
                                    backgroundColor: this.state.direction === 'left' ? '#999' : '#ccc'
                                }
                            },
                            '\u2190'
                        ),
                        _react2.default.createElement(
                            'button',
                            (_React$createElement = {
                                onClick: function onClick() {
                                    return _this3.changeDirection('down');
                                }
                            }, _defineProperty(_React$createElement, 'onClick', function onClick() {
                                return _this3.changeDirection('down');
                            }), _defineProperty(_React$createElement, 'style', {
                                width: 35,
                                height: 35,
                                backgroundColor: this.state.direction === 'down' ? '#999' : '#ccc'
                            }), _React$createElement),
                            '\u2193'
                        ),
                        _react2.default.createElement(
                            'button',
                            {
                                onClick: function onClick() {
                                    return _this3.changeDirection('right');
                                },
                                onTouchEnd: function onTouchEnd() {
                                    return _this3.changeDirection('right');
                                },
                                style: {
                                    width: 35,
                                    height: 35,
                                    backgroundColor: this.state.direction === 'right' ? '#999' : '#ccc'
                                }
                            },
                            '\u2192'
                        )
                    )
                )
            );
        }
    }]);

    return Board;
}(_react.Component);

Board.defaultProps = {
    sound: true
};
exports.default = Board;