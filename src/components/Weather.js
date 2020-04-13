import React from "react";
import { APIKEYW } from "../APIKEYWEATHER.js"

export default class Weather extends React.Component {

state = {
    degrees: "",
    usState: "",
    temp: "",
    decription: "",
    icons: ""
}

handleFetches = () => {
    if(this.props.currentUser){
        fetch(`https://api.weatherbit.io/v2.0/current?&units=I&postal_code=${this.props.currentUser.zipcode}&key=${APIKEYW}`)
        .then(response => response.json())
        .then(response => {
            console.log(response.data[0])
            this.setState({
                city: response.data[0].city_name,
                usState: response.data[0].state_code,
                temp: response.data[0].temp,
                description: response.data[0].weather.description,
                iconCode: response.data[0].weather.icon
            })
        })
    }
}

componentDidMount(){
    this.handleFetches()
}

componentDidUpdate(prevProps, prevState){
    if(prevProps.currentUser === null && this.props.currentUser){
        this.handleFetches()
    }
}

  render() {   
      const {degrees,usState,city,temp, description, iconCode} = this.state 
    return (
      <div className="weather">
          {this.props.currentUser ? 
            <span> Current Weather For: {city}, {usState} {temp}°, {description} <img id="weather-image" src={`https://www.weatherbit.io/static/img/icons/${iconCode}.png`}/> </span>
            :
            null
          }
      </div>
    );
  }
}