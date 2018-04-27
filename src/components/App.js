import PropTypes from "prop-types";
import React, {Component, Fragment} from 'react';
import {SCROLL_END} from "../utils/constants";

import './App.css';
import BottomSheetInfo from "./BottomSheetInfo";
import FadeImage from "./FadeImage";
import FadeText from "./FadeText";
import Pagination from "./Pagination";
import PersistentInfo from './PersistentInfo';
import SwipeDetector from "./SwipeDetector";

class App extends Component {

	static propTypes = {
		source: PropTypes.arrayOf(PropTypes.object)
	};

	constructor(props) {
		super(props);
		this.onResize = this.onResize.bind(this);
		this.onScroll = this.onScroll.bind(this);
		this.state = {
			index: 0,
			forward: true,
			persist: window.innerWidth > 600
		};
		this.scrollState = SCROLL_END;
	}

	componentDidMount() {
		window.addEventListener('resize', this.onResize);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.onResize);
	}

	render() {
		let {source} = this.props,
			page = source ? source[this.state.index] : null;
		return (
			<Fragment>
				<SwipeDetector
					className="city-preview"
					onWheel={this.onScroll}
					threshold={25}
					onSwipeUp={() => this.onScroll({deltaY: 100})}
					onSwipeDown={() => this.onScroll({deltaY: -100})}>
					<FadeImage
						className='preview'
						src={page.background}
						forward={this.state.forward}
						duration={250}
						onScroll={scrollState => this.scrollState = scrollState}/>
					<div className="city-no">{`No. ${page.no}`}</div>
					<div className="vertical">&nbsp;</div>
					<Pagination length={3} index={this.state.index}/>
					<FadeText
						className='title'
						forward={this.state.forward}
						duration={250}>
						{page.title}
					</FadeText>
				</SwipeDetector>
				{this.state.persist ?
					<PersistentInfo className='persistent' {...page}/> :
					<BottomSheetInfo {...page}/>}
			</Fragment>
		);
	}

	onResize() {
		let {persist: prev} = this.state, persist = window.innerWidth > 600;
		prev !== persist && (this.setState({persist}));
	}

	onScroll({deltaY}) {
		if (this.scrollState !== SCROLL_END) return;
		let {index} = this.state, {source = []} = this.props,
			forward = deltaY > 0;
		index = deltaY > 0 ? (index + 1) % source.length : index === 0 ? source.length - 1 : index - 1;
		this.setState({index, forward});
	}
}

export default App;
