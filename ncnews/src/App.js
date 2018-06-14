import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import NavBar from './NavBar';
import ArticleListDisplay from './ArticleListDisplay.js';
import SingleArticleDisplay from './SingleArticleDisplay.js';
import CommentsDisplay from './CommentsDisplay.js';
import axios from 'axios';
import source from './source.js';

class App extends Component {
  state = {
    user: null,
    topics:[], 
    articles:[]
  }

  componentDidMount(){
    return axios.get(`${source}/topics`)
    .then(({data}) => {
      const {topics} = data;
      return this.setState({topics});
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to NCNews</h1>
        </header>
        <NavBar topics={this.state.topics}/>
        <Switch>
          <Route path={`/api/articles/:articleID/comments`} component={CommentsDisplay}/>
          <Route path={`/api/articles/:articleID`} component={SingleArticleDisplay}/>
          <Route path={`/api/articles`} component={ArticleListDisplay}/>
          <Route path={`/api/:topicID/articles`} component={ArticleListDisplay}/>
        </Switch>
      </div>
      </BrowserRouter>
    );
  }

}


export default App;
