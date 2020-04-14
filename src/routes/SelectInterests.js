import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Nav from "../components/Nav.js"
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Popup from "../components/Popup.js"
import { APIKEY } from "../APIKEY.js"


class SelectInterests extends React.Component {

    state = {
        sources: [
            {id: "abc-news", name: "ABC News"},
            {id: "bloom", name: "Bloomberg"},
            {id: "WSJ", name: "WSJ"},
        ],
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
      this.props.setAlertFalse()
    }

    render(){
        console.log(this.props)
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
                            <div className="inner-choose-div">
                                <div className="inner-inner-choose-div"> 
                                {this.state.sources.map(source => 
                                    <label key={source.id}>
                                        <br/>
                                        {source.name}
                                    <input
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
                                    <input
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
                                <div className="inner-inner-choose-div"> 
                                    <label>
                                        Keyword 1: <input type="text" name="custom1" value={this.props.custom1} onChange={this.props.handleCustomFormChange} />
                                        <br></br>
                                        Keyword 2: <input type="text" name="custom2" value={this.props.custom2} onChange={this.props.handleCustomFormChange} />
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

export default SelectInterests