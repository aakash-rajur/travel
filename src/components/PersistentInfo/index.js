import PropTypes from 'prop-types';
import React from 'react';

import './style.css';

function PersistentInfo({description, emphasis, className}) {
	return (
		<div className={`${className} city-info`}>
			<div className="explore">Explore this city</div>
			<div className="description-wrapper">
				<p>
					<span className="big">{description.substring(0, 1)}</span>
					{description.substring(1)}
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eum harum quia vero. Accusamus
					atque aut blanditiis delectus dolore, doloribus dolorum enim error itaque magni odit qui, quis,
					totam
					voluptatem.
				</p>
				<p className='emphasis'>{emphasis}</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eum harum quia vero. Accusamus
					atque aut blanditiis delectus dolore, doloribus dolorum enim error itaque magni odit qui, quis,
					totam
					voluptatem.
				</p>
			</div>
		</div>
	);
}

PersistentInfo.propTypes = {
	description: PropTypes.string,
	emphasis: PropTypes.string,
	className: PropTypes.string
};

export default PersistentInfo;