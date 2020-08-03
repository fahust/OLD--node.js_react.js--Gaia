import React from 'react';
import faceCard from '../../';

/*function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}*/

export default class Card extends React.Component {
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
      deletable : this.props.deletable ?? 0,
      buyable : this.props.buyable ?? 0,
      classRotation : this.props.rotation ? 'classRotation' : '',//rotation de la carte de base
      
    }
    if(this.props.card.hided === 1 && this.props.card.owner !== this.props.user.username){
      this.setState({noRotate:1})
    }
    this.hoverDiv = this.hoverDiv.bind(this);
    this.opacityDiv = this.opacityDiv.bind(this);
    this.upsizeDiv = this.upsizeDiv.bind(this);
    
  }

  componentWillReceiveProps(){
    if(this.state.rotation === 0){
      if(this.props.card.hided === 1 && this.props.card.owner !== this.props.user.username){
        this.setState({noRotate:1})
      }
      /*if(this.props.turn){console.log(this.props.turn)
        this.setState({turn : this.props.turn})
      }*/
      if(this.state.noRotate === 0){
        setTimeout(() => {
          this.setState({img:0})
        },460/2)
        setTimeout(() => {
          if(document.querySelectorAll('.span-card'+this.props.index)[0])
            document.querySelectorAll('.span-card'+this.props.index)[0].style.transform = 'rotateY(180deg) rotate('+this.state.rotation+'deg)'
        },10)
        setTimeout(() => {
          if(document.querySelectorAll('.span-card'+this.props.index)[0])
            document.querySelectorAll('.span-card'+this.props.index)[0].style.transform = 'rotateY(0deg) rotate('+this.state.rotation+'deg)'
          this.rotateDiv();
        },1020/2)
      }
    }
  }

  componentDidMount(){
    setTimeout(() => {
      if(document.querySelectorAll('.span-card'+this.props.index)[0])
          document.querySelectorAll('.span-card'+this.props.index)[0].style.transform = 'rotateY(0deg) rotate('+this.state.rotation+'deg)'
      this.rotateDiv();
    },460/2)
  }

  hoverDiv(event){
    if(this.state.rotateCard === 1 /*&& this.state.turn === 1*/ && this.state.rotation === 0){
      var div = document.querySelectorAll('#follower'+this.props.index)
      if(div[0]){
        if(div[0].style.opacity <= 1)
          div[0].style.opacity = 1;
        div[0].style.position = "absolute";
        //var rect = div[0].getBoundingClientRect();//rect.left
        if(event.clientY > 450){
          div[0].style.right = '120px';
          div[0].style.top = '-305px';
        }else{
          div[0].style.right = '120px';
          div[0].style.top = '145px';
        }
        div[0].style.display = 'block';
        clearInterval(this.state.interval)
      }
    }
  }

  upsizeDiv(event){
    if(this.state.rotateCard == 1 && this.state.rotation === 0){
      this.hoverDiv(event);
      //document.querySelectorAll('.span-card'+this.props.index)[0].parentNode.parentNode.parentNode.style.zIndex = "200"
      document.querySelectorAll('.span-card'+this.props.index)[0].style.transform = 'scale(1.5) rotate('+this.state.rotation+'deg)'
    }
  }

  deleteCard(){
    if(this.props.user.cards.length > 40){
      var data = {
        page:1,
        race:0,
        cost:0,
        point:0,
        card:this.props.card,
        username:this.props.user.username,
      }
      this.props.socket.emit("deleteCard",{data:data})
    }
  }

  buyCard(){
    if(this.props.user.cards.length < 60 && this.props.user.monaie >= this.props.card.cost){
      var data = {
        page:1,
        race:0,
        cost:0,
        point:0,
        card:this.props.card,
        username:this.props.user.username,
      }
      this.props.socket.emit("buyCard",{data:data})
    }
  }

  rotateDiv(){
    if(this.state.rotateCard === 1 && this.state.rotation === 0){
      setTimeout(() => {
        this.setState({img:1})
      }, 460/2);
    }else{
      setTimeout(() => {
        this.rotateDiv();
      },10);
    }
  }

  opacityDiv(){
    var div = document.querySelectorAll('#follower'+this.props.index)
    if(div[0]){
      //document.querySelectorAll('.span-card'+this.props.index)[0].parentNode.parentNode.parentNode.style.zIndex = "0"
      document.querySelectorAll('.span-card'+this.props.index)[0].style.transform = 'scale(1) rotate('+this.state.rotation+'deg)'
      clearInterval(this.state.interval)
      this.state.interval = setInterval(() => {
        if(div[0].style.opacity <= 0){
          div[0].style.display = 'none';
          clearInterval(this.state.interval)
        }else{
          div[0].style.opacity = div[0].style.opacity-0.1;
        }
      }, 10);
    }
  }

  render() {
    var card = <span className={"span-card "+this.state.classRotation+this.props.allie+" "+/*this.props.allie+*/" span-card"+this.props.index} id={this.props.id} onMouseMove={this.upsizeDiv} /*onMouseMove={this.hoverDiv}*/ onMouseOut={this.opacityDiv}>
          <img className="card" style={{backgroundImage:`url(${process.env.PUBLIC_URL + '/dosCard.png'})`}}
          src={this.state.img === 0 ? process.env.PUBLIC_URL + '/none.png' : `data:image/png;base64,${Buffer.from(this.props.loadImg(this.props.card.slug)/*this.props.card.img*/).toString('base64')}`}
            />
          {this.state.rotateCard === 1 ? <img className="card-embleme" src={process.env.PUBLIC_URL + '/embleme.png'}/> : ''}
          {this.state.rotateCard === 1 ? <div className="card-point-embleme">{this.props.card.point}</div> : ''}
          <img className="card-font" src={process.env.PUBLIC_URL + '/face.png'}/>
          <div className="card" style={{backgroundImage:`url(${process.env.PUBLIC_URL + '/dosCard.png'})`}}>
          </div>
          {this.props.card.invulnerable >= 1 ? <img className="shield-invulnerability" src={process.env.PUBLIC_URL + '/shield.png'} alt=""/> : ''}
          {this.state.deletable === 1 && this.props.user.cards.length > 40 ? <div className="card-deletable"  onClick={() => this.deleteCard()}>Sell</div> : ''}
          {this.state.buyable === 1 && this.props.user.cards.length < 60 && this.props.user.monaie >= this.props.card.cost ? <div className="card-deletable" onClick={() => this.buyCard()}>Buy</div> : ''}
        </span>

      return <span className={this.props.rotation === 1 || this.state.rotateCard !== 1 ? '' : "main-span-card"}>{card}
        <span className="border-card" id={"follower"+this.props.index}>
          <div className="border-card-font">
            <div className="border-card-font-title">
              {this.props.card.name}
            </div>
            <div className="border-card-font-skillMeleedesc">
              {this.props.card.skillMelee && this.props.card.skillMelee.val != '' ? 'Melee Skill : '+this.props.card.skillMelee.val : ''}
            </div>
            <div className="border-card-font-skillDistdesc">
              {this.props.card.skillDist && this.props.card.skillDist.val != '' ? 'Distant Skill : '+this.props.card.skillDist.val : ''}
            </div>
          </div>
          <img className="card" src={process.env.PUBLIC_URL + '/face.png'} alt=""/>
          <img className="race-icons" src={process.env.PUBLIC_URL + '/race/'+this.props.card.race+'.png'} alt=""/>
        </span>
      </span>
  }
}


//export default Slider; // Don’t forget to use export default!