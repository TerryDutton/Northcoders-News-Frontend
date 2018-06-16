import React from 'react'; 
import {Link} from 'react-router-dom';

function NavBar({topics = []}){
  const allArticles = <Link to={`/api/articles`}>{'All Articles'}</Link>;
  const submitArticles = <Link to={`/api/articles/submit`}>{'Submit Article'}</Link>;
  return (
      <ul>
        {[
          <li key='allArticlesLi'>{allArticles}</li>,
          ...topics.map(topic => {
            return (
              <li key={topic._id}>
                <Link to={`/api/topics/${topic._id}/articles`}>{topic.title}</Link>
              </li>
            );
          }),
          <li key='submitArticlesLi'>{submitArticles}</li> 
        ]}
      </ul>
  );
}

export default NavBar; 