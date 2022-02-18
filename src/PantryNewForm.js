import React, { Component } from 'react';

class PantryNewForm extends Component {
	constructor(props){
	super(props)

		this.state = {
			item: '',
			catergory: '',
			quantity: '',
			owner: '',
			baseURL: this.props.baseUrl,
		}
	}



	handleChange(e) {
		this.setState({
			[e.target.id]: e.target.value
		})
	}


	handleSubmit = (e) => {
		e.preventDefault()
		fetch(this.state.baseURL + "/api/v1/pantrys" , {
			method: 'POST',
			body: JSON.stringify({
				item: this.state.item,
				quantity: this.state.quantity,
				catergory: this.state.catergory,
				owner: this.state.owner
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(res => {
			return res.json()
		}).then(data => {
			console.log(data)
			this.props.addPantry(data)
			this.setState({
				item: '',
				catergory: '',
				quantity: '',
				owner: ''
			})
			this.props.getPantrys()
		}).catch(error => console.log(error))
	}




	render(){
		return (
			<div className="addnew">

			<form onSubmit={this.handleSubmit}>
			<h4>Add New Item to Pantry</h4>
					<div className="form-group">
						<input type="text" className="form-control" name="item" placeholder="item" id="item" onChange = {(e) => this.handleChange(e)} />
					</div>
					<div className="form-group">
						<input type="text" className="form-control" name="catergory" placeholder="catergory" id="catergory" onChange = {(e) => this.handleChange(e)} />
					</div>
					<div className="form-group">
						<input type="text" className="form-control" name="owner" placeholder="owner" id="owner" onChange = {(e) => this.handleChange(e)} />
					</div>
					<div className="form-group">
						<input type="text" className="form-control" name="quantity" placeholder="quantity" id="quantity" onChange = {(e) => this.handleChange(e)} />
					</div>
						<input className="btn btn-primary btn-block" type="submit" value="Add Item!"/>


			</form>
			</div>
		)
	}

}

export default PantryNewForm;
