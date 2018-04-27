import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {animate, setStatePromise} from "../../utils";
import {ENTERING, LEAVING, SCROLL_BEGIN, SCROLL_DOWN, SCROLL_END, SCROLL_UP} from "../../utils/constants";

import './style.css';

class FadeImage extends Component {
	static propTypes = {
		src: PropTypes.string,
		className: PropTypes.string,
		forward: PropTypes.bool,
		duration: PropTypes.number,
		onScroll: PropTypes.func
	};
	
	constructor(props) {
		super(props);
		
		this.state = {
			prevAnim: [],
			nextAnim: [],
			prev: props.src,
			src: props.src
		};
	}
	
	async componentDidUpdate(prevProps) {
		if (prevProps.src !== this.props.src) {
			let setState = setStatePromise(this),
				{src, forward, onScroll} = this.props,
				scroll = forward ? SCROLL_UP : SCROLL_DOWN;
			onScroll && onScroll(SCROLL_BEGIN);
			await setState({src});
			await Promise.all([
				animate(this, 'prevAnim', [{
					animation: `${scroll} ${LEAVING}`,
					duration: this.props.duration,
					done: ''
				}]),
				animate(this, 'nextAnim', [{
					animation: `${scroll} ${ENTERING}`,
					duration: this.props.duration,
					done: ''
				}])
			]);
			await setState({prev: src});
			onScroll && onScroll(SCROLL_END);
		}
	}
	
	render() {
		return (
			<div className={`${this.props.className} wrapper`}>
				<img src={this.state.prev} alt='city'
				     className={['image', 'prev'].concat(this.state.prevAnim).join(' ')}/>
				<img src={this.state.src} alt='city'
				     className={['image', 'next'].concat(this.state.nextAnim).join(' ')}/>
			</div>
		);
	}
}

export default FadeImage;