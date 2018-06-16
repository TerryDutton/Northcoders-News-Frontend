import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

function RenderArticleList({articles, topicID}){
  return (
    <ul>
        {articles.map(article => {
          const {_id, created_by, belongs_to} = article;
          return (
            <li key={`${_id}Li`}>
                <h6 key={`${_id}h6`}>
                  <Link key={`${_id}ArtLink`} to={`/api/articles/${_id}`}>{`${article.title}`}</Link>{ ` by `}
                  <Link key={`${_id}UserLink`} to={`/api/users/${created_by.username}`}>{`${created_by.username}`}</Link>
                  {!topicID && <Fragment>{` in `}<Link key={`${_id}UserLink`} to={`/api/topics/${belongs_to._id}/articles`}>{`${belongs_to.title}`}</Link></Fragment>}
                </h6>
            </li>
          );
        })}
      </ul>
  );
}

export default RenderArticleList;