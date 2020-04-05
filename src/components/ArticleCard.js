import React from 'react';

class ArticleCard extends React.Component {

    handleSourceRemove = (e) => {
        fetch(`http://localhost:3000/usersources/${e.target.id}`, {
            method: 'DELETE'
        })
    }

    render(){
        const {id, title, url, urlToImage, description} = this.props.article
        return(
            <div className="article-card-div">
                <img src={urlToImage} className="article-images" />
                <h3> <a href={url}> {title} </a> </h3>
                <h6> {this.props.article.source.name} </h6>
                <h4> {description}</h4>
                <button id={this.props.sourceJoiner.id} onClick={this.handleSourceRemove}> Stop Following {this.props.article.source.name} </button>
            </div>
        )
    }
}

export default ArticleCard