import React from 'react';
import Button from '@material-ui/core/Button';
import SignInSide from "../components/SignInSide"

class Login extends React.Component {

    state = {
        name: ""
    }

    handleLoginFormChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
      e.preventDefault()
      fetch("http://localhost:3000/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            name: this.state.name
        })
      }).then(response => response.json())
      .then(response => {
          console.log(response)
          this.props.setUser(response)
          this.props.history.push("/selectinterests")
      })
    }

    render(){
        return(
            <SignInSide handleLoginFormChange={this.handleLoginFormChange} handleSubmit={this.handleSubmit}/>
        )
    }
}

export default Login