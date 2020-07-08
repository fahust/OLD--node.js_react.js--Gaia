import React from 'react';
import Connect from './User/userConnect';
import Register from './User/userCreate';
import Table from './party/table';
import Main from './party/main';
//import Carousel from 'react-native-snap-carousel';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:12000');

export default class Gaia extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        connected:false,
        user:null,
        party:null,
      }

      
      socket.on("createOk", data => {
        //this.state.user = data.user;
        this.setState({user:data.user});
      });
      socket.on("disconnectParty", data => {
        this.setState({party:null})
      });

    }


    componentDidMount(){
      socket.on("party", data => {
        this.setState({party:data.party})
        if(this.state.user.username === data.party.user[0].name)
          this.setState({user:data.party.user[0]})
        if(this.state.user.username === data.party.user[1].name)
          this.setState({user:data.party.user[1]})
      })
    }

  
    render() {
      var menu = '';
      if(this.state.user == null)
        var register = <div><Register socket={socket} user={this.state.user}/></div>;
      var table = <div><Table socket={socket} user={this.state.user} party={this.state.party}/></div>
      var main = <div><Main socket={socket} user={this.state.user} party={this.state.party}/></div>


      return (
        <div>
          {register}
          {table}
          {main}
          {menu}
        </div>
      )
    }
  }
