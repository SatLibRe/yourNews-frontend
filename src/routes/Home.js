import React from 'react';
import SourceContainer from "../containers/SourceContainer"
import CountryContainer from "../containers/CountryContainer"
import ArticleCard from "../components/ArticleCard"

class Home extends React.Component {

    state = {
        sources: [],
        sourceHeadlines: [],
        countries: [],
        countryHeadlines: []
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${localStorage.user_id}`)
        .then(response => response.json())
        .then(response => {
            this.setState({
                sources: response.sources, 
                countries: response.countries
            })
        }).then( () => this.state.sources.forEach(source => 
            {
                fetch(`https://newsapi.org/v2/top-headlines?sources=${source.name}&apiKey=03c2753b10984b3ca161dbaf9e6bf35b`)
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        sourceHeadlines: [...this.state.sourceHeadlines,response.articles]
                    })
                })
        })).then( () => this.state.countries.forEach(country => 
            {
                fetch(`https://newsapi.org/v2/top-headlines?country=${country.name}&apiKey=03c2753b10984b3ca161dbaf9e6bf35b`)
                .then(response => response.json())
                .then( response => {
                    this.setState({
                        countryHeadlines: [...this.state.countryHeadlines,response.articles]
                    })
                })
        }))
    }

    render(){
        return(
        <React.Fragment>
          <SourceContainer sourceHeadlines={this.state.sourceHeadlines}/>
          <CountryContainer countryHeadLines={this.state.countryHeadlines}/>
        </React.Fragment>
        )
    }
}

export default Home