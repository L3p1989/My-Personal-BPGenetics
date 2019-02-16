import React from "react";

export default class BasicsPage extends React.Component<
  IBasicsProps,
  IBasicsState
> {
  constructor(props: IBasicsProps) {
    super(props);

    this.state = { basicGenetics: [] };
  }

  async componentWillMount() {
    let r = await fetch("/api/basicmorphs");
    let basicGenetics = await r.json();
    this.setState({ basicGenetics });
  }

  render() {
    return (
      <>
        <div className="container basics-container">
          <h1>Basic Genetic Traits</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">GeneType</th>
              </tr>
            </thead>
            <tbody>
              {this.state.basicGenetics.map(basicGene => {
                return (
                  <tr>
                    <th scope="row">{basicGene.ID}</th>
                    <td>{basicGene.Name}</td>
                    <td>{basicGene.GeneType}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

interface IBasicsProps {}

interface IBasicsState {
  basicGenetics: Array<{
    ID: string;
    Name: string;
    GeneType: string;
  }>;
}
