import React from 'react';
import faceCard from '..';

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default class CardMenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      interval : '',
      y : this.props.y,
      x : this.props.x,
      img: 0,
      rotateCard : this.props.rotateCard ?? 1,//always back
      rotateInterval : '',
      noRotate : this.props.noRotate ?? 0,//norotate
      rotation : this.props.rotation ?? 0,//rotation de la carte de base
      turn : this.props.turn ?? 1,//mon tour
      classRotation : this.props.rotation ? 'classRotation' : '',//rotation de la carte de base
      
    }
    this.opacityDiv = this.opacityDiv.bind(this);
    this.upsizeDiv = this.upsizeDiv.bind(this);
    
  }

  componentDidMount(){
    document.querySelectorAll('.span-card'+this.props.index)[0].style.transform = 'rotate('+this.state.rotation+'deg) translate('+this.props.x+'px,'+this.props.y+'px) '
    setTimeout(() => {
      document.querySelectorAll('.span-card'+this.props.index)[0].style.transform = 'rotate('+(parseInt(this.state.rotation)+randomIntFromInterval(-1,1))+'deg) translate('+(parseInt(this.props.x)+randomIntFromInterval(-1,1))+'px,'+(parseInt(this.props.y)+randomIntFromInterval(-1,1))+'px) '
    }, 5);
    setInterval(() => {
      if(document.querySelectorAll('.span-card'+this.props.index)[0])
        document.querySelectorAll('.span-card'+this.props.index)[0].style.transform = 'rotate('+(parseInt(this.state.rotation)+randomIntFromInterval(-1,1))+'deg) translate('+(parseInt(this.props.x)+randomIntFromInterval(-1,1))+'px,'+(parseInt(this.props.y)+randomIntFromInterval(-1,1))+'px) '
    }, 5000);
    //document.querySelectorAll('.span-card'+this.props.index)[0].firstChild.style.transform = 'scale(1) rotate('+this.state.rotation+'deg)'
    /*setTimeout(() => {
      if(document.querySelectorAll('.menu-span-card'+this.props.index)[0])
          document.querySelectorAll('.menu-span-card'+this.props.index)[0].style.transform = 'rotateY(0deg) rotate('+this.state.rotation+'deg)'
    },460/2)*/
  }

  opacityDiv(){

  }

  upsizeDiv(){

  }

  render() {
    var card = <span className={"menu-span-card span-card"+this.props.index} id={this.props.id} onMouseMove={this.upsizeDiv} onMouseOut={this.opacityDiv} onClick={() =>this.props.changePage()}>
      <div className="menu-span-card-bright"></div>
      <img className="menu-card-img" src={process.env.PUBLIC_URL + '/emptycard.png'} />
      <p className='contentText-menu-card'>{this.props.text}</p>
    </span>

    return <span>{card}
    </span>
  }
}


//export default Slider; // Don’t forget to use export default!