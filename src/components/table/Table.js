import React, { Component } from 'react'
import './table.scss'

import SingleItem from './SingleItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite } from '@fortawesome/free-solid-svg-icons';

class Table extends Component {
	constructor(props) {
		super(props);

		this.launchNotify = this.launchNotify.bind(this);
	}

	launchNotify(type, msg) {
		this.props.launchNotify(type, msg);
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

		return (
			<table className="table">
				{tableHeader}
				<tbody>
					<tr className="single-item">
						<td> <input type="text" name="productName" className="field" /> </td>
						<td>
							<select name="storeName" className="field">
								{this.props.stores.map((store, idx)=>(
									<option key={store.id} value={store.name}>{store.name}</option>
								))}
							</select> 
						</td>
						<td className="no-decor"> 
							<button type="button" onClick={this.onAddNewItem} className="btn btn-main buy">Add</button>
						</td>
					</tr>
					{this.props.data.length === 0 &&
						<tr>
							<td colSpan="3" className="missing-data"> 
								<FontAwesomeIcon icon={faCookieBite} /> Please add some data
							</td>
						</tr>
					}
					{this.props.data.map((it, idx)=>(
						<SingleItem key={it.id} data={it} uid={it.id} launchNotify={this.launchNotify} persistChange={this.persistUpdate}></SingleItem>
					))}
				</tbody>
			</table>
		)
	}
}

export default Table;