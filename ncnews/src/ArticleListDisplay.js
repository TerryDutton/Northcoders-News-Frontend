import React from 'react'; 
import axios from 'axios';
import source from './source';
import RenderArticleList from './RenderArticleList';
import RenderError from './RenderError';

class ArticleListDisplay extends React.Component {
  state = {
    articles:[], 
    err: null
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
    const {articles, err} = this.state;
    return err ? <RenderError err={err}/> : <RenderArticleList articles={articles} topicID={topicID}/>;
  }

  getArticles = topicID => {
    const path = topicID ? `${source}/topics/${topicID}/articles` : `${source}/articles`;
    return axios.get(path)
      .then(({data}) => {
        const {articles} = data;
        return this.setState({articles, err: null});
      })
      .catch(err => {
        console.log(err); 
        return this.setState({err});
      });
  }
}

export default ArticleListDisplay;