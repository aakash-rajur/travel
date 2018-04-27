import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {joinClassNames} from "../../utils";

import './style.css';

class Pagination extends Component {
	static propTypes = {
		length: PropTypes.number,
		index: PropTypes.number,
		className: PropTypes.string
	};
	
	static defaultProps = {
		length: 1,
		index: 0
	};
	
	constructor(props) {
		super(props);
		this.state = {active: props.index};
	}
	
	async componentDidUpdate(prevProps) {
		if (prevProps.index !== this.props.index) {
			let {index} = this.props;
			this.setState({active: index});
		}
	}
	
	render() {
		let {
			length,
			className,
		} = this.props, {
			active
		} = this.state;
		if (!length) return null;
		return (
			<div className={joinClassNames('pagination', className)}>
				{Array.from({length}, (_, i) =>
					<div key={i} className={joinClassNames('circle', i === active ? 'active' : '')}>
						&nbsp;
					</div>)}
			</div>
		);
	}
}

export default Pagination;