import React, {Fragment} from 'react'; 
import VoteButtons from './VoteButtons';
import {Link} from 'react-router-dom';

function RenderComments({comments, voteFunction, deleteComment, user}){
  return <ul>
  {comments.map((comment, i) => {
    const {created_at, votes, _id, body, created_by, belongs_to} = comment;
    const {username} = created_by;
    const userID = created_by._id; 
    return (
      <li key={`${_id}Li`} className={`${i%2 ? 'oddList': 'evenList'} comment`}>
        <p key={`${_id}p`}>{body}</p>
        <h6 key={`${_id}h6`}>{`submitted ${'' + new Date(created_at)} by `}<Link to={`/api/users/${username}`}>{`${username}`}</Link>
        {!voteFunction && <Fragment><br/>{` to `}
        <Link to={`/api/articles/${belongs_to._id}`}>
          {`${belongs_to.title}`}
        </Link></Fragment>}</h6>
        <span>
          {`Votes: ${votes}`}
          {voteFunction && <VoteButtons voteFunction={voteFunction} targetID={_id}/>}
          {user && deleteComment && userID === user._id && <button key={`${_id}b3`} onClick={() => deleteComment(_id)}>Delete Comment</button>}
        </span>
      </li>
    );
  })}
</ul>
}

export default RenderComments; 