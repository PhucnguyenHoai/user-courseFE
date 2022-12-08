import logo from './assests/image/logo.svg'
import './assests/css/App.css';
import Covid from './components/trackingCovid'
import Nav from './Nav/Navigation';
import Home from './components/Home';
import { Switch, Route } from "react-router-dom";
import Course from './components/userCourse';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" height={"100px"} width="100px" />
        <Nav />

        <Switch>
          <Route path='/' exact>
            <Home name="React"/>
          </Route>
          <Route path='/covid'>
            <Covid />
          </Route>
          <Route path='/course'>
            <Course />
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
