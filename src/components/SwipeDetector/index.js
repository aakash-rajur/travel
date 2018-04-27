import PropTypes from 'prop-types';
import React, {Component} from 'react';

function sanitize(props) {
	let sanitized = {...props};
	sanitized.hasOwnProperty('onSwipeUp') && (delete  sanitized.onSwipeUp);
	sanitized.hasOwnProperty('onSwipeDown') && (delete  sanitized.onSwipeDown);
	sanitized.hasOwnProperty('onSwipeLeft') && (delete  sanitized.onSwipeLeft);
	sanitized.hasOwnProperty('onSwipeRight') && (delete  sanitized.onSwipeRight);
	sanitized.hasOwnProperty('children') && (delete  sanitized.children);
	sanitized.hasOwnProperty('threshold') && (delete sanitized.threshold);
	return sanitized;
}

function getAngle(x1, y1, x2, y2) {
	let angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
	return angle < 0 ? -angle : 360 - angle;
}

class SwipeDetector extends Component {
	static propTypes = {
		onSwipeUp: PropTypes.func,
		onSwipeDown: PropTypes.func,
		onSwipeLeft: PropTypes.func,
		onSwipeRight: PropTypes.func,
		threshold: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.onTouchStart = this.onTouchStart.bind(this);
		this.onTouchMove = this.onTouchMove.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
		this.start = null;
	}

	render() {
		return (
			<div {...sanitize(this.props)}
			     onTouchStart={this.onTouchStart}
			     onTouchMove={this.onTouchMove}
			     onTouchEnd={this.onTouchEnd}>
				{this.props.children}
			</div>
		);
	}

	onTouchStart({changedTouches: [touch]}) {
		let {clientX: x, clientY: y} = touch;
		this.start = {x, y};
	}

	onTouchMove(e) {
		//console.log(e);
	}

	onTouchEnd({changedTouches: [touch]}) {
		if (!this.start) return;
		let {clientX: x, clientY: y} = touch,
			{threshold = 15} = this.props,
			angle = getAngle(this.start.x, this.start.y, x, y);
		if (angle < (threshold) && angle > -threshold) {
			let {onSwipeLeft} = this.props;
			return onSwipeLeft && onSwipeLeft();
		}
		if (angle < (180 + threshold) && angle > (180 - threshold)) {
			let {onSwipeRight} = this.props;
			return onSwipeRight && onSwipeRight();
		}
		if (angle < (90 + threshold) && angle > (90 - threshold)) {
			let {onSwipeUp} = this.props;
			onSwipeUp && onSwipeUp();
		}
		if (angle < (270 + threshold) && angle > (270 - threshold)) {
			let {onSwipeDown} = this.props;
			onSwipeDown && onSwipeDown();
		}
	}
}

export default SwipeDetector;