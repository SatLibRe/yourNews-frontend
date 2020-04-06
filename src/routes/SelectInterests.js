import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Nav from "../components/Nav.js"


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
                {this.state.sources.map(source => 
                    <label key={source.id}>
                        {source.name}
                    <input
                        name={source.id}
                        type="checkbox"
                        onChange={this.props.handleSourcesInputChange} 
                    />
                    </label> )}
                {this.state.countries.map(country => 
                <label key={country.id}>
                    {country}
                <input
                    name={country}
                    type="checkbox"
                    onChange={this.props.handleCountriesInputChange} 
                />
                </label> )}
                <br></br>
                <label>
                    Custom News
                    <input type="text" name="custom1" value={this.props.custom1} onChange={this.props.handleCustomFormChange} />
                    <input type="text" name="custom2" value={this.props.custom2} onChange={this.props.handleCustomFormChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </React.Fragment>
        )
    }
}

export default SelectInterests