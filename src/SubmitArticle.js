import React from 'react'; 
import axios from 'axios';
import source from './source';
import {Redirect} from 'react-router-dom';

class SubmitArticle extends React.Component {
  state = {
    title: '', 
    body: '', 
    belongs_to: '',
    message: '', 
    redirect: ''
  }

  render(){
    const {title, body, belongs_to, message} = this.state;
    return !this.props.user ? <p>You must be logged in to submit an article.</p> : (
      <form>
        <h6>Title</h6>
        <input type="text" onChange={e => this.handleInput(e, 'title')}/>
        <h6>Topic</h6>
        <select onChange={e => this.handleInput(e, 'belongs_to')}>
          {[<option key={'defaultTopicSelectorOpt'} selected disabled value={''}>Please select a topic</option>,
            ...(this.props.topics || []).map(({_id, title}) => <option key={`${_id}Opt`}value={_id}>{title}</option>)]}
        </select>
        <h6>Body</h6>
        <textarea onChange={e => this.handleInput(e, 'body')}/><br/>
        <input type="button" disabled={!(title && body && belongs_to)} value="Submit" onClick={this.submitArticle}/>
        <p>
          {message}
        </p>
        {this.state.redirect && <Redirect to={`/api/articles/${this.state.redirect}`}/>}
      </form>
    );
  }

  handleInput = (e, key) => {
    const {value} = e.target;
    this.setState({
      [key]: value
    });
  }

  submitArticle = () => {
    const {title, body, belongs_to} = this.state; 
    const newArticle = {
      title, 
      body, 
      created_by: this.props.user._id
    };
    axios.post(`${source}/topics/${belongs_to}/articles`, newArticle)
    .then(({data}) => {
      const {article} = data; 
      return this.setState({
        redirect: article._id
      })
    })
    .catch(err => {
      this.setState({
        message: `There was an error submitting your article. Please try again, check your network settings, or refresh the page.`
      });
    });
  }
}

export default SubmitArticle;