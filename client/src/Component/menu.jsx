import React from 'react';


export default class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
        }
    }

    handleSubmit = event => {
        //event.preventDefault();
          var matchmaking = {
            user:{username:this.props.user.username}
          }
          this.props.socket.emit('matchmaking', matchmaking);
      };

    render(){
        var menu = '';
        if(!this.props.user){
            menu = <div>
                <div><button onClick={() => this.props.changePage('connect')}>Connect</button></div>
                <div><button onClick={() => this.props.changePage('register')}>Register</button></div>
            </div>
        }else if(!this.props.party && this.props.page == 'menu'){
            menu = <div>
                <div>Monaie : {this.props.user.monaie}</div>
                <div><button onClick={this.handleSubmit}>MatchMaking</button></div>
                <div><button onClick={() => this.props.changePage('make card')}>Make Card</button></div>
                <div><button onClick={() => this.props.changePage('buy card')}>Search and buy Card</button></div>
                <div><button onClick={() => this.props.changePage('my cards')}>My Card</button></div>
            </div>
        }else{
            menu = <div>
                <div><button onClick={() => this.props.changePage('menu')}>Return to menu</button></div>
            </div>
        }
        return <div>{menu}</div>
    }

}
