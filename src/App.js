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
    reload: false
  }

  setUser = (response) => {
    this.setState({
      currentUser: response
    })
    localStorage.user_id = this.state.currentUser.id
  }

  handleSelectInterests = (e) => {
    e.preventDefault()

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
      }).then(() => {
        this.props.history.push("/home")
        this.setState({
          reload: true
        })
      })
    })
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

  render(){
    return (
      <Router >
        {this.state.reload && <Redirect to="/home" /> }
        <Route path='/login' render={(props) => <Login {...props} setUser={this.setUser} />} />
        <Route path='/selectinterests' render={(props) => <SelectInterests {...props} history={this.history} checked={this.state.checked} handleSelectInterests={this.handleSelectInterests} handleSourcesInputChange={this.handleSourcesInputChange} handleCountriesInputChange={this.handleCountriesInputChange} />} />
        <Route path='/home' render={(props) => <Home {...props} />} />
      </Router>
    );
  }
}

export default App;
