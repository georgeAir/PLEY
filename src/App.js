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
      'Authorization': 'Bearer ' + this.state.apiKey

    },
    credentials: 'include'
  }).then(res => res.json())
  .then(resJson => {
    console.log(resJson)

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
      'Authorization': 'Bearer ' + this.state.apiKey

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
  fetch(this.state.baseURL + '/favorites/' + id, {
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
  fetch(this.state.baseURL + '/favorites/addlikes/' + favorite._id, {
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

handleSubmitEdit= (e) => {
  e.preventDefault()

  fetch(baseURL+ '/favorites/' + this.state.favoriteToBeEdited._id, {
    method: 'PUT',
    body: JSON.stringify({
      name: e.target.name.value,
      description: e.target.price.value
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    // credentials: 'include'
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

  getInitialRestaurants = () => {
  const searchURL = this.state.baseURL + '/yelp/'
  fetch(searchURL)
    .then(res => res.json())
    .then(json => this.setState({
      restaurants: json
    }));
  }

  getInitialBars = () => {
const term = 'bars'
const searchURL = this.state.baseURL + '/yelp/' + term
fetch(searchURL)
  .then(res => res.json())
  .then(json => this.setState({
    bars: json
  }));
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
            <Card className="foodCard" style={{ background: 'orange' }}>
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
            </Card.Body>
          </Card>

          )
        })
      }
      </div>
      </section>


      <h1>Bars!</h1>

      <form onSubmit= {this.handleSubmitBar}>
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
            </Card.Body>
          </Card>

          )
        })
      }
      </div>
    </section>
    <h1>Favorites</h1>

    <section className="FavList">
    <div className= "FavDiv">
    { this.state.favorites.map((favorite, i) => {
        return (

          <Card className="barCard" style={{ width: '15rem' }}>
          <Card.Img variant="top" src={favorite.img} style={{ width: '15rem' }}/>
          <Card.Body>
            <Card.Title className="favoriteName" >{favorite.name}</Card.Title>
            <Card.Text>
              Price: {favorite.price}
            </Card.Text>
            <Card.Text>
              Likes: {favorite.likes}
              <button onClick={() => this.addLike(favorite)}>Like:❤️‍></button>
            </Card.Text>
            <Card.Text>
              Phone: {favorite.Phone}
            </Card.Text>
            <Card.Text>
              {favorite.display_address}
            </Card.Text>
            <Button variant="primary">Edit</Button> <br>
            <button onClick={() => this.deleteFavorite(favorite._id)}>Delete:❌</button>
          </Card.Body>
        </Card>


        )
      })
    }
    </div>
  </section>
        {

        this.state.modalOpen &&

          <form onSubmit={this.handleSubmitEdit}>
            <label>Name: </label>
            <input
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />{" "}
            <br />

            <label>Price: </label>
            <input
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />{" "}
            <br />

            <button>Submit</button>
          </form>
        }
      </div>
    );
  }
}

export default App;
