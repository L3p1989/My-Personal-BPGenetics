import React from "react";

export default class AddForm extends React.Component<
  IAddFormProps,
  IAddFormState
> {
  constructor(props: IAddFormProps) {
    super(props);

    this.state = { basicCombos: [] };
  }

  async componentWillMount() {
    let r = await fetch("/api/basicmorphs");
    let basicCombos = await r.json();
    this.setState({ basicCombos });
  }

  render() {
    return (
      <>
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
              {this.state.basicCombos.map(basicCombo => {
                return (
                  <option>
                    {basicCombo.ID}: {basicCombo.Name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Gene2</label>
            <select className="form-control">
              <option selected>None</option>
              {this.state.basicCombos.map(basicCombo => {
                return (
                  <option>
                    {basicCombo.ID}: {basicCombo.Name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Gene3</label>
            <select className="form-control">
              <option selected>None</option>
              {this.state.basicCombos.map(basicCombo => {
                return (
                  <option>
                    {basicCombo.ID}: {basicCombo.Name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Gene4</label>
            <select className="form-control">
              <option selected>None</option>
              {this.state.basicCombos.map(basicCombo => {
                return (
                  <option>
                    {basicCombo.ID}: {basicCombo.Name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Gene5</label>
            <select className="form-control">
              <option selected>None</option>
              {this.state.basicCombos.map(basicCombo => {
                return (
                  <option>
                    {basicCombo.ID}: {basicCombo.Name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Gene6</label>
            <select className="form-control">
              <option selected>None</option>
              {this.state.basicCombos.map(basicCombo => {
                return (
                  <option>
                    {basicCombo.ID}: {basicCombo.Name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Picture URL</label>
            <input type="text" className="form-control" />
          </div>
          <button className="save-btn">Save</button>
          <button className="cancel-btn">Cancel</button>
        </form>
      </>
    );
  }
}

interface IAddFormProps {}

interface IAddFormState {
  basicCombos: Array<{
    Name: string;
    ID: number;
  }>;
}
