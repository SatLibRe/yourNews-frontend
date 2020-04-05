import React from 'react';
import ArticleCard from '../components/ArticleCard';

class SourceContainer extends React.Component {


    render(){
        return(
            <div className="source-container">
                <h1> Sources Followed: </h1>
                {this.props.joiners.map(joiner => this.props.sourceHeadlines.map(publisher => publisher.map( article => <ArticleCard article={article} joiner={joiner}/> )))}
            </div>
        )
    }
}

export default SourceContainer