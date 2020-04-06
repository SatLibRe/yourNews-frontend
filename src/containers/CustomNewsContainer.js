import React from 'react';
import ArticleCard from '../components/ArticleCard';

class CustomNewsContainer extends React.Component {

    identifyCustom = (joiner) => {
        let foundCustom = this.props.custom_queries.find(custom => custom.id == joiner.custom_query_id )
        return foundCustom.name
    }


    render(){
        return(
            <div className="custom-news-container">
                <h1> Keywords Followed: </h1>
                <div className="indiv-div">
                {this.props.joiners.map(joiner => {
                    return <button id={joiner.id} onClick={this.props.handleRemove}> X {this.identifyCustom(joiner)} </button>})}
                       {this.props.customQueryHeadlines.map(publisher => { 
                            return <div id="" className="dev-border">        
                                    {publisher.map( article => <ArticleCard article={article}/>)}
                                  </div>
                            })
                        }
                </div>
            </div>
        )
    }
}

export default CustomNewsContainer

// {this.props.joiners.map(joiner => this.props.customQueryHeadlines.map(publisher => publisher.map( article => <ArticleCard article={article} joiner={joiner} handleRemove={this.props.handleRemove}/> )))}