import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const COLORS = [
    '#a9ff70',
    '#98e665',
    '#87cc5a',
    '#77b34f',
    '#558038',
    '#44672d',
    '#334d22',
    '#223416',
    '#111a0b'
];

export default ({ scale, x, y, color, index, ...props }) => (
    <ReactCSSTransitionGroup
        transitionName="segment"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}
    >
    	 <div className style={{
            position        : 'absolute',
            top             : (scale * y),
            left            : (scale * x),
            height          : scale,
            width           : scale,
            backgroundColor : COLORS[0]//COLORS[Math.min(8, index)]
        }}>
        </div>
    </ReactCSSTransitionGroup>
);
