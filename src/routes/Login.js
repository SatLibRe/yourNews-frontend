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


    render(){
        console.log(this.props.history)
        return(
            <SignInSideLogin handleLoginFormChange={this.handleLoginFormChange} handleSubmit={this.handleSubmit}/>
        )
    }
}

export default Login