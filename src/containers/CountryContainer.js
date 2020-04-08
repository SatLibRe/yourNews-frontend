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
            <div className="source-container" style={{marginLeft: "13%"}}>
            <h1 className="container-headers"> Countries Followed: </h1>
            <div className="inner-container">
                <br></br>
                <div className="remove-buttons-div">
                    {this.props.joiners.map(joiner => {
                            return <button  className="remove-buttons" id={joiner.id} onClick={this.props.handleRemove}> x {this.identifyCountry(joiner).toUpperCase()} </button>})}
                </div>
                        {this.props.countryHeadlines.map(publisher => { 
                            return <div className="card-container" >
                                    {publisher.map( article => <ArticleCard article={article}/> )}
                                </div>
                            })
                        }
                <br></br>
            </div>
        </div>
        )
    }
}

export default CountryContainer