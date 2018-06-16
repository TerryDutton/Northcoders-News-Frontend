import React from 'react'; 
import axios from 'axios';
import source from './source';

class UserList extends React.Component{
  state = {
    users: []
  }

  componentDidMount(){
    const {username} = this.props.match.params;
    return axios.get(`${source}/users${username ? `/${username}` : ''}`)
    .then(({data}) => {
      let {users, user} = data;
      users = users ? users : [user];  
      return this.setState({users});
    })
    .catch(err => console.log(err)); 
  }

  render(){
    return(
      <ul>
        {this.state.users.map(({username, name, avatar_url, _id}) => {
          return <li key={`${_id}UserLi`}>
            <h1>{username}</h1>
            <h6>{name}</h6>
            <img src={avatar_url} alt={`The avatar for user ${username}`}/>
          </li>
        })}
      </ul>
    );
  }
}

export default UserList;