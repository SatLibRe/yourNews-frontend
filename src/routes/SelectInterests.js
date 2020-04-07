import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Nav from "../components/Nav.js"
import Button from '@material-ui/core/Button';


class SelectInterests extends React.Component {

    state = {
        sources: [
            {id: "abc-news", name: "ABC News"},
            {id: "bloom", name: "Bloomberg"},
            {id: "WSJ", name: "WSJ"},
        ],
        countries: [
            "us",
            "ar",
            "cn", 
            "de", 
            "au",
            "fr",
            "ru",
            "kr"
        ],
        checked: false,
    }
      
    componentDidMount(){
        fetch(`https://newsapi.org/v2/sources?apiKey=03c2753b10984b3ca161dbaf9e6bf35b`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            this.setState({
            sources: response.sources
        })
      })
    }

    render(){
        console.log(this.props)
        return(
        <React.Fragment>
            <Nav history={this.props.history}/>
            <form onSubmit={this.props.handleSelectInterests}>

                <h1 className="choose-headers"> Sources </h1>
                <div className="source-choose-div">
                    <div className="inner-choose-div">
                        {this.state.sources.map(source => 
                            <label key={source.id}>
                                <br/>
                                {source.name}
                            <input
                                name={source.id}
                                type="checkbox"
                                onChange={this.props.handleSourcesInputChange} 
                            />
                            </label> )}
                    </div>
                </div>
                
                <h1 className="choose-headers"> Countries </h1>
                <div className="source-choose-div">
                    <div className="inner-choose-div">
                        {this.state.countries.map(country => 
                        <label key={country.id}>
                            <br/>
                            {country.toUpperCase()}
                        <input
                            name={country}
                            type="checkbox"
                            onChange={this.props.handleCountriesInputChange} 
                        />
                        </label> )}
                    </div>
                </div>
                
                <h1 className="choose-headers"> Custom News </h1>
                <div className="source-choose-div">
                    <div className="inner-choose-div">
                        <label>
                            Keyword 1: <input type="text" name="custom1" value={this.props.custom1} onChange={this.props.handleCustomFormChange} />
                            <br></br>
                            Keyword 2: <input type="text" name="custom2" value={this.props.custom2} onChange={this.props.handleCustomFormChange} />
                        </label>
                    </div>
                </div>
                   <Button id="submit-button" type="submit" value="Submit"> Add Selections to Interests  </Button> 
    

            </form>
        </React.Fragment>
        )
    }
}

export default SelectInterests