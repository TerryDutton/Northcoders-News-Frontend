import React from 'react';
import {Link} from 'react-router-dom'; 
import blankAvatar from './views/blankAvatar';

function RenderUserData({user}){
  const {username, name, avatar_url, _id} = user;
  return (
    <ul key={`${_id}ul`} className="userData">
      <li key={`${_id}li`}>
        <h1><Link to={`/api/users/${username}`}>{username}</Link></h1>
        <h6>{name || ''}</h6>
        <img src={avatar_url} className="avatarLg" alt={`${username}'s avatar`} onError={e => e.target.src = blankAvatar}/>
      </li>
    </ul>
  );
}

export default RenderUserData; 