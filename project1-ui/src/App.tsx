import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { LoginComponent } from './components/LoginComponent/LoginComponent';
// import { SignUpComponent } from './components/SignUpComponent/SignUpComponent';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { NavBarComponent } from './components/NavBarComponent/NavBarComponent';
import { AllUsersComponent } from './components/AllUsersComponent/AllUsersComponent';
import { User } from './models/User';
// import { UserDisplayComponent } from './components/UserDisplayComponent/UserDisplayComponent';
import { ProfileComponent } from './components/ProfileComponent/ProfileComponent';
import { NewUserComponent } from './components/NewUserComponent/NewUserComponent';
import {ToastContainer} from 'react-toastify'
import { EditUserComponent } from './components/EditUserComponent/EditUserComponent';

// import { User } from './models/User';

function App() {
  const [currentUser, changeCurrentUser] = useState<null | User>(null)
 


  return (
    <div className="App">
      <Router>
        <NavBarComponent user={currentUser}/>
        {/* <UserDisplayComponent user={currentUser}/> */}
        <Route path='/login' render={(props)=>(<LoginComponent changeCurrentUser={changeCurrentUser} {...props}/>)} />
        <Route path='/signup' component={NewUserComponent}/>
        <Route path='/edit/:userId' component={EditUserComponent}/>

        <Route path='/users' component={AllUsersComponent}/>
        <Route path='/profile/:userId' component={ProfileComponent}/>
        <ToastContainer position='bottom-right'/>
      </Router>

    </div>
  );
}

export default App;
