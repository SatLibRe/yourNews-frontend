import React from 'react';
import ArticleCard from '../components/ArticleCard';

class SourceContainer extends React.Component {


    render(){
        return(
            <div className="source-container">
                <h1> Countries Followed: </h1>
                {this.props.joiners.map(joiner => this.props.countryHeadLines.map(publisher => publisher.map( article => <ArticleCard article={article} joiner={joiner} handleRemove={this.props.handleRemove}/> )))}
            </div>
        )
    }
}

export default SourceContainer