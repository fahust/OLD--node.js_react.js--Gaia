import React from "react";
import CardMenu from "./cardMenu";

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  handleSubmit = (event) => {
    //event.preventDefault();
    var matchmaking = {
      user: { username: this.props.user.username },
    };
    this.props.socket.emit("matchmaking", matchmaking);
  };

  render() {
    var menu = "";
    if (!this.props.user) {
      menu = (
        <div>
          <CardMenu
            text={"Connect"}
            rotation={-10}
            x={window.innerWidth / 12}
            y={100}
            index={randomIntFromInterval(1, 999999999999999)}
            changePage={() => this.props.changePage("connect")}
          />
          <CardMenu
            text={"Register"}
            rotation={15}
            x={window.innerWidth / 3}
            y={-100}
            index={randomIntFromInterval(1, 999999999999999)}
            changePage={() => this.props.changePage("register")}
          />
        </div>
      );
    } else if (!this.props.party && this.props.page == "menu") {
      menu = (
        <div>
          <div className="minerais">
            <img
              className="minerais-img"
              src={process.env.PUBLIC_URL + "/minerais.png"}
            ></img>
            <span> {"x " + this.props.user.monaie}</span>
          </div>
          <div className="card-nbr">
            <img
              className="card-nbr-img"
              src={process.env.PUBLIC_URL + "/dosCard.png"}
            ></img>
            <span> {"x " + this.props.user.cards.length}</span>
          </div>
          <CardMenu
            text={"Fight"}
            rotation={-5}
            x={window.innerWidth / 50}
            y={50}
            index={randomIntFromInterval(1, 999999999999999)}
            changePage={this.handleSubmit}
          />
          <CardMenu
            text={"Make Card"}
            rotation={-10}
            x={window.innerWidth / 6}
            y={100}
            index={randomIntFromInterval(1, 999999999999999)}
            changePage={() => this.props.changePage("make card")}
          />
          <CardMenu
            text={"Shop"}
            rotation={15}
            x={window.innerWidth / 3}
            y={-100}
            index={randomIntFromInterval(1, 999999999999999)}
            changePage={() => this.props.changePage("buy card")}
          />
          <CardMenu
            text={"My cards"}
            rotation={12}
            x={window.innerWidth / 2}
            y={-100}
            index={randomIntFromInterval(1, 999999999999999)}
            changePage={() => this.props.changePage("my cards")}
          />
        </div>
      );
    } else if (!this.props.party) {
      menu = (
        <div>
          <div className="minerais">
            <img
              className="minerais-img"
              src={process.env.PUBLIC_URL + "/minerais.png"}
            ></img>
            <span> {"x " + this.props.user.monaie}</span>
          </div>
          <div
            className="array-back"
            onClick={() => this.props.changePage("menu")}
          >
            <div className="array-back-bright"></div>
            <img
              className="array-back-img"
              src={process.env.PUBLIC_URL + "/array.png"}
            />
            <span className="array-back-text">Back</span>
          </div>
          <div className="card-nbr">
            <img
              className="card-nbr-img"
              src={process.env.PUBLIC_URL + "/dosCard.png"}
            ></img>
            <span> {"x " + this.props.user.cards.length}</span>
          </div>
        </div>
      );
    }
    return <div>{menu}</div>;
  }
}
