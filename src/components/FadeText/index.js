import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {animate, setStatePromise} from "../../utils";
import {ENTERING, LEAVING, SCROLL_DOWN, SCROLL_UP} from "../../utils/constants";

import './style.css';

class FadeText extends Component {
	static propTypes = {
		className: PropTypes.string,
		forward: PropTypes.bool,
		duration: PropTypes.number
	};

	constructor(props) {
		super(props);
		this.state = {
			prevAnim: '',
			nextAnim: '',
			prev: props.children,
			text: props.children
		};
	}

	async componentDidUpdate(prevProps) {
		if (prevProps.children !== this.props.children) {
			let setState = setStatePromise(this),
				{forward, children: text} = this.props,
				scroll = forward ? SCROLL_UP : SCROLL_DOWN;
			await setState({text});
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
			await setState({prev: text});
		}
	}

	render() {
		return (
			<div className={`${this.props.className} wrapper`}>
				<div className={['text prev', this.state.prevAnim].join(' ')}>{this.state.prev}</div>
				<div className={['text next', this.state.nextAnim].join(' ')}>{this.state.text}</div>
			</div>
		);
	}
}

export default FadeText;