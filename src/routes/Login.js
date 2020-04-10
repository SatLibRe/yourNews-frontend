import React from 'react';
import Button from '@material-ui/core/Button';
import SignInSideLogin from "../components/SignInSideLogin"

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
        fetch("http://localhost:3000/login", {
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
                this.props.setUser(response)
                this.props.history.push("/home")
            }
        })
      }


    render(){
        console.log(this.props.history)
        return(
            <SignInSideLogin handleLoginFormChange={this.handleLoginFormChange} handleSubmit={this.handleSubmit}/>
        )
    }
}

export default Login