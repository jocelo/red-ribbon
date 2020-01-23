import React, { Component } from 'react'
import './table.scss'

import SingleItem from './SingleItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite } from '@fortawesome/free-solid-svg-icons';

class Table extends Component {
	constructor(props) {
		super(props);

		this.launchNotify = this.launchNotify.bind(this);
		this.persistUpdate = this.persistUpdate.bind(this);
	}

	componentDidMount() {
		const dbRef = 'firebase';
	}

	launchNotify(type, msg) {
		this.props.launchNotify(type, msg);
	}

	persistUpdate() {
		console.log('from the parent');
	}

	render() {
		const tableHeader = (
			<thead>
				<tr>
					<th>id</th>
					<th>item</th>
					<th>store</th>
				</tr>
			</thead>
		);

		return (
			<table className="table">
				{tableHeader}
				<tbody>
					{this.props.data.length === 0 &&
						<tr>
							<td colSpan="3" className="missing-data"> 
								<FontAwesomeIcon icon={faCookieBite} /> Please add some data <FontAwesomeIcon icon={faCookieBite} />
							</td>
						</tr>
					}
					{this.props.data.map((it, idx)=>(
						<SingleItem key={it.id} data={it} uid={idx} launchNotify={this.launchNotify} persistChange={this.persistUpdate}></SingleItem>
					))}
				</tbody>
			</table>
		)
	}
}

export default Table;