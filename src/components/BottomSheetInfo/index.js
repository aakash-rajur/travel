import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {animate, joinClassNames} from "../../utils";

import './style.css'

class BottomSheetInfo extends Component {
	static propTypes = {
		description: PropTypes.string,
		emphasis: PropTypes.string,
		duration: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.onShowInfo = this.onShowInfo.bind(this);
		this.onHideInfo = this.onHideInfo.bind(this);
		this.state = {
			animations: []
		};
	}

	render() {
		let {
			description,
			emphasis
		} = this.props;
		return (
			<div className={joinClassNames('bottom-sheet', this.state.animations)}
			     onTouchStart={e => e.stopPropagation()} onTouchEnd={e => e.stopPropagation()}>
				<div className="draw" onClick={Boolean(this.state.animations.length) ? this.onHideInfo : this.onShowInfo}>
					<div className={'morph'}>
						<span className="material-icons">
							expand_less
						</span>
						<span className="back">Back to cities</span>
					</div>
					<div className={'explore'}>
						Explore this Cities
					</div>
				</div>
				<div className="description-wrapper">
					<p>
						<span className="big">{description.substring(0, 1)}</span>
						{description.substring(1)}
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eum harum quia vero.
						Accusamus
						atque aut blanditiis delectus dolore, doloribus dolorum enim error itaque magni odit qui, quis,
						totam
						voluptatem.
					</p>
					<p className='emphasis'>{emphasis}</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos eum harum quia vero.
						Accusamus
						atque aut blanditiis delectus dolore, doloribus dolorum enim error itaque magni odit qui, quis,
						totam
						voluptatem.
					</p>
				</div>
			</div>
		);
	}

	async onShowInfo() {
		await animate(this, 'animations', [{
			animation: 'slide-up',
			duration: 1400
		}]);
	}

	async onHideInfo() {
		await animate(this, 'animations', [{
			animation: 'slide-down',
			done: '',
			duration: 750
		}]);
	}
}

export default BottomSheetInfo;