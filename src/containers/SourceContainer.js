import React from 'react';
import ArticleCard from '../components/ArticleCard';

class SourceContainer extends React.Component {


    render(){
        return(
            <div className="source-container">
                <h1> Sources Followed: </h1>
                {this.props.sourceJoiners.map(sourceJoiner => this.props.sourceHeadlines.map(publisher => publisher.map( article => <ArticleCard article={article} sourceJoiner={sourceJoiner}/> )))}
            </div>
        )
    }
}

export default SourceContainer