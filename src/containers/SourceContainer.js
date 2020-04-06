import React from 'react';
import ArticleCard from '../components/ArticleCard';

class SourceContainer extends React.Component {

    identifySource = (joiner) => {
        let foundSource = this.props.sources.find(source => source.id == joiner.source_id )
        return foundSource.name
    }

    render(){
        return(
            <div className="source-container">
                <h1> Sources Followed: </h1>
                <div className="indiv-div">
                {this.props.joiners.map(joiner => {
                    return <button id={joiner.id} onClick={this.props.handleRemove}> Stop Following {this.identifySource(joiner)} </button>})}
                       {this.props.sourceHeadlines.map(publisher => { 
                            return <div id="" className="dev-border">
                                    {this.props.headlineMaker(publisher)}            
                                    {publisher.map( article => <ArticleCard article={article} /> )}
                                  </div>
                            })
                        }
                </div>
            </div>
        )
    }
}

export default SourceContainer
