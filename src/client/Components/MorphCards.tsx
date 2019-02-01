import React from "react";

import "../scss/app.scss";

export default class MorphCards extends React.Component<
  IMorphProps,
  IMorphState
> {
  constructor(props: IMorphProps) {
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
        <main className="container morphs-container">
          <h1 className="covalence-blue">Morph Genetics</h1>
          {this.state.geneCombos.map(geneCombo => {
            return (
              <>
                <div className="card text-center m-2 rounded morph-card">
                  <div className="card-body">
                    <img className="s-img" src={geneCombo.URL} />
                    <p className="card-title">
                      <button className="btn-primary rounded snek-btn">
                        {geneCombo.Name}
                      </button>
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </main>
      </>
    );
  }
}

interface IMorphProps {}

interface IMorphState {
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
