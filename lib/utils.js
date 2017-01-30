const attachEvent = (element, event, callback) => {
    if (element.addEventListener) {
        element.addEventListener(event, callback, false);
        return true;
    } else if (element.attachEvent) {
        return element.attachEvent("on" + event, callback);
    }
};

const detachEvent = (element, event, callback) => {
    if (element.removeEventListener) {
        element.removeEventListener(event, callback, false);
        return true;
    } else if (element.attachEvent) {
        return element.attachEvent("on" + event, callback);
    }
};

const addCommas = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const isSamePosition = (a, b) => a.x === b.x && a.y === b.y;

const getRandomColor = (a, b) => '#' + Math.floor(Math.random()*16777215).toString(16);

const getRandomNumber = (max) => Math.round(Math.random() * (max - 1));

const getRandomCoordinates = (numColumns, numRows) => {
    return {
        x : getRandomNumber(numColumns),
        y : getRandomNumber(numRows)
    };
};

const getDirectionFromKeyCode = (currentDirection, keyCode) => {
    switch(keyCode) {
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
}

const isInverseDirection = (dir1, dir2) => {
    switch (dir1) {
        case 'left':
            return (dir2 === 'right');
        case 'right':
            return (dir2 === 'left');
        case 'up':
            return (dir2 === 'down');
        case 'down':
            return (dir2 === 'up');
        default:
            return false;
    }    
};

module.exports = {
    attachEvent,
    detachEvent,
    addCommas,
    isSamePosition,
    getRandomColor,
    getRandomNumber,
    getRandomCoordinates,
    getDirectionFromKeyCode,
    isInverseDirection
};