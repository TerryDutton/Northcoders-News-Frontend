import React from 'react';
import {Link} from 'react-router-dom';

class LogBar extends React.Component{
  state = {
    username: ''
  }

  render(){
    const {user, logOut} = this.props; 

    return user ? <div>
      <h6>Welcome, <Link to={`/api/users/${user.username}`}>{(user.name || '').split(' ')[0] || user.username}</Link></h6>
      <input type="button" value="Log Out" onClick={logOut}/>
    </div> : <div>
      <input type="text" onChange={this.handleInput} onKeyUp={this.handleKeyPress}/>
      <input type="button" value="Log In" onClick={this.handleLogin}/>
    </div>
  }

  handleKeyPress = e => {
    if (e.keyCode === 13) return this.handleLogin();
  }

  handleInput = e => this.setState({username: e.target.value});

  handleLogin = () => {
    if (this.state.username){
      this.props.logIn(this.state.username); 
      this.setState({username: ''});
    }
  }
}

export default LogBar;