import React from 'react';
import ArticleCard from '../components/ArticleCard';
import Button from '@material-ui/core/Button';

class SourceContainer extends React.Component {

    state = {
        joinerIds: []
    }



    identifySource = (joiner) => {
        let foundSource = this.props.sources.find(source => source.id == joiner.source_id )
        return foundSource.name
    }


    render(){
        return(
            <div className="source-container">
                <h1 className="container-headers"> Sources Followed: </h1>
                <div className="remove-buttons-div">
                    {this.props.joiners.map(joiner => {
                        return <button className="remove-buttons"  id={joiner.id} onClick={this.props.handleRemove}> x {this.identifySource(joiner)} </button>})}
                </div>
                       {this.props.sourceHeadlines.map(publisher => { 
                            return <div id={this.props.joinerIdAssocMaker(publisher)} className="card-container">
                                    {publisher.map( article => <ArticleCard article={article} /> )}
                                  </div>
                            })
                        }
            </div>
        )
    }
}

export default SourceContainer
