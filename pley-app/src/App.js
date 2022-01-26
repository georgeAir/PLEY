import './App.css';
import React, { Component } from 'react'

let baseUrl = 'http://localhost:3003'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      restaurants: []
    }
    // if you do not use an arrow function for getRestaurants()
   // this.getRestaurants = this.getRestaurants.bind(this)
  }

  getRestaurants = () => {
    // fetch to the backend
    fetch(baseUrl + '/restaurants')
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

  // Component lifecycle flowchart
  // https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

  componentDidMount() {
    this.getRestaurants()
  }

  render() {
    return (
      <div className="App">
        <h1>Restaurants! Celebrate! </h1>
        <table>
          <tbody>
            { this.state.restaurants.map((restaurant, i) => {
                return (
                  <tr key={i}>
                    <td key={restaurant._id}> {restaurant.name} </td>
                    <td> {restaurant.description} </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App
