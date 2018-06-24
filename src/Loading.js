import React from 'react'; 
import './Loading.css'; 
import ncLogo from './views/NCLogo.js'; 

function Loading(){
  return (
    <div class="spinner">
      <img src={ncLogo} alt="Loading Animation"/>
    </div>
  );
}

export default Loading; 