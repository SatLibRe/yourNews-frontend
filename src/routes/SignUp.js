import React from 'react';
import Button from '@material-ui/core/Button';
import SignInSide from "../components/SignInSide"

class SignUp extends React.Component {

    state = {
        name: "",
        password: ""
    }

    handleSignUpFormChange = e => {
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
            name: this.state.name,
            password: this.state.password,
        })
      }).then(response => response.json())
      .then(response => {
          console.log(response.errors)
          if(response.errors){
              alert(response.errors)
          } else {
          this.props.setUser(response)
          this.props.history.push("/selectinterests")
          }
      })
    }

    render(){
        console.log(this.props.history)
        return(
            <SignInSide handleSignUpFormChange={this.handleSignUpFormChange} handleSubmit={this.handleSubmit}/>
        )
    }
}

export default SignUp