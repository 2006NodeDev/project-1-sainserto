import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { LoginComponent } from './components/LoginComponent/LoginComponent';
import { SignUpComponent } from './components/SignUpComponent/SignUpComponent';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { NavBarComponent } from './components/NavBarComponent/NavBarComponent';
import { AllUsersComponent } from './components/AllUsersComponent/AllUsersComponent';
import { User } from './models/User';
import { UserDisplayComponent } from './components/UserDisplayComponent/UserDisplayComponent';
import { ProfileComponent } from './components/ProfileComponent/ProfileComponent';

// import { User } from './models/User';

function App() {
  const [currentUser, changeCurrentUser] = useState<null | User>(null)
 


  return (
    <div className="App">
      <Router>
        <NavBarComponent user={currentUser}/>
        {/* <UserDisplayComponent user={currentUser}/> */}
        <Route path='/login' render={(props)=>(<LoginComponent changeCurrentUser={changeCurrentUser} {...props}/>)} />
        <Route path='/signup' component={SignUpComponent} />
        <Route path='/users' component={AllUsersComponent}/>
        <Route path='/profile/:userId' component={ProfileComponent}/>

      </Router>

    </div>
  );
}

export default App;
