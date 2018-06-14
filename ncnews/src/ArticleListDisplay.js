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
    return (
      <ul>
        {this.state.articles.map(article => {
          const {_id} = article;
          return (
            <li key={`${_id}Li`}>
                <h6 key={`${_id}h6`}>
                  <Link key={`${_id}Link`} to={`/api/articles/${_id}`}>{`${article.title}, by ${article.created_by.username}`}</Link>
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