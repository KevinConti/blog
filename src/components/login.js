import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';

import './login.css'

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = { container: '#netlify-modal' };
        netlifyIdentity.init();
    }
  
    login = () => {
      netlifyIdentity.open();
    };

    render() {
        return (
          <div>
            <button className='loginButton' onClick={this.login}>Log in</button>
          </div>
        );
    }
}

export default Login 