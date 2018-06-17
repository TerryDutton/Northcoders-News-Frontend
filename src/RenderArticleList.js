import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

function RenderArticleList({articles, topicID, mainList}){
  return (
    <ul className={mainList ? 'mainArticleList' : 'welcomeArticleList'}>
        {articles.map((article, i) => {
          const {_id, created_by, belongs_to, votes} = article;
          let {body} = article;
          if (body.length > 100) body = body.slice(0, 97) + '...';
          return (
            <li key={`${_id}Li`} className={`articleListEntry ${i%2 ? 'evenList' : 'oddList'}`}>
                <h4 key={`${_id}h4`} id="articleListTitle">
                  <Link key={`${_id}ArtLink`} to={`/api/articles/${_id}`}>{`${article.title}`}</Link>
                </h4>
                <span id="articleListAuthor">
                  {'Author: '}
                  <Link key={`${_id}UserLink`} to={`/api/users/${created_by.username}`}>{`${created_by.username}`}</Link>
                </span>
                <span id="articleListTopic">
                  {!topicID && <Fragment>
                    {`Topic: `}
                    <Link key={`${_id}UserLink`} to={`/api/topics/${belongs_to._id}/articles`}>{`${belongs_to.title}`}</Link>
                  </Fragment>}
                </span>
                <span id="articleListPreview">
                  {body}
                </span>
                <span id="articleListVotes">
                  {`Votes: ${votes}`}
                </span>
            </li>
          );
        })}
      </ul>
  );
}

export default RenderArticleList;