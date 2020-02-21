import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons'

import './header.scss'

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let Title;
		if (this.props.title) {
			Title = <span> - {this.props.title} <FontAwesomeIcon icon={faCaretSquareDown} className="position-icon" /> </span>;
		} else {
			Title = <span></span>;
		}
			
		return (
			<header>
				<div className='wrapper'>
					<h1 className="title"> My Shopping List {Title}</h1>
				</div>
				<div className='lists'>
					<p>uno</p>
					<p>dos</p>
					<p>thress</p>
				</div>
				<div className="float-right">
					<FontAwesomeIcon icon={faBars} />
				</div>
			</header>
		)
	}
}

export default Header