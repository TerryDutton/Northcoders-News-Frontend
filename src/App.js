import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import NavBar from './NavBar';
import ArticleListDisplay from './ArticleListDisplay.js';
import SingleArticleDisplay from './SingleArticleDisplay.js';
import CommentsDisplay from './CommentsDisplay.js';
import SubmitArticle from './SubmitArticle.js';
import UserList from './UserList';
import LogBar from './LogBar';
import UserPage from './UserPage';
import Welcome from './Welcome.js';
import RenderError from './RenderError';
import axios from 'axios';
import source from './source.js';

class App extends Component {
  state = {
    user: null,
    loginErr: '',
    topics:[], 
    err: null
  }

  componentDidMount(){
    return axios.get(`${source}/topics`)
    .then(({data}) => {
      const {topics} = data;
      return this.setState({topics, err: null});
    })
    .catch(err => {
      console.log(err); 
      return this.setState({err});
    });
  }

  render() {
    const {user, topics, err, loginErr} = this.state;
    return (
      <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <div className="header-top">
            <h1 className="App-title"><Link to={`/api`}>Northcoders News</Link></h1>
            <span className="loginContainer">
              <span>{loginErr}</span>
              <LogBar user={user} logIn={this.logIn} logOut={this.logOut}/>
            </span>
          </div>
          <NavBar topics={topics}/>
        </header>
        {err ? <RenderError err={err}/> : <Switch>
          <Route path={`/api/articles/:articleID/comments`} render={props => <CommentsDisplay {...props} user={user}/>}/>
          <Route path={`/api/articles/submit`} render={props => <SubmitArticle {...props} topics={topics} user={user}/>}/>
          <Route path={`/api/articles/:articleID`} render={props => <SingleArticleDisplay {...props} user={user}/>}/>
          <Route path={`/api/articles`} render={props => <ArticleListDisplay {...props} mainList={true}/>}/>
          <Route path={`/api/topics/:topicID/articles`} render={props => <ArticleListDisplay {...props} mainList={true}/>}/>
          <Route path={`/api/users/:username`} component={UserPage}/>
          <Route path={`/api/users`} component={UserList}/>
          <Route path={`/api/*`} render={props => <RenderError {...props} err={{response: {status: 404}}}/>}/>
          <Route path={`/api`} component={Welcome}/>
          <Route path={`/`} component={Welcome}/>
          <Route path={`/*`} render={props => <RenderError {...props} err={{response: {status: 404}}}/>}/>
        </Switch>}
      </div>
      </BrowserRouter>
    );
  }

  logIn = username => {
    return axios.get(`${source}/users/${username}`)
    .then(({data}) => {
      const {user} = data; 
      return this.setState({user, loginErr: ''});
    })
    .catch(err => {
      console.log(err); 
      let loginErr = 'An error occurred. Please try again.';
      if (err.response.status === 404) loginErr = 'Username not found.'; 
      return this.setState({loginErr});
    });
  }

  logOut = () => {
    this.setState({user: null});
  }
}


export default App;
