import './App.css';
import SignIn from './components/SignIn';
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import User from './components/User'
import {Route,Routes} from 'react-router';
import Edituser from './components/Edituser';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/dashboard"  element={<Dashboard/>}/>
        <Route path="/user"  element={<User/>}/>
        <Route path="/edituser/:userId"  element={<Edituser/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
