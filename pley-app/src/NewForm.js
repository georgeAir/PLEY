import React, {Component} from 'react'

export default class NewForm extends Component {
  constructor(){
    super()

    this.state = {
      name: '',
      cuisineType: '',
      location: '',
      description: '',
      likes: '',
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
    console.log(event.target.value);
    this.setState({
      [event.target.id]: event.target.value,
    })
  }


  render(){
    console.log(this.state);
    return(
      <>
        <form onSubmit= {this.handleSumbit}>
          <label html='name'>Name: </label>
          <input type='text' id='name' name='name' onChange={(event) => this.handleChange(event)} value={this.state.name}/>

          <label html='name'>Cuisine Type: </label>
          <input type='text' id='cuisineType' name='cuisineType' onChange={(event) => this.handleChange(event)} value={this.state.cuisineType}/>

          <label html='name'>Location: </label>
          <input type='text' id='location' name='name' onChange={(event) => this.handleChange(event)} value={this.state.location}/>

          <label html='name'>Description: </label>
          <input type='text' id='description' name='name' onChange={(event) => this.handleChange(event)} value={this.state.description}/>

          <label html='name'>Likes: </label>
          <input type='text' id='likes' name='name' onChange={(event) => this.handleChange(event)} value={this.state.likes}/>

          <input type='submit' value='Add a restaurant'/>
        </form>
      </>

    )
  }
}
