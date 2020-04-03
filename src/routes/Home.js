import React from 'react';
import SourceContainer from "../containers/SourceContainer"
import ArticleCard from "../components/ArticleCard"

class Home extends React.Component {

    state = {
        sources: [],
        sourceHeadlines: [],
        countries: []
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${localStorage.user_id}`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
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
        }))
    }

    render(){
        return(
          <SourceContainer sourceHeadlines={this.state.sourceHeadlines}/>
        //   {this.state.sourceHeadlines.map(publisher => publisher.map( article => <p> {article.title}</p> ))}
        )
    }
}

export default Home