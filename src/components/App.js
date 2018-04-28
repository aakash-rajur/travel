import PropTypes from "prop-types";
import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router";
import {Redirect, Route, Switch} from 'react-router-dom';
import {CITY, NEW_YORK, ROOT, ROOT_TRAVEL, SCROLL_END} from "../utils/constants";

import './App.css';
import BottomSheetInfo from "./BottomSheetInfo";
import FadeImage from "./FadeImage";
import FadeText from "./FadeText";
import Pagination from "./Pagination";
import PersistentInfo from './PersistentInfo';
import SwipeDetector from "./SwipeDetector";

class App extends Component {
	
	static propTypes = {
		source: PropTypes.arrayOf(PropTypes.object),
		history: PropTypes.object,
		location: PropTypes.object
	};
	
	constructor(props) {
		super(props);
		this.onResize = this.onResize.bind(this);
		this.onScroll = this.onScroll.bind(this);
		this.renderCity = this.renderCity.bind(this);
		this.state = {
			path: props.location.pathname,
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
	
	componentDidUpdate(prevProps) {
		let {location: {pathname: prevPath}} = prevProps,
			{
				location: {
					pathname: nextPath,
					state: {forward = true}
				}, source
			} = this.props,
			prevIndex = source.findIndex(({path}) => path === prevPath),
			nextIndex = source.findIndex(({path}) => path === nextPath);
		prevIndex !== nextIndex && this.setState({path: nextPath, forward})
	}
	
	render() {
		return (
			<Switch>
				<Redirect exact={true} from={ROOT} to={NEW_YORK}/>
				<Redirect exact={true} from={ROOT_TRAVEL} to={NEW_YORK}/>
				<Route exact={true} path={CITY} component={this.renderCity}/>
			</Switch>
		);
	}
	
	onResize() {
		let {persist: prev} = this.state, persist = window.innerWidth > 600;
		prev !== persist && (this.setState({persist}));
	}
	
	onScroll({deltaY}) {
		if (this.scrollState !== SCROLL_END) return;
		let {
			source = [],
			location: {pathname},
			history
		} = this.props;
		if (!source.length) return;
		let index = source.findIndex(({path}) => path === pathname),
			forward = deltaY > 0;
		history.push(source[forward ? (index + 1) % source.length :
			index === 0 ? source.length - 1 : index - 1].path,
			{forward});
	}
	
	renderCity() {
		let {source} = this.props,
			index = source.findIndex(({path}) => path === this.state.path);
		if (index < 0) return null;
		let page = source ? source[index] : null;
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
					<Pagination length={3} index={index}/>
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
}

export default withRouter(App);
