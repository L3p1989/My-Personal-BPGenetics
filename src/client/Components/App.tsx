import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MorphCards from "./MorphCards";
import NavBar from "./NavBar";

import "../scss/app.scss";

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <Router>
          <>
            <NavBar />
            <Switch>
              <Route exact path="/morphs" component={MorphCards} />
            </Switch>
          </>
        </Router>
      </>
    );
  }
}

interface IAppProps {}

interface IAppState {}
