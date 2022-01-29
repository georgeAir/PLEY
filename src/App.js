import "./App.css";
import React, { Component } from "react";
import NewForm from './NewForm';
import Nav from "./Nav";
import RestaurantInfo from "./RestaurantsInfo";
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import BarsInfo from "./BarsInfo";


const baseURL = process.env.baseURL

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      baseURL: "http://localhost:3003",
      barsURL: "https://api.yelp.com/v3/businesses/search?location=chicago",
      apiKey: "ue2_GLAE9FpEp0NX5hhSw_6qzFoN-MlrnL1Sm7BJUnuixUy4u3MnLp_FqUxqpbyMTzqkqLujFbQRfOgFZUP19cxZo5da-uDeU3OnQJ1KhmPZg1LZssAXl494sszyYXYx",
      restaurants: [],
      bars: [],
      favorites: [],
      favoriteToBeEdited: {},
      description: "",
      name: "",
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
  fetch(this.state.baseURL + '/users/login',{
    method: 'POST',
    body: JSON.stringify({
      username: event.target.username.value,
      password: event.target.password.value
    }),
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + this.state.apiKey

    },
    // credentials: 'include'
  }).then(res => res.json())
  .then(resJson => {
    console.log(resJson)
    this.getInitialBars()
    this.getInitialRestaurants()
    this.getFavorites()
  })
}

register = (event) => {
  event.preventDefault()
  fetch(this.state.baseURL + '/users/signup',{
    method: 'POST',
    body:JSON.stringify({
      username: event.target.username.value,
      password: event.target.password.value,
    }),
    headers:{
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + this.state.apiKey

    }
  }).then(res => res.json())
  .then(resJson => {
    console.log(resJson)
    // call getHolidays TO GET ALL THE HOLIDAYS AND REFRESH PAGE
  })
}

getFavorites = () => {
  //fetch to the backend
  fetch(this.state.baseURL + '/favorites', {
    credentials: 'include'
  })
  .then(res => {
    if(res.status === 200) {
      return res.json()
    }else {
      return []
    }
  }).then(data => {
    // console.log(data)
    this.setState({favorites: data})
  })
}

addFavorites = (newFavorite) => {
  //update state with the new holiday from the NewForm component
  const copyFavorites = [...this.state.favorites]
  copyFavorites.push(newFavorite)
  this.setState({
    favorites: copyFavorites
  })
}

toggleCelebrated = (favorite) => {
  //fetch to the backend with our id to update
  // console.log(favorite)
  fetch(baseURL + '/favorites/' + favorite._id, {
    method: 'PUT',
    body: JSON.stringify({celebrated: !favorite.celebrated}),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(res => res.json())
  .then(resJson => {
    // console.log(resJson)
    const copyFavorites = [...this.state.favorites]
    const findIndex = this.state.favorites.findIndex(
      favorite => favorite._id === resJson.data._id)
      copyFavorites[findIndex].celebrated = resJson.data.celebrated
      this.setState({
        favorites: copyFavorites
      })
  })
}

deleteFavorite = (id) => {
  console.log(id)
  fetch(baseURL + '/favorites/' + id, {
    method: 'DELETE',
    credentials: 'include'
  }).then(res => {
    console.log(res)
    //if I checked for 200 response code
    if(res.status === 200) {
      const findIndex = this.state.favorites.findIndex(favorite => favorite._id === id);
      const copyFavorites = [...this.state.favorites]
      copyFavorites.splice(findIndex, 1)
      this.setState({
        favorites: copyFavorites
      })
    }
  })
}

addLike = (favorite) => {
  // console.log(holiday)
  fetch(baseURL + '/favorites/addlikes/' + favorite._id, {
    method:'PATCH',
    credentials: 'include'
  }).then(res => res.json())
  .then(resJson => {
    // console.log(resJson)
    const copyFavorites = [...this.state.favorites]
    const findIndex = this.state.favorites.findIndex(
      favorite => favorite._id === resJson.data._id)
      copyFavorites[findIndex].likes = resJson.data.likes
      this.setState({
        favorites: copyFavorites
      })
  })
}

handleSubmit = (e) => {
  e.preventDefault()

  fetch(baseURL+ '/favorites/' + this.state.favoriteToBeEdited._id, {
    method: 'PUT',
    body: JSON.stringify({
      name: e.target.name.value,
      description: e.target.description.value
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(res => res.json())
  .then(resJson => {
    // console.log(resJson)
    const findIndex = this.state.favorites.findIndex(favorite => favorite._id === resJson.data._id)
    const copyFavorites = [...this.state.favorites]
    copyFavorites[findIndex] = resJson.data
    this.setState({
      favorites:copyFavorites,
      modalOpen: false
    })
  })
}

handleChange = (event) => {
  this.setState({
    [event.target.id]:event.target.value
  })
}

  showEditForm = (favorite) => {
  console.log(favorite);
  this.setState({
    modalOpen: true,
    name: favorite.name,
    description: favorite.description,
    favoriteToBeEdited: favorite,
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
      fetch(this.state.searchURL, {credentials: 'include'})
      .then(response => {
        return response.json()
      }).then(json => this.setState({
        restaurants: json

      }), (error) => console.log(error))
    })
  }

  handleSubmitBar = (event) => {
    event.preventDefault()
    // set state using baseURL, apiKey, query, movieTitle
    // saving this in state to searchURL
    this.setState({
      searchURL: this.state.baseURL + '/yelp/' + this.state.userBar
    }, () => {
      // fetch request will go here
      fetch(this.state.searchURL, {credentials: 'include'})
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
    this.getFavorites()
  }


  render() {
    // console.log(this.state);
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

        <input type="submit" value="Find Bars" onClick={this.handleSubmitBar}/>
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
    <h1>Favorites</h1>
    <NewForm baseUrl={baseURL} addFavorites={this.addFavorites} />
    <table>
            <tbody>
              {
                this.state.favorites.map((favorite, i) => {
                  return (
                    <tr key={favorite._id}>
                      <td onDoubleClick={() => this.toggleCelebrated(favorite)}
                      className={favorite.celebrated ? 'celebrated' : null}>
                        {favorite.name} 
                        </td>
                      <td> {favorite.description} </td>
                      <td>{favorite.likes}</td>
                      <td onClick={() => this.addLike(favorite)}>LIKE</td>
                      <td onClick={() => this.showEditForm(favorite)}>Show Edit Form</td>
                      <td onClick={() => this.deleteFavorites(favorite._id)}>X</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        {
        this.state.modalOpen && 

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
        }
      </div>
    );
  }
}

export default App;
