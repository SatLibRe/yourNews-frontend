import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./routes/Login.js"
import Home from "./routes/Home.js"
import SelectInterests from "./routes/SelectInterests.js"
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect, useHistory } from "react-router-dom"


class App extends React.Component {

  state = {
    currentUser: null,
    sources: [],
    countries: [],
    reload: false,
    custom1: "",
    custom2: "",
  }

  setUser = (response) => {
    this.setState({
      currentUser: response
    })
    localStorage.user_id = this.state.currentUser.id
  }

  handleSelectInterests = (e) => {
    e.preventDefault()
    
    if(this.state.custom1.length >= 2){
      fetch("http://localhost:3000/customqueries", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: this.state.custom1,
        })
      }).then( response => response.json())
      .then(response => {
        fetch("http://localhost:3000/customqueryusers", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            user_id: localStorage.user_id,
            custom_query_id: response.id
          })
        })
      })
    }
  
    this.state.countries.forEach(country => {
      fetch("http://localhost:3000/countries", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: country
        })
      }).then(response => response.json())
      .then(response => {
        fetch(`http://localhost:3000/countryusers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            user_id: localStorage.user_id,
            country_id: response.id
          })
        })
      })
    })
    
    this.state.sources.forEach(source =>{
      fetch(`http://localhost:3000/sources`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: source
        })
      }).then(response => response.json())
      .then(response => {
        fetch(`http://localhost:3000/usersources`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            user_id: localStorage.user_id,
            source_id: response.id
          })
        })
      })
    })
    alert("Selections Added")
  }

  handleSourcesInputChange = (e) => {
    
    this.setState({
      sources: [...this.state.sources, e.target.name]
    })
  }

  handleCountriesInputChange = (e) => {
    this.setState({
      countries: [...this.state.countries, e.target.name]
    })
  }

  handleCustomFormChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }


  render(){
    return (
      <Router >
        {this.state.reload && <Redirect to="/home" /> }
        <Route path='/login' render={(props) => <Login {...props} setUser={this.setUser} />} />
        <Route path='/selectinterests' render={(props) => <SelectInterests {...props} custom1={this.state.custom1} custom2={this.state.custom2} handleCustomFormChange={this.handleCustomFormChange}  checked={this.state.checked} handleSelectInterests={this.handleSelectInterests} handleSourcesInputChange={this.handleSourcesInputChange} handleCountriesInputChange={this.handleCountriesInputChange} />} />
        <Route path='/home' render={(props) => <Home custom1={this.state.custom1} custom2={this.state.custom2} {...props} />} />
      </Router>
    );
  }
}

export default App;
