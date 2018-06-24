import React from 'react'; 

function VoteButtons({voteFunction, targetID}){
  return (
    <React.Fragment>
      <input type="button" className={'button fas fa-arrow-up'} title={"Vote up"}  value={'\uf062'} onClick={() => voteFunction(targetID, 1)}/>
      <input type="button" className={'button fas fa-arrow-down'} title={"Vote down"}value={"\uf063"} onClick={() => voteFunction(targetID, -1)}/>
    </React.Fragment>
  );
}

export default VoteButtons;