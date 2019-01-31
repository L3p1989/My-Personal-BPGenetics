import * as React from "react";
import NavBar from "./NavBar";
import MorphCards from "./MorphCards";

import "../scss/app.scss";

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = { geneCombos: [] };
  }

  async componentWillMount() {
    let r = await fetch("/api/morphs");
    let geneCombos = await r.json();
    this.setState({ geneCombos });
  }

  render() {
    return (
      <>
        <NavBar />
        <MorphCards />
      </>
    );
  }
}

interface IAppProps {}

interface IAppState {
  geneCombos: Array<{
    Name: string;
    Description: string;
    Gene1: number;
    Gene2: number;
    Gene3: number;
    Gene4: number;
    Gene5: number;
    Gene6: number;
    URL: string;
  }>;
}
