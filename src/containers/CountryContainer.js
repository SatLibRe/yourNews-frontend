import React from 'react';
import ArticleCard from '../components/ArticleCard';

class CountryContainer extends React.Component {

    identifyCountry = (joiner) => {
        let foundCountry = this.props.countries.find(country => country.id == joiner.country_id )
        return foundCountry.name
    }

    render(){
        return(
            <div className="country-container">
            <h1> Countries Followed: </h1>
            <div className="remove-buttons-div">
                {this.props.joiners.map(joiner => {
                        return <button id={joiner.id} onClick={this.props.handleRemove}> X {this.identifyCountry(joiner).toUpperCase()} </button>})}
            </div>
                       {this.props.countryHeadlines.map(publisher => { 
                        return <div className="dev-border" id="">
                                {publisher.map( article => <ArticleCard article={article}/> )}
                              </div>
                        })
                    }
            
        </div>
        )
    }
}

export default CountryContainer