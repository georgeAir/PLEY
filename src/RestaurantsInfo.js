import React, {Component} from 'react'

export default class RestaurantInfo extends Component{
  render(){
    return(
      <>
        <h1>name: {this.props.city.name}</h1>
        <h2>cuisineType: {this.props.typeOfRestaurant}</h2>
        <h2>description: {this.props.description}</h2>
        <h2>likes: {this.props.likes}</h2>
        <h2>location: {this.props.location}</h2>

      </>
    )
  }
}
