import React from 'react';
import Card from './cards';


export default class BuyCards extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listCard : 'none' ,
      page:1,
      nbrCarte:0,
      race:0,
      point:0,
      cost:0,
    }
    
    this.changePage = this.changePage.bind(this);
    this.handleChange = this.handleChange.bind(this);

    var data = {
      page:this.state.page,
      race:this.state.race,
      cost:this.state.cost,
      point:this.state.point,
    }
    this.props.socket.emit("getListCard",{data:data})
    this.props.socket.on("getListCard", data => {
      this.state.nbrCarte = data.nbr;
      this.setState({});
      setTimeout(() => {
        this.setState({listCard:data.listCard});
      }, 300);
    });
  }

  handleChange = event => {
    var name = event.target.name;
    this.state.page = 1;
    this.state[name] = event.target.value;
    var data = {
      page:this.state.page,
      race:this.state.race,
      cost:this.state.cost,
      point:this.state.point,
    }
    this.props.socket.emit('getListCard',{data:data});
    this.setState({})
  }

  changePage(e){
    this.setState({page:e.target.innerHTML});
    var page = e.target.innerHTML;
    var data = {
      page:page,
      race:this.state.race,
      cost:this.state.cost,
      point:this.state.point,
    }
    this.props.socket.emit('getListCard',{data:data});
  }
  
    render() {
        var pagination = <button onClick={this.changePage}>1</button>

        if(this.state.listCard !== 'none'){
          var paginationArray = [];
          for (let index = 0; index < (this.state.nbrCarte); index++) {
            paginationArray.push(index);
          }
          var pagination = paginationArray.map((card,index) => {
            return <div key={index+1} onClick={this.changePage} className={parseInt(this.state.page) === index+1 ? 'button-pagination bolded' : 'button-pagination'}>{index+1}</div>;
          })
          var listCard = Object.keys(this.state.listCard).map((card,index) => {
            return <span key={index} className="list-card">
                <Card socket={this.props.socket} user={this.props.user} buyable={1} allie={''} key={index} card={this.state.listCard[card]} index={index} loadImg={this.props.loadImg}  y={0} x={0}/>
              </span>
            //<div key={index}>{this.state.listCard[card].name}</div>;
          })
        }

        return <div>
          <div className="list-buy-card">{listCard}</div>
          <br/>
          <br/>
          <select name="race" className="order-by-race" onChange={this.handleChange}>
            <option value="0">All</option>
            <option value="Human">Human</option>
            <option value="Dwarf">Dwarf</option>
            <option value="Elf">Elf</option>
            <option value="Monster">Monster</option>
            <option value="Mage">Wizard</option>
          </select>
          <select name="point" className="order-by-point" onChange={this.handleChange}>
            <option value="0">All</option>
            <option value="1">1 point</option>
            <option value="2">2 point</option>
            <option value="3">3 point</option>
            <option value="4">4 point</option>
            <option value="5">5 point</option>
            <option value="6">6 point</option>
            <option value="7">7 point</option>
            <option value="8">8 point</option>
            <option value="9">9 point</option>
            <option value="10">More than 9 point</option>
          </select>
          <select name="cost" className="order-by-cost" onChange={this.handleChange}>
            <option value="0">All</option>
            <option value="10">Costs more than 10</option>
            <option value="50">Costs more than 50</option>
            <option value="100">Costs more than 100</option>
            <option value="250">Costs more than 250</option>
            <option value="500">Costs more than 500</option>
            <option value="750">Costs more than 750</option>
            <option value="1000">Costs more than 1000</option>
            <option value="5000">Costs more than 5000</option>
            <option value="10000">Costs more than 10000</option>
          </select>
          <div className="pagination">{pagination}</div>
        </div>
    }
  }


//export default Slider; // Don’t forget to use export default!