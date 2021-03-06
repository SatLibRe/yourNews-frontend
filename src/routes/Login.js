import React from 'react';
import SignInSideLogin from "../components/SignInSideLogin"
import { connect } from "react-redux"
import {URL} from "../HostURL";

import { setCurrentUser } from "../redux/actions"

class Login extends React.Component {

    state = {
        name: "",
        password: ""
    }

    handleLoginFormChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleSubmit = e => {
        e.preventDefault()
        fetch(`${URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(this.state)
        }).then(response => response.json())
        .then(response => {
            if(response.errors){
                alert(response.errors)
            } else {
                this.props.setCurrentUser(response)
                localStorage.token = response.token
                this.props.history.push("/home")
            }
        })
      }


    render(){
        console.log(`I am the Imorted URL: ${URL}`)
        return(
            <SignInSideLogin handleLoginFormChange={this.handleLoginFormChange} handleSubmit={this.handleSubmit}/>
        )
    }
}


const mdp = { setCurrentUser }
export default connect(null,mdp)(Login)
