import React from 'react'; 
import axios from 'axios';
import source from './source';

class UserPage extends React.Component{
  state = {
    user: null
  }

  componentDidMount(){
    const {username} = this.props.match.params; 
    return axios.get(`${source}/users/${username}`)
    .then(({data}) => {
      const {user} = data;
      return this.setState({user})
    })
    .catch(err => console.log(err));
  }

  render(){
    if (this.state.user){
      const {username, name = '', avatar_url = './views/BlankAvatar.png'} = this.state.user;
      return (
        <div>
          <h1>{username}</h1>
          <h6>{name}</h6>
          <img src={avatar_url} alt={`The avatar for user ${username}`}/>
        </div>
      );
    }
    else return null;
  }
}

export default UserPage;