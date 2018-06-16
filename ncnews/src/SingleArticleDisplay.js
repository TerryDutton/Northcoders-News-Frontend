import React from 'react'; 
import source from './source';
import axios from 'axios';
import {Link} from 'react-router-dom';
import CommentsDisplay from './CommentsDisplay'; 
import VoteButtons from './VoteButtons';

class SingleArticleDisplay extends React.Component{
  state = {
    article: null
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
    if (!this.state.article) return null;
    else {
      const {title, body, belongs_to, votes, created_by, _id} = this.state.article; 
      const topic = belongs_to.title; 
      const topicID = belongs_to._id; 
      const {username} = created_by;
      return (
        <div>
          <article>
            <h2>{title}</h2>
            <h6>
              {`${/aeiou/i.test(topic[0]) ? 'an' : 'a'} `}
              <Link to={`/api/topics/${topicID}/articles`}>{`${topic.toLowerCase()}`}</Link>
              {` article by `}<Link to={`/api/users/${username}`}>{`${username}`}</Link>
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
  }

  getArticle = articleID => {
    const path = `${source}/articles/${articleID}`;
    return axios.get(path)
      .then(({data}) => {
        const {article} = data;
        return this.setState({article});
      })
      .catch(err => console.log(err));
  }

  voteOnArticle = (articleID, vote) => {
    const path = `${source}/articles/${articleID}?vote=${vote > 0 ? 'up' : 'down'}`;
    return axios.put(path)
    .then(() => {
      const article = Object.assign({}, this.state.article); 
      article.votes += vote; 
      this.setState({article});
    })
    .catch(err => console.log(err));
  }
}

export default SingleArticleDisplay;