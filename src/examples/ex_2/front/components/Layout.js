import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import AddNewTutorial from "./AddNewTutorial";
import EditTutorial from "./EditTutorial";
import TutorialsList from "./TutorialsList";

const Layout=()=> {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">crud-operation-by-redux </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link"> Tutorials </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">Add </Link>
          </li>
        </div>
      </nav>

      <div className="container toplevel mt-3">
        <Switch>
          <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
          <Route exact path="/add" component={AddNewTutorial} />
          <Route path="/tutorials/:id" component={EditTutorial} />
        </Switch>
      </div>
    </Router>
  );
}

export default Layout;
