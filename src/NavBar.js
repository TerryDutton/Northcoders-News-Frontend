import React from 'react'; 
import {NavLink} from 'react-router-dom';

function NavBar({topics = []}){
  const allArticles = <NavLink exact to={`/api/articles`}>{'All Articles'}</NavLink>;
  const submitArticles = <NavLink exact to={`/api/articles/submit`}>{'Submit Article'}</NavLink>;
  const allUsers = <NavLink exact to={`/api/users`}>{'User List'}</NavLink>;
  return (
      <ul className={"navBar-ul"}>
        <li>{allArticles}</li>
        {topics.map(topic => <li key={topic._id}><NavLink exact to={`/api/topics/${topic._id}/articles`}>{`${topic.title} Articles`}</NavLink></li>)}
        <li>{submitArticles}</li>
        <li>{allUsers}</li>
      </ul>
  );
}

export default NavBar; 