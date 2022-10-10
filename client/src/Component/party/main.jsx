import React from "react";
import { DragDropContainer } from "react-drag-drop-container";
import Card from "../cards/cards";

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      main: null,
    };
  }

  render() {
    if (this.props.user) {
      if (this.props.user.main) {
        var stateMain = this.props.user.main;
        var stateMainCard = this.props.user.cards;
        var rand = 1;
        var turn = this.props.turn;
        var mainCard = stateMainCard.map((card, index) => {
          return (
            <div key={index}>
              <Card
                allie={"allie"}
                rotation={randomIntFromInterval(-20, -1)}
                rotateCard={0}
                noRotate={1}
                card={card}
                index={randomIntFromInterval(1, 999999999999999)}
                id={-10}
                y={730}
                x={135 * index}
              />
            </div>
          );
        });
        var main = Object.keys(stateMain).map((card, index) => {
          return (
            <DragDropContainer targetKey="foo" key={index}>
              <Card
                turn={turn}
                allie={"allie"}
                noRotate={1}
                card={stateMain[card]}
                index={randomIntFromInterval(1, 9999)}
                id={stateMain[card].id}
                y={730}
                x={135 * index}
                loadImg={this.props.loadImg}
              />
            </DragDropContainer>
          );
        });
      }
    }
    return (
      <div>
        <div className="smoothy">
          <br />
          {main}
        </div>
        <div className="card-game-allie">{mainCard}</div>
      </div>
    );
  }
}

//export default Slider; // Don’t forget to use export default!
