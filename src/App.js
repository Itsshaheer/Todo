import {Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="App">
    <Switch>
     <Route path="/" exact component={Login} /> 
      <Route path="/todolist" component={TodoList} />
    </Switch>
    </div>
  );
}

export default App;
