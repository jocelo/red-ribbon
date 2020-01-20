import React, { Component } from 'react'
import './single-item.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCheckSquare } from '@fortawesome/free-solid-svg-icons'

class SingleItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bought: false
		};

		this.markAsBought = this.markAsBought.bind(this);
	}

	markAsBought() {
		this.setState({bought: true});
		// sent
	}

	render() {
		const element = <FontAwesomeIcon icon={faCheckSquare} />

		return (
			<tr className={this.state.bought ? 'bought single-item' : 'single-item'}>
				<td>{this.state.bought} {this.props.data.id}</td>
				<td>{this.props.data.item}</td>
				<td>{this.props.data.store}</td>
				<td> 
					<button onClick={this.markAsBought} className="buy"><FontAwesomeIcon icon={faCheckSquare} /> Buy</button>
					<button onClick={this.markAsBought} className="again">Again</button>
				</td>
			</tr>
		)
	}
}

export default SingleItem