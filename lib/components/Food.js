import React from 'react';

export default ({ scale, x, y, color, ...props }) => {
    if (props.food == null) return false;
    return (
        <div
            className="food"
            id={'food-' + color} 
            style={{
                position        : 'absolute',
                borderRadius    : scale,
                top             : scale * y,
                left            : scale * x,
                height          : scale / 2,
                width           : scale / 2,
                marginTop       : scale / 4,
                marginLeft      : scale / 4,
                backgroundColor : color
            }}
        >                   
        </div>
    );
};
