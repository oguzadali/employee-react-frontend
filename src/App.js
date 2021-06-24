
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from "./components/Home";
import Department from "./components/Department";
import Employee from "./components/Employee";
import Navigation from "./components/Navigation";


function App() {
  return (

    <BrowserRouter>
      <h5 className="m-3 d-flex justify-content-center">Employee Management</h5>
      <Navigation></Navigation>
      <div className="container">
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/department' component={Department} />
          <Route path='/employee' component={Employee} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
