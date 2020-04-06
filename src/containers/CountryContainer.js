import React from 'react';
import ArticleCard from '../components/ArticleCard';

class SourceContainer extends React.Component {


    render(){
        return(
            <div className="source-container">
            <h1> Countries Followed: </h1>
            <div className="indiv-div">
                   {this.props.countryHeadLines.map(publisher => { 
                        return <div className="dev-border">
                                {/* {this.props.headlineMaker(publisher)} */}
                                {/* {this.props.joiners.map(joiner => <button id={joiner.id} onClick={this.props.handleRemove}> Stop Following </button>)} */}
                                {publisher.map( article => <ArticleCard article={article} handleRemove={this.props.handleRemove}/> )}
                              </div>
                        })
                    }
            </div>
        </div>
        )
    }
}

export default SourceContainer