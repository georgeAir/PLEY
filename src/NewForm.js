import React, {Component} from 'react'

export default class NewForm extends Component {
  constructor(){
    super()

    this.state = {
      name: '',
      price: '',
      likes: '',
      img: '',
      phone: '',
      display_address: '',
      timestamps:'',
    }
  }


  handleSubmit = (event) => {
    event.preventDefault()
    //fetch to the backend
    fetch(this.props.baseURL + '/favorites', {
      method: 'POST',
      body: JSON.stringify({name: this.state.name,
        price: this.state.price,
        likes: this.state.likes,
        img: this.state.img,
        Phone: this.state.Phone,
        display_address: this.state.display_address
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      return res.json()
    }).then( data => {
      console.log(data);
      this.props.addFavorites(data)
      this.setState({
        name: '',
        price: '',
        likes: '',
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
    // console.log(this.state);
    return(
      <>
        <form onSubmit= {this.handleSubmit}>
          <label html='name'>Name: </label>
          <input type='text' id='name' name='name' onChange={(event) => this.handleChange(event)} value={this.state.name}/>

          <label html='name'>Price: </label>
          <input type='text' id='price' name='price' onChange={(event) => this.handleChange(event)} value={this.state.price}/>

          <label html='name'>likes: </label>
          <input type='text' id='likes' name='likes' onChange={(event) => this.handleChange(event)} value={this.state.likes}/>

          <label html='name'>Phone: </label>
          <input type='text' id='phone' name='phone' onChange={(event) => this.handleChange(event)} value={this.state.Phone}/>

          <label html='name'>Image: </label>
          <input type='text' id='img' name='img' onChange={(event) => this.handleChange(event)} value={this.state.img}/>

          <label html='name'>Address: </label>
          <input type='text' id='display_address' name='display_address' onChange={(event) => this.handleChange(event)} value={this.state.display_address}/>

          <input type='submit' value='Add a restaurant'/>
        </form>
      </>

    )
  }
}
