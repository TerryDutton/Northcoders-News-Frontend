import React from 'react';
import source from './source';
import axios from 'axios';

class CommentsDisplay extends React.Component {
  state = {
    comments: []
  }

  componentDidMount(){
    const {articleID} = this.props.match.params;
    return this.getComments(articleID);
  } 

  componentDidUpdate(prevProps){
    const {articleID} = this.props.match.params;
    if (articleID !== prevProps.match.params.articleID) return this.getComments(articleID);
  } 

  render(){
    const {comments} = this.state;
    return(
      <div>
        <h4>{`${comments.length} comments`}</h4>
        <ul>
          {comments.sort((thisComment, thatComment) => thisComment.created_at - thatComment.created_at).map(comment => {
            const {created_at, votes, _id, body, created_by} = comment;
            const {username} = created_by;
            return (
              <li key={`${_id}Li`}>
                <p key={`${_id}p1`}>{body}</p>
                <p key={`${_id}p2`}>{`submitted ${'' + new Date(created_at)} by ${username}`}</p>
                <span>
                  {`Votes: ${votes}`}
                  <button key={`${_id}b1`} onClick={() => this.voteOnComment(_id, true)}>Vote up</button>
                  <button key={`${_id}b2`} onClick={() => this.voteOnComment(_id, false)}>Vote down</button>
                </span>
                
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  getComments = articleID => {
    const path = `${source}/articles/${articleID}/comments`;
    return axios.get(path)
    .then(({data}) => {
      const {comments} = data; 
      return this.setState({comments});
    })
    .catch(err => console.log(err)); 
  }

  voteOnComment = (commentID, vote) => {
    const path = `${source}/comments/${commentID}?vote=${vote ? 'up' : 'down'}`;
    return axios.put(path)
    .then(() => {
      const comments = [...this.state.comments];
      const index = comments.findIndex(comment => comment._id === commentID);
      const comment = Object.assign({}, comments[index]);
      comment.votes += vote ? 1 : -1;
      comments[index] = comment; 
      this.setState({comments});
    })
    .catch(err => console.log(err));
  }
}

export default CommentsDisplay;