import React from "react";

export default class GenePage extends React.Component<IGeneProps, IGeneState> {
  constructor(props: IGeneProps) {
    super(props);

    this.state = { geneTypes: [] };
  }

  async componentWillMount() {
    let r = await fetch("/api/genetypes");
    let geneTypes = await r.json();
    this.setState({ geneTypes });
  }

  render() {
    return (
      <>
        <div className="container gene-container">
          <h1 className="covalence-blue">Genetics Types</h1>
          {this.state.geneTypes.map(geneType => {
            return (
              <>
                <h2>{geneType.Name}</h2>
                <p>{geneType.Description}</p>
              </>
            );
          })}
        </div>
      </>
    );
  }
}

interface IGeneProps {}

interface IGeneState {
  geneTypes: Array<{
    Name: string;
    Description: string;
  }>;
}
