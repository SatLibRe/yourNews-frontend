import React from 'react';
import SourceContainer from "../containers/SourceContainer"
import CountryContainer from "../containers/CountryContainer"
import CustomNewsContainer from "../containers/CustomNewsContainer"
import ArticleCard from "../components/ArticleCard"

class Home extends React.Component {

    state = {
        sources: [],
        sourceJoiners: [],
        sourceHeadlines: [],
        countries: [],
        countryHeadlines: [],
        countryJoiners: [],
        custom_queries: [],
        customQueryHeadlines: [],
        customQueryJoiners: []
    }

    handleEditClick = () => {
        this.props.history.push("/selectinterests")
    }


    handleSourceRemove = (e) => {
        fetch(`http://localhost:3000/usersources/${e.target.id}`, {
            method: 'DELETE'
        })
    }

    handleCountryRemove = (e) => {
        fetch(`http://localhost:3000/countryusers/${e.target.id}`, {
            method: 'DELETE'
        })
    }

    handleCustomNewsRemove = (e) => {
        fetch(`http://localhost:3000/customqueryusers/${e.target.id}`, {
            method: 'DELETE'
        })
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${localStorage.user_id}`)
        .then(response => response.json())
        .then(response => {
            this.setState({
                sources: response.sources, 
                sourceJoiners: response.user_sources,
                countries: response.countries,
                countryJoiners: response.country_users,
                custom_queries: response.custom_queries,
                customQueryJoiners: response.custom_query_users 
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
        console.log(this.state.sourceJoiners)
        return(
        <React.Fragment>
            <button onClick={this.handleEditClick}> Add More Interests </button>
          <SourceContainer handleRemove={this.handleSourceRemove} joiners={this.state.sourceJoiners} sourceHeadlines={this.state.sourceHeadlines}/>
          <CountryContainer  handleRemove={this.handleCountryRemove} joiners={this.state.countryJoiners} countryHeadLines={this.state.countryHeadlines}/>
          <CustomNewsContainer handleRemove={this.handleCustomNewsRemove} joiners={this.state.customQueryJoiners} customQueryHeadlines={this.state.customQueryHeadlines}/>
        </React.Fragment>
        )
    }
}

export default Home