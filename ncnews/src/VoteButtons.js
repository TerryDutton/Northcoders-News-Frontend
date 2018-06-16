import React from 'react'; 

function VoteButtons({voteFunction, targetID}){
  return (
    <React.Fragment>
      <input type="button" value="Vote Up" onClick={() => voteFunction(targetID, 1)}/>
      <input type="button" value="Vote Down" onClick={() => voteFunction(targetID, -1)}/>
    </React.Fragment>
  );
}

export default VoteButtons;