import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReceipt, faBars } from '@fortawesome/free-solid-svg-icons'

import './header.scss'

class Header extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<header>
				<div className='wrapper'>
					<h1 className="title"><FontAwesomeIcon icon={faReceipt} className="pad-right-15" size="lg" /> My Shopping List {this.props.title}</h1>
				</div>
				<div className="float-right">
					<FontAwesomeIcon icon={faBars} />
				</div>
			</header>
		)
	}
}

export default Header