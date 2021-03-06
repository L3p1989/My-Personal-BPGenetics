import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MorphCards from "./MorphCards";
import NavBar from "./NavBar";
import "../scss/app.scss";
import HomePage from "./HomePage";
import GenePage from "./GenePage";
import BasicsPage from "./BasicsPage";
import MorphPage from "./MorphPage";

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
              <Route exact path="/" component={HomePage} />
              <Route exact path="/genetypes" component={GenePage} />
              <Route exact path="/basicgenes" component={BasicsPage} />
              <Route exact path="/morphs" component={MorphCards} />
              <Route path="/morphs/:name" component={MorphPage} />
            </Switch>
          </>
        </Router>
      </>
    );
  }
}

interface IAppProps {}

interface IAppState {}
