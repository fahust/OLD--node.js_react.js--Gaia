import React from 'react';
//import Delivery from 'delivery';


export default class MakeCards extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      file: null,
      img: '',
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit(e){
    e.preventDefault();

    /*var dataurl = '';

    var current_file = this.state.file;
    var reader = new FileReader();
    console.log(current_file)
    if (current_file.type.indexOf('image') == 0) {
      reader.onload = function (event) {
          var image = new Image();
          image.src = event.target.result;

          image.onload = function() {
            var maxWidth = 1024,
                maxHeight = 1024,
                imageWidth = image.width,
                imageHeight = image.height;


            if (imageWidth > imageHeight) {
              if (imageWidth > maxWidth) {
                imageHeight *= maxWidth / imageWidth;
                imageWidth = maxWidth;
              }
            }
            else {
              if (imageHeight > maxHeight) {
                imageWidth *= maxHeight / imageHeight;
                imageHeight = maxHeight;
              }
            }

            var canvas = document.createElement('canvas');
            canvas.width = imageWidth;
            canvas.height = imageHeight;
            image.width = imageWidth;
            image.height = imageHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0, imageWidth, imageHeight);
            console.log(current_file)
            dataurl = canvas.toDataURL(current_file.type);
          }
        }
      reader.readAsDataURL(current_file);
    }*/

    var FileSize = this.state.file.size / 1024 / 1024; // in MB
    if (FileSize > 0.05) {
        alert('File size exceeds 50 KB');
        // $(file).val(''); //for clearing with Jquery
    } else {

    }

        
    const obj = {
      file: this.state.file,//this.state.file,
      test: 'test',
    };


    this.props.socket.emit('imageUpload',obj)
  }

  onChange(e) {
      this.setState({file:e.target.files[0]});
  }

  handleChange = event => {
    this.setState({ username: document.querySelector('#create-username').value });
    this.setState({ password: document.querySelector('#create-password').value });
    this.setState({ confirmPassword: document.querySelector('#confirm-password').value });
  }
  
    render() {
        return <div>
          <form onSubmit={this.onFormSubmit}>
            <input type="file" onChange={this.onChange}
            id="avatar" name="avatar"
            accept="image/png, image/jpeg">
              </input>
              <button type="submit">envoyer</button>
            {/*<input
              placeholder="Nom d'utilisateur"
              aria-label="Nom d'utilisateur"
              aria-describedby="basic-addon2"
              name="name"
              type="text"
              id="connect-username"
              onChange={this.handleChange}>
              </input>*/}
          </form>
        </div>
    }
  }


//export default Slider; // Don’t forget to use export default!