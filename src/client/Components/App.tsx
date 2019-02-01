import * as React from "react";
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
        <NavBar />
      </>
    );
  }
}

interface IAppProps {}

interface IAppState {}
