import React from 'react'; 
import axios from 'axios';
import source from './source';
import RenderUserData from './RenderUserData';
import RenderError from './RenderError';

class UserList extends React.Component{
  state = {
    users: [], 
    err: null
  }

  componentDidMount(){
    return axios.get(`${source}/users`)
    .then(({data}) => {
      let {users} = data; 
      return this.setState({users, err: null});
    })
    .catch(err => {
      console.log(err); 
      return this.setState({err}); 
    }); 
  }

  render(){
    const {users, err} = this.state;
    return err ? <RenderError err={err}/> : (
      <ul>
        {users.map(user => <RenderUserData key={`${user._id}Main`} user={user}/>)}
      </ul>
    );
  }
}

export default UserList;