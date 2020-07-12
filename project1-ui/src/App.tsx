import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { LoginComponent } from './components/LoginComponent/LoginComponent';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { User } from './models/User';

function App() {
  // const [currentUser, changeCurrentUser] = useState<null | User>(null)

  return (
    <div className="App">
     <Router>
     <Route path='/login' component={LoginComponent} />
     </Router>
    </div>
  );
}

export default App;
