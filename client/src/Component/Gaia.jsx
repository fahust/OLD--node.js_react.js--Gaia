import React from 'react';
import Connect from './User/userConnect';
import Register from './User/userCreate';
import Table from './party/table';
import Main from './party/main';
import BuyCard from './cards/buyCard';
import MakeCard from './cards/makeCard';
import MyCards from './cards/myCards';
import Menu from './menu';
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
        page:'menu',
      }

      
      socket.on("createOk", data => {
        this.setState({user:data.user});
        this.setState({page:'menu'});
        console.log(data.user)
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

    changePage = page => {
      if(this.state.party && page === 'menu'){
        this.setState({party:null})
        socket.emit("disconnectParty",{})
      }
      this.setState({page:page})
    }

  
    render() {
      var menu = <Menu socket={socket} user={this.state.user} party={this.state.party} changePage={this.changePage} page={this.state.page}/>;
      if(this.state.user === null && this.state.page === 'connect'){
        var connect = <div><Connect socket={socket} user={this.state.user} changePage={this.changePage}/></div>
      }else if(this.state.user === null && this.state.page ==='register'){
        var register = <div><Register socket={socket} user={this.state.user} changePage={this.changePage}/></div>;
      }else if(this.state.user !== null && this.state.page ==='make card'){
        var makeCard = <div><MakeCard socket={socket} user={this.state.user} changePage={this.changePage}/></div>;
      }else if(this.state.user !== null && this.state.page ==='buy card'){
        var buyCard = <div><BuyCard socket={socket} user={this.state.user} changePage={this.changePage}/></div>;
      }else if(this.state.user !== null && this.state.page ==='my cards'){
        var myCards = <div><MyCards socket={socket} user={this.state.user} changePage={this.changePage}/></div>;
      }else if(this.state.party !== null){
        var table = <div><Table socket={socket} user={this.state.user} party={this.state.party} changePage={this.changePage}/></div>
        var main = <div><Main socket={socket} user={this.state.user} party={this.state.party} changePage={this.changePage}/></div>
      }
      

      return (
        <div>
          {menu}
          {connect}
          {register}
          {table}
          {main}
          {makeCard}
          {buyCard}
          {myCards}
        </div>
      )
    }
  }
