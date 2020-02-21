import React, { Component } from 'react'
import './App.scss'
import firebase from './firebase'

import Header from './components/header/Header';
import Table from './components/table/Table'
import NewItem from './components/add/NewItem'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

class App extends Component {
  constructor(props) {
    super(props);
    
    this.itemsRef = '';
    this.storesRef = '';

		this.state = {
      maxItem: 1,
      listTitle: 'Grocery List',
      items: [],
      stores: []
    }
    
    this.onLiftState = this.onLiftState.bind(this);
  }

  componentDidMount() {
    this.itemsRef = firebase.database().ref('items');
    this.storesRef = firebase.database().ref('stores');

    this.itemsRef.on('value', snapshot=>{
      this.setState({
        maxItem: Math.max( ...Object.keys(snapshot.val()).map(item=>Number(item))),
        items:Object.values(snapshot.val()).sort((a, b)=> a.bought-b.bought )
      });
    })

    this.storesRef.on('value', snapshot=>{
      this.setState({stores: snapshot.val()});
    })
  }

  onLiftState(data) {
    const dataCopy = Object.assign({}, data),
      newId = this.state.maxItem+1,
      newData = Object.assign(dataCopy, {id:newId});

    const newITem = firebase.database().ref('items/'+(this.state.maxItem+1));
    newITem.set(newData);

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
        <Header title={this.state.listTitle}></Header>
        <div className='container'>
          <section className='display-item'>
            <div className='wrapper'>
              <Table data={this.state.items} stores={this.state.stores} launchNotify={this.launchNotify}></Table>
            </div>
          </section>
        </div>
        <NewItem 
          stores={this.state.stores}
          liftState={this.onLiftState} 
          hideForm={this.hideAddForm} 
          showForm={this.state.showForm}
          launchNotify={this.launchNotify} ></NewItem>

        <ToastContainer />
      </div>
    )
  }
}

export default App;
