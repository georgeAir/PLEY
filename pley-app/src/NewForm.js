import React, {Component} from 'react'

export default class NewForm extends Component {
  constructor(){
    super()

    this.state = {
      name: ''
    }
  }

  handleSumbit = (event) => {
    event.preventDefault()
    //fetch to the backend
    fetch(this.props.baseUrl + '/restaurants', {
      method: 'Post',
      body: JSON.stringify({name: this.state.name}),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      return res.json()
    }).then( data => {
      // console.log(data);
      this.props.addRestaurant(data)
      this.setState({
        name: ''
      })
    })
  }

  handleChange = (event) => {
    // console.log(event.target.value);
    this.setState({
      name: event.target.value
    })
  }


  render(){
    console.log(this.state.name);
    return(
      <form onSubmit= {this.handleSumbit}>
        <label html='name'>Name: </label>
        <input type='text' id='name' name='name' onChange={(event) => this.handleChange(event)} value={this.state.name}/>
        <input type='submit' value='Add a restaurant'/>
      </form>
    )
  }
}
