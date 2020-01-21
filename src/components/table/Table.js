import React, { Component } from 'react'
import './table.scss'
import SingleItem from './SingleItem'

class Table extends Component {
	constructor(props) {
		super(props);
	}

	launchNotify = (type, msg) => {
		this.props.launchNotify(type, msg);
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
					{this.props.data.map((it, idx)=>(
						<SingleItem key={idx} data={it} launchNotify={this.launchNotify}></SingleItem>
					))}
				</tbody>
			</table>
		)
	}
}

export default Table;