import React, { Component } from 'react'
import './new-item.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faSave } from '@fortawesome/free-solid-svg-icons'

class NewItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showForm: false,
			itemName: '',
			storeName: '',
			newItem: {
				id: '',
				item: '',
				requestor: 'Nanis',
				store: '',
				done: false
			},
			stores: [
				{id: 1, name: 'Aldi'},
				{id: 2, name: 'Costco'},
				{id: 3, name: 'DollarStore'},
				{id: 4, name: 'Walmart'}
			]
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.setNewValue = this.setNewValue.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	notify = (text) => toast.success(text, {
		autoClose: 3000,
		position: toast.POSITION.TOP_CENTER,
		hideProgressBar: true
	});

	setNewValue(event, input) {
		const newObj = {};
		newObj[input] = event.target.value;		
		this.setState(newObj);
	}

	onSubmit() {
		this.setState({newItem: Object.assign(this.state.newItem, {item: this.state.itemName, store: this.state.storeName})});
		this.props.liftState(this.state.newItem);
		this.setState({ itemName: '', storeName: '' });
		this.notify('Product added');
	}

	onCancel = () => {
		this.setState({showForm: false});
	}

	showAdd = () => {
		this.setState({showForm: true});
	}

	render() {
		function Curtain(props) {
			if (props.showForm) {
				return <div className="curtain"></div>
			}

			return '';
		}
		return (
			<div className="add-new">
				<Curtain showForm={this.state.showForm}></Curtain>
				<div className={this.state.showForm ? 'add-new-form' : 'add-new-form hidden'}>
					<form>
						<label className="form-label">
							Item name
							<input type="text" name="item" value={this.state.itemName} onChange={(event)=>this.setNewValue(event, 'itemName')} className="form-control" />
						</label>
						<label className="form-label">
							Store
							<select name="location" className="form-control" onChange={(event)=>this.setNewValue(event, 'storeName')} value={this.state.storeName}>
								{this.state.stores.map(store=>(
									<option key={store.id} value={store.name}>{store.name}</option>
								))}
							</select>
						</label>
						<button type="button" className="btn submit-btn" onClick={this.onSubmit}>
							<FontAwesomeIcon icon={faSave} /> Save
						</button>
						<button type="button" className="btn cancel-btn" onClick={this.onCancel}>
							<FontAwesomeIcon icon={faTimesCircle} /> Cancel
						</button>
					</form>
				</div>

				<ToastContainer />
			</div>

		)
	}
}

export default NewItem;