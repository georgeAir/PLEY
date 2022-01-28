import "./App.css";
import React, { Component } from "react";
import NewForm from "./NewForm";
import Nav from "./Nav";
import RestaurantInfo from "./RestaurantsInfo";
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import BarsInfo from "./BarsInfo";


const baseURL = 'http://localhost:3003'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseURL: "http://localhost:3003",
      barsURL: "https://api.yelp.com/v3/businesses/search?location=chicago",
      apiKey: "ue2_GLAE9FpEp0NX5hhSw_6qzFoN-MlrnL1Sm7BJUnuixUy4u3MnLp_FqUxqpbyMTzqkqLujFbQRfOgFZUP19cxZo5da-uDeU3OnQJ1KhmPZg1LZssAXl494sszyYXYx",
      restaurants: [],
      bars: [],
      modalOpen: false,
      searchURL: "",
      query: "&term=",
      query1: "+",
      userTerm: "",
      userBar: "",
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

    this.setState({
      [event.target.id]:event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // set state using baseURL, apiKey, query, movieTitle
    // saving this in state to searchURL
    this.setState({
      searchURL: this.state.baseURL + '/yelp/' + this.state.userTerm
    }, () => {
      // fetch request will go here
      fetch(this.state.searchURL)
      .then(response => {
        return response.json()
      }).then(json => this.setState({
        restaurants: json

      }), (error) => console.log(error))
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // set state using baseURL, apiKey, query, movieTitle
    // saving this in state to searchURL
    this.setState({
      searchURL: this.state.baseURL + '/yelp/' + this.state.userBar
    }, () => {
      // fetch request will go here
      fetch(this.state.searchURL)
      .then(response => {
        return response.json()
      }).then(json => this.setState({
        bars: json

      }), (error) => console.log(error))
    })
  }


    getInitialBars = () => {
    const term = 'bar'
    const searchURL = baseURL + '/yelp/' + term
    fetch(searchURL)
      .then(res => res.json())
      .then(json => this.setState({
        bars: json
      }));
  }


  getInitialRestaurants = () => {
  const searchURL = baseURL + '/yelp/'
  fetch(searchURL)
    .then(res => res.json())
    .then(json => this.setState({
      restaurants: json
    }));
  }


  // Component lifecycle flowchart
  // https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/


  componentDidMount() {
    this.getInitialRestaurants()
    this.getInitialBars()
  }


  render() {
    console.log(this.state);
    return (

      <div className="App">
        <Nav loginUser={this.loginUser} register={this.register} />
        <h1>Restaurants!</h1>

        <form onSubmit= {this.handleSubmit}>

          <label> Type of restaurant </label>
          <input
            id="userTerm"
            type="text"
            placeholder="Enter type of restaurant"
            value={this.state.userTerm}
            onChange={this.handleChange}
          />

          <input type="submit" value="Find Restaurants" onClick={this.handleSubmit}/>
        </form>
    <section className="foodList">
      <div className= "foodDiv">
      { this.state.restaurants.map((restaurant, i) => {
          return (

            <Card className="foodCard" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={restaurant.image_url} style={{ width: '10rem' }}/>
            <Card.Body>
              <Card.Title className="restaurantName" >{restaurant.name}</Card.Title>
              <Card.Text>
                Price: {restaurant.price}
              </Card.Text>
              <Card.Text>
                Rating: {restaurant.rating}
              </Card.Text>
              <Card.Text>
                Phone Number: {restaurant.phone}
              </Card.Text>
              <Card.Text>
                {restaurant.location.display_address}
              </Card.Text>
              <Button variant="primary">Go to Website</Button>
            </Card.Body>
          </Card>

          )
        })
      }
      </div>
      </section>


      <h1>Bars!</h1>

      <form onSubmit= {this.handleSubmit}>
        <label> Type of Bar </label>
        <input
          id="userBar"
          type="text"
          placeholder="Enter type of bar"
          value={this.state.userBar}
          onChange={this.handleChange}
        />

        <input type="submit" value="Find Restaurants" onClick={this.handleSubmit}/>
      </form>
      <section className="foodList">
      <div className= "foodDiv">
      { this.state.bars.map((bar, i) => {
          return (

            <Card className="barCard" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={bar.image_url} style={{ width: '10rem' }}/>
            <Card.Body>
              <Card.Title className="restaurantName" >{bar.name}</Card.Title>
              <Card.Text>
                Price: {bar.price}
              </Card.Text>
              <Card.Text>
                Rating: {bar.rating}
              </Card.Text>
              <Card.Text>
                Phone Number: {bar.phone}
              </Card.Text>
              <Card.Text>
                {bar.location.display_address}
              </Card.Text>
              <Button variant="primary">Go to Website</Button>
            </Card.Body>
          </Card>

          )
        })
      }
      </div>
    </section>
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
