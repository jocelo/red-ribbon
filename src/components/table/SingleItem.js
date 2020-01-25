import React, { Component } from 'react'
import './single-item.scss';
import firebase from '../../firebase'

import 'react-toastify/dist/ReactToastify.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'

class SingleItem extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			bought: false
		};

		this.buyAgain = this.buyAgain.bind(this);
		this.markAsBought = this.markAsBought.bind(this);
	}

	persistChange(boughtOrNot) {
		this.props.data.bought = boughtOrNot;
		this.itemRef = firebase.database().ref('items/'+this.props.uid);
		this.itemRef.set(this.props.data);
		this.setState({bought: true});
	}

	markAsBought() {
		this.persistChange(true);
		this.setState({bought: true});
		this.props.launchNotify('success', '"'+this.props.data.item+'" bought!');
	}

	buyAgain() {
		this.persistChange(false);
		this.setState({bought: false});
		this.props.launchNotify('success', '"'+this.props.data.item+'" re-added');
	}

	render() {
		return (
			<tr className={this.props.data.bought ? 'bought single-item' : 'single-item'}>
				<td>{this.props.data.bought} {this.props.data.id}</td>
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