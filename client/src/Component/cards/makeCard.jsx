import React from 'react';
//import Delivery from 'delivery';


export default class MakeCards extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      username:this.props.user.username,
      file: null,
      name: '',
      point: 1,
      skillMelee: 1,
      lineMelee: 1,
      lineMeleeVal: 'une cible aléatoire',
      nombreMelee: 1,
      skillDist: 1,
      lineDist: 1,
      lineDistVal: 'une cible aléatoire',
      nombreDist: 1,
      
      skillMeleeVal: '',
      skillDistVal: '',

      lineMeleeSelect:0,
      lineDistSelect:0,

      race: '',
      cost: 0,
      urlImg:'',
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onFormSubmit(e){
    e.preventDefault();
    if(this.state.file){
      /*const obj = {
        file: this.state.file,//this.state.file,
        card: 'test',
      };*/
      this.props.socket.emit('imageUpload',{card:this.state})
    }
  }

  onChangeFile(e) {
      var img = new Image();
      var _URL = window.URL || window.webkitURL;
      var objectUrl = _URL.createObjectURL(e.target.files[0]);
      this.state.urlImg = objectUrl;
      img.onload = function () {
        //width height
          if(this.width != 248 && this.height != 378){
            alert('the image size must be 248 X 378');
          }else{
          }
          _URL.revokeObjectURL(objectUrl);

          
      };
      //size image
      var FileSize = e.target.files[0].size / 1024 / 1024; // in MB
      if (FileSize > 0.05) {
        this.state.urlImg = '';
        this.setState({file:null});
        alert('File size exceeds 50 KB');
      } else {
        this.setState({file:e.target.files[0]});
      }
     
  }

  handleChange = event => {
    var name = event.target.name 
    this.state[name] = event.target.value;

    
    this.state.skillMeleeVal = document.querySelector('#skillMelee').options[document.querySelector('#skillMelee').selectedIndex].text
    this.state.skillDistVal = document.querySelector('#skillDist').options[document.querySelector('#skillDist').selectedIndex].text

    if(name === 'lineMelee'){
      this.state.lineMeleeVal = event.target.options[event.target.selectedIndex].text;
    }else if(name === 'lineDist'){
      this.state.lineDistVal = event.target.options[event.target.selectedIndex].text;
    }

    if(parseInt(this.state.skillMelee) >= 2 && parseInt(this.state.skillMelee) <= 7 ){
      this.state.nombreMeleeSelect = 1;
    }else{
      this.state.nombreMelee = 1;this.state.nombreMeleeSelect = 0;
    }
    if(parseInt(this.state.skillMelee) === 2 || parseInt(this.state.skillMelee) === 3 || parseInt(this.state.skillMelee) === 6 ){
      this.state.lineMeleeSelect = 1;
    }else{
      this.state.lineMelee = 1;this.state.lineMeleeSelect = 0;
    }
    if(parseInt(this.state.skillDist) >= 2 && parseInt(this.state.skillDist) <= 7 ){
      this.state.nombreDistSelect = 1;
    }else{
      this.state.nombreDist = 1;this.state.nombreDistSelect = 0;
    }
    if(parseInt(this.state.skillDist) === 2 || parseInt(this.state.skillDist) === 3 || parseInt(this.state.skillDist) === 6 ){
      this.state.lineDistSelect = 1;
    }else{
      this.state.lineDist = 1;this.state.lineDistSelect = 0;
    }


    var cost = this.state.point*(this.state.skillMelee*this.state.nombreMelee*this.state.lineMelee)*(this.state.skillDist*this.state.nombreDist*this.state.lineDist)
    this.setState({cost : cost });
  }
  
    render() {
        if(this.state.nombreMeleeSelect === 1){
          var nombreMelee = <select name="nombreMelee" value={this.state.nombreMelee} onChange={this.handleChange}>
            <option value="1">Un</option>
            <option value="2">Deux</option>
            <option value="3">Trois</option>
            <option value="4">Quatre</option>
            <option value="5">Five</option>
            <option value="6">Six</option>
            <option value="7">Seven</option>
            <option value="8">Eight</option>
            <option value="9">Nine</option>
            <option value="10">Ten</option>
            <option value="11">Eleven</option>
            <option value="12">Twelve</option>
          </select>
        }
        if(this.state.lineMeleeSelect === 1){
          var lineMelee = <select name="lineMelee" value={this.state.lineMelee} onChange={this.handleChange}>
            <option value="1">une cible aléatoire</option>
            <option value="2">une même race</option>
            <option value="3">ligne de distance</option>
            <option value="4">ligne de mélée</option>
          </select>
        }

        if(this.state.nombreDistSelect === 1){
          var nombreDist = <select name="nombreDist" value={this.state.nombreDist} onChange={this.handleChange}>
            <option value="1">Un</option>
            <option value="2">Deux</option>
            <option value="3">Trois</option>
            <option value="4">Quatre</option>
            <option value="5">Five</option>
            <option value="6">Six</option>
            <option value="7">Seven</option>
            <option value="8">Eight</option>
            <option value="9">Nine</option>
            <option value="10">Ten</option>
            <option value="11">Eleven</option>
            <option value="12">Twelve</option>
          </select>
        }
        if(this.state.lineDistSelect === 1){
          var lineDist = <select name="lineDist" value={this.state.lineDist} onChange={this.handleChange}>
            <option value="1">une cible aléatoire</option>
            <option value="2">une même race</option>
            <option value="3">ligne de distance</option>
            <option value="4">ligne de mélée</option>
          </select>
        }

        return <div>
          <div className={"cost-make-card "+(this.state.cost > this.props.user.monaie   ? 'red-span': '')} > {this.state.cost > this.props.user.monaie ? 'insufficient money': 'Cost : '+this.state.cost}</div>
          <form className="form-make-card" onSubmit={this.onFormSubmit}>
            <div className="file-block">
              <label className="file-label" htmlFor="file">{this.state.urlImg ? 'Image Uploaded !' : 'Upload image'}</label>
              <input type="file" id="file" onChange={this.onChangeFile}
              id="avatar" name="avatar"
              accept="image/png, image/jpeg"></input>
            </div>
            <input placeholder="Name"
            name="name" pattern="[A-Za-z0-9]+"
            type="text" minLength="1" maxLength="20"
            onChange={this.handleChange}
            value={this.state.name}/>
            <input placeholder="Point"
            name="point"
            /*type="number"*/ min="1" max="10"
            onChange={this.handleChange}
            value={this.state.point}/>
            <select name="race" value={this.state.race} onChange={this.handleChange}>
              <option value="1">Human</option>
              <option value="2">Dwarf</option>
              <option value="3">Elf</option>
              <option value="4">Monster</option>
              <option value="5">Wizard</option>
            </select>
            <select name="skillMelee" value={this.state.skillMelee} onChange={this.handleChange} id="skillMelee">
              <option value="1">No skill</option>
              <option value="2">Infliger {this.state.nombreMelee} de dégats à {this.state.lineMeleeVal} adverse</option>
              <option value="3">Donner {this.state.nombreMelee} point à {this.state.lineMeleeVal} allié</option>
              <option value="4">Cacher la carte à l'adversaire</option>
              <option value="5">Ajouter {this.state.nombreMelee} point sur cet carte par même race mise en jeu allié</option>
              <option value="6">Confere invulnérabitilité à {this.state.lineMeleeVal} allié pendant {this.state.nombreMelee} nombre de tour</option>
              <option value="7">Détruire toutes les carte énemies possédant {this.state.nombreMelee} points</option>
              <option value="8">Invulnérable</option>
              <option value="9">Ajoute un point par carte supérieur mise sur la table</option>
            </select>
            {nombreMelee}
            {lineMelee}
            <select name="skillDist" value={this.state.skillDist} onChange={this.handleChange} id="skillDist">
              <option value="1">No skill</option>
              <option value="2">Infliger {this.state.nombreDist} de dégats à {this.state.lineDistVal} adverse</option>
              <option value="3">Donner {this.state.nombreDist} point à {this.state.lineDistVal} allié</option>
              <option value="4">Cacher la carte à l'adversaire</option>
              <option value="5">Ajouter {this.state.nombreDist} point sur cet carte par même race mise en jeu allié</option>
              <option value="6">Confere invulnérabitilité à {this.state.lineDistVal} allié pendant {this.state.nombreDist} nombre de tour</option>
              <option value="7">Détruire toutes les carte énemies possédant {this.state.nombreDist} points</option>
              <option value="8">Invulnérable</option>
              <option value="9">Ajoute un point par carte supérieur mise sur la table</option>
            </select>
            {nombreDist}
            {lineDist}
            
            <div className="send-make-card">
                <div className="send-make-card-bright"></div>
                <img className="send-make-card-img" src={process.env.PUBLIC_URL + '/array.png'} />
                <span className="send-make-card-text">Create Card
                  <button type="submit">envoyer</button>
                </span>
            </div>
          </form>

          <div className="overview-make-card">
            <div className="menu-span-card-bright"></div>
            <img className="overview-img"  src={this.state.urlImg ? this.state.urlImg : process.env.PUBLIC_URL + '/none.png'}></img>
            <img className="overview-border" src={process.env.PUBLIC_URL + '/face.png'} />
            {this.state.point >= 1 && this.state.urlImg ? <img className="overview-embleme" src={process.env.PUBLIC_URL + '/embleme.png'}/> : ''}
            {this.state.point >= 1 && this.state.urlImg ? <div className="overview-point-embleme">{this.state.point}</div> : ''}
            <p className='contentText-menu-card'>{this.props.text}</p>
          </div>
        </div>
    }
  }


//export default Slider; // Don’t forget to use export default!