import React from 'react';

class ArticleCard extends React.Component {

    render(){
        const {id, title, url, urlToImage, description} = this.props.article
        return(
            <div className="article-card-div">
                <img src={urlToImage} className="article-images" />
                <h3> <a href={url}> {title} </a> </h3>
                <h6> {this.props.article.source.name} </h6>
                <h4> {description}</h4>
                <button id={this.props.joiner.id} onClick={this.props.handleRemove}> Stop Following {this.props.article.source.name} </button>
            </div>
        )
    }
}

export default ArticleCard