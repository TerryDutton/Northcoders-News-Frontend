import React from 'react'; 

function VoteButtons({voteFunction, targetID}){
  return (
    <React.Fragment>
      <input type="button" className={'button'} title={"Vote up"}  value="&#xf062" onClick={() => voteFunction(targetID, 1)}/>
      <input type="button" className={'button'} title={"Vote down"}value="&#xf063" onClick={() => voteFunction(targetID, -1)}/>
    </React.Fragment>
  );
}

export default VoteButtons;