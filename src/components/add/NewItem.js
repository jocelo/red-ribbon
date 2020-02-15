import React, { Component } from 'react'
import './new-item.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faSave } from '@fortawesome/free-solid-svg-icons'

class NewItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formError: false,
			showForm: false,
			itemName: '',
			storeName: 'Aldi',
			newItem: {
				id: '',
				item: '',
				requestor: 'Nanis',
				bought: false,
				store: ''
			}
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.setNewValue = this.setNewValue.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	setNewValue(event, input) {
		const newObj = {};
		newObj[input] = event.target.value;		
		this.setState(newObj);
	}

	onSubmit() {
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

	onCancel = () => {
		this.setState({formError: false});

		this.props.hideForm();
	}

	render() {
		return (
			<div className={this.props.showForm ? 'add-new' : 'add-new hidden'}>
				<div className='add-new-form'>
					<form>
						<label className="form-label">
							Item name { this.state.formError && 
							<span className="error-message">(Required)</span>
							}
							<input type="text" name="item" className={this.state.formError ? 'form-control error' : 'form-control'} value={this.state.itemName} onChange={(event)=>this.setNewValue(event, 'itemName')} />
						</label>
						<label className="form-label">
							Store
							<select name="location" className="form-control"  onChange={(event)=>this.setNewValue(event, 'storeName')} value={this.state.storeName}>
								{this.props.stores.map((store, idx)=>(
									<option key={store.id} value={store.name}>{store.name}</option>
								))}
							</select>
						</label>
						<button type="button" className="btn btn-main" onClick={this.onSubmit}>
							<FontAwesomeIcon icon={faSave} /> Save
						</button>
						<button type="button" className="btn cancel-btn" onClick={this.onCancel}>
							<FontAwesomeIcon icon={faTimesCircle} /> Close
						</button>
					</form>
				</div>
			</div>

		)
	}
}

export default NewItem;