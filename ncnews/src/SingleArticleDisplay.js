import React from 'react'; 
import source from './source';
import axios from 'axios';
import CommentsDisplay from './CommentsDisplay'; 

class SingleArticleDisplay extends React.Component{
  state = {
    article: null
  }

  componentDidMount(){
    const {articleID} = this.props.match.params;
    return this.getArticle(articleID);
  }

  componentDidUpdate(prevProps){
    const {articleID} = this.props.match.params;
    if (articleID !== prevProps.match.params.articleID) return this.getArticle(articleID); 
  }

  render(){ 
    if (!this.state.article) return null;
    else {
      const {title, body, belongs_to, votes, created_by, _id} = this.state.article; 
      const topic = belongs_to.title;
      return (
        <div>
          <article>
            <h2>{title}</h2>
            <h6>{`${/aeiou/i.test(topic[0]) ? 'an' : 'a'} ${topic.toLowerCase()} article by ${created_by.username}`}</h6>
            <p>{body}</p>
          </article>
          <span>
            {`This article has ${votes} votes`}
            <button onClick={() => this.voteOnArticle(_id, true)}>Vote up</button>
            <button onClick={() => this.voteOnArticle(_id, false)}>Vote down</button>
          </span>
          <CommentsDisplay {...this.props}/>
        </div>
      );
    }
  }

  getArticle = articleID => {
    const path = `${source}/articles/${articleID}`;
    return axios.get(path)
      .then(({data}) => {
        const {article} = data;
        return this.setState({article});
      })
      .catch(err => console.log(err));
  }

  voteOnArticle = (articleID, vote) => {
    const path = `${source}/articles/${articleID}?vote=${vote ? 'up' : 'down'}`;
    return axios.put(path)
    .then(() => {
      const article = Object.assign({}, this.state.article); 
      article.votes += vote ? 1 : -1; 
      this.setState({article});
    })
    .catch(err => console.log(err));
  }
}

export default SingleArticleDisplay;