import React from "react";

export default class UserCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      username: document.querySelector("#create-username").value,
    });
    this.setState({
      password: document.querySelector("#create-password").value,
    });
    this.setState({
      confirmPassword: document.querySelector("#confirm-password").value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.state.confirmPassword = this.state.password;
    if (this.state.password === this.state.confirmPassword) {
      const user = {
        username: this.state.username,
        password: this.state.password,
        redirect: false,
      };

      var create = {
        user: { username: this.state.username },
      };
      this.props.socket.emit("create", create);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>Créer un utilisateur:</div>
          <input
            placeholder="Nom d'utilisateur"
            aria-label="Nom d'utilisateur"
            aria-describedby="basic-addon2"
            name="name"
            type="text"
            id="create-username"
            onChange={this.handleChange}
          />
          <input
            placeholder="Mot de passe"
            aria-label="Mot de passe"
            aria-describedby="basic-addon2"
            name="pass"
            type="password"
            id="create-password"
            onChange={this.handleChange}
          />
          <input
            placeholder="Confirmation du mdp"
            aria-label="Confirmation"
            aria-describedby="basic-addon2"
            name="confirmPass"
            type="password"
            id="confirm-password"
            onChange={this.handleChange}
          />

          <button variant="dark" type="submit">
            Créer
          </button>
        </form>
      </div>
    );
  }
}

//export default Slider; // Don’t forget to use export default!
