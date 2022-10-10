import React from "react";
import Connect from "./User/userConnect";
import Register from "./User/userCreate";
import Table from "./party/table";
import Main from "./party/main";
import MainAdverse from "./party/mainAdverse";
import BuyCard from "./cards/buyCard";
import MakeCard from "./cards/makeCard";
import MyCards from "./cards/myCards";
import Menu from "./menu";
//import Carousel from 'react-native-snap-carousel';
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:12000");

export default class Gaia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      user: null,
      party: null,
      page: "menu",
      otherUser: null,
      turn: 0,
      imgCards: {},
    };
  }
  componentDidMount() {
    socket.on("createOk", (data) => {
      this.state.user = data.data.user;
      this.state.imgCards = data.data.listCardImg;
      this.state.page = "menu";
      this.setState({});
    });
    socket.on("newCard", (data) => {
      this.state.imgCards[data.data.slug] = data.data.file;
    });
    socket.on("actualizUser", (data) => {
      this.setState({ user: data.data });
    });
    socket.on("disconnectParty", (data) => {
      this.setState({ party: null });
    });
    socket.on("party", (data) => {
      if (
        (data.party.user[0].name === this.state.user.username &&
          data.party.turn === 0) ||
        (data.party.user[1].name === this.state.user.username &&
          data.party.turn === 1)
      ) {
        this.state.turn = 1;
        document.querySelectorAll(".allie").forEach((element) => {
          if (element.parentNode.parentNode.parentNode)
            element.parentNode.parentNode.parentNode.style.width = "70px";
        });
        document.querySelectorAll(".adverse").forEach((element) => {
          if (element.parentNode.parentNode)
            element.parentNode.parentNode.style.width = "0px";
        });
      } else {
        this.state.turn = 0;
        document.querySelectorAll(".adverse").forEach((element) => {
          if (element.parentNode.parentNode)
            element.parentNode.parentNode.style.width = "70px";
        });
        document.querySelectorAll(".allie").forEach((element) => {
          if (element.parentNode.parentNode)
            element.parentNode.parentNode.style.width = "0px";
        });
      }
      this.state.party = data.party;
      if (this.state.user.username === data.party.user[0].name) {
        this.state.user.main = data.party.user[0].main;
        //this.setState({user:data.party.user[0]})
      } else {
        this.setState({ otherUser: data.party.user[0] });
      }
      if (this.state.user.username === data.party.user[1].name) {
        this.state.user.main = data.party.user[1].main;
        //this.setState({user:data.party.user[1]})
      } else {
        this.setState({ otherUser: data.party.user[1] });
      }
      this.setState({});
    });
  }

  changePage = (page) => {
    if (this.state.party && page === "menu") {
      this.setState({ party: null });
      socket.emit("disconnectParty", {});
    }
    this.setState({ page: page });
  };

  loadImg = (img) => {
    return this.state.imgCards[img];
  };

  render() {
    var menu = (
      <Menu
        socket={socket}
        user={this.state.user}
        party={this.state.party}
        changePage={this.changePage}
        page={this.state.page}
      />
    );
    if (this.state.user === null && this.state.page === "connect") {
      var connect = (
        <div>
          <Connect
            socket={socket}
            user={this.state.user}
            changePage={this.changePage}
          />
        </div>
      );
    } else if (this.state.user === null && this.state.page === "register") {
      var register = (
        <div>
          <Register
            socket={socket}
            user={this.state.user}
            changePage={this.changePage}
          />
        </div>
      );
    } else if (this.state.user !== null && this.state.page === "make card") {
      var makeCard = (
        <div>
          <MakeCard
            socket={socket}
            user={this.state.user}
            changePage={this.changePage}
          />
        </div>
      );
    } else if (this.state.user !== null && this.state.page === "buy card") {
      var buyCard = (
        <div>
          <BuyCard
            socket={socket}
            user={this.state.user}
            changePage={this.changePage}
            loadImg={this.loadImg}
          />
        </div>
      );
    } else if (this.state.user !== null && this.state.page === "my cards") {
      var myCards = (
        <div>
          <MyCards
            socket={socket}
            user={this.state.user}
            changePage={this.changePage}
            loadImg={this.loadImg}
          />
        </div>
      );
    } else if (this.state.party !== null) {
      var table = (
        <div>
          <Table
            socket={socket}
            user={this.state.user}
            party={this.state.party}
            changePage={this.changePage}
            loadImg={this.loadImg}
          />
        </div>
      );
      var main = (
        <div>
          <Main
            turn={this.state.turn}
            socket={socket}
            user={this.state.user}
            party={this.state.party}
            changePage={this.changePage}
            loadImg={this.loadImg}
          />
        </div>
      );
      var mainAdverse = (
        <div>
          <MainAdverse
            socket={socket}
            user={this.state.otherUser}
            cards={this.state.user.cards}
            party={this.state.party}
            changePage={this.changePage}
          />
        </div>
      );
    }

    return (
      <div>
        {menu}
        {connect}
        {register}
        {mainAdverse}
        {table}
        {main}
        {makeCard}
        {buyCard}
        {myCards}
      </div>
    );
  }
}
