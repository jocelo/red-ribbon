import React, { Component } from 'react'
import './table.scss'

import SingleItem from './SingleItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareDown, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

class Table extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			inProgressItem: ''
		};

		this.launchNotify = this.launchNotify.bind(this);
		this.addingNewItem = this.addingNewItem.bind(this);
	}

	launchNotify(type, msg) {
		this.props.launchNotify(type, msg);
	}

	addingNewItem(e) {
		console.log(e.target.value);
		const addingValue = String(e.target.value).trim();
		if (addingValue) {
			this.setState({inProgressItem: true});
		} else {
			this.setState({inProgressItem: false});
		}
	}

	onAddNewItem() {
		this.setState({formError: false});

		if (this.state.itemName === '') {
			this.props.launchNotify('error', 'Missing product name');
			this.setState({formError: true});
			return;
		}
		this.setState({newItem: Object.assign(this.state.newItem, {item: this.state.itemName, store: this.state.storeName})});
		this.props.liftState(this.state.newItem);
		this.setState({ itemName: '' });
		this.props.launchNotify('success', 'Product added');
	}

	render() {
		const tableHeader = (
			<thead>
				<tr>
					<th>item</th>
					<th>store</th>
				</tr>
			</thead>
		);

		let {isItemBeignAdded} = this.state.inProgressItem;

		return (
			<table className="table">
				{tableHeader}
				<tbody>
					{this.props.data.map((it, idx)=>(
						<SingleItem key={it.id} data={it} uid={it.id} launchNotify={this.launchNotify} persistChange={this.persistUpdate}></SingleItem>
					))}
					<tr className="single-item add-more">
						<td> <input type="text" name="productName" onChange={this.addingNewItem} className="field" placeholder=" and..." /> </td>
						<td>
							<select name="storeName" className={`field ${this.state.inProgressItem ? '' : 'hidden'}`}>
								{this.props.stores.map((store, idx)=>(
									<option key={store.id} value={store.name}>{store.name}</option>
								))}
							</select>
							<span className={`select-icon ${this.state.inProgressItem ? '' : 'hidden'}`}><FontAwesomeIcon icon={faCaretSquareDown} /></span>
						</td>
						<td className="no-decor"> 
							<button type="button" onClick={this.onAddNewItem} className={`btn btn-add-list ${this.state.inProgressItem ? '' : 'hidden'}`}><FontAwesomeIcon icon={faPlusSquare} /></button>
						</td>
					</tr>
				</tbody>
			</table>
		)
	}
}

export default Table;