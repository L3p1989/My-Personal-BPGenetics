import React from "react";
import { RouteComponentProps } from "react-router-dom";

export default class EditForm extends React.Component<
  IEditFormProps,
  IEditFormState
> {
  constructor(props: IEditFormProps) {
    super(props);
    this.state = {
      basicCombos: [],
      snake: []
    };
  }

  async componentDidMount() {
    let r = await fetch("/api/basicmorphs");
    let basicCombos = await r.json();
    this.setState({ basicCombos });
    let r2 = await fetch(`/api/morphs/${this.props.match.params.name}`);
    let snake = await r2.json();
    this.setState({ snake });
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
          </form>
        </div>
      </>
    );
  }
}

interface IEditFormProps extends RouteComponentProps<{ name: string }> {}

interface IEditFormState {
  basicCombos: Array<{
    ID: number;
    Name: string;
  }>;
  snake: Array<{
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
