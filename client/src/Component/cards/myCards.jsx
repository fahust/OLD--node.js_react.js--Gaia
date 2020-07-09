import React from 'react';
import faceCard from '../../';


export default class MyCards extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.user.cards) 
  }

    hoverDiv(event){
      var div = document.getElementById('follower')
      div.style.opacity = 0;
      div.style.position = "absolute";
      div.style.left = event.pageX+10+'px';
      div.style.top = event.pageY+10+'px';
    }
  
    render() {
        var myCards = this.props.user.cards.map((card,index) => {
          return <span className="span-card" key={index}>
            <img className="card" width="100" onMouseMove={this.hoverDiv}
            src={`data:image/png;base64,${Buffer.from(card.img).toString('base64')}`}
             />
             <img className="card-font" width="100" src={process.env.PUBLIC_URL + '/face.png'}/>
             </span>
        })

        return <div>
          <div className="list-card" >{myCards}</div>
          <div id="follower"><img src={process.env.PUBLIC_URL + '/face.png'} alt=""/></div>
        </div>
    }
  }


//export default Slider; // Don’t forget to use export default!