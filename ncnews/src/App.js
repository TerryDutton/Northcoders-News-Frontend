import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NavBar from './NavBar';
import ArticleListDisplay from './ArticleListDisplay.js';
import SingleArticleDisplay from './SingleArticleDisplay.js';
import CommentsDisplay from './CommentsDisplay.js';
import SubmitArticle from './SubmitArticle.js';
import UserList from './UserList';
import LogBar from './LogBar';
import UserPage from './UserPage';
import axios from 'axios';
import source from './source.js';

class App extends Component {
  state = {
    user: null,
    topics:[]
  }

  componentDidMount(){
    return axios.get(`${source}/topics`)
    .then(({data}) => {
      const {topics} = data;
      return this.setState({topics});
    })
    .catch(err => {
      console.log(err); 
    });
  }

  render() {
    const {user, topics} = this.state;
    return (
      <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to NCNews</h1>
          <LogBar user={this.state.user} logIn={this.logIn} logOut={this.logOut}/>
        </header>
        <NavBar topics={this.state.topics}/>
        <Switch>
          <Route path={`/api/articles/:articleID/comments`} render={props => <CommentsDisplay {...props} user={user}/>}/>
          <Route path={`/api/articles/submit`} render={props => <SubmitArticle {...props} topics={topics} user={user}/>}/>
          <Route path={`/api/articles/:articleID`} render={props => <SingleArticleDisplay {...props} user={user}/>}/>
          <Route path={`/api/articles`} component={ArticleListDisplay}/>
          <Route path={`/api/topics/:topicID/articles`} component={ArticleListDisplay}/>
          <Route path={`/api/users/:username`} component={UserList}/>
          <Route path={`/api/users`} component={UserList}/>
        </Switch>
      </div>
      </BrowserRouter>
    );
  }

  logIn = username => {
    return axios.get(`${source}/users/${username}`)
    .then(({data}) => {
      const {user} = data; 
      return this.setState({user})
    })
    .catch(err => console.log(err));
  }

  logOut = () => {
    this.setState({user: null});
  }
}


export default App;
