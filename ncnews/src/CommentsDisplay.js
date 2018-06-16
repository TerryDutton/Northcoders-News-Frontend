import React from 'react';
import source from './source';
import axios from 'axios';
import SubmitComment from './SubmitComment.js'; 
import VoteButtons from './VoteButtons';
import {Link} from 'react-router-dom';

class CommentsDisplay extends React.Component {
  state = {
    comments: [], 
    commentBody: ''
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
    const {user} = this.props;
    return(
      <div>
        {user ? <SubmitComment handleInput={this.handleInput} handleSubmit={this.handleSubmit}/> : <p>You must be logged in to leave comments</p>}
        <h4>{`${comments.length} comments`}</h4>
        <ul>
          {comments.slice().sort((thisComment, thatComment) => thatComment.created_at - thisComment.created_at).map(comment => {
            const {created_at, votes, _id, body, created_by} = comment;
            const {username} = created_by;
            const userID = created_by._id; 
            return (
              <li key={`${_id}Li`}>
                <p key={`${_id}p`}>{body}</p>
                <h6 key={`${_id}h6`}>{`submitted ${'' + new Date(created_at)} by `}<Link to={`/api/users/${username}`}>{`${username}`}</Link></h6>
                <span>
                  {`Votes: ${votes}`}
                  <VoteButtons voteFunction={this.voteOnComment} targetID={_id}/>
                  {user && userID === user._id && <button key={`${_id}b3`} onClick={() => this.deleteComment(_id)}>Delete Comment</button>}
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
    const path = `${source}/comments/${commentID}?vote=${vote > 0 ? 'up' : 'down'}`;
    return axios.put(path)
    .then(() => {
      const comments = [...this.state.comments];
      const index = comments.findIndex(comment => comment._id === commentID);
      const comment = Object.assign({}, comments[index]);
      comment.votes += vote;
      comments[index] = comment; 
      this.setState({comments});
    })
    .catch(err => console.log(err));
  }

  handleInput = e => this.setState({commentBody: e.target.value});

  handleSubmit = () => {
    const {commentBody} = this.state;

    if (commentBody && this.props.user){
      const {articleID} = this.props.match.params;
      const time = new Date().getTime();
      const newComment = {
        belongs_to: articleID, 
        body: commentBody, 
        created_at: time,
        created_by: this.props.user
      };

      return axios.post(`${source}/articles/${articleID}/comments`, newComment)
      .then(() => this.getComments(articleID))
      .catch(err => console.log(err));
    }
  }

  deleteComment = commentID => {
    const {articleID} = this.props.match.params;
    axios.delete(`${source}/comments/${commentID}`)
    .then(() => this.getComments(articleID))
    .catch(err => console.log(err));
  }
}

export default CommentsDisplay;