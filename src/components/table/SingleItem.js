import React, { Component } from 'react'
import './single-item.scss';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCheckSquare } from '@fortawesome/free-solid-svg-icons'

class SingleItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bought: false
		};
	}

	markAsBought = () => {
		this.setState({bought: true});
	}

	buyAgain = () => {
		this.setState({bought: false});
		this.props.launchNotify('success', '"'+this.props.data.item+'" re-added');
	}

	render() {
		return (
			<tr className={this.state.bought ? 'bought single-item' : 'single-item'}>
				<td>{this.state.bought} {this.props.data.id}</td>
				<td>{this.props.data.item}</td>
				<td>{this.props.data.store}</td>
				<td className="no-decor"> 
					<button onClick={this.markAsBought} className="btn btn-main buy"><FontAwesomeIcon icon={faCheckSquare} /> Bought</button>
					<button onClick={this.buyAgain} className="btn again">Buy Again</button>
				</td>
			</tr>
		)
	}
}

export default SingleItem