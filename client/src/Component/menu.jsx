import React from 'react';


export default class Gaia extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
        }
    }

    render(){
        return <div>
            <div>MatchMaking</div>
            <div>MatchMaking</div>
            <div>MatchMaking</div>
        </div>
    }

}
