import "./App.css";
import React, { Component } from "react";
import NewForm from "./NewForm";
import Nav from "./Nav";
import RestaurantInfo from "./RestaurantsInfo";


const baseURL = 'http://localhost:3003'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseURL: "https://api.yelp.com/v3/businesses/search?location=chicago",
      apiKey: "ue2_GLAE9FpEp0NX5hhSw_6qzFoN-MlrnL1Sm7BJUnuixUy4u3MnLp_FqUxqpbyMTzqkqLujFbQRfOgFZUP19cxZo5da-uDeU3OnQJ1KhmPZg1LZssAXl494sszyYXYx",
      restaurants: [],
      typeOfRestaurant: "",
      modalOpen: false,
      searchURL: "",
      query: "&term=",
      query1: "+",
      type: "restaurants",
    };
    // if you do not use an arrow function for getRestaurants()
    // this.getRestaurants = this.getRestaurants.bind(this)
  }

  loginUser = (event) => {
  event.preventDefault()
  fetch(baseURL + '/users/login',{
    method: 'POST',
    body: JSON.stringify({
      username: event.target.username.value,
      password: event.target.password.value
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.apiKey

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
  fetch(baseURL + '/users/signup',{
    method: 'POST',
    body:JSON.stringify({
      username: event.target.username.value,
      password: event.target.password.value,
    }),
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.apiKey

    }
  }).then(res => res.json())
  .then(resJson => {
    console.log(resJson)
    // call getHolidays TO GET ALL THE HOLIDAYS AND REFRESH PAGE
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

handleChange = (event) => {
// console.log(event.target.id);
// console.log(event.target.value);
// this.setState({movieTitle: event.target.id})
this.setState({
  [event.target.id]:event.target.value
})
}


    getRestaurants = () => {
    const term = 'asian'
    const searchURL = baseURL + '/yelp/' + term
    fetch(searchURL)
      .then(res => res.json())
      .then(json => this.setState({
        restaurants: json
      }));
  }

  addLike = (restaurant) => {
// console.log(holiday)
const term = 'asian'
const searchURL = baseURL + '/yelp/' + term
fetch(searchURL + '/addlikes/' + restaurant._id, {
  method: 'PATCH',
  credentials: 'include'
}).then(res => res.json())
.then(resJson => {
  // console.log(resJson)
  const copyRestaurants = [...this.state.restaurants]
  const findIndex = this.state.restaurants.findIndex( holiday => holiday._id === resJson.data._id)
  copyRestaurants[findIndex].likes = resJson.data.likes
  this.setState({
    restaurants: copyRestaurants
  })
})
}

  // Component lifecycle flowchart
  // https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/


  componentDidMount() {
    this.getRestaurants()
  }


  render() {
    console.log(this.state);
    return (

      <div className="App">
        <Nav loginUser={this.loginUser} register={this.register} />
        <h1>Restaurants! Celebrate! </h1>


        <button onClick={this.getRestaurants}> Submit for restaurants</button>


        <form onSubmit= {this.handleSubmit}>

          <label> Type of restaurant </label>
          <input
            id="typeOfRestaurant"
            type="text"
            placeholder="Enter type of restaurant"
            value={this.state.typeOfRestaurant}
            onChange={this.handleChange}
          />

          <input type="submit" value="Find Restaurants" />
        </form>


        <table>
          <tbody>
          { this.state.restaurants.map((restaurant, i) => {
              return (
                <tr key={restaurant._id}>
                  <td onDoubleClick={() => this.toggleCelebrated(restaurant)}
                  className={ restaurant.celebrated ? 'celebrated' : null}>
                  {restaurant.name}
                  </td>
                  <td> {restaurant.price} </td>
                  <td> {restaurant.rating} </td>
                  <td> {restaurant.phone} </td>
                  <td onClick= {() => this.showEditForm(restaurant)}> </td>
                  <td onClick={() => this.deleteHoliday(restaurant._id)}>Delete:❌</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>

        {this.state.modalOpen && (
          <form onSubmit={this.handleSubmit}>
            <label>Name: </label>
            <input
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />{" "}
            <br />
            <label>Description: </label>
            <input
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />{" "}
            <br />
            <button> submit</button>
          </form>
        )}
      </div>
    );
  }
}

export default App;
