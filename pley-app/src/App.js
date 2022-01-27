import "./App.css";
import React, { Component } from "react";
import NewForm from "./NewForm";
import Nav from "./Nav";
import RestaurantInfo from "./RestaurantsInfo";

let baseUrl = "http://localhost:3003";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseURL: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=chicago",
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
    event.preventDefault();
    fetch(baseUrl + "/users/login", {
      method: "POST",
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        // this.getRestaurants();
      });
  };

  register = (event) => {
    event.preventDefault();
    fetch(baseUrl + "/users/signup", {
      method: "POST",
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.apiKey,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        // call getHolidays TO GET ALL THE HOLIDAYS AND REFRESH PAGE
      });
  };

  // getRestaurants = () => {
  //   // fetch to the backend
  //   fetch(baseUrl + "/restaurants", {})
  //     .then((res) => {
  //       if (res.status === 200) {
  //         return res.json();
  //       } else {
  //         return [];
  //       }
  //     })
  //     .then((data) => {
  //       // console.log(data)
  //       this.setState({ restaurants: data });
  //     });
  // };

  showEditForm = (restaurant) => {
    console.log(restaurant);
    this.setState({
      modalOpen: true,
      name: restaurant.name,
      description: restaurant.description,
      holidayToBeEdited: restaurant,
    });
  };

  handleChange = (event) => {
    // console.log(event.target.id);
    // console.log(event.target.value);
    // this.setState({movieTitle: event.target.id})
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // set state using baseURL, apiKey, query, movieTitle
    // saving this in state to searchURL
    this.setState(
      {
        searchURL:
          this.state.baseURL +
          this.state.query +
          this.state.typeOfRestaurant +
          this.state.query1 +
          this.state.type,
      },
      () => {
        //Authorization Headers will go here
        const headers = {
          headers: { 'Authorization': `Bearer ${this.state.apiKey}`}
        }
        console.log(this.state.searchURL)
        console.log(headers)
        // fetch request will go here
        fetch(this.state.searchURL, headers)
          .then((response) => {
            return response.json();
          })
          .then(
            (json) =>
            console.log(json)
              // this.setState({
              //   restaurants: json,
              // }),
            // (error) => console.log(error)
          );
      }
    );
  };

  // Component lifecycle flowchart
  // https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

  // componentDidMount() {
  //   this.getRestaurants();
  // }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Nav loginUser={this.loginUser} register={this.register} />
        <h1>Restaurants! Celebrate! </h1>

        <form onSubmit={this.handleSubmit}>
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

        <NewForm />
        <table>
          <tbody>
            
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
