import React from "react";

export default class AddForm extends React.Component<
  IAddFormProps,
  IAddFormState
> {
  constructor(props: IAddFormProps) {
    super(props);

    this.state = { geneCombos: [] };
  }

  async componentWillMount() {
    let r = await fetch("/api/basicmorphs");
    let geneCombos = await r.json();
    this.setState({ geneCombos });
  }

  render() {
    return (
      <>
        <div className="container rounded addform-container">
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Morph Name Here"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Morph Description Here"
              />
            </div>
            <div className="form-group">
              <label>Gene1</label>
              <select className="form-control">
                <option selected>None</option>
                {this.state.geneCombos.map(geneCombo => {
                  return <option>{geneCombo.Name}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Gene2</label>
              <select className="form-control">
                <option selected>None</option>
                {this.state.geneCombos.map(geneCombo => {
                  return <option>{geneCombo.Name}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Gene3</label>
              <select className="form-control">
                <option selected>None</option>
                {this.state.geneCombos.map(geneCombo => {
                  return <option>{geneCombo.Name}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Gene4</label>
              <select className="form-control">
                <option selected>None</option>
                {this.state.geneCombos.map(geneCombo => {
                  return <option>{geneCombo.Name}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Gene5</label>
              <select className="form-control">
                <option selected>None</option>
                {this.state.geneCombos.map(geneCombo => {
                  return <option>{geneCombo.Name}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Gene6</label>
              <select className="form-control">
                <option selected>None</option>
                {this.state.geneCombos.map(geneCombo => {
                  return <option>{geneCombo.Name}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Picture URL</label>
              <input type="text" className="form-control" />
            </div>
          </form>
        </div>
      </>
    );
  }
}

interface IAddFormProps {}

interface IAddFormState {
  geneCombos: Array<{
    Name: string;
    Description: string;
    Gene1: string;
    Gene2: string;
    Gene3: string;
    Gene4: string;
    Gene5: string;
    Gene6: string;
    URL: string;
  }>;
}
