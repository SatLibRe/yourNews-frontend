import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Nav from "../components/Nav.js"
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Popup from "../components/Popup.js"
import { APIKEY } from "../APIKEY.js"
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux"

import {setAlertFalseRedux, handleCustom1ChangeRedux, handleCustom2ChangeRedux } from "../redux/actions"



class SelectInterests extends React.Component {

    state = {
        sources: [],
        countries: [
            "us: United States",
            "gb: United Kingdom",
            "cn: China", 
            "de: Germany", 
            "au: Australia",
            "fr: France",
            "ru: Russia",
            "ca: Canada",
            "jp: Japan"
        ],
        checked: false,
    }
      
    componentDidMount(){
        fetch(`https://newsapi.org/v2/sources?${APIKEY}`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            this.setState({
            sources: response.sources
        })
      })
      this.props.setAlertFalseRedux()
    }

    render(){
        console.log(this.props, "Props Store")
        return(
            <React.Fragment>
            <Nav history={this.props.history} handleLogout={this.props.handleLogout} currentUser={this.props.currentUser} setAlertFalse={this.props.setAlertFalse}/>
                    {this.props.alertTriggered === true ?   <Alert variant="filled" severity="success">Selections added! Click HOME to check them out!</Alert> : null}
                    <Popup />
                <form onSubmit={this.props.handleSelectInterests}>
                    <button id="submit-button" type="submit" value="Submit"> Add Selections to Interests  </button> 
                    <div className="master-select-container">
                        <div className="sources-selection-container">
                        <h1 className="choose-headers"> Sources </h1>
                            <div className="inner-source-choose-div">
                                <div className="inner-inner-choose-div"> 
                                {this.state.sources.map(source => 
                                    <label key={source.id}>
                                        <br/>
                                        {source.name}
                                    <Checkbox
                                        checked = {this.props.checkChecked(source.id)}
                                        name={source.id}
                                        type="checkbox"
                                        onChange={this.props.handleSourcesInputChange} 
                                    />
                                    </label> )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="selection-container">
                        <h1 className="choose-headers"> Countries </h1>
                            <div className="inner-choose-div">
                                <div className="inner-inner-choose-div"> 
                                    {this.state.countries.map(country => 
                                    <label key={country.id}>
                                        <br/>
                                        {country}
                                    <Checkbox
                                        checked = {this.props.checkCountryChecked(country)}
                                        name={country}
                                        type="checkbox"
                                        onChange={this.props.handleCountriesInputChange} 
                                    />
                                    </label> )}
                                </div>
                            </div>
                        
                        <h1 className="choose-headers"> Custom News </h1>
                            <div className="inner-choose-div">
                                <div className="inner-inner-custom-choose-div"> 
                                    <label>
                                         <TextField type="text" label="Keyword-1" name="custom1" value={this.props.custom1} onChange={(e) => this.props.handleCustom1ChangeRedux(e.target.value)} />
                                        <br></br>
                                        <TextField type="text" label="Keyword-2" name="custom2" value={this.props.custom2} onChange={(e) => this.props.handleCustom2ChangeRedux(e.target.value)} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
        </React.Fragment>
        )
    }
}

function msp(state) {
    console.log("MSP", state)
    return {
        alertTriggered: state.alertTriggered,
        currentUser: state.currentUser,
        custom1: state.custom1,
        custom2: state.custom2
    }
  }

const mdp = { setAlertFalseRedux, handleCustom1ChangeRedux, handleCustom2ChangeRedux }

export default connect(msp, mdp)(SelectInterests)