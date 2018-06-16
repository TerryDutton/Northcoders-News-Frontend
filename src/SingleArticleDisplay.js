import React from 'react'; 
import source from './source';
import axios from 'axios';
import {Link} from 'react-router-dom';
import CommentsDisplay from './CommentsDisplay'; 
import VoteButtons from './VoteButtons';
import RenderError from './RenderError';

class SingleArticleDisplay extends React.Component{
  state = {
    article: null,
    err: null
  }

  componentDidMount(){
    const {articleID} = this.props.match.params;
    return this.getArticle(articleID);
  }

  componentDidUpdate(prevProps){
    const {articleID} = this.props.match.params;
    if (articleID !== prevProps.match.params.articleID) return this.getArticle(articleID); 
  }

  render(){ 
    const {article, err} = this.state;
    if (err) return <RenderError err={err}/>; 
    if (!article) return null;
    const {title, body, belongs_to, votes, created_by, _id} = article; 
    const {username} = created_by;
    return (
      <div>
        <article>
          <h2>{title}</h2>
          <h6>
            {`author: `}<Link to={`/api/users/${username}`}>{`${username}`}<br/></Link>
            {'topic: ' }<Link to={`/api/topics/${belongs_to._id}/articles`}>{`${belongs_to.title}`}</Link>
          </h6>
          <p>{body}</p>
        </article>
        <span>
          {`This article has ${votes} votes`}
          <VoteButtons voteFunction={this.voteOnArticle} targetID={_id}/>
        </span>
        <CommentsDisplay {...this.props}/>
      </div>
    );
  }

  getArticle = articleID => {
    const path = `${source}/articles/${articleID}`;
    return axios.get(path)
    .then(({data}) => {
      const {article} = data;
      return this.setState({article, err: null});
    })
    .catch(err => {
      console.log(err);
      return this.setState({err});
    });
  }

  voteOnArticle = (articleID, vote) => {
    const path = `${source}/articles/${articleID}?vote=${vote > 0 ? 'up' : 'down'}`;
    return axios.put(path)
    .then(() => {
      const article = Object.assign({}, this.state.article); 
      article.votes += vote; 
      this.setState({article, err: null});
    })
    .catch(err => console.log(err));
  }
}

export default SingleArticleDisplay;