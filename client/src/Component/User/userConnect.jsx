import React from 'react';

export default class UserConnect extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }
  
    handleChange = event => {
      this.setState({ username: document.querySelector('#connect-username').value });
      this.setState({ password: document.querySelector('#connect-password').value });
    }
  
    handleSubmit = event => {
      event.preventDefault();
      this.state.confirmPassword = this.state.password;
      if(this.state.password === this.state.confirmPassword){
        const user = {
          username: this.state.username,
          password: this.state.password,
          redirect: false
        };
        
        var connect = {
          user:{username:this.state.username}
        }
        this.props.socket.emit('connected', connect);
      }
    };
  
    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
              <div>Connection:</div>
            <input
                placeholder="Nom d'utilisateur"
                aria-label="Nom d'utilisateur"
                aria-describedby="basic-addon2"
                name="name"
                type="text"
                id="connect-username"
                onChange={this.handleChange}
              />
              <input
                placeholder="Mot de passe"
                aria-label="Mot de passe"
                aria-describedby="basic-addon2"
                name="pass"
                type="password"
                id="connect-password"
                onChange={this.handleChange}
              />
              
              <button variant="dark" type="submit">Connecter</button>
          </form>
        </div>
      )
    }
  }


//export default Slider; // Don’t forget to use export default!