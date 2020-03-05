import React from 'react';
import {Route,Switch,Link} from 'react-router-dom';
import './App.css';
import {Home} from './Home';
import {Login} from './Login';
import {Registration} from './Registration';
import {Board} from './Board';
import {NewBoard}  from './NewBoard';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/home'>
          <Home></Home>
        </Route>
        <Route path='/board/experimental'>
          <NewBoard></NewBoard>
        </Route>
        <Route path='/board'>
          <Board></Board>
        </Route>
        
        <Route path='/signup'>
          <Registration></Registration>
        </Route>
        <Route path='/'>
          <Login></Login>
        </Route>
       
        
      </Switch>
        
    </div>
  );
}

export default App;
