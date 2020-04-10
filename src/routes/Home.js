import React from 'react';
import SourceContainer from "../containers/SourceContainer"
import CountryContainer from "../containers/CountryContainer"
import CustomNewsContainer from "../containers/CustomNewsContainer"
import ArticleCard from "../components/ArticleCard"
import Nav from "../components/Nav.js"
import { APIKEY } from "../APIKEY.js"

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

    


    handleSourceRemove = (e) => {
        this.setState({
            sourceHeadlines: []
        })
        this.props.handleAppStateSourceRemoval(e)
        e.target.remove()
        fetch(`http://localhost:3000/usersources/${e.target.id}`, {
            method: 'DELETE'
        })
    }

    handleCountryRemove = (e) => {
        
        // document.getElementById(e.target.innerText.split(" ")[1]).remove()
        this.setState({
            countryHeadlines: []
        })
        this.props.handleAppStateCountryRemoval(e)
        e.target.remove()
        fetch(`http://localhost:3000/countryusers/${e.target.id}`, {
            method: 'DELETE'
        })
    }

    handleCustomNewsRemove = (e) => {
        
        // document.getElementById(e.target.dataset.id.split(" ")[1]).remove()
        this.setState({
            customQueryHeadlines: []
        })
        e.target.remove()
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

                // let test = response.articles[0].source.id
                // let tester = {}
                // tester[test] = response.articles.slice(0,5)
                // this.setState({sourceHeadlines: [...this.state.sourceHeadlines,tester]})
        })).then( () => this.state.countries.forEach(country => 
            {
                fetch(`https://newsapi.org/v2/top-headlines?country=${country.name}&${APIKEY}`)
                .then(response => response.json())
                .then( response => {
                    this.setState({
                        countryHeadlines: [...this.state.countryHeadlines,response.articles.slice(0,5)]
                    })
                })
        })).then( () => this.state.custom_queries.forEach(query => 
            {
                fetch(`https://newsapi.org/v2/everything?q=${query.name}&${APIKEY}`)
                .then(response => response.json())
                .then( response => {
                    this.setState({
                        customQueryHeadlines: [...this.state.customQueryHeadlines, response.articles.slice(0,5)]
                    })
                })
        }))
    }

    joinerIdAssocMaker = (publishers) => {
        if(publishers.length > 0){
            for(let i = 0; i < 1; i++){
                let publisher = publishers[0]
                publishers.splice(publishers[i],1)
               return publisher.source.id
            }
        }
    }

    

    render(){
        
        return(
        <React.Fragment>
            <Nav history={this.props.history} handleLogout={this.props.handleLogout} currentUser={this.props.currentUser}/>
            <div className="master-home-container">
                <SourceContainer  sources={this.state.sources} handleRemove={this.handleSourceRemove} joinerIdAssocMaker={this.joinerIdAssocMaker} joiners={this.state.sourceJoiners} sourceHeadlines={this.state.sourceHeadlines}/>
                <CountryContainer  countries={this.state.countries} handleRemove={this.handleCountryRemove} joinerIdAssocMaker={this.joinerIdAssocMaker} joiners={this.state.countryJoiners} countryHeadlines={this.state.countryHeadlines}/>
                <CustomNewsContainer custom_queries={this.state.custom_queries} handleRemove={this.handleCustomNewsRemove} joinerIdAssocMaker={this.joinerIdAssocMaker} joiners={this.state.customQueryJoiners} customQueryHeadlines={this.state.customQueryHeadlines}/> 
            </div>
        </React.Fragment>
        )
    }
}

export default Home