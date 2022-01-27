import './App.css';
import React, { Component } from 'react'
import NewForm from './NewForm'
import Nav from './Nav'
import RestaurantInfo from './RestaurantsInfo'




let baseUrl = 'http://localhost:3003'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      baseUrl: '',
      restaurants: [],
      description: '',
      modalOpen: false,
    }
    // if you do not use an arrow function for getRestaurants()
   // this.getRestaurants = this.getRestaurants.bind(this)
  }

  loginUser = (event) => {
  event.preventDefault()
  fetch(baseUrl + '/users/login',{
    method: 'POST',
    body: JSON.stringify({
      username: event.target.username.value,
      password: event.target.password.value
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(res => res.json())
  .then(resJson => {
    console.log(resJson)
    this.getRestaurants()
  })
}

register = (event) => {
  event.preventDefault()
  fetch(baseUrl + '/users/signup',{
    method: 'POST',
    body:JSON.stringify({
      username: event.target.username.value,
      password: event.target.password.value,
    }),
    headers:{
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + key ////

    }
  }).then(res => res.json())
  .then(resJson => {
    console.log(resJson)
    // call getHolidays TO GET ALL THE HOLIDAYS AND REFRESH PAGE
  })
}

  getRestaurants = () => {
    // fetch to the backend
    fetch(baseUrl + '/restaurants' , {
      credentials: 'include'
    })
    .then(res => {
      if(res.status === 200) {
        return res.json()
      } else {
        return []
      }
    }).then(data => {
      // console.log(data)
      this.setState({ restaurants: data })
    })
  }

  showEditForm = (restaurant) => {
  console.log(restaurant);
  this.setState({
    modalOpen: true,
    name: restaurant.name,
    description: restaurant.description,
    holidayToBeEdited: restaurant,
  })
}

  // Component lifecycle flowchart
  // https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

  componentDidMount() {
    this.getRestaurants()
  }

  render() {
    return (
      <div className="App">
        <Nav
        loginUser={this.loginUser}
        register={this.register}
        />
        <h1>Restaurants! Celebrate! </h1>
        <NewForm />
        <table>
          <tbody>
            { this.state.restaurants.map((restaurant, i) => {
                return (
                  <tr key={i}>
                    <td key={restaurant._id}> {restaurant.name} </td>
                    <td> {restaurant.description} </td>
                    <td onClick= {() => this.showEditForm(restaurant)}> Show Edit Form </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        {
          this.state.modalOpen &&
          <form onSubmit= {this.handleSubmit}>
            <label>Name: </label>
            <input name='name' value={this.state.name} onChange={this.handleChange}/> <br/>

            <label>Description: </label>
            <input name='description' value={this.state.description} onChange={this.handleChange}/> <br/>
            <button> submit</button>
          </form>
        }
      </div>
    );
  }
}

export default App
