import React from 'react';

const ALIVE_COLOR = 'red';
const DEAD_COLOR = 'gray';

export default ({ scale, x, y, dead, ...props }) => {
    if (props.food == null) return false;
    return (
        <div
            className="food"
            style={{
                position        : 'absolute',
                borderRadius    : scale,
                top             : scale * y,
                left            : scale * x,
                height          : scale / 2,
                width           : scale / 2,
                marginTop       : scale / 4,
                marginLeft      : scale / 4,
                backgroundColor : dead ? DEAD_COLOR : ALIVE_COLOR
            }}
        >                   
        </div>
    );
};
