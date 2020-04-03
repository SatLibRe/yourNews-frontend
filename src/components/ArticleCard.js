import React from 'react';

class ArticleCard extends React.Component {

    render(){
        const {title, url, urlToImage, description} = this.props.article
        return(
            <div style={{border: "solid"}}>
                <img src={urlToImage} className="article-images" />
                <h3> <a href={url}> {title} </a> </h3>
                <h6> {this.props.article.source.name} </h6>
                <h4> {description}</h4>

            </div>
        )
    }
}

export default ArticleCard