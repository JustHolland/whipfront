import React, { Component } from 'react'
import PantryNewForm from './PantryNewForm';


export default class PantryContainer extends Component {
  constructor(props){
	super(props)

		this.state = {
			baseUrl: this.props.baseUrl,
			pantrys: this.props.pantrys,
			modalOpen: false,
			pantryToBeEdited: {}
		}
	}

	// getPantrys = () => {
	// 	fetch(this.state.baseUrl, {
	// 	})
	// 	.then(res => {
	// 		console.log(res.status)
	// 		if (res.status === 200) {
	// 			return res.json()
	// 		} else {
	// 			return []
	// 		}
	// 	}).then(data => {
	// 		console.log(data);
	// 		this.setState({
	// 			pantrys: data.data
	// 		})
	// 	})
	// }


	addPantry = (newPantry) => {
		const copyNewPantry = [...this.state.pantrys]
		copyNewPantry.push(newPantry)
		this.setState({
			pantrys: copyNewPantry
		})
	}


	showEditForm = (pantry) => {
		console.log(pantry)
		this.setState({
			modalOpen: true,
			item: pantry.item,
      quantity: pantry.quantity,
			catergory: pantry.catergory,
			owner: pantry.owner,
			pantryToBeEdited: pantry
		})
	}



	editChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	editSubmit = (e) => {
		e.preventDefault()
		console.log(this.state.pantryToBeEdited)
		fetch(this.state.baseUrl + this.state.pantryToBeEdited.id, {
			method: 'PUT',
			body: JSON.stringify({
				item: e.target.item.value,
				catergory: e.target.catergory.value,
        quantity: e.pantry.quantity,
				owner: e.target.owner.value
			}),
			headers: {
			'Content-Type': 'application/json'
			}
		}).then(res => res.json())
		.then(resJson => {
			console.log(resJson)
			this.getPantrys()
			this.setState({
				modalOpen: false
			})
		})
	}



	handleDelete = (pantry) => {
		console.log(pantry)
		fetch(this.state.baseUrl + pantry, {
			method: 'DELETE',
		}).then(res => {
			console.log(res)
			if (res.status === 200){
				const findIndex = this.state.pantrys.findIndex(pantry => pantry.id === pantry)
				const copyPantry = [...this.state.pantrys]
				copyPantry.splice(findIndex, 1)
				this.setState({
					pantrys: copyPantry
				})
				this.getPantrys()
			}
		})
	}



	// componentDidMount(){
	// 	this.getPantrys()
  //
	// }

	render(){
		return (
			<div className="pantryCard">
				<h2>Current Inventory</h2>
        <br/>
				{this.state.pantrys.map((pantry, i) => (
					<div key={i}>
						<h4>{pantry.item}</h4>
						<button onClick={() => this.showEditForm(pantry)}>Edit</button>
						<button onClick={() => this.handleDelete(pantry.id)}>Delete</button>
					</div>
				))}
        <br/>
        <div className="addNewX">
				<PantryNewForm addPantry={this.addPantry} baseUrl={this.state.baseUrl} getPantrys={this.getPantrys} />
        </div>
        <br/>
				{
				this.state.modalOpen &&
				<form onSubmit={this.editSubmit}>
					<input type="text" name="item" value={this.state.item} onChange={this.editChange} />
					<input type="text" name="catergory" value={this.state.catergory} onChange={this.editChange} />
          <input type="text" name="quantity" value={this.state.quantity} onChange={this.editChange} />
					<input type="text" name="owner" value={this.state.owner} onChange={this.editChange} />
					<input type="submit" value="Confirm Edits" />
				</form>
				}



			</div>
		)
	}

}
