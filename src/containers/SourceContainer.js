import React from 'react';
import ArticleCard from '../components/ArticleCard';

class SourceContainer extends React.Component {

    headlineMaker = (publisher) => {
        for(let i = 0; i < 1; i++){
           return <h1> {publisher[i].source.name} </h1>
        }
    }


    render(){
        return(
            <div className="source-container">
                <h1> Sources Followed: </h1>
                <div className="indiv-div">
                    {this.props.joiners.map(joiner => { 
                        return this.props.sourceHeadlines.map(publisher => { 
                            return <div className="dev-border">
                                    {this.headlineMaker(publisher)}
                                    {publisher.map( article => <ArticleCard article={article} joiner={joiner} handleRemove={this.props.handleRemove}/> )}
                                  </div>
                            })
                        })}
                </div>
            </div>
        )
    }
}

export default SourceContainer