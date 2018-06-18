import React, {Fragment} from 'react'; 
import VoteButtons from './VoteButtons';
import {Link} from 'react-router-dom';

function RenderComments({comments, voteFunction, deleteComment, user}){
  return <ul className="commentsList">
  {comments.map((comment, i) => {
    const {created_at, votes, _id, body, created_by, belongs_to} = comment;
    const {username} = created_by;
    const userID = created_by._id; 
    const time = new Date(created_at);
    return (
      <li key={`${_id}Li`} className={`${i%2 ? 'oddList': 'evenList'} comment`}>
        <h6 key={`${_id}h61`}><Link to={`/api/users/${username}`}>{`${username}`}</Link>{` posted:`}</h6>
        <p key={`${_id}p`}>{body}</p>
        
        <p key={`${_id}p2`} className="postInfo">
          {`on ${time.toDateString()} at ${time.toTimeString().slice(0,9)}`}
          {!voteFunction && <Fragment>{` to `}
          <Link to={`/api/articles/${belongs_to._id}`}>
            {`${belongs_to.title}`}
          </Link></Fragment>}
        </p>

        <span key={`${_id}span1`} className='voteBox'>
          <span key={`${_id}span2`} className="postInfo">{`Votes: ${votes}`}</span>
          {voteFunction && <VoteButtons voteFunction={voteFunction} targetID={_id}/>}
          {user && deleteComment && userID === user._id && <input key={`${_id}b3`} type="button" className="button" value="🔥" title="Delete comment" onClick={() => deleteComment(_id)}/>}
        </span>
      </li>
    );
  })}
</ul>
}

export default RenderComments; 