import React from 'react';
import ArticleCard from '../components/ArticleCard';

class CustomNewsContainer extends React.Component {


    render(){
        return(
            <div className="source-container">
                <h1> Custom Keywords Followed: </h1>
                {this.props.joiners.map(joiner => this.props.customQueryHeadlines.map(publisher => publisher.map( article => <ArticleCard article={article} joiner={joiner} handleRemove={this.props.handleRemove}/> )))}
            </div>
        )
    }
}

export default CustomNewsContainer