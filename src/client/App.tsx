import * as React from "react";

import "./scss/app";

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
      <main className="container">
        <h1 className="covalence-blue">My BP Genetics!</h1>
        <ul className="list-group">
          {this.state.geneCombos.map(geneCombo => {
            return (
              <>
                <li className="list-group-item">
                  {geneCombo.Name}
                  <div>
                    <p>{geneCombo.Description}</p>
                    <img src={`${geneCombo.URL}`} alt="" />
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </main>
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
