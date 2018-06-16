import React from 'react'; 
import axios from 'axios';
import source from './source';
import {Link} from 'react-router-dom';

class ArticleListDisplay extends React.Component {
  state = {
    articles:[]
  }

  componentDidMount(){
    const {topicID} = this.props.match.params;
    return this.getArticles(topicID);
  }

  componentDidUpdate(prevProps){
    const {topicID} = this.props.match.params;
    if (topicID !== prevProps.match.params.topicID) return this.getArticles(topicID);
  }

  render(){
    const {topicID} = this.props.match.params;
    return (
      <ul>
        {this.state.articles.map(article => {
          const {_id, created_by, belongs_to} = article;
          return (
            <li key={`${_id}Li`}>
                <h6 key={`${_id}h6`}>
                  <Link key={`${_id}ArtLink`} to={`/api/articles/${_id}`}>{`${article.title}`}</Link>{`, by `}
                  <Link key={`${_id}UserLink`} to={`/api/users/${created_by.username}`}>{`${created_by.username}`}</Link>
                  {!topicID && <React.Fragment>{` in `}<Link key={`${_id}UserLink`} to={`/api/topics/${belongs_to._id}/articles`}>{`${belongs_to.title}`}</Link></React.Fragment>}
                </h6>
            </li>
          );
        })}
      </ul>
    );
  }

  getArticles = topicID => {
    const path = topicID ? `${source}/topics/${topicID}/articles` : `${source}/articles`;
    return axios.get(path)
      .then(({data}) => {
        const {articles} = data;
        return this.setState({articles});
      })
      .catch(err => console.log(err));
  }
}

export default ArticleListDisplay;