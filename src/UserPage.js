import React from 'react'; 
import axios from 'axios';
import source from './source';
import RenderComments from './RenderComments';
import RenderArticleList from './RenderArticleList';
import RenderUserData from './RenderUserData';
import RenderError from './RenderError';

class UserPage extends React.Component{
  state = {
    user: null, 
    comments: [], 
    articles: [], 
    err: null
  }

  componentDidMount(){
    const {username} = this.props.match.params; 
    return axios.get(`${source}/users/${username}`)
    .then(({data}) => {
      const {user} = data;
      return Promise.all([
        user,
        axios.get(`${source}/users/${user._id}/comments`),
        axios.get(`${source}/users/${user._id}/articles`)
      ]);
    })
    .then(([user, cRes, aRes]) => {
      const {comments} = cRes.data; 
      const {articles} = aRes.data; 
      comments.sort((thisComment, thatComment) => thatComment.created_at - thisComment.created_at);
      return this.setState({user, comments, articles, err: null});
    })
    .catch(err => {
      console.log(err);
      return this.setState({err});
    });
  }

  render(){
    const loggedInAs = this.props.user;
    const thisPageUser = this.state.user;
    const {comments, articles, err} = this.state;
    if (err) return <RenderError err={err}/>;
    if (!thisPageUser) return null;
    else {
      const {username} = thisPageUser;
      return (
        <div className="userPage">
          <RenderUserData user={thisPageUser}/>
          <div>
            <h4>{`${username}'s articles (${articles.length} total):`}</h4>
            <RenderArticleList articles={articles}/>
          </div>
          <div>
          <h4>{`${username}'s comments (${comments.length} total):`}</h4>
            <RenderComments comments={comments} user={loggedInAs}/>
          </div>
        </div>
      );
    }
  }
}

export default UserPage;