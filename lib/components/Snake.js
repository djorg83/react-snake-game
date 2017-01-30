import React   from 'react';
import Segment from './Segment';

export default ({ segments, ...props }) => (
	<div>
		 {segments.map((position, i) => {
	        return (
	            <Segment
	            	key={'segment-' + i}
	            	index={i}
	            	{...position}
	            	{...props}
	            />                            
	        );
	    })}
	</div>
);