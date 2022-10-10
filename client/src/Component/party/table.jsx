import React from "react";
import { DropTarget } from "react-drag-drop-container";
import Card from "../cards/cards";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      party: this.props.party,
      dropInterval: "",
    };

    this.Collapsed = this.Collapsed.bind(this);

    window.addEventListener("mouseup", function (event) {
      document.querySelectorAll(".card-table").forEach((element) => {
        element.style.backgroundColor = "rgba(65, 105, 225, 0)";
      });
    });
  }

  componentDidMount() {
    setTimeout(() => {
      if (
        (this.state.party.user[0].name === this.props.user.username &&
          this.state.party.turn === 0) ||
        (this.state.party.user[1].name === this.props.user.username &&
          this.state.party.turn === 1)
      ) {
        document.querySelectorAll(".adverse").forEach((element) => {
          element.parentNode.parentNode.style.width = "0";
        });
      } else {
        document.querySelectorAll(".allie").forEach((element) => {
          element.parentNode.parentNode.parentNode.style.width = "0";
        });
      }
    }, 1000);
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      this.state.party.lastAnim = this.props.party.lastAnim;
      this.setState({});
    }, 100);
    setTimeout(() => {
      this.state.party.lastAnim = undefined;
      this.setState({});
    }, 1200);
    setTimeout(() => {
      this.setState({ party: this.props.party });
    }, 500);
  }

  Collapsed() {
    document.querySelectorAll(".card-table").forEach((element) => {
      if (
        (this.state.party.user[0].name === this.props.user.username &&
          this.state.party.turn === 0 &&
          parseInt(element.id) <= 9 &&
          !this.state.party.table[element.id]) ||
        (this.state.party.user[1].name === this.props.user.username &&
          this.state.party.turn === 1 &&
          parseInt(element.id) >= 10 &&
          !this.state.party.table[element.id])
      ) {
        element.style.backgroundColor = "rgba(65, 105, 225, 0.493)";
      } else {
      }
    });
  }

  Uncollapsed(event) {
    event.srcElement.style.backgroundColor = "rgba(65, 105, 225, 0)";
  }

  dropped(props, event) {
    if (
      (this.state.party.user[0].name === this.props.user.username &&
        this.state.party.turn === 0 &&
        parseInt(event.target.id) <= 9 &&
        !this.state.party.table[event.target.id]) ||
      (this.state.party.user[1].name === this.props.user.username &&
        this.state.party.turn === 1 &&
        parseInt(event.target.id) >= 10 &&
        !this.state.party.table[event.target.id])
    ) {
      if (this.state.party.turn === 1) {
        this.state.party.turn = 0;
      } else {
        this.state.party.turn = 1;
      }
      var card = {
        id: parseInt(event.sourceElem.firstChild.firstChild.id),
        obj: this.props.user.main[
          parseInt(event.sourceElem.firstChild.firstChild.id)
        ],
      };
      document.querySelectorAll(".allie").forEach((element) => {
        element.parentNode.parentNode.parentNode.style.width = "0";
      });

      this.state.party.table[event.target.id] = card.obj;
      this.setState({});
      var user = {
        username: props.user.username,
        card: card,
        pos: event.target.id,
      };
      this.props.socket.emit("dropCard", user);
    }
  }

  render() {
    if (this.state.party) {
      var stateTable = this.state.party.table;
      var line1 = [];
      for (let index = 0; index < 5; index++)
        line1.push(stateTable[Object.keys(stateTable)[index]]);
      var line1Render = line1.map((card, index) => {
        return (
          <DropTarget
            targetKey="foo"
            key={"line1" + index}
            onHit={(event) => this.dropped(this.props, event)}
            onDragEnter={this.Collapsed}
          >
            <div className="card-table" id={index}>
              {stateTable[index] ? (
                <Card
                  allie={""}
                  key={index}
                  noRotate={1}
                  card={stateTable[index]}
                  index={randomIntFromInterval(1, 999999999999999)}
                  y={0}
                  x={0}
                  loadImg={this.props.loadImg}
                /> /*stateTable[index].name*/
              ) : (
                ""
              )}
              {this.state.party.lastAnim &&
              +this.state.party.lastAnim[index] ? (
                <img
                  className="card-table-anime"
                  src={
                    process.env.PUBLIC_URL +
                    "/anime/" +
                    this.state.party.lastAnim[index] +
                    "anime.gif"
                  }
                />
              ) : (
                ""
              )}
            </div>
          </DropTarget>
        );
      });

      var line2 = [];
      for (let index = 5; index < 10; index++)
        line2.push(stateTable[Object.keys(stateTable)[index]]);
      var line2Render = line2.map((card, index) => {
        return (
          <DropTarget
            targetKey="foo"
            key={"line2" + index}
            onHit={(event) => this.dropped(this.props, event)}
            onDragEnter={
              this.Collapsed
            } /*onDragLeave={(event) => this.Uncollapsed(event)}*/
          >
            <div className="card-table" id={index + 5}>
              {stateTable[index + 5] ? (
                <Card
                  allie={""}
                  key={index}
                  noRotate={1}
                  card={stateTable[index + 5]}
                  index={randomIntFromInterval(1, 999999999999999)}
                  y={0}
                  x={0}
                  loadImg={this.props.loadImg}
                /> /* stateTable[index+5].name*/
              ) : (
                ""
              )}
              {this.state.party.lastAnim &&
              +this.state.party.lastAnim[index + 5] ? (
                <img
                  className="card-table-anime"
                  src={
                    process.env.PUBLIC_URL +
                    "/anime/" +
                    this.state.party.lastAnim[index + 5] +
                    "anime.gif"
                  }
                />
              ) : (
                ""
              )}
            </div>
          </DropTarget>
        );
      });

      var line3 = [];
      for (let index = 10; index < 15; index++)
        line3.push(stateTable[Object.keys(stateTable)[index]]);
      var line3Render = line3.map((card, index) => {
        return (
          <DropTarget
            targetKey="foo"
            key={"line3" + index}
            onHit={(event) => this.dropped(this.props, event)}
            onDragEnter={this.Collapsed}
          >
            <div className="card-table" id={index + 10}>
              {stateTable[index + 10] ? (
                <Card
                  allie={""}
                  key={index}
                  noRotate={1}
                  card={stateTable[index + 10]}
                  index={randomIntFromInterval(1, 999999999999999)}
                  y={0}
                  x={0}
                  loadImg={this.props.loadImg}
                />
              ) : (
                ""
              )}
              {this.state.party.lastAnim &&
              +this.state.party.lastAnim[index + 10] ? (
                <img
                  className="card-table-anime"
                  src={
                    process.env.PUBLIC_URL +
                    "/anime/" +
                    this.state.party.lastAnim[index + 10] +
                    "anime.gif"
                  }
                />
              ) : (
                ""
              )}
            </div>
          </DropTarget>
        );
      });

      var line4 = [];
      for (let index = 15; index < 20; index++)
        line4.push(stateTable[Object.keys(stateTable)[index]]);
      var line4Render = line4.map((card, index) => {
        return (
          <DropTarget
            targetKey="foo"
            key={"line4" + index}
            onHit={(event) => this.dropped(this.props, event)}
            onDragEnter={
              this.Collapsed
            } /*onDragLeave={(event) => this.Uncollapsed(event)}*/
          >
            <div className="card-table" id={index + 15}>
              {stateTable[index + 15] ? (
                <Card
                  allie={""}
                  key={index}
                  noRotate={1}
                  card={stateTable[index + 15]}
                  index={randomIntFromInterval(1, 999999999999999)}
                  y={0}
                  x={0}
                  loadImg={this.props.loadImg}
                /> /*stateTable[index+15].name*/
              ) : (
                ""
              )}
              {this.state.party.lastAnim &&
              +this.state.party.lastAnim[index + 15] ? (
                <img
                  className="card-table-anime"
                  src={
                    process.env.PUBLIC_URL +
                    "/anime/" +
                    this.state.party.lastAnim[index + 15] +
                    "anime.gif"
                  }
                />
              ) : (
                ""
              )}
            </div>
          </DropTarget>
        );
      });

      var renderTable = "";
      if (this.state.party.user[0].name === this.props.user.username) {
        renderTable = (
          <div className="party">
            <aside className="asideLeft">
              <div className="point-img-other"></div>
              <div className="point-img-me"></div>
              <div className="point-other">{this.state.party.point1}</div>
              <div className="point-me">{this.state.party.point0}</div>
            </aside>
            <div className="table">
              <div className="only-flex">{line4Render}</div>
              <img
                className="fissure"
                src={process.env.PUBLIC_URL + "/fissure.png"}
              />
              <div className="only-flex">{line3Render}</div>
              <img
                className="fissure"
                src={process.env.PUBLIC_URL + "/fissure.png"}
              />
              <div className="only-flex">{line2Render}</div>
              <img
                className="fissure"
                src={process.env.PUBLIC_URL + "/fissure.png"}
              />
              <div className="only-flex">{line1Render}</div>
            </div>
            <aside className="asideRight">
              <div>Abandonner</div>
              <div>Passer son tour</div>
            </aside>
          </div>
        );
      } else {
        renderTable = (
          <div className="party">
            <aside className="asideLeft">
              <div className="point-img-other"></div>
              <div className="point-img-me"></div>
              <div className="point-other">{this.state.party.point0}</div>
              <div className="point-me">{this.state.party.point1}</div>
            </aside>
            <div className="table">
              <div className="only-flex">{line1Render}</div>
              <img
                className="fissure"
                src={process.env.PUBLIC_URL + "/fissure.png"}
              />
              <div className="only-flex">{line2Render}</div>
              <img
                className="fissure"
                src={process.env.PUBLIC_URL + "/fissure.png"}
              />
              <div className="only-flex">{line3Render}</div>
              <img
                className="fissure"
                src={process.env.PUBLIC_URL + "/fissure.png"}
              />
              <div className="only-flex">{line4Render}</div>
            </div>
            <aside className="asideRight">
              <div>Abandonner</div>
              <div>Passer son tour</div>
            </aside>
          </div>
        );
      }
    }
    return <div>{renderTable}</div>;
  }
}
