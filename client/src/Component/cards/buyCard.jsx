import React from 'react';


export default class BuyCards extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listCard : {} 
    }
    this.props.socket.emit("listCard",{})
    this.props.socket.on("listCard", data => {
      this.setState({listCard:null})
    });
  }
  
    render() {
        return <div>
        </div>
    }
  }


//export default Slider; // Don’t forget to use export default!