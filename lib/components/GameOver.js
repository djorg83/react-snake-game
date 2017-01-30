import React from 'react';

export default () => (
	<div style={{
        position  : 'absolute',
        top       : '45%',
        width     : '100%',
        textAlign : 'center',
        color     : 'white'
    }}>
        <div style={{
            fontSize     : 20,
            fontWeight   : 'bold',
            marginBottom : 20
        }}>
            <div style={{
                fontSize: 50
            }}>
                Game Over
            </div>
            <div className="blink">Click to Continue</div>
        </div>
    </div>
);