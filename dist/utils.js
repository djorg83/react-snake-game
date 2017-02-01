"use strict";

var attachEvent = function attachEvent(element, event, callback) {
    if (element.addEventListener) {
        element.addEventListener(event, callback, false);
        return true;
    } else if (element.attachEvent) {
        return element.attachEvent("on" + event, callback);
    }
};

var detachEvent = function detachEvent(element, event, callback) {
    if (element.removeEventListener) {
        element.removeEventListener(event, callback, false);
        return true;
    } else if (element.attachEvent) {
        return element.attachEvent("on" + event, callback);
    }
};

var addCommas = function addCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var isSamePosition = function isSamePosition(a, b) {
    return a.x === b.x && a.y === b.y;
};

var getRandomColor = function getRandomColor(a, b) {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

var getRandomNumber = function getRandomNumber(max) {
    return Math.round(Math.random() * (max - 1));
};

var getRandomCoordinates = function getRandomCoordinates(numColumns, numRows) {
    return {
        x: getRandomNumber(numColumns),
        y: getRandomNumber(numRows)
    };
};

var getDirectionFromKeyCode = function getDirectionFromKeyCode(currentDirection, keyCode) {
    switch (keyCode) {
        case 37:
            if (currentDirection === 'right') break;
            if (currentDirection === 'left') break;
            return 'left';
        case 38:
            if (currentDirection === 'down') break;
            if (currentDirection === 'up') break;
            return 'up';
        case 39:
            if (currentDirection === 'left') break;
            if (currentDirection === 'right') break;
            return 'right';
        case 40:
            if (currentDirection === 'up') break;
            if (currentDirection === 'down') break;
            return 'down';
        default:
            break;
    }
    return currentDirection;
};

var isInverseDirection = function isInverseDirection(dir1, dir2) {
    switch (dir1) {
        case 'left':
            return dir2 === 'right';
        case 'right':
            return dir2 === 'left';
        case 'up':
            return dir2 === 'down';
        case 'down':
            return dir2 === 'up';
        default:
            return false;
    }
};

var registerAudioClip = function registerAudioClip(path) {

    var audio = new Audio(path);
    audio.preload = 'none';

    return {
        preload: function preload(to) {
            audio.setAttribute('preload', to);
            return this;
        },
        play: function play() {
            audio.pause();
            audio.currentTime = 0;
            audio.play();
            return this;
        }
    };
};

var sounds = {
    'eat-food': registerAudioClip('https://djorg83.github.io/react-snake-app/eat-food.mp3').preload(),
    die: registerAudioClip('https://djorg83.github.io/react-snake-app/die.mp3').preload()
};

var playAudioClip = function playAudioClip(name) {
    if (sounds[name]) {
        sounds[name].play();
    }
};

module.exports = {
    attachEvent: attachEvent,
    detachEvent: detachEvent,
    addCommas: addCommas,
    isSamePosition: isSamePosition,
    getRandomColor: getRandomColor,
    getRandomNumber: getRandomNumber,
    getRandomCoordinates: getRandomCoordinates,
    getDirectionFromKeyCode: getDirectionFromKeyCode,
    isInverseDirection: isInverseDirection,
    playAudioClip: playAudioClip
};