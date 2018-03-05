import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import logo from './logo.png';
import './App.css';
import { routes, SwitchRouting } from './constants/routes';
import { Link } from 'react-router-dom';

import SignInScreen from './components/SignInScreen';
import { firebaseAuth } from './components/Fire';

class AppHeader extends Component {  
  handleAuthStateChange(user) {
    // console.log('auth change:', user, firebaseAuth);
    // this.setState({});
  }
  
  render() {
    return (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Tic Tac Toe App</h1>
          <nav>
            <ul>
              {routes.filter(r=>!!r.display).map((r,i)=>(
                <li><Link key={i} to={r.path}>{r.display}</Link>
                {r.routes?(
                  <ul>{r.routes.map(c=>(<li><Link to={r.path+'/'+c.path}> {c.display}</Link></li>))}</ul>
                ):''}
                </li>
              ))}
            </ul>
          </nav>
          <section className="App-login">
            <SignInScreen firebaseAuth={firebaseAuth} onAuthStateChanged={this.handleAuthStateChange.bind(this)}/>
          </section>
        </header>
    );
  }
}

const NoAuth=()=>(<section className="App-intro">Please have a sit with login and have fun!</section>);

class App extends Component {
  render() {
    return (<div>
      { (!!!firebaseAuth.currentUser)? <SwitchRouting AppHeader={AppHeader}/> : <NoAuth/> }
    </div>);
  }
}

export default App;
