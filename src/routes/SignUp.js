import React from 'react';
import SignInSide from "../components/SignInSide"
import { connect } from "react-redux"
import { setCurrentUser } from "../redux/actions"
import {URL} from "../HostURL";

class SignUp extends React.Component {

    state = {
        name: "",
        password: "",
        zipcode: ""
    }

    handleSignUpFormChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
      e.preventDefault()
      fetch(`${URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            name: this.state.name,
            password: this.state.password,
            zipcode: this.state.zipcode
        })
      }).then(response => response.json())
      .then(response => {
          console.log(response.errors)
          if(response.errors){
              alert(response.errors)
          } else {
          this.props.setCurrentUser(response)
          localStorage.token = response.token
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

const mdp = { setCurrentUser }
export default connect(null,mdp)(SignUp)