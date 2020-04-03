import React from 'react';

class Home extends React.Component {

    state = {
        sources: [],
        sourceHeadlines: []
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${localStorage.user_id}`)
        .then(response => response.json())
        .then(response => {
            console.log(response.sources)
            this.setState({
                sources: response.sources
            })
        }).then( () => this.state.sources.forEach(source => 
            {
                fetch(`https://newsapi.org/v2/top-headlines?sources=${source.name}&apiKey=03c2753b10984b3ca161dbaf9e6bf35b`)
                .then(response => response.json())
                .then(response => {
                    console.log(response.articles)
                    this.setState({
                        sourceHeadlines: response.articles
                    })
                })
        }))
    }

    render(){
        return(
            <ul>
                {this.state.sourceHeadlines.map(article => <li key={article.id}> {article.title}</li>)}
            </ul>
        )
    }
}

export default Home