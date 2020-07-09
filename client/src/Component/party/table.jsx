import React from 'react';
import { DropTarget } from 'react-drag-drop-container';

export default class Table extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      party : null,
    }
  }

  dropped(props,event){
    var card = {
      id:parseInt(event.sourceElem.firstChild.id),
      obj:this.props.user.main[parseInt(event.sourceElem.firstChild.id)],
    }
    var user = {
      username : props.user.username,
      card : card,
      pos : event.target.id,
    }
    this.props.socket.emit('dropCard', user);
  }
  
  render() {
    if(this.props.party){
      var stateTable = this.props.party.table;
      var line1 = [];
      for(let index = 0; index < 5; index++) 
        line1.push(stateTable[Object.keys(stateTable)[index]])
      var line1Render = line1.map((card,index)=> {
        return <DropTarget targetKey="foo"  key={'line1'+index} onHit={(event) => this.dropped(this.props,event)}>
        <div className="card-table" id={index}>{stateTable[index] ? stateTable[index].name : ''}</div>
        </DropTarget>
      })

      var line2 = [];
      for(let index = 5; index < 10; index++) 
        line2.push(stateTable[Object.keys(stateTable)[index]])
      var line2Render = line2.map((card,index)=> {
        return <DropTarget targetKey="foo"  key={'line2'+index} onHit={(event) => this.dropped(this.props,event)}>
        <div className="card-table" id={index+5}>{stateTable[index+5] ? stateTable[index+5].name : ''}</div>
        </DropTarget>
      })

      var line3 = [];
      for(let index = 10; index < 15; index++) 
        line3.push(stateTable[Object.keys(stateTable)[index]])
      var line3Render = line3.map((card,index)=> {
        return <DropTarget targetKey="foo"  key={'line3'+index} onHit={(event) => this.dropped(this.props,event)}>
        <div className="card-table" id={index+10}>{stateTable[index+10] ? stateTable[index+10].name : ''}</div>
        </DropTarget>
      })

      var line4 = [];
      for(let index = 15; index < 20; index++) 
        line4.push(stateTable[Object.keys(stateTable)[index]])
      var line4Render = line4.map((card,index)=> {
        return <DropTarget targetKey="foo"  key={'line4'+index} onHit={(event) => this.dropped(this.props,event)}>
        <div className="card-table" id={index+15}>{stateTable[index+15] ? stateTable[index+15].name : ''}</div>
        </DropTarget>
      })
        var renderTable = '';
        if(this.props.party.user[0].name === this.props.user.username){
          renderTable= <div><br />{this.props.party.point0+" vs "+this.props.party.point1}
          <div className="only-flex">{line4Render}</div>
          <div className="only-flex">{line3Render}</div>
          <div className="only-flex">{line2Render}</div>
          <div className="only-flex">{line1Render}</div>
          </div>
        }else{
          renderTable= <div><br />{this.props.party.point1+" vs "+this.props.party.point0}
          <div className="only-flex">{line1Render}</div>
          <div className="only-flex">{line2Render}</div>
          <div className="only-flex">{line3Render}</div>
          <div className="only-flex">{line4Render}</div>
          </div>
        }
    }
    return (
    <div>
      {renderTable}
      <div>Abandonner</div>
      <div>Passer son tour</div>
    </div>
    )
  }
}

