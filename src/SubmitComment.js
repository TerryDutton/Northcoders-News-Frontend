import React from 'react'; 

function SubmitComment({handleInput, handleSubmit}){
  return (
    <form>
      <p>Submit comment:</p>
      <textarea className="textInput" onChange={handleInput}/><br/>
      <input type="button" value="Submit" onClick={handleSubmit}/>
    </form>
  );
}

export default SubmitComment;