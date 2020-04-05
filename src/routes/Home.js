import React from 'react';
import SourceContainer from "../containers/SourceContainer"
import CountryContainer from "../containers/CountryContainer"
import CustomNewsContainer from "../containers/CustomNewsContainer"
import ArticleCard from "../components/ArticleCard"

class Home extends React.Component {

    state = {
        sources: [],
        sourceHeadlines: [],
        countries: [],
        countryHeadlines: [],
        custom_queries: [],
        customQueryHeadlines: [],
    }

    handleEditClick = () => {
        this.props.history.push("/selectinterests")
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${localStorage.user_id}`)
        .then(response => response.json())
        .then(response => {
            this.setState({
                sources: response.sources, 
                countries: response.countries,
                custom_queries: response.custom_queries
            })
        }).then( () => this.state.sources.forEach(source => 
            {
                fetch(`https://newsapi.org/v2/top-headlines?sources=${source.name}&apiKey=03c2753b10984b3ca161dbaf9e6bf35b`)
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        sourceHeadlines: [...this.state.sourceHeadlines,response.articles.slice(0,5)]
                    })
                })
        })).then( () => this.state.countries.forEach(country => 
            {
                fetch(`https://newsapi.org/v2/top-headlines?country=${country.name}&apiKey=03c2753b10984b3ca161dbaf9e6bf35b`)
                .then(response => response.json())
                .then( response => {
                    this.setState({
                        countryHeadlines: [...this.state.countryHeadlines,response.articles.slice(0,5)]
                    })
                })
        })).then( () => this.state.custom_queries.forEach(query => 
            {
                fetch(`https://newsapi.org/v2/everything?q=${query.name}&apiKey=03c2753b10984b3ca161dbaf9e6bf35b`)
                .then(response => response.json())
                .then( response => {
                    this.setState({
                        customQueryHeadlines: [...this.state.customQueryHeadlines, response.articles.slice(0,5)]
                    })
                })
        }))
    }

    

    render(){
        console.log(this.state.customQueryHeadlines)
        return(
        <React.Fragment>
            <button onClick={this.handleEditClick}> Edit </button>
          <SourceContainer sourceHeadlines={this.state.sourceHeadlines}/>
          <CountryContainer countryHeadLines={this.state.countryHeadlines}/>
          <CustomNewsContainer customQueryHeadlines={this.state.customQueryHeadlines}/>
        </React.Fragment>
        )
    }
}

export default Home