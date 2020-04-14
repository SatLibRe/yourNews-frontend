import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from "./routes/SignUp.js"
import Login from "./routes/Login.js"
import Home from "./routes/Home.js"
import SelectInterests from "./routes/SelectInterests.js"
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Redirect, useHistory } from "react-router-dom"
import Alert from '@material-ui/lab/Alert';
import Nav from "./components/Nav.js"



class App extends React.Component {

  state = {
    currentUser: null,
    sources: [],
    countries: [],
    reload: false,
    custom1: "",
    custom2: "",
    alertTriggered: false,
    loading: true
  }

      componentDidMount(){
        const token = localStorage.token
        if(token){
          fetch("http://localhost:3000/autologin", {
            headers: {
              "Authorization": token
            }
          }).then(resp => resp.json())
          .then(resp => {
              if(resp.errors){
                console.log(resp.errors)
              }  else {
                console.log(resp)
                this.setState({
                  currentUser: resp
                })
              }
            }
          )
        } 
      }


      handleSelectInterests = (e) => {
          e.preventDefault()
            this.setState({
              alertTriggered: true
            })
          
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
                  user_id: this.state.currentUser.id,
                  custom_query_id: response.id
                })
              })
            }).then(() => {
              this.setState({
                custom1: ""
              })
            })
          }
      
          if(this.state.custom2.length >= 2){
            fetch("http://localhost:3000/customqueries", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify({
                name: this.state.custom2,
              })
            }).then( response => response.json())
            .then(response => {
              fetch("http://localhost:3000/customqueryusers", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                  user_id: this.state.currentUser.id,
                  custom_query_id: response.id
                })
              })
            }).then(() => {
              this.setState({
                custom2: ""
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
                  user_id: this.state.currentUser.id,
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
                  user_id: this.state.currentUser.id,
                  source_id: response.id
                })
              })
            })
          })
        }

  setUser = (response) => {
    this.setState({
      currentUser: response.user
    }, () => {
      localStorage.token = response.token
    })
  }

  setAlertFalse = () => {
    this.setState({
      alertTriggered: false
    })
  }

  checkChecked = (name) => {
    return this.state.sources.includes(name) 
  }

  checkCountryChecked = (name) => {
    return this.state.countries.includes(name.split(":")[0]) 
  }

  handleSourcesInputChange = (e) => {
    if(e.target.checked === true){
      this.setState({
        sources: [...this.state.sources, e.target.name]
      })     
    } else if(e.target.checked === false){
      this.setState({
        sources: this.state.sources.filter(source => source != e.target.name)
      }) 
    }
  }

  handleAppStateSourceRemoval = (e) => {
    this.setState({
      sources: this.state.sources.filter(name => name != e.target.innerText.split(" ")[1])
    })
  }

  handleAppStateCountryRemoval = (e) => {
    this.setState({
      countries: this.state.countries.filter(name => name != e.target.innerText.split(" ")[1].toLowerCase())
    })
  }

  handleCountriesInputChange = (e) => {
    if(e.target.checked === true){
      this.setState({
        countries: [...this.state.countries, e.target.name.split(":")[0]]
      })     
    } else if(e.target.checked === false){
      this.setState({
        countries: this.state.countries.filter(country => country != e.target.name.split(":")[0])
      }) 
    }
  }

  handleCustomFormChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleLogout = () => {
    this.setState({
      currentUser: ""
    }, () => {
      localStorage.removeItem("token")
    })
  }

  handleLoading = () => {
    this.setState({loading: false})
  }


  render(){
    return (
      <Router >
        {/* {this.state.reload && <Redirect to="/home" /> } */}
        <Route exact path='/signup' render={(props) => <SignUp {...props} setUser={this.setUser} />} />
        <Route exact path='/login' render={(props) => <Login {...props} setUser={this.setUser} />} />
        <Route exact path='/selectinterests' render={(props) => localStorage.token ? <SelectInterests handleLogout={this.handleLogout} currentUser={this.state.currentUser} checkCountryChecked={this.checkCountryChecked} checkChecked={this.checkChecked} setAlertFalse={this.setAlertFalse} alertTriggered={this.state.alertTriggered} {...props} custom1={this.state.custom1} custom2={this.state.custom2} handleCustomFormChange={this.handleCustomFormChange}  checked={this.state.checked} handleSelectInterests={this.handleSelectInterests} handleSourcesInputChange={this.handleSourcesInputChange} handleCountriesInputChange={this.handleCountriesInputChange} /> : <Redirect to="/login" />} />
        <Route exact path='/home' render={(props) => localStorage.token ? <Home handleLoading={this.handleLoading} loading={this.state.loading} handleLogout={this.handleLogout} currentUser={this.state.currentUser} handleAppStateCountryRemoval={this.handleAppStateCountryRemoval} handleAppStateSourceRemoval={this.handleAppStateSourceRemoval} custom1={this.state.custom1} custom2={this.state.custom2} {...props} /> : <Redirect to="/login" /> } />
      </Router>
    );
  }
}

export default App;
