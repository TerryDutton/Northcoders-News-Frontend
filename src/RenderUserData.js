import React from 'react';
import {Link} from 'react-router-dom'; 

function RenderUserData({user}){
  const {username, name, avatar_url, _id} = user;
  return (
    <ul key={`${_id}ul`} className="userData">
      <li key={`${_id}li`}>
        <h1><Link to={`/api/users/${username}`}>{username}</Link></h1>
        <h6>{name || ''}</h6>
        <img src={avatar_url} alt={`${username}'s avatar`}/>
      </li>
    </ul>
  );
}

export default RenderUserData; 