import React from 'react';
import ArticleCard from '../components/ArticleCard';

class CustomNewsContainer extends React.Component {


    render(){
        return(
            <div className="source-container">
                <h1> Custom Keywords Followed: </h1>
                {this.props.customQueryHeadlines.map(publisher => publisher.map( article => <ArticleCard article={article}/> ))}
            </div>
        )
    }
}

export default CustomNewsContainer