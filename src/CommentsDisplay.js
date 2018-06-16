import React, {Fragment} from 'react';
import source from './source';
import axios from 'axios';
import SubmitComment from './SubmitComment.js'; 
import RenderComments from './RenderComments';
import RenderError from './RenderError';

class CommentsDisplay extends React.Component {
  state = {
    comments: [], 
    commentBody: '', 
    err: null, 
    postMsg: ''
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
    const {comments, err, postMsg} = this.state;
    const {user} = this.props;
    return err ? <RenderError err={err}/> : (
      <div>
        {user ? 
          <Fragment>
            <SubmitComment handleInput={this.handleInput} handleSubmit={this.handleSubmit}/>
            <p>{postMsg}</p>
          </Fragment> : <p>You must be logged in to leave comments</p>
        }
        <h4>{`${comments.length} comments`}</h4>
        <RenderComments comments={comments} voteFunction={this.voteOnComment} deleteComment={this.deleteComment} user={user} />
      </div>
    );
  }

  getComments = articleID => {
    const path = `${source}/articles/${articleID}/comments`;
    return axios.get(path)
    .then(({data}) => {
      const {comments} = data; 
      comments.sort((thisComment, thatComment) => thatComment.created_at - thisComment.created_at);
      return this.setState({comments, err: null});
    })
    .catch(err => {
      console.log(err);
      return this.setState({err});
    }); 
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
      .catch(err => {
        console.log(err);
        return this.setState({postMsg: 'An error occurred. Please try again, or try refreshing the page.'})
      });
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