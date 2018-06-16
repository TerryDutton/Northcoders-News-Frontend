import React from 'react'; 
import VoteButtons from './VoteButtons';
//Not implemented yet
function RenderComments({comments, voteFunction, user}){
  return <ul>
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
          {voteFunction && <VoteButtons voteFunction={voteFunction} targetID={_id}/>}
          {user && userID === user._id && <button key={`${_id}b3`} onClick={() => deleteComment(_id)}>Delete Comment</button>}
        </span>
      </li>
    );
  })}
</ul>
}

function deleteComment(commentID){
  const {articleID} = this.props.match.params;
  axios.delete(`${source}/comments/${commentID}`)
  .then(() => this.getComments(articleID))
  .catch(err => console.log(err));
}

export default RenderComments; 