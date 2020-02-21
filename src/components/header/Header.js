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
			Title = <span> - <a>{this.props.title}</a> </span>;
		} else {
			Title = <span></span>;
		}
			
		return (
			<header class="rr-header">
				<div className='wrapper'>
					<h1 className="title"> My Shopping List {Title}</h1>
				</div>

				<div className="float-right">
					<FontAwesomeIcon icon={faBars} />
				</div>

				<ul className='lists'>
					<li>uno</li>
					<li>dos</li>
					<li><input  placeholder="Add new list" /> <button>Go</button></li>
				</ul>
			</header>
		)
	}
}

export default Header