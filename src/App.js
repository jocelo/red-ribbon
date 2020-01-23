import React, { Component } from 'react'
import './App.scss'

import Table from './components/table/Table'
import NewItem from './components/add/NewItem'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

class App extends Component {
  constructor(props) {
    super(props);
		this.state = {
      maxItem: 8,
			items: []
    }
    
    this.onLiftState = this.onLiftState.bind(this);
  }

  onLiftState(data) {
    const dataCopy = Object.assign({}, data),
      newId = this.state.maxItem+1,
      newData = Object.assign(dataCopy, {id:newId});

    this.setState(state=>{
      return {
        maxItem: newId,
        items: [...this.state.items, newData]
      }
    });
  }

  showAddForm = () => {
    this.setState({showForm: true});
  }

  hideAddForm = () => {
    this.setState({showForm: false});
  }
  
	notifySuccess = (text) => toast.success(text, {
		autoClose: 3000,
		position: toast.POSITION.TOP_CENTER,
		hideProgressBar: true
	});

	notifyError = (text) => toast.error(text, {
		autoClose: 3000,
		position: toast.POSITION.TOP_CENTER,
		hideProgressBar: true
	});
  
  launchNotify = (type, msg) => {
    console.log('launchNotify', type)
    if (type === 'success') {
      this.notifySuccess(msg);
    } else if (type === 'error') {
      this.notifyError(msg);
    } else {
      this.notifySuccess(msg);
    }
  }

  render() {
    return (
      <div className='app'>
        <header>
          <div className='wrapper'>
            <h1>My Shopping List</h1>
          </div>
        </header>
        <div className='container'>
          <section className='display-item'>
            <div className='wrapper'>
              <Table data={this.state.items} launchNotify={this.launchNotify}></Table>
            </div>
          </section>
        </div>
        <NewItem 
          liftState={this.onLiftState} 
          hideForm={this.hideAddForm} 
          showForm={this.state.showForm}
          launchNotify={this.launchNotify} ></NewItem>
				<div className={this.state.showForm ? 'add-new-icon hidden' : 'add-new-icon'} onClick={this.showAddForm}>
					<FontAwesomeIcon icon={faPlusCircle} className="add-icon" />
				</div>

        <ToastContainer />
      </div>
    )
  }
}

export default App;
