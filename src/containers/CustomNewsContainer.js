import React from 'react';
import ArticleCard from '../components/ArticleCard';
import Button from '@material-ui/core/Button';

class CustomNewsContainer extends React.Component {

    identifyCustom = (joiner) => {
        let foundCustom = this.props.custom_queries.find(custom => custom.id == joiner.custom_query_id )
        return foundCustom.name
    }


    render(){
        return(
            <div className="source-container" style={{marginLeft: "18%"}}>
                <h1 className="container-headers"> Keywords Followed: </h1>
                <div>
                    <div className="inner-container">
                        <br></br>                        
                        <div className="remove-buttons-div">
                            {this.props.joiners.map(joiner => {
                                return <button className="remove-buttons" id={joiner.id} onClick={this.props.handleRemove}> x {this.identifyCustom(joiner)} </button>})}
                        </div>
                            {this.props.customQueryHeadlines.map(publisher => { 
                                    return <div className="card-container">        
                                            {publisher.map( article => <ArticleCard article={article}/>)}
                                        </div>
                                    })
                                }
                            <br></br>
                        </div>
                    </div>
                </div>
        )
    }
}

export default CustomNewsContainer

// {this.props.joiners.map(joiner => this.props.customQueryHeadlines.map(publisher => publisher.map( article => <ArticleCard article={article} joiner={joiner} handleRemove={this.props.handleRemove}/> )))}