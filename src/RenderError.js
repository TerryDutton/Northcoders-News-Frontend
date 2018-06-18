import React from 'react'; 

function RenderError({err}){

  let userMsg = 'There was an unknown error.'; 
  let status;
  if (err && err.response) status = err.response.status;
  const {message} = err;
  if ( message === 'Network Error') userMsg =  "Cannot connect to the database. Please check your network settings, or try refreshing the page.";
  else if (status === 400 || status === 404) userMsg = "Page not found. Please check the address is typed correctly."; 
  else if (status === 500) userMsg = "Server error. Try refreshing the page.";

  return (
    <div>
      <h1>{`Error Status ${status}`}</h1>
      <p>{userMsg}</p>
      <p>(Sorry <span role="img" aria-label="Sad face">🙁</span>)</p>
    </div>
  );
}

export default RenderError; 