import React from 'react';
import { DragDropContainer } from 'react-drag-drop-container';

export default class Main extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      main:null,
    }
  }


  render() {
    if(this.props.user){
      if(this.props.user.main){
        var stateMain = this.props.user.main;
        var main = Object.keys(stateMain).map((card,index) =>{
          return <DragDropContainer targetKey="foo"  key={index}><span className="card-main" id={stateMain[card].id}>{stateMain[card].name}</span></DragDropContainer>
        })
      }
    }
    return (
      <div>
        <br />
        {main}
      </div>
    )
  }
}


//export default Slider; // Don’t forget to use export default!