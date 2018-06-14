import React from 'react';
import source from './source'; 
import {Route, Link, Router} from 'react-router-dom';

function NavBar({topics}){
  const allArticles = <Link to={`/api/articles`}>{'All Articles'}</Link>;
  return !topics ? null : (
      <ul>
        {[
          <li key='allArticlesLi'>{allArticles}</li>,
          ...topics.map(topic => {
            return (
              <li key={topic._id}>
                <Link to={`/api/${topic._id}/articles`}>{topic.title}</Link>
              </li>
            );
        })]}
      </ul>
  );

}

export default NavBar; 