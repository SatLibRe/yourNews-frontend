import React from 'react';
import ArticleCard from '../components/ArticleCard';
import Button from '@material-ui/core/Button';

class CountryContainer extends React.Component {

    identifyCountry = (joiner) => {
        let foundCountry = this.props.countries.find(country => country.id == joiner.country_id )
        return foundCountry.name
    }

    render(){
        return(
            <div className="source-container">
            <h1 className="container-headers"> Countries Followed: </h1>
            <div className="remove-buttons-div">
                {this.props.joiners.map(joiner => {
                        return <Button  style={{background: "#f50057", color: "white", marginRight: "2%"}} id={joiner.id} onClick={this.props.handleRemove}> X {this.identifyCountry(joiner).toUpperCase()} </Button>})}
            </div>
                       {this.props.countryHeadlines.map(publisher => { 
                        return <div className="card-container" id="">
                                {publisher.map( article => <ArticleCard article={article}/> )}
                              </div>
                        })
                    }
            
        </div>
        )
    }
}

export default CountryContainer