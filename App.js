import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogEditor from "./components/BlogEditor";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/edit/:id" component={BlogEditor} />
        <Route path="/" component={BlogList} />
      </Switch>
    </Router>
  );
}

export default App;