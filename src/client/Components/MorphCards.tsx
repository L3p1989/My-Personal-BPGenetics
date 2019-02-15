import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import AddForm from "./AddForm";

export default class MorphCards extends React.Component<
  IMorphsProps,
  IMorphsState
> {
  constructor(props: IMorphsProps) {
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
        <div className="container morphs-container">
          <button className="add-snek">Add Morph</button>
          <AddForm />
          <h1 className="covalence-blue">Morph Genetics</h1>
          {this.state.geneCombos.map(geneCombo => {
            return (
              <>
                <div className="card text-center m-2 rounded morph-card">
                  <div className="card-body">
                    <img className="s-img rounded" src={geneCombo.URL} />
                    <p className="card-title">
                      <Link
                        to={`/morphs/${geneCombo.Name}`}
                        className="snek-btn"
                      >
                        {geneCombo.Name}
                      </Link>
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  }
}

interface IMorphsProps {}

interface IMorphsState {
  geneCombos: Array<{
    Name: string;
    URL: string;
  }>;
}
