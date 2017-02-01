import React, { Component } from 'react';
import Food     from './Food';
import Snake    from './Snake';
import GameOver from './GameOver';
import utils    from '../utils';

class Board extends Component {

    static defaultProps = {
        sound: true
    };

    state = {
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
        lastPosition  : {
            x : 2,
            y : 0
        },
        dead: false,
        score: 0,
        highScore: 0,
        timer: null,
        changeDirectionTimeout: null,
        lastEat: Date.now()
    };

    componentDidMount() {
        const container = document.getElementById('snake-container').parentElement;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const boardWidth = containerWidth - 30;
        const boardHeight = containerHeight - 30;

        const scale = Math.floor(boardWidth / this.state.columns);

        this.setState({
            scale: scale,
            rows: Math.floor(boardHeight / scale)
        }, () => this.restart());

        utils.attachEvent(window, 'keydown', this.changeDirection.bind(this));
    }

    componentWillUnmount() {
        utils.detachEvent(window, 'keydown', this.changeDirection.bind(this));
    }

    restart = () => {
        this.setState({
            direction: 'right',
            grid: this.state.grid || this.getGrid(),
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
            lastPosition  : {
                x : 2,
                y : 0
            },
            dead: false,
            score: 0
        }, () => this.placeFood());
    };

    getSpeed = () => {
        let frequency = this.state.refreshRate - (6 * this.state.segments.length);
        return Math.max(30, frequency);
    };

    getScoreForMove = () => {
        const foodEaten        = this.state.segments.length - 3;
        const thisFoodScore    = (foodEaten * foodEaten * 100);
        const timeSinceLastEat = Date.now() - this.state.lastEat;
        const bonusTime        = foodEaten > 0 ? (Math.max(0, 10000 - timeSinceLastEat) * Math.ceil(foodEaten / 5)): 0;
        const score            = thisFoodScore + bonusTime;
        return score;
    };

    startTimer = () => {

        if (this.state.timer != null) {
            clearInterval(this.state.timer);
        }

        const speed = this.getSpeed();
        const timer = setInterval(this.move.bind(this), speed);

        this.setState({
            timer : timer
        });
    };

    getFoodColor = () => 'red';//utils.getRandomColor();

    getFoodCoordinates = () => {
        let point = null;
        while (point == null || this.doesPointIntersect(point, this.state.segments)) {
            point = utils.getRandomCoordinates(this.state.columns, this.state.rows);
        }
        return point;
    };

    placeFood = (previousFood) => {

        const scoreForMove = this.getScoreForMove();
        const score        = this.state.score + scoreForMove;
        const highScore = localStorage.getItem('snake-high-score') || 0;

        let scoreLocation = null;
        if (previousFood != null) {
            scoreLocation = {
                points: scoreForMove,
                x: previousFood.x,
                y: previousFood.y,
            };
        }

        const food = this.getFoodCoordinates();
        food.color = this.getFoodColor();

        this.setState({
            food          : food,
            score         : score,
            scoreLocation : scoreLocation,
            highScore     : highScore,
            lastEat       : Date.now()
        }, () => this.startTimer());
    };

    changeDirection = (e) => {

        if (this.state.changeDirectionTimeout != null) {
            clearTimeout(this.state.changeDirectionTimeout);
        }

        if (e.keyCode === 13 && this.state.dead) return this.restart();
        
        const head = this.state.segments[0];

        const nextDirection = utils.getDirectionFromKeyCode(this.state.direction, e.keyCode);

        if (this.state.lastDirection != null && utils.isSamePosition(head, this.state.lastPosition)) {

            if (utils.isInverseDirection(nextDirection, this.state.lastDirection)) {
                const timeout = setTimeout(() => this.changeDirection(e), 100);
                console.log('death prevented');
                return this.setState({
                    changeDirectionTimeout: timeout
                });
            }
        }

        this.setState({
            direction     : nextDirection,
            lastDirection : this.state.direction,
            lastPosition  : {
                x : head.x,
                y : head.y
            }
        });
    };

    move = () => {
        if (this.state.dead) return;

        const segments = this.state.segments.slice(0);
        const removed = segments.pop();

        const head = segments.length < 1 ? {
            x: removed.x,
            y: removed.y
        } : {
            x: segments[0].x,
            y: segments[0].y
        };

        switch(this.state.direction) {
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

        let dead = false;

        if (head.x < 0) dead = true;
        if (head.y < 0) dead = true;
        if (head.x > this.state.columns - 1) dead = true;
        if (head.y > this.state.rows - 1) dead = true;

        segments.unshift(head);

        const ateFood = utils.isSamePosition(head, this.state.food);
        if (ateFood) {
            segments.push(removed);
        }

        dead = dead || this.doesPointIntersect(segments[0], segments);

        let highScore = localStorage.getItem('snake-high-score') || 0;
        if (dead && (highScore == null || this.state.score > highScore)) {
            highScore = this.state.score;
            localStorage.setItem('snake-high-score', highScore);
        }

        const previousFood = this.state.food;

        this.setState({
            segments      : segments,
            dead          : dead,
            food          : ateFood ? null : this.state.food,
            scoreLocation : ateFood ? null : this.state.scoreLocation
        }, () => {
            if (this.state.dead) {
                if (this.props.sound === true) utils.playAudioClip('die');      
            } else if (ateFood) {
                if (this.props.sound === true) utils.playAudioClip('eat-food');
                this.placeFood(previousFood);
            }
        });
    };

    doesPointIntersect = (point, segments) => {
        return segments.length > 1 && segments.some((position, i) => {
            return i > 0 && utils.isSamePosition(position, point);
        });
    };

    getGrid = () => {
        const borderColor = this.state.dead ? '#666' : '#ccc';
        const tiles = [];
        for (let y = 0; y < this.state.rows; y++) {
            for (let x = 0; x < this.state.columns; x++) {
                tiles.push((
                    <div
                        key={"tile-" + x + '-' + y}
                        style={{
                            position : 'absolute',
                            height   : this.state.scale,
                            width    : this.state.scale,
                            top      : this.state.scale * y,
                            left     : this.state.scale * x
                            //borderLeft : x > 0 ? `1px solid ${borderColor}` : 'none',
                            //borderBottom : y < this.state.columns - 1 ? `1px solid ${borderColor}` : 'none'
                        }}
                    >
                    </div>
                ));
            }
        }
        return tiles;
    };

    render() {
        return (
            <div style={{
                width      : '100%',
                height     : '100%'
            }}>

                <style type="text/css" scoped>
                    {`<Inject>../css/index.css</Inject>`}
                </style>

                <div style={{
                    height : 30,
                    fontSize: Math.max(10, this.state.scale * .6)
                }}>
                    <div style={{
                        float  : 'left',
                        marginLeft : 30,
                        color  : '#000'
                    }}>
                        <strong>High Score:</strong>&nbsp;{utils.addCommas(this.state.highScore)}
                    </div>
                    
                    <div style={{
                        float  : 'right',
                        marginRight : 30,
                        color  : '#000'
                    }}>
                        <strong>Score:</strong>&nbsp;{utils.addCommas(this.state.score)}
                    </div>
                </div>
                <div
                    id="snake-container" 
                    onClick={this.state.dead ? this.restart : () => {}}
                    style={{
                        width           : this.state.scale * this.state.columns,
                        height          : this.state.scale * this.state.rows,
                        position        : 'relative',
                        margin          : '0 auto',
                        backgroundColor : '#333',
                        border          : '2px solid #ccc',
                        boxShadow       : '1px 2px 8px 0px rgba(0, 0, 0, 0.2)',
                        overflow        : 'hidden'
                    }}
                >

                    {this.state.grid}

                    {this.state.dead && <GameOver restart={this.restart} />}
                    <Snake {...this.state} />
                    <Food {...this.state} {...this.state.food} />
                    {this.state.scoreLocation && (
                        <div className="score" style={{
                            opacity   : 0,
                            position  : 'absolute',
                            top       : this.state.scale * this.state.scoreLocation.y,
                            left      : this.state.scale * this.state.scoreLocation.x,
                            width     : 1000,
                            height    : 200,
                            textAlign : 'center'
                        }}>
                            <div style={{
                                position: 'relative',
                                left: '-50%',
                                top: '-50%',
                                color: '#0f79d6'
                            }}>
                                +{this.state.scoreLocation.points}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Board;