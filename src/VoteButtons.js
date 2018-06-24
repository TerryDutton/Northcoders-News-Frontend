import React from 'react'; 

function VoteButtons({voteFunction, targetID}){
  return (
    <React.Fragment>
      <input type="button" className={'button'} title={"Vote up"}  value={"🢁"} onClick={() => voteFunction(targetID, 1)}/>
      <input type="button" className={'button'} title={"Vote down"}value={"🢃"} onClick={() => voteFunction(targetID, -1)}/>
    </React.Fragment>
  );
}

export default VoteButtons;