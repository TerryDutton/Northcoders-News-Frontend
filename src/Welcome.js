import React from 'react'; 
import source from './source'; 
import axios from 'axios'; 
import RenderError from './RenderError'; 
import RenderWelcomeStats from './RenderWelcomeStats';
import RenderArticleList from './RenderArticleList';
import RenderComments from './RenderComments';

class Welcome extends React.Component {
  state = {
    comments: [], 
    articles: [], 
    err: null
  }

  componentDidMount(){
    return Promise.all([axios.get(`${source}/articles`), axios.get(`${source}/comments`)])
    .then(([aRes, cRes]) => {
      const [{articles}, {comments}] = [aRes.data, cRes.data];
      articles.sort((thisArticle, thatArticle) => thatArticle.votes - thisArticle.votes);
      comments.sort((thisComment, thatComment) => thatComment.created_at - thisComment.created_at);
      return this.setState({comments, articles});
    })
    .catch(err => {
      console.log(err); 
      return this.setState({err});
    });
  }

  render(){
    const {comments, articles, err} = this.state;
    const commentStats = this.assessData(comments); 
    const articleStats = this.assessData(articles); 
    return err ? <RenderError err={err}/> : (
      <div className="welcomePage">
        <h1 id="welcomeTitle">Welcome to Northcoders News!</h1>
        <h3 id="welcomeGeneralStats">{`We have ${articles.length} articles by ${articleStats.totalNumberOf} authors for you to browse, and ${comments.length} comments by ${commentStats.totalNumberOf} commenters you can add to.`}</h3>
        <RenderWelcomeStats id="authorStats" stats={articleStats} job={'author'} product={'articles'}/>
        <RenderWelcomeStats id="commenterStats "stats={commentStats} job={'commenter'} product={'comments'}/>
        <div id="welcomeArticles">
          <h4>Our most popular articles</h4>
          <RenderArticleList articles={articles.slice(0,10)}/>
        </div>
        <div id="welcomeComments">
          <h4>Our most recent comments</h4>
          <RenderComments comments={comments.slice(0,10)}/>
        </div>
      </div>
    );
  }

  assessData = array => {
    const {numberOf, popularity} = array.reduce((acc, {created_by, votes}) => {
      const {username} = created_by;
      acc.numberOf[username] ? acc.numberOf[username]++ : acc.numberOf[username] = 1;
      acc.popularity[username] ? acc.popularity[username] += votes : acc.popularity[username] = votes;
      return acc;
    }, {numberOf:{}, popularity:{}});

    const stats = {
      mostProlific: '',
      prolificNo: 0, 
      mostPopular: '', 
      totalVotes: 0,
      popularNo: 0,
      average: 0,
      totalNumberOf: 0
    };

    for (let user in numberOf){
      const n = numberOf[user];
      if (n > stats.prolificNo){
        stats.prolificNo = n;
        stats.mostProlific = user;
      }
    }

    for (let user in popularity){
      const votes = popularity[user];
      const articles = numberOf[user];
      const average = votes / articles;
      if (average > stats.average){
        stats.mostPopular = user;
        stats.totalVotes = votes; 
        stats.popularNo = articles;
        stats.average = average;
      }
    }

    stats.totalNumberOf = Object.keys(numberOf).length;

    return stats;
  }
}

export default Welcome;