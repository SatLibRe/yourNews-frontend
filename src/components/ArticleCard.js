// import React from 'react';

// class ArticleCard extends React.Component {

//     render(){
//         const {id, title, url, urlToImage, description} = this.props.article
//         return(
//             <div className="article-card-div">
//                 <img src={urlToImage} className="article-images" />
//                 <h3> <a target="_blank" href={url}> {title} </a> </h3>
//                 <h6> {this.props.article.source.name} </h6>
//                 <h4> {description}</h4>
//                 {/* <button id={this.props.joiner.id} onClick={this.props.handleRemove}> Stop Following {this.props.article.source.name} </button> */}
//             </div>
//         )
//     }
// }


// export default ArticleCard



import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    marginBottom: 50
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(props)
  return (
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.article.source.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.article.source.name}
        subheader={props.article.publishedAt.split("T")[0]}
      />
      <CardMedia
        className={classes.media}
        image= {props.article.urlToImage ? props.article.urlToImage : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAeFBMVEUAAAD///8oKCjX19c+Pj6Ghobb29tQUFBDQ0PGxsaenp729vbExMT6+vrv7+/j4+PNzc1tbW2MjIwjIyOysrK8vLxMTEwZGRns7OxZWVkvLy/h4eFpaWljY2OlpaWvr684ODh+fn4SEhJ1dXWVlZUlJSWZmZkbGxs3SEFbAAAFUUlEQVR4nO2c2ZayOhCFiTigyOA8NQpod7//Gx4ZAhUIelZfCH9qf1dAYq+wOxSVqgqWBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEPiPItO574HMSScxcUVQrjhrO+RDIVoKiq++h7MIHAuYhlZ1igsROl7OEPgKna/xVGhybXf4QyAOPArE+Llmhz7HM4QiMSuOnYEHp4nK/GoT27QxMokuZMzv5Ak6G04Q+BLrMjZuDAnYt3beAbAXr39g4tpkvpb9cI6kyTc9DOaYRBemlei3e3Ux0gGw1pgwddgIyZ9D2Fw2HbfIxgcK8HalmrxH+/7MGNhrhdyHutwDrTPxlEa0+xaLMwNp22FFsXJuKttcXYt3Or+mhlsVj/Hhh7LvTNLaZ/0676QnY63PLK4clP93zOFpSJJ+KqTjKB5d30vcwiUaaLvM87abuXJ1nzXJKaauPo+s2fTtDzeC8OfnIwHFSXRdrk+W77L44CFa0KfHn2E2a9DRWtzXRPKF50oOvu5FkIGBjYek3BA+GaieELsy8P5TtNuImM6Udrx1Kc1kU5a5B1azYZCHVq/+Vp5vphcaWBdvQ02EjpRFo22sJ4712nzhwazIJp430rTqo7Fx2L0+aH1h09EUVd4x9rATnnlxyf06YlJw3MGyVdN4n9+XL1yIZrM68tPAytfNb8uTfstwrmCiQ7/ik6UfXX5aWBlgH6nLJqTgIYZvI4F9T+OTW6xer1EtQe7byV00vKB8ybfJs4SK7tngnxKnqZXhhmPPx2/8QwO4dPoUvn2JQZ2InRhk2zBbHLya0MnSn6jY0945VNx8Jrv6JxsonxyjB/nRjTJPfx5PQm2QjsjNr7wPjrGT5N6RJSfPIYgPdjS2LRTGIHpBSdr+vQcMg/WKVvKl1J7TkyF6Usg6nLcHrUFqZI8LQGmWtNrEgmdKJ5w5Vu2Xg017az5mlhTKkplUxeaa9UPjNckopLIuz0oQql2loEmSmhWOq6K6RVqYpSDJmdy91XAba6IothZDppYOk2UQEKdJM3gq0nsam2vxVkT1fbS+ApjTRp21q/CAxw1GctUqFrTVAnBUZOwSg+r7tytuspOk6h20X59RZQy185QkyNxW5XgpFwyc9PkbiWKK5+odjbfLcpMEzvPhNHlzVURJU9fMNMkbmmirIYKO8tLkyxS0tTEatlZVprkAfuWJkqRZDaVOGhSrYvzNU1LE7X2TfgsNNmVd1tkRNuaWD+qnTVfk7R6s0T5uUaTRjG6MFmTUzjf2VWCp6y20GmiFqMbrckjrydZ5kxlCYFWk5SNJpSLjBJoNcmr77lpsq52Iug1UQu9WGgyKg2s1amJEkxhocmyLmfr0oQWNXHQJCJFsJ2apD4rTXxScN+pCXHyGWiibB3u1qQuNTBfk5EiwgtNqmCK+ZrYyv6ctVA+D6QyZ6LJXa3Y2778PFLAQpO0sXX42LnjOOPscdCksXU4ye75xf6/iIEmMzGmp6c8c+6/EOVhviZBvT/ndJ/I8JKYJ6d9xy92pmuyrvfnJKJB10Zrw+NsKTEdZ6dB10e2Nq7R9bH2n7YOO9H7Pv8sidmF83/hW5j8D/8b9u19H4O528JtuuwGf0nr/1D4HaoT/+XF/QxmGDw0y9kxc2NS5rXIHmIr7vg8DhfkPmJiUBze30uucjNevZNgxV0SuZKpfdar9nNBrBgVmsgV8Czwu9a8jChq0orPJjmh4O2qlZSVSMfH5BqIMO57OMPgVG082TnvezPh92EHgX3tzlIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAH4xAk/8AnrIzjgEhXEQAAAAASUVORK5CYII="}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
            {props.article.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <a target="_blank" href={props.article.url}> <ShareIcon /></a>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph> {props.article.description} </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}